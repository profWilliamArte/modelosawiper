import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/beauty';

const SliderZoomLightbox = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando productos belleza...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar productos belleza</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .zoom-slide {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .zoom-slide .swiper-zoom-container {
          width: 100%;
          height: 250px;
          margin-bottom: 15px;
        }
        .zoom-slide .swiper-zoom-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="container my-5">
        <h2 className="mb-4 text-center">Slider con Zoom / Lightbox - Belleza</h2>
        <p className="text-center text-muted mb-5">
          Zoom interactivo con pinch y doble clic<br />
          Categoría "beauty" desde dummyjson.com [attached_file:1].
        </p>

        <Swiper
          modules={[Navigation, Pagination, Zoom]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          zoom={true}
          loop={true}
          className="mySwiper zoom-swiper"
          style={{ height: '500px' }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1400: { slidesPerView: 4, spaceBetween: 40 }
          }}
        >
          {datos.map(producto => (
            <SwiperSlide key={producto.id} className="zoom-slide">
              <div className="swiper-zoom-container">
                <img 
                  src={producto.thumbnail}
                  alt={producto.title}
                />
              </div>
              <div className="text-center mt-3">
                <h5 className="card-title fw-bold mb-2">{producto.title}</h5>
                <p className="text-success fw-bold fs-4 mb-3">${producto.price}</p>
                <button className="btn btn-outline-primary btn-sm px-4">
                  Ver Producto
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-5">
          <h4>Código clave explicado:</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Módulos:</strong> <code>Zoom</code> + <code>Navigation</code> + <code>Pagination</code> [web:1]
            </li>
            <li className="list-group-item">
              <strong>Zoom:</strong> <code>zoom={true}</code> + <code>swiper-zoom-container</code> solo en imagen
            </li>
            <li className="list-group-item">
              <strong>Layout:</strong> Imagen y contenido **separados** para evitar conflictos
            </li>
            <li className="list-group-item">
              <strong>Interacción:</strong> Doble clic o pinch para zoom en imagen
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SliderZoomLightbox;
