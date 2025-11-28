import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderThumbnails = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
        <p>Cargando smartphones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar smartphones</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .thumbs-container { max-width: 900px; margin: 0 auto; }
        .main-swiper { height: 450px; }
        .thumbs-swiper { 
          height: 120px; 
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        .thumbs-swiper .swiper-slide {
          opacity: 0.6;
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 4px;
        }
        .thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1;
          transform: scale(1.05);
        }
        .thumb-img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 3px solid transparent;
          transition: all 0.3s ease;
        }
        .swiper-slide-thumb-active .thumb-img {
          border-color: #007bff !important;
          box-shadow: 0 4px 12px rgba(0,123,255,0.4);
        }
      `}</style>

      <div className="container my-5">
        <h2 className="mb-4 text-center">Slider con Thumbnails - Smartphones</h2>
        <p className="text-center text-muted mb-5">
          Slider principal sincronizado con miniaturas clickeables<br />
          Categoría "smartphones" desde dummyjson.com [attached_file:1].
        </p>

        <div className="thumbs-container">
          {/* SLIDER PRINCIPAL */}
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={true}
            className="main-swiper mySwiper2"
          >
            {datos.map((producto) => (
              <SwiperSlide key={producto.id}>
                <div className="card h-100 shadow-lg border-0 overflow-hidden">
                  <div className="card-body d-flex flex-column align-items-center p-4">
                    <img 
                      src={producto.thumbnail} 
                      className="img-fluid"
                      alt={producto.title}
                      
                    />
                    <h3 className="card-title text-center mb-3 fw-bold">{producto.title}</h3>
                    <p className="fs-2 text-success fw-bold mb-4">${producto.price}</p>
                    <div className="mb-4">
                      <span className="badge bg-primary fs-6 me-2">{producto.brand}</span>
                      <span className="badge bg-warning fs-6">⭐ {producto.rating}</span>
                    </div>
                    <button className="btn btn-primary btn-lg px-5">Comprar Ahora</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SLIDER DE MINIATURAS */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress={true}
            breakpoints={{
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 }
            }}
            className="thumbs-swiper mySwiper"
          >
            {datos.map((producto) => (
              <SwiperSlide key={producto.id}>
                <img 
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="thumb-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-5">
          <h4>Código clave explicado:</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Estado:</strong> <code>const [thumbsSwiper, setThumbsSwiper] = useState(null)</code> [web:1]
            </li>
            <li className="list-group-item">
              <strong>Conexión:</strong> <code>onSwiper=</code> en thumbs + <code>thumbs=</code> en principal
            </li>
            <li className="list-group-item">
              <strong>Clase activa:</strong> <code>.swiper-slide-thumb-active</code> para estilos
            </li>
            <li className="list-group-item">
              <strong>Sincronización:</strong> Automática bidireccional
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SliderThumbnails;
