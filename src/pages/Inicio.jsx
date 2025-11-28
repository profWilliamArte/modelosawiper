import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const Inicio = () => {
  const [stats, setStats] = useState({ downloads: 0, projects: 0, stars: 0 });

  useEffect(() => {
    // Simulación de stats (puedes conectar con API real)
    const interval = setInterval(() => {
      setStats({
        downloads: 2500000 + Math.floor(Math.random() * 10000),
        projects: 1000000 + Math.floor(Math.random() * 5000),
        stars: 38000 + Math.floor(Math.random() * 100),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4 text-primary">
            Swiper <span className="text-warning">React</span>
          </h1>
          <p className="lead mb-4">
            La librería de sliders más moderna, ligera y potente para React. 
            Com más descargas semanales.
          </p>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <Link to="/sliderbasicohorizontal" className="btn btn-primary btn-lg px-5">
              Ver Ejemplos →
            </Link>
            <a href="https://swiperjs.com/react" target="_blank" rel="noopener" className="btn btn-outline-primary btn-lg px-5">
              Docs Oficiales
            </a>
          </div>
        </div>

      </div>



      {/* ¿Qué es Swiper? */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <h2 className="text-center mb-5">¿Qué es Swiper?</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">
                    <i className="bi bi-speedometer2 me-2"></i>Moderna & Rápida
                  </h5>
                  <p className="card-text">
                    Construida con las últimas tecnologías web. Soporta <strong>Hardware Acceleration</strong> 
                    y es <strong>ligera</strong> (solo 30KB min+gzip) [web:1].
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-success">
                    <i className="bi bi-phone me-2"></i>Touch & Gestures
                  </h5>
                  <p className="card-text">
                    Navegación táctil nativa con gestos avanzados: swipe, drag, pinch-to-zoom.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-info">
                    <i className="bi bi-laptop me-2"></i>React Nativo
                  </h5>
                  <p className="card-text">
                    Componentes React oficiales. <strong>Zero dependencies</strong> excepto React.
                    Hooks y TypeScript incluidos [web:1].
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-warning">
                    <i className="bi bi-collection me-2"></i>+50 Efectos
                  </h5>
                  <p className="card-text">
                    Fade, vertical, thumbs, zoom, 3D cube, coverflow y mucho más.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instalación */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <h2 className="text-center mb-5">🚀 Instalación en 1 minuto</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <pre className="bg-dark text-light p-4 rounded-3 shadow-lg">
                <code>{`npm install swiper

// O yarn
yarn add swiper`}</code>
              </pre>
              <div className="mt-4 p-4 bg-light rounded-3">
                <h6 className="fw-bold mb-3">Import básico:</h6>
                <code>{`import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';`}</code>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="alert alert-success shadow-lg">
                <h5>¡Listo! 🎉</h5>
                <p className="mb-2">Ya puedes crear sliders profesionales</p>
                <Link to="/sliderbasicohorizontal" className="btn btn-success">
                  Primer Slider →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu rápido */}
      <div className="text-center">
        <h3 className="mb-4">Explora todos los ejemplos:</h3>
        <div className="row g-3 justify-content-center">
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderbasicohorizontal" className="btn btn-outline-primary w-100 h-100 p-3 text-start">
              <i className="bi bi-arrow-right-circle fs-4 d-block mb-2"></i>
              1. Básico Horizontal
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderpaginacionautoplay" className="btn btn-outline-success w-100 h-100 p-3 text-start">
              <i className="bi bi-stop-circle fs-4 d-block mb-2"></i>
              2. Paginación + Autoplay
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/slidervertical" className="btn btn-outline-info w-100 h-100 p-3 text-start">
              <i className="bi bi-arrow-up-circle fs-4 d-block mb-2"></i>
              3. Vertical
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderfade" className="btn btn-outline-warning w-100 h-100 p-3 text-start">
              <i className="bi bi-lightning-charge fs-4 d-block mb-2"></i>
              4. Efecto Fade
            </Link>
          </div>
        </div>
        <div className="row g-3 justify-content-center mt-3">
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderzoomlightbox" className="btn btn-outline-danger w-100 h-100 p-3 text-start">
              <i className="bi bi-zoom-in fs-4 d-block mb-2"></i>
              5. Zoom/Lightbox
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderthumbnails" className="btn btn-outline-secondary w-100 h-100 p-3 text-start">
              <i className="bi bi-images fs-4 d-block mb-2"></i>
              6. Thumbnails
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/sliderscrollbar" className="btn btn-outline-dark w-100 h-100 p-3 text-start">
              <i className="bi bi-scrollbar fs-4 d-block mb-2"></i>
              7. Scrollbar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
