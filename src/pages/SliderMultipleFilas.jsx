import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderMultipleFilas = () => {
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
            <h2 className="mb-4 text-center">Slider Múltiple Filas - Grid Layout</h2>
            <p className="text-center text-muted mb-5">
                Slider con layout de grid de 2 filas, ideal para mostrar múltiples productos simultáneamente.<br />
                Categoría "smartphones" de dummyjson.com.
            </p>

            <div className="py-4">
                <Swiper
                    slidesPerView={2}
                    grid={{
                        rows: 2,
                        fill: 'row'
                    }}
                    spaceBetween={25}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets'
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            grid: { rows: 2, fill: 'row' },
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            grid: { rows: 2, fill: 'row' },
                            spaceBetween: 25
                        },
                        1024: {
                            slidesPerView: 4,
                            grid: { rows: 2, fill: 'row' },
                            spaceBetween: 30
                        },
                        1400: {
                            slidesPerView: 5,
                            grid: { rows: 2, fill: 'row' },
                            spaceBetween: 35
                        }
                    }}
                    modules={[Grid, Navigation, Pagination]}
                    className="mySwiper"
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="card h-100 shadow-sm border-0 transition-all">
                                <div className="card-header p-3 pb-0 border-0 bg-transparent">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 rounded object-fit-cover" 
                                        alt={producto.title}
                                        style={{ height: '150px' }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column p-3">
                                    <h6 className="card-title fw-bold text-truncate small mb-1">{producto.title}</h6>
                                    <p className="card-text text-muted small mb-2">{producto.brand}</p>
                                    
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div className="d-flex align-items-center">
                                            <span className="text-warning small">⭐</span>
                                            <span className="ms-1 fw-semibold small">{producto.rating}</span>
                                        </div>
                                        <span className="text-muted small">Stock: {producto.stock}</span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <p className="card-text text-success fw-bold fs-5 mb-0">
                                                ${producto.price}
                                            </p>
                                            {producto.discountPercentage > 0 && (
                                                <span className="badge bg-danger small">
                                                    -{producto.discountPercentage}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center">
                                                <i className="bi bi-cart-plus me-2"></i>
                                                Agregar
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
                <div className="col-md-6 mb-3">
                    <div className="alert alert-info h-100">
                        <h6 className="alert-heading fw-bold">💡 Ideal para E-commerce</h6>
                        <p className="mb-0 small">Perfecto para mostrar catálogos de productos con alta densidad de información.</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="alert alert-warning h-100">
                        <h6 className="alert-heading fw-bold">📱 Responsive Design</h6>
                        <p className="mb-0 small">Se adapta de 2 a 5 columnas según el tamaño de pantalla.</p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="mb-4">Código clave explicado:</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary">🔧 Configuración Grid</h6>
                                <ul className="list-unstyled small mb-0">
                                    <li><code>grid: &#123; rows: 2, fill: 'row' &#125;</code></li>
                                    <li><code>slidesPerView: 2-5</code></li>
                                    <li><code>spaceBetween: 20-35</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary">🎨 Clases Bootstrap</h6>
                                <ul className="list-unstyled small mb-0">
                                    <li><code>card, shadow-sm, border-0</code></li>
                                    <li><code>d-flex, flex-column</code></li>
                                    <li><code>d-grid, mt-auto</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
                .object-fit-cover {
                    object-fit: cover;
                }
                
                /* Ajustes responsive para móviles */
                @media (max-width: 768px) {
                    .card-body {
                        padding: 0.75rem !important;
                    }
                    .card-header img {
                        height: 120px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderMultipleFilas;