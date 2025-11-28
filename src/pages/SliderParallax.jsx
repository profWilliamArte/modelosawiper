import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/home-decoration';

const SliderParallax = () => {
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
            <h2 className="mb-4 text-center">Slider con Efecto Parallax</h2>
            <p className="text-center text-muted mb-5">
                Efecto parallax real donde los elementos se mueven a diferentes velocidades creando profundidad.<br />
                Categoría "home-decoration" de dummyjson.com.
            </p>

            <div className="parallax-container rounded-4 overflow-hidden shadow-lg position-relative">
                <Swiper
                    speed={1000}
                    parallax={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets'
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[Navigation, Pagination, Parallax, Autoplay]}
                    className="mySwiper parallax-swiper h-100"
                >
                    {/* Fondo parallax que se mueve más lento */}
                    <div 
                        slot="container-start" 
                        className="parallax-bg" 
                        data-swiper-parallax="-30%"
                        style={{
                            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '140%',
                            height: '120%',
                            zIndex: -1
                        }}
                    ></div>

                    {datos.slice(0, 5).map((producto, index) => (
                        <SwiperSlide key={producto.id}>
                            <div className="slide-content h-100 d-flex align-items-center position-relative">
                                <div className="container">
                                    <div className="row align-items-center min-vh-60 py-5">
                                        {/* Columna de imagen - se mueve más lento */}
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                            <div className="image-container position-relative">
                                                <div 
                                                    data-swiper-parallax="-400"
                                                    data-swiper-parallax-duration="1200"
                                                >
                                                    <img 
                                                        src={producto.thumbnail} 
                                                        className="img-fluid rounded-3 shadow-lg parallax-image"
                                                        alt={producto.title}
                                                        style={{ 
                                                            maxHeight: '400px',
                                                            width: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </div>
                                                {/* Badges que se mueven a diferente velocidad */}
                                                <div 
                                                    className="position-absolute top-0 start-0 m-3"
                                                    data-swiper-parallax="-200"
                                                    data-swiper-parallax-duration="1000"
                                                >
                                                    <span className="badge bg-primary px-3 py-2">
                                                        {producto.brand}
                                                    </span>
                                                </div>
                                                {producto.discountPercentage > 0 && (
                                                    <div 
                                                        className="position-absolute top-0 end-0 m-3"
                                                        data-swiper-parallax="-150"
                                                        data-swiper-parallax-duration="900"
                                                    >
                                                        <span className="badge bg-danger px-3 py-2">
                                                            -{Math.round(producto.discountPercentage)}% OFF
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Columna de texto - se mueve más rápido */}
                                        <div className="col-lg-6">
                                            <div className="text-content text-white">
                                                {/* Título - velocidad media */}
                                                <div
                                                    data-swiper-parallax="-300"
                                                    data-swiper-parallax-duration="800"
                                                >
                                                    <h1 className="display-4 fw-bold mb-4 parallax-title">
                                                        {producto.title}
                                                    </h1>
                                                </div>
                                                
                                                {/* Descripción - velocidad más rápida */}
                                                <div
                                                    data-swiper-parallax="-200"
                                                    data-swiper-parallax-duration="600"
                                                >
                                                    <p className="lead mb-4 parallax-description opacity-75">
                                                        {producto.description}
                                                    </p>
                                                </div>

                                                {/* Información del producto - velocidad rápida */}
                                                <div
                                                    data-swiper-parallax="-100"
                                                    data-swiper-parallax-duration="500"
                                                >
                                                    <div className="product-info mb-4">
                                                        <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                                                            <div className="d-flex align-items-center">
                                                                <span className="text-warning fs-4 me-2">⭐</span>
                                                                <span className="fs-5 fw-semibold">{producto.rating}/5</span>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <span className="text-white-50 fs-4 me-2">📦</span>
                                                                <span className="text-white-50">{producto.stock} disponibles</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Precio - velocidad media-rápida */}
                                                <div
                                                    data-swiper-parallax="-150"
                                                    data-swiper-parallax-duration="700"
                                                >
                                                    <div className="price-section mb-4">
                                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                                            <span className="text-success fw-bold display-4">
                                                                ${producto.price}
                                                            </span>
                                                            {producto.discountPercentage > 0 && (
                                                                <span className="text-decoration-line-through text-white-50 fs-3">
                                                                    ${(producto.price / (1 - producto.discountPercentage / 100)).toFixed(0)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Botones - velocidad más rápida */}
                                                <div
                                                    data-swiper-parallax="-50"
                                                    data-swiper-parallax-duration="400"
                                                >
                                                    <div className="cta-buttons">
                                                        <div className="d-flex flex-wrap gap-3">
                                                            <button className="btn btn-light btn-lg px-4 py-3 fw-bold shadow">
                                                                <i className="bi bi-cart-plus me-2"></i>
                                                                Comprar Ahora
                                                            </button>
                                                            <button className="btn btn-outline-light btn-lg px-4 py-3 border-2">
                                                                <i className="bi bi-info-circle me-2"></i>
                                                                Más Info
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="row mt-5">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title fw-bold text-primary">🐌 Fondo Lento</h6>
                            <p className="card-text small mb-0">
                                -30% de parallax - se mueve muy lentamente
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title fw-bold text-primary">🚶 Imagen Media</h6>
                            <p className="card-text small mb-0">
                                -400px de parallax - velocidad media
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <h6 className="card-title fw-bold text-primary">🏃 Texto Rápido</h6>
                            <p className="card-text small mb-0">
                                -50px a -300px - diferentes velocidades
                            </p>
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
                                <h6 className="card-title fw-bold text-success small">🎯 Velocidades Diferentes</h6>
                                <code className="small d-block">Fondo: -30%</code>
                                <code className="small d-block">Imagen: -400px</code>
                                <code className="small d-block">Título: -300px</code>
                                <code className="small d-block">Botones: -50px</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">⏱️ Duración Variable</h6>
                                <code className="small d-block">Imagen: 1200ms</code>
                                <code className="small d-block">Título: 800ms</code>
                                <code className="small d-block">Descripción: 600ms</code>
                                <code className="small d-block">Botones: 400ms</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">🔧 Configuración</h6>
                                <code className="small d-block">speed: 1000</code>
                                <code className="small d-block">parallax: true</code>
                                <code className="small d-block">slot="container-start"</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .parallax-container {
                    height: 700px;
                    background: transparent;
                }
                .parallax-swiper {
                    background: transparent;
                }
                .min-vh-60 {
                    min-height: 60vh;
                }
                .slide-content {
                    position: relative;
                    z-index: 2;
                }
                .parallax-bg {
                    filter: brightness(0.8);
                }
                .text-content {
                    text-shadow: 0 2px 15px rgba(0,0,0,0.5);
                }
                .parallax-image {
                    transition: all 0.3s ease;
                    border: 3px solid rgba(255,255,255,0.1);
                }

                /* Efecto hover adicional */
                .image-container:hover .parallax-image {
                    transform: scale(1.02);
                    border-color: rgba(255,255,255,0.3);
                }

                /* Ajustes responsive */
                @media (max-width: 992px) {
                    .parallax-container {
                        height: 800px;
                    }
                    .display-4 {
                        font-size: 2.5rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .parallax-container {
                        height: 900px;
                    }
                    .display-4 {
                        font-size: 2rem !important;
                    }
                    .btn-lg {
                        padding: 0.75rem 1.5rem !important;
                    }
                }

                @media (max-width: 576px) {
                    .parallax-container {
                        height: 1000px;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderParallax;