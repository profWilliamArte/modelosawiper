import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/sunglasses';

const SliderEfectoCubo = () => {
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
                <p>Cargando gafas de sol...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar las gafas de sol</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Slider Efecto Cubo 3D</h2>
            <p className="text-center text-muted mb-5">
                Efecto 3D tipo cubo con rotación espacial y perspectivas dinámicas.<br />
                Categoría "sunglasses" de dummyjson.com.
            </p>

            <div className="d-flex justify-content-center align-items-center min-vh-50 py-4">
                <div className="w-100" style={{ maxWidth: '500px' }}>
                    <Swiper
                        effect={'cube'}
                        grabCursor={true}
                        cubeEffect={{
                            shadow: true,
                            slideShadows: true,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        navigation={true}
                        loop={true}
                        modules={[EffectCube, Pagination, Navigation]}
                        className="mySwiper"
                        style={{ height: '400px' }}
                    >
                        {datos.map((producto) => (
                            <SwiperSlide key={producto.id}>
                                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                    <div className="card border-0 text-white text-center w-100 h-100" 
                                         style={{
                                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                             borderRadius: '20px',
                                             boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                         }}>
                                        <div className="card-body d-flex flex-column justify-content-between p-4">
                                            {/* Imagen del producto */}
                                            <div className="position-relative">
                                                <img 
                                                    src={producto.thumbnail} 
                                                    className="img-fluid rounded shadow" 
                                                    alt={producto.title}
                                                    style={{
                                                        width: '200px',
                                                        height: '150px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <span className="position-absolute top-0 end-0 badge bg-danger fs-6">
                                                    Nuevo
                                                </span>
                                            </div>

                                            {/* Información del producto */}
                                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                                <h3 className="card-title fw-bold mb-2 fs-5 text-shadow">
                                                    {producto.title}
                                                </h3>
                                                <p className="card-text text-white-50 mb-2 fs-6">
                                                    {producto.brand}
                                                </p>
                                                <div className="mb-3">
                                                    <span className="text-warning fs-6">
                                                        {"⭐".repeat(Math.floor(producto.rating))}
                                                    </span>
                                                    <span className="text-white-50 ms-2 fs-6">
                                                        ({producto.rating})
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <span className="fw-bold fs-3 text-shadow">
                                                        ${producto.price}
                                                    </span>
                                                    {producto.discountPercentage && (
                                                        <span className="badge bg-danger ms-2 fs-6">
                                                            -{producto.discountPercentage}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Botón de acción */}
                                            <button className="btn btn-outline-light border-2 px-4 py-2 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.2)',
                                                        backdropFilter: 'blur(10px)'
                                                    }}>
                                                <span>🛒</span>
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-8 mx-auto">
                    <div className="alert alert-info text-center">
                        <h6 className="alert-heading">🎮 Controles Interactivos</h6>
                        <p className="mb-0">
                            Usa las flechas de navegación, arrastra con el mouse o desliza con el dedo para rotar el cubo 3D.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4>Código clave explicado:</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>Módulo Cube:</strong> <code>EffectCube</code> para el efecto 3D de cubo
                    </li>
                    <li className="list-group-item">
                        <strong>Configuración Cube:</strong> 
                        <code>cubeEffect: &#123; shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 &#125;</code>
                    </li>
                    <li className="list-group-item">
                        <strong>Clases Bootstrap:</strong> <code>d-flex, justify-content-center, align-items-center, card, btn, etc.</code>
                    </li>
                    <li className="list-group-item">
                        <strong>Layout responsive:</strong> <code>w-100, h-100, min-vh-50</code> para adaptabilidad
                    </li>
                    <li className="list-group-item">
                        <strong>Estilos inline:</strong> Solo para propiedades específicas no cubiertas por Bootstrap
                    </li>
                </ul>
            </div>

            <style jsx>{`
                .min-vh-50 {
                    min-height: 50vh;
                }
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                /* Efectos específicos del cubo de Swiper */
                .swiper-cube .swiper-slide {
                    pointer-events: none;
                    backface-visibility: hidden;
                    z-index: 1;
                    opacity: 0;
                }
                .swiper-cube .swiper-slide-active,
                .swiper-cube .swiper-slide-next,
                .swiper-cube .swiper-slide-prev {
                    pointer-events: auto;
                    opacity: 1;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .swiper {
                        height: 350px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderEfectoCubo;