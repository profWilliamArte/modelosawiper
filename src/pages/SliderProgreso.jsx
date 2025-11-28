import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/home-decoration';

const SliderProgreso = () => {
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
                <p>Cargando productos de decoración...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los productos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Slider con Barra de Progreso</h2>
            <p className="text-center text-muted mb-5">
                Slider con barra de progreso visual para autoplay y navegación intuitiva.<br />
                Categoría "home-decoration" de dummyjson.com.
            </p>

            <div className="position-relative">
                {/* Barra de progreso personalizada */}
                <div className="progress-container mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small">Progreso automático</span>
                        <span className="text-muted small" id="slide-counter">
                            Slide 1 de {datos.length}
                        </span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                        <div 
                            className="progress-bar progress-bar-striped progress-bar-animated" 
                            role="progressbar"
                            id="autoplay-progress"
                            style={{ width: '0%' }}
                            aria-valuenow="0" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        type: 'progressbar'
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    onAutoplayTimeLeft={(swiper, time, progress) => {
                        document.getElementById('autoplay-progress').style.width = `${progress * 100}%`;
                    }}
                    onSlideChange={(swiper) => {
                        document.getElementById('slide-counter').textContent = 
                            `Slide ${swiper.realIndex + 1} de ${datos.length}`;
                    }}
                    breakpoints={{
                        576: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className="mySwiper"
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="card border-0 shadow-sm h-100 transition-all">
                                <div className="card-header p-0 position-relative border-0 bg-transparent">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 card-img-top" 
                                        alt={producto.title}
                                        style={{ height: '220px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute top-0 start-0 m-2">
                                        <span className="badge bg-primary">{producto.brand}</span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-warning text-dark">⭐ {producto.rating}</span>
                                    </div>
                                    {producto.discountPercentage > 0 && (
                                        <div className="position-absolute bottom-0 end-0 m-2">
                                            <span className="badge bg-danger">
                                                -{Math.round(producto.discountPercentage)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-dark mb-2">{producto.title}</h5>
                                    <p className="card-text text-muted small mb-3 line-clamp-2">
                                        {producto.description}
                                    </p>
                                    
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center small text-muted mb-2">
                                            <span>🛋️ {producto.category}</span>
                                            <span>📦 {producto.stock} disponibles</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="text-success fw-bold fs-4">
                                                ${producto.price}
                                            </span>
                                            {producto.discountPercentage > 0 && (
                                                <span className="text-decoration-line-through text-muted">
                                                    ${(producto.price / (1 - producto.discountPercentage / 100)).toFixed(0)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary btn-sm">
                                                <i className="bi bi-cart-plus me-2"></i>
                                                Agregar al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Controles adicionales */}
                <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                    <button 
                        className="btn btn-outline-primary btn-sm" 
                        id="pause-autoplay"
                        onClick={() => {
                            const swiper = document.querySelector('.mySwiper').swiper;
                            swiper.autoplay.paused ? swiper.autoplay.resume() : swiper.autoplay.pause();
                            document.getElementById('pause-autoplay').innerHTML = 
                                swiper.autoplay.paused ? 
                                '<i className="bi bi-play-fill me-1"></i> Reanudar' : 
                                '<i className="bi bi-pause-fill me-1"></i> Pausar';
                        }}
                    >
                        <i className="bi bi-pause-fill me-1"></i>
                        Pausar
                    </button>
                    
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                            document.querySelector('.mySwiper').swiper.autoplay.stop();
                            document.getElementById('autoplay-progress').style.width = '0%';
                        }}
                    >
                        <i className="bi bi-stop-fill me-1"></i>
                        Detener
                    </button>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">⏱️ Barra de Progreso</h6>
                            <p className="card-text small mb-2">
                                Muestra visualmente el tiempo restante para el siguiente slide automático.
                            </p>
                            <code className="small">onAutoplayTimeLeft</code>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">🎮 Controles Interactivos</h6>
                            <p className="card-text small mb-2">
                                Botones para pausar, reanudar y detener la reproducción automática.
                            </p>
                            <code className="small">autoplay.pause() / resume()</code>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="mb-4">Código clave explicado:</h4>
                <div className="row g-3">
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">🔧 Eventos</h6>
                                <code className="small d-block">onAutoplayTimeLeft</code>
                                <code className="small d-block">onSlideChange</code>
                                <code className="small d-block">progress * 100</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">🎯 Autoplay</h6>
                                <code className="small d-block">delay: 5000</code>
                                <code className="small d-block">disableOnInteraction: false</code>
                                <code className="small d-block">autoplay.pause/resume</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">📊 Progreso</h6>
                                <code className="small d-block">progress-bar-striped</code>
                                <code className="small d-block">progress-bar-animated</code>
                                <code className="small d-block">style.width: progress%</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .progress-container {
                    background: #323538ff;
                    padding: 15px;
                    border-radius: 10px;
                    border: 1px solid #4b5055ff;
                }
                
                /* Efectos hover para cards */
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                }

                /* Animación suave para la barra de progreso */
                .progress-bar {
                    transition: width 0.1s linear;
                }

                /* Ajustes responsive */
                @media (max-width: 768px) {
                    .card-header img {
                        height: 180px !important;
                    }
                    .progress-container {
                        padding: 10px;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderProgreso;