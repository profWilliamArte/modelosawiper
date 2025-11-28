import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderVertical = () => {
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
        <p>Cargando smartphones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los smartphones</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .vertical-swiper {
          height: 600px;
          max-width: 400px;
          margin: 0 auto;
        }
        .vertical-swiper .swiper-button-next,
        .vertical-swiper .swiper-button-prev {
          transform: rotate(90deg);
          left: 50%;
          top: 50%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          background: rgba(0,123,255,0.9);
          border-radius: 50%;
        }
        .vertical-swiper .swiper-button-next {
          right: auto;
          left: calc(50% + 50px);
        }
        .vertical-swiper .swiper-button-prev {
          right: auto;
          left: calc(50% - 90px);
        }
        .vertical-swiper .swiper-pagination {
          position: absolute;
          right: 10px;
          left: auto !important;
          bottom: 50%;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
        }
        .vertical-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          margin: 8px 0 !important;
          background: #007bff;
        }
        .vertical-swiper .swiper-pagination-bullet-active {
          background: #0056b3;
          width: 16px;
          height: 16px;
        }
      `}</style>

      <div className="container my-5">
        <h2 className="mb-4 text-center">Slider Vertical - Smartphones</h2>
        <p className="text-center text-muted mb-5">
          Ejemplo de Swiper con <strong>deslizamiento vertical</strong> y navegación lateral<br />
          Perfecto para mostrar productos en espacios estrechos. Categoría "smartphones" [attached_file:1].
        </p>

        <div className="vertical-swiper">
          <Swiper
            modules={[Navigation, Pagination]}
            direction="vertical"
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            className="mySwiper"
            style={{ height: '100%' }}
          >
            {datos.map((producto) => (
              <SwiperSlide key={producto.id}>
                <div className="card h-100 shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className="card-body text-center text-white p-4 d-flex flex-column justify-content-center align-items-center">
                    <img 
                      src={producto.thumbnail} 
                      className="img-fluid mb-4 rounded shadow-lg" 
                      alt={producto.title}
                      style={{ 
                        width: '200px', 
                        height: '250px', 
                        objectFit: 'cover',
                        border: '5px solid rgba(255,255,255,0.2)'
                      }}
                    />
                    <h3 className="card-title mb-3 fw-bold">{producto.title}</h3>
                    <p className="fs-2 fw-bold mb-4 text-warning">${producto.price}</p>
                    <div className="mb-3">
                      <span className="badge bg-light text-dark me-2 mb-2">{producto.brand}</span>
                      <span className="badge bg-warning text-dark">⭐ {producto.rating}</span>
                    </div>
                    <button className="btn btn-light btn-lg px-5">Ver Detalles</button>
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
              <strong>Dirección:</strong> <code>direction="vertical"</code> - ¡Lo más importante! [web:1]
            </li>
            <li className="list-group-item">
              <strong>Navegación:</strong> Flechas rotadas 90° a los lados del slider vertical
            </li>
            <li className="list-group-item">
              <strong>Paginación:</strong> Puntos verticales a la derecha del slider
            </li>
            <li className="list-group-item">
              <strong>Diseño:</strong> Estilos CSS locales con <code>&lt;style jsx&gt;</code> [attached_file:1]
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SliderVertical;
