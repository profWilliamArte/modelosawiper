import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/fragrances';

const SliderPaginacionAutoplay = () => {
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
        .custom-pagination .swiper-pagination {
          position: absolute !important;
          bottom: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 50;
          padding-top: 15px;
        }
        .custom-pagination .swiper-pagination-bullet {
          width: 16px !important;
          height: 16px !important;
          background: #007bff !important;
          opacity: 0.8 !important;
          margin: 0 8px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          border: 2px solid rgba(255,255,255,0.8);
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #0056b3 !important;
          width: 20px !important;
          height: 20px !important;
          opacity: 1 !important;
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(0,123,255,0.6);
        }
        .custom-pagination .swiper-slide {
          height: 450px !important;
        }
      `}</style>

      <div className="container my-5">
        <h2 className="mb-4 text-center">Slider con Paginación y Autoplay - Fragancias</h2>
        <p className="text-center text-muted mb-5">
          Ejemplo de Swiper con paginación interactiva y autoplay automático<br />
          Productos de la categoría "fragrances" desde dummyjson.com [attached_file:1].
        </p>

        <div className="custom-pagination">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 40,
              }
            }}
            className="mySwiper"
            style={{ 
              paddingBottom: '60px',
              height: '500px',
              '--swiper-pagination-bullet-inactive-color': '#999',
              '--swiper-pagination-color': '#007bff',
              '--swiper-pagination-bullet-size': '16px'
            }}
          >
            {datos.map((producto) => (
              <SwiperSlide key={producto.id}>
                <div className="card h-100 shadow-sm ">
                  <div className="card-header p-0" >
                    <img 
                      src={producto.thumbnail} 
                      className="img-fluid " 
                      alt={producto.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body text-center d-flex flex-column justify-content-center p-4">
                    <h5 className="card-title fw-bold mb-2">{producto.title}</h5>
                    <p className="card-text text-success fw-bold fs-3 mb-3">${producto.price}</p>
                    <button className="btn btn-primary btn-sm ">Ver Producto</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-5">
          <h4>Código clave explicado:</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Módulos:</strong> <code>Pagination</code> y <code>Autoplay</code> [web:1]
            </li>
            <li className="list-group-item">
              <strong>Paginación personalizada:</strong> Estilos CSS locales con <code>.custom-pagination</code>
            </li>
            <li className="list-group-item">
              <strong>Autoplay:</strong> <code>delay: 3000ms</code>, continúa después de interactuar
            </li>
            <li className="list-group-item">
              <strong>Datos:</strong> Productos "fragrances" vía API dummyjson.com 
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SliderPaginacionAutoplay;
