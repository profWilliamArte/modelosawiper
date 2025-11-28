import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderCentrado = () => {
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
            <h2 className="mb-4 text-center">Slider Centrado - Efecto Coverflow</h2>
            <p className="text-center text-muted mb-5">
                Slider con efecto coverflow, slides centrados y perspectiva 3D.<br />
                Categoría "smartphones" de dummyjson.com.
            </p>

            <div className="py-5">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    loop={true}
                    modules={[EffectCoverflow, Navigation, Pagination]}
                    className="mySwiper"
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id} style={{ width: '320px' }}>
                            <div className="card shadow-lg border-0 mx-auto transition-all h-100" style={{ maxWidth: '320px' }}>
                                <div className="card-header p-0 position-relative border-0">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 object-fit-cover" 
                                        alt={producto.title}
                                        style={{ height: '250px' }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-danger fs-6">🔥</span>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold text-truncate">{producto.title}</h5>
                                    <p className="card-text text-muted mb-2 small">{producto.brand}</p>
                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <span className="text-warning me-1">⭐</span>
                                        <span className="fw-semibold">{producto.rating}</span>
                                        <span className="text-muted small ms-2">({producto.reviews?.length || 0} reviews)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <span className="text-success fw-bold fs-4">${producto.price}</span>
                                        {producto.discountPercentage > 0 && (
                                            <span className="badge bg-success small">
                                                -{producto.discountPercentage}%
                                            </span>
                                        )}
                                    </div>
                                    <button className="btn btn-primary btn-lg w-100">
                                        Comprar Ahora
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-black">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">🎯 Efecto Coverflow</h6>
                            <p className="card-text small mb-0">
                                Slides laterales con perspectiva 3D y transiciones fluidas que crean un efecto de carrusel inmersivo.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-black">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">⚡ Interactividad</h6>
                            <p className="card-text small mb-0">
                                Navegación táctil, cursor de agarre y controles intuitivos para una experiencia de usuario optimizada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="mb-4">Código clave explicado:</h4>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success">🔧 Módulos</h6>
                                <code className="small">EffectCoverflow, Navigation, Pagination</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success">🎨 Configuración</h6>
                                <code className="small">effect: 'coverflow'<br/>centeredSlides: true<br/>slidesPerView: 'auto'</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success">📱 Responsive</h6>
                                <code className="small">width: 320px<br/>mx-auto<br/>object-fit-cover</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .object-fit-cover {
                    object-fit: cover;
                }
                
                /* Efectos específicos de Coverflow */
                .swiper-slide {
                    transition: all 0.3s ease !important;
                }
                .swiper-slide-active {
                    transform: scale(1.05);
                    z-index: 2;
                }
                .swiper-slide-prev,
                .swiper-slide-next {
                    opacity: 0.7;
                }
                .card:hover {
                    transform: translateY(-5px);
                }

                /* Ajustes responsive */
                @media (max-width: 768px) {
                    .py-5 {
                        padding: 2rem 0 !important;
                    }
                    .swiper-slide {
                        width: 280px !important;
                    }
                    .card {
                        max-width: 280px !important;
                    }
                    .card-header img {
                        height: 200px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderCentrado;