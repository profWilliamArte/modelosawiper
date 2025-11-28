import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/fragrances';

const SliderScrollbar = () => {
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
        <p>Cargando fragancias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar las fragancias</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .scrollbar-swiper {
          padding-bottom: 40px;
          position: relative;
        }
        .swiper-scrollbar {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          height: 6px;
        }
        .swiper-scrollbar-drag {
          background: #007bff;
          border-radius: 10px;
        }
      `}</style>

      <div className="container my-5">
        <h2 className="mb-4 text-center">Slider con Scrollbar - Fragancias</h2>
        <p className="text-center text-muted mb-5">
          Slider con barra de scroll para controlar la navegación<br />
          Categoría "fragrances" desde dummyjson.com [attached_file:1].
        </p>

        <Swiper
          modules={[Scrollbar, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          className="scrollbar-swiper"
          style={{ height: '500px' }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1400: { slidesPerView: 4, spaceBetween: 40 }
          }}
        >
          {datos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{producto.title}</h5>
                  <p className="text-success fw-bold fs-4">${producto.price}</p>
                  <button className="btn btn-outline-primary mt-3">Ver Producto</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-5">
          <h4>Código clave explicado:</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Módulos:</strong> <code>Scrollbar</code> con <code>draggable:true</code> [web:1]</li>
            <li className="list-group-item"><strong>Navegación:</strong> También incluye flechas y paginación clickeable</li>
            <li className="list-group-item"><strong>Estilo:</strong> Barra scroll personalizada con CSS local</li>
            <li className="list-group-item"><strong>Datos:</strong> Productos fragancias desde dummyjson.com</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SliderScrollbar;
