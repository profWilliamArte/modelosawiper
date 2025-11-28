import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/furniture';

const SliderFade = () => {
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
        <p>Cargando muebles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los muebles</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Slider con Efecto Fade - Muebles</h2>
      <p className="text-center text-muted mb-5">
        Ejemplo de Swiper con efecto fade para transiciones suaves<br />
        Productos de la categoría "furniture" desde dummyjson.com.
      </p>
    <div className="col-md-6 offset-3">

 
      <Swiper
        modules={[EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        className="mySwiper"
        style={{ height: '500px' }}
      >
        {datos.map((producto) => (
          <SwiperSlide key={producto.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={producto.thumbnail}
                alt={producto.title}
                className="img-fluid"
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
   </div>
      <div className="mt-5">
        <h4>Código clave explicado:</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Módulos:</strong> <code>EffectFade</code>, <code>Pagination</code> y <code>Navigation</code> [web:1]
          </li>
          <li className="list-group-item">
            <strong>Efecto:</strong> <code>effect="fade"</code> con <code>crossFade: true</code> para transición suave
          </li>
          <li className="list-group-item">
            <strong>Configuración:</strong> paginación clickeable y navegación por flechas
          </li>
          <li className="list-group-item">
            <strong>Datos:</strong> Productos "furniture" vía API dummyjson.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SliderFade;
