import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderCards = () => {
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
        <div className="container my-5">
            <h2 className="mb-4 text-center">Slider Tipo Cards</h2>
            <p className="text-center text-muted mb-5">
                Diseño de cards moderno con efectos hover y información organizada.<br />
                Categoría "smartphones" de dummyjson.com.
            </p>

            <div className="py-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets'
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        320: {  // 📱 Móvil pequeño
                            slidesPerView: 1,
                            spaceBetween: 15
                        },
                        576: {  // 📱 Móvil grande
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {  // 📟 Tablet
                            slidesPerView: 3,
                            spaceBetween: 25
                        },
                        992: {  // 💻 Laptop
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        1200: { // 🖥️ Desktop grande
                            slidesPerView: 5,
                            spaceBetween: 35
                        },
                        1400: { // 🖥️ Desktop extra grande
                            slidesPerView: 6,
                            spaceBetween: 40
                        }
                    }}
                    className="mySwiper"
                    style={{height: 'auto', minHeight: '550px'}}
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="card shadow-sm h-100 transition-all card-hover">
                                <div className="card-header p-0 position-relative border-0 bg-transparent">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 card-img-top" 
                                        alt={producto.title}
                                        style={{ height: '180px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute top-0 start-0 m-2">
                                        <span className="badge bg-primary fs-7">{producto.brand}</span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-success fs-7">⭐ {producto.rating}</span>
                                    </div>
                                    {producto.discountPercentage > 0 && (
                                        <div className="position-absolute bottom-0 end-0 m-2">
                                            <span className="badge bg-danger fs-7">
                                                -{producto.discountPercentage}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body d-flex flex-column p-3">
                                    <h6 className="card-title fw-bold text-dark mb-2 small">{producto.title}</h6>
                                    <p className="card-text text-muted small mb-2 line-clamp-2">
                                        {producto.description}
                                    </p>
                                    
                                    <div className="mb-2">
                                        <div className="d-flex align-items-center mb-1">
                                            <span className="text-warning small me-1">📱</span>
                                            <span className="text-muted small">{producto.category}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="text-success small me-1">📦</span>
                                            <span className="text-muted small">Stock: {producto.stock}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="text-success fw-bold fs-5">${producto.price}</span>
                                            {producto.discountPercentage > 0 && (
                                                <span className="text-decoration-line-through text-muted small">
                                                    ${(producto.price / (1 - producto.discountPercentage / 100)).toFixed(0)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="d-grid gap-1">
                                            <button className="btn btn-primary btn-sm py-1">
                                                <i className="bi bi-cart-plus me-1"></i>
                                                Carrito
                                            </button>
                                            <button className="btn btn-outline-secondary btn-sm py-1">
                                                <i className="bi bi-eye me-1"></i>
                                                Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="row mt-4">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <div className="text-primary mb-2">🎨</div>
                            <h6 className="card-title fw-bold">Diseño Responsive</h6>
                            <p className="card-text small mb-0">
                                Se adapta perfectamente desde móviles (1 card) hasta desktop (6 cards).
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <div className="text-success mb-2">⚡</div>
                            <h6 className="card-title fw-bold">Optimizado Móvil</h6>
                            <p className="card-text small mb-0">
                                Textos más compactos y botones optimizados para pantallas pequeñas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-body-tertiary h-100">
                        <div className="card-body text-center">
                            <div className="text-warning mb-2">📱</div>
                            <h6 className="card-title fw-bold">Breakpoints Mejorados</h6>
                            <p className="card-text small mb-0">
                                320px, 576px, 768px, 992px, 1200px, 1400px para mejor adaptación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="mb-4">Código clave explicado:</h4>
                <div className="row g-3">
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary small">📱 Móvil</h6>
                                <code className="small d-block">320px: 1 card</code>
                                <code className="small d-block">576px: 2 cards</code>
                                <code className="small d-block">Espaciado: 15-20px</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary small">📟 Tablet</h6>
                                <code className="small d-block">768px: 3 cards</code>
                                <code className="small d-block">Espaciado: 25px</code>
                                <code className="small d-block">Altura automática</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary small">💻 Desktop</h6>
                                <code className="small d-block">992px: 4 cards</code>
                                <code className="small d-block">1200px: 5 cards</code>
                                <code className="small d-block">1400px: 6 cards</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary small">🎨 Optimizaciones</h6>
                                <code className="small d-block">Texto: small</code>
                                <code className="small d-block">Botones: py-1</code>
                                <code className="small d-block">Imágenes: 180px</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .card-hover:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .fs-7 {
                    font-size: 0.7rem;
                }

                /* Ajustes específicos para móviles */
                @media (max-width: 576px) {
                    .card-header img {
                        height: 150px !important;
                    }
                    .card-body {
                        padding: 0.75rem !important;
                    }
                    .btn-sm {
                        padding: 0.3rem 0.6rem !important;
                        font-size: 0.75rem !important;
                    }
                    .fs-5 {
                        font-size: 1.1rem !important;
                    }
                }

                /* Ajustes para tablets */
                @media (max-width: 768px) and (min-width: 577px) {
                    .card-header img {
                        height: 160px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderCards;