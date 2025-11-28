

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from 'react';
const API = 'https://dummyjson.com/products/category/laptops';
const BasicoHorizontal = () => {
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
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }


    return (
        <div className="container my-5 ">
            <h2 className="mb-4 text-center">Slider Básico Horizontal - Laptop</h2>
            <p className="text-center text-muted mb-5">
                Ejemplo básico de Swiper con navegación por flechas y deslizamiento táctil.
                Muestra productos de la categoría "Laptop" de dummyjson.com.
            </p>

            <div className="swiper-container">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    pagination={false}
                    loop={true}
                     style={{ height: '500px' }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        }
                    }}
                    className="mySwiper"
                >
                    {datos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="card h-100">
                                <div className="card-header p-0">
                                    <img src={producto.thumbnail} className="img-fluid" alt={producto.title} />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{producto.title}</h5>
                                    <p className="card-text text-success fw-bold fs-4">
                                        ${producto.price}
                                    </p>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-outline-primary btn-sm">
                                        Ver Producto
                                    </button>
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
                        <strong>Importaciones:</strong> <code>Swiper, SwiperSlide</code> y módulo <code>Navigation</code> [web:1]
                    </li>
                    <li className="list-group-item">
                        <strong>Configuración:</strong> <code>spaceBetween, slidesPerView, navigation</code> para responsive [web:4]
                    </li>
                    <li className="list-group-item">
                        <strong>Breakpoints:</strong> Cambia slides visibles según tamaño de pantalla
                    </li>
                    <li className="list-group-item">
                        <strong>Datos:</strong> Productos "Laptop" del JSON
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BasicoHorizontal