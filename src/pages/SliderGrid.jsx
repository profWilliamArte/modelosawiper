import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products';

const SliderGrid = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(2);
    const [fillType, setFillType] = useState('row');

    const getDatos = async () => {
        try {
            const response = await fetch(`${API}?limit=20`);
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
                <p>Cargando productos...</p>
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
            <h2 className="mb-4 text-center">Slider en Grid</h2>
            <p className="text-center text-muted mb-5">
                Layout de grid con múltiples filas y columnas para máxima densidad de contenido.<br />
                Productos variados de dummyjson.com.
            </p>

            {/* Controles del Grid */}
            <div className="card border-0 bg-light mb-4">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h6 className="fw-bold mb-3">⚙️ Configuración del Grid</h6>
                            <div className="d-flex flex-wrap gap-3 align-items-center">
                                <div>
                                    <label className="form-label small fw-bold">Filas:</label>
                                    <select 
                                        className="form-select form-select-sm"
                                        value={rows}
                                        onChange={(e) => setRows(parseInt(e.target.value))}
                                        style={{width: '80px'}}
                                    >
                                        <option value={1}>1 Fila</option>
                                        <option value={2}>2 Filas</option>
                                        <option value={3}>3 Filas</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label small fw-bold">Llenado:</label>
                                    <select 
                                        className="form-select form-select-sm"
                                        value={fillType}
                                        onChange={(e) => setFillType(e.target.value)}
                                        style={{width: '120px'}}
                                    >
                                        <option value="row">Por Filas</option>
                                        <option value="column">Por Columnas</option>
                                    </select>
                                </div>
                                <div className="badge bg-primary fs-6">
                                    {rows === 1 ? '4-6-8' : rows === 2 ? '2-3-4' : '2-3-4'} columnas
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end">
                                <span className="badge bg-success fs-6 me-2">
                                    {rows * (rows === 1 ? 4 : rows === 2 ? 3 : 2)} productos visibles
                                </span>
                                <span className="badge bg-info fs-6">
                                    Total: {datos.length} productos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Grid */}
            <div className="grid-slider-container">
                <Swiper
                    modules={[Grid, Navigation, Pagination]}
                    grid={{
                        rows: rows,
                        fill: fillType
                    }}
                    spaceBetween={20}
                    slidesPerView={rows === 1 ? 4 : rows === 2 ? 3 : 2}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets'
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: rows === 1 ? 1 : rows === 2 ? 1 : 1,
                            grid: { rows: rows, fill: fillType },
                            spaceBetween: 15
                        },
                        576: {
                            slidesPerView: rows === 1 ? 2 : rows === 2 ? 2 : 1,
                            grid: { rows: rows, fill: fillType },
                            spaceBetween: 18
                        },
                        768: {
                            slidesPerView: rows === 1 ? 3 : rows === 2 ? 2 : 2,
                            grid: { rows: rows, fill: fillType },
                            spaceBetween: 20
                        },
                        992: {
                            slidesPerView: rows === 1 ? 4 : rows === 2 ? 3 : 3,
                            grid: { rows: rows, fill: fillType },
                            spaceBetween: 22
                        },
                        1200: {
                            slidesPerView: rows === 1 ? 6 : rows === 2 ? 4 : 4,
                            grid: { rows: rows, fill: fillType },
                            spaceBetween: 25
                        }
                    }}
                    className="mySwiper grid-swiper"
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="card grid-card h-100 border-0 shadow-sm transition-all">
                                <div className="card-header p-0 position-relative border-0 bg-transparent">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 grid-image" 
                                        alt={producto.title}
                                    />
                                    <div className="position-absolute top-0 start-0 m-1">
                                        <span className="badge bg-primary small">{producto.brand}</span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-1">
                                        <span className="badge bg-warning text-dark small">⭐ {producto.rating}</span>
                                    </div>
                                    {producto.discountPercentage > 0 && (
                                        <div className="position-absolute bottom-0 end-0 m-1">
                                            <span className="badge bg-danger small">
                                                -{Math.round(producto.discountPercentage)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body d-flex flex-column p-2">
                                    <h6 className="card-title fw-bold text-dark small mb-1 text-truncate">
                                        {producto.title}
                                    </h6>
                                    <p className="card-text text-muted x-small mb-2 line-clamp-2">
                                        {producto.description}
                                    </p>
                                    
                                    <div className="product-meta mb-2">
                                        <div className="d-flex justify-content-between align-items-center x-small text-muted">
                                            <span>📦 {producto.stock}</span>
                                            <span>{producto.category}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="text-success fw-bold small">
                                                ${producto.price}
                                            </span>
                                            {producto.discountPercentage > 0 && (
                                                <span className="text-decoration-line-through text-muted x-small">
                                                    ${(producto.price / (1 - producto.discountPercentage / 100)).toFixed(0)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-sm py-1">
                                                <i className="bi bi-cart-plus me-1"></i>
                                                Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Información del Grid */}
            <div className="row mt-4">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-light h-100">
                        <div className="card-body text-center">
                            <div className="text-primary mb-2">📊</div>
                            <h6 className="card-title fw-bold">Alta Densidad</h6>
                            <p className="card-text small mb-0">
                                Hasta {rows === 1 ? 6 : rows === 2 ? 8 : 12} productos visibles simultáneamente.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-light h-100">
                        <div className="card-body text-center">
                            <div className="text-success mb-2">🔄</div>
                            <h6 className="card-title fw-bold">Fill Dinámico</h6>
                            <p className="card-text small mb-0">
                                Llenado por filas o columnas según preferencia.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-0 bg-light h-100">
                        <div className="card-body text-center">
                            <div className="text-warning mb-2">📱</div>
                            <h6 className="card-title fw-bold">Responsive Avanzado</h6>
                            <p className="card-text small mb-0">
                                Se adapta de 1 a 6 columnas según dispositivo.
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
                                <h6 className="card-title fw-bold text-success small">🔧 Módulo Grid</h6>
                                <code className="small d-block">Grid</code>
                                <code className="small d-block">rows: {rows}</code>
                                <code className="small d-block">fill: '{fillType}'</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">📐 Configuración</h6>
                                <code className="small d-block">1 fila: 4-6 slides</code>
                                <code className="small d-block">2 filas: 2-4 slides</code>
                                <code className="small d-block">3 filas: 2-4 slides</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">📱 Breakpoints</h6>
                                <code className="small d-block">320px: 1 columna</code>
                                <code className="small d-block">768px: 2-3 cols</code>
                                <code className="small d-block">1200px: 4-6 cols</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">🎨 Diseño</h6>
                                <code className="small d-block">Cards compactas</code>
                                <code className="small d-block">Texto pequeño</code>
                                <code className="small d-block">Espaciado optimizado</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .grid-slider-container {
                    padding: 10px 5px;
                }
                .grid-swiper {
                    padding: 10px 0;
                }
                .grid-card {
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                .grid-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important;
                }
                .grid-image {
                    height: 120px;
                    object-fit: cover;
                    border-radius: 6px 6px 0 0;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .x-small {
                    font-size: 0.7rem;
                }
                .small {
                    font-size: 0.8rem;
                }

                /* Ajustes específicos para diferentes configuraciones de grid */
                .swiper-slide {
                    height: auto;
                }

                /* Mejora la visualización en móviles */
                @media (max-width: 576px) {
                    .grid-image {
                        height: 100px;
                    }
                    .card-body {
                        padding: 0.5rem !important;
                    }
                    .btn-sm {
                        padding: 0.25rem 0.5rem;
                        font-size: 0.7rem;
                    }
                }

                /* Optimización para tablets */
                @media (max-width: 768px) and (min-width: 577px) {
                    .grid-image {
                        height: 110px;
                    }
                }
            `}</style>
        </div>
    )
}

export default SliderGrid;