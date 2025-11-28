import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState, useRef } from 'react';

const API = 'https://dummyjson.com/products/category/smartphones';

const SliderManipulacion = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [customProgress, setCustomProgress] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const swiperRef = useRef(null);
    const progressInterval = useRef(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);
            setTotalSlides(data.products.length);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Efecto para el progreso automático personalizado
    useEffect(() => {
        if (swiperRef.current) {
            progressInterval.current = setInterval(() => {
                setCustomProgress(prev => {
                    if (prev >= 100) {
                        if (swiperRef.current) {
                            swiperRef.current.swiper.slideNext();
                        }
                        return 0;
                    }
                    return prev + 1;
                });
            }, 50);
        }

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, []);

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.realIndex);
        setCustomProgress(0);
    };

    const jumpToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideToLoop(index);
        }
    };

    const addCustomSlide = () => {
        const newProduct = {
            id: Date.now(),
            title: "Producto Personalizado",
            price: 999.99,
            thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            brand: "Custom",
            rating: 5.0,
            stock: 1,
            description: "Este es un producto agregado dinámicamente mediante manipulación DOM",
            discountPercentage: 10
        };
        
        setDatos(prev => [...prev, newProduct]);
        setTotalSlides(prev => prev + 1);
    };

    const removeCurrentSlide = () => {
        if (datos.length > 1) {
            const newData = datos.filter((_, index) => index !== activeSlide);
            setDatos(newData);
            setTotalSlides(newData.length);
            if (activeSlide >= newData.length) {
                setActiveSlide(newData.length - 1);
            }
        }
    };

    const duplicateSlide = () => {
        if (datos[activeSlide]) {
            const duplicatedProduct = {
                ...datos[activeSlide],
                id: Date.now(),
                title: `${datos[activeSlide].title} (Copia)`
            };
            
            const newData = [...datos];
            newData.splice(activeSlide + 1, 0, duplicatedProduct);
            setDatos(newData);
            setTotalSlides(newData.length);
        }
    };

    const showSlideDetails = (product) => {
        setSelectedProduct(product);
    };

    const closeDetails = () => {
        setSelectedProduct(null);
    };

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
            <h2 className="mb-4 text-center">Slider con Manipulación DOM</h2>
            <p className="text-center text-muted mb-5">
                Control total del slider mediante manipulación directa del DOM y métodos de Swiper.<br />
                Categoría "smartphones" de dummyjson.com.
            </p>

            {/* Panel de Control */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="d-flex flex-wrap gap-2 align-items-center">
                                <span className="badge bg-primary fs-6">
                                    Slide: {activeSlide + 1} / {totalSlides}
                                </span>
                                <span className="badge bg-success fs-6">
                                    Progreso: {customProgress}%
                                </span>
                                <span className="badge bg-info fs-6">
                                    Productos: {datos.length}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex gap-2 justify-content-md-end">
                                <button 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                                >
                                    ← Anterior
                                </button>
                                <button 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => swiperRef.current?.swiper.slideNext()}
                                >
                                    Siguiente →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de progreso personalizada */}
            <div className="progress mb-4" style={{ height: '8px' }}>
                <div 
                    className="progress-bar bg-success progress-bar-striped progress-bar-animated" 
                    style={{ width: `${customProgress}%` }}
                ></div>
            </div>

            {/* Slider Principal */}
            <div className="position-relative">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={false} // Desactivamos navegación por flechas (usamos botones personalizados)
                    pagination={{
                        clickable: true,
                        type: 'bullets'
                    }}
                    loop={true}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => {
                        setActiveSlide(swiper.realIndex);
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className="mySwiper mb-4"
                >
                    {datos.map((producto, index) => (
                        <SwiperSlide key={producto.id}>
                            <div className={`card h-100 transition-all ${index === activeSlide ? 'border-primary shadow-lg' : 'border-0 shadow-sm'}`}>
                                <div className="card-header p-0 position-relative border-0 bg-transparent">
                                    <img 
                                        src={producto.thumbnail} 
                                        className="img-fluid w-100 card-img-top" 
                                        alt={producto.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute top-0 start-0 m-2">
                                        <span className="badge bg-primary">{producto.brand}</span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge bg-warning text-dark">⭐ {producto.rating}</span>
                                    </div>
                                    {index === activeSlide && (
                                        <div className="position-absolute bottom-0 start-0 m-2">
                                            <span className="badge bg-success">ACTIVO</span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-dark">{producto.title}</h5>
                                    <p className="card-text text-success fw-bold fs-4 mb-2">
                                        ${producto.price}
                                    </p>
                                    <div className="mt-auto">
                                        <div className="d-grid gap-2">
                                            <button 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => showSlideDetails(producto)}
                                            >
                                                Ver Detalles
                                            </button>
                                            <button 
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => jumpToSlide(index)}
                                            >
                                                Ir a este Slide
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Controles de Manipulación DOM */}
            <div className="card border-0 bg-light">
                <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">🎮 Controles de Manipulación DOM</h5>
                    <div className="row g-3">
                        <div className="col-md-3 col-6">
                            <button 
                                className="btn btn-success w-100"
                                onClick={addCustomSlide}
                            >
                                + Agregar Slide
                            </button>
                        </div>
                        <div className="col-md-3 col-6">
                            <button 
                                className="btn btn-danger w-100"
                                onClick={removeCurrentSlide}
                                disabled={datos.length <= 1}
                            >
                                - Eliminar Actual
                            </button>
                        </div>
                        <div className="col-md-3 col-6">
                            <button 
                                className="btn btn-warning w-100"
                                onClick={duplicateSlide}
                            >
                                📋 Duplicar Actual
                            </button>
                        </div>
                        <div className="col-md-3 col-6">
                            <button 
                                className="btn btn-info w-100"
                                onClick={() => swiperRef.current?.swiper.update()}
                            >
                                🔄 Actualizar Slider
                            </button>
                        </div>
                    </div>

                    {/* Navegación rápida */}
                    <div className="mt-3">
                        <label className="form-label fw-bold">Navegación Rápida:</label>
                        <div className="d-flex flex-wrap gap-1">
                            {datos.map((_, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-sm ${index === activeSlide ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => jumpToSlide(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalles */}
            {selectedProduct && (
                <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">{selectedProduct.title}</h5>
                                <button type="button" className="btn-close" onClick={closeDetails}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img 
                                            src={selectedProduct.thumbnail} 
                                            className="img-fluid rounded"
                                            alt={selectedProduct.title}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Marca:</strong> {selectedProduct.brand}</p>
                                        <p><strong>Precio:</strong> ${selectedProduct.price}</p>
                                        <p><strong>Rating:</strong> ⭐ {selectedProduct.rating}/5</p>
                                        <p><strong>Stock:</strong> {selectedProduct.stock} unidades</p>
                                        <p><strong>Descripción:</strong> {selectedProduct.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mt-5">
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-light h-100">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">🎯 Manipulación en Tiempo Real</h6>
                            <p className="card-text small mb-2">
                                Agregar, eliminar y duplicar slides dinámicamente mientras el slider está activo.
                            </p>
                            <code className="small">swiper.slideTo()</code>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-light h-100">
                        <div className="card-body">
                            <h6 className="card-title fw-bold text-primary">⚡ Control Total</h6>
                            <p className="card-text small mb-2">
                                Navegación programática, actualización de estado y manipulación directa del DOM.
                            </p>
                            <code className="small">useRef + swiper methods</code>
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
                                <h6 className="card-title fw-bold text-success small">🔧 useRef</h6>
                                <code className="small d-block">swiperRef.current</code>
                                <code className="small d-block">.swiper.slideTo()</code>
                                <code className="small d-block">.swiper.slideNext()</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">🎮 Métodos</h6>
                                <code className="small d-block">jumpToSlide()</code>
                                <code className="small d-block">addCustomSlide()</code>
                                <code className="small d-block">removeCurrentSlide()</code>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-success small">📊 Estado</h6>
                                <code className="small d-block">activeSlide</code>
                                <code className="small d-block">customProgress</code>
                                <code className="small d-block">onSlideChange</code>
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
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    )
}

export default SliderManipulacion;