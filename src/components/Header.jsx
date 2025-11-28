import { Link } from "react-router-dom"


const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Swiper</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/inicio"} className="nav-link active" aria-current="page" href="#">Que es Swiper</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tipos de Slider
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={"/sliderbasicohorizontal"} className="dropdown-item" href="#">Slider básico horizontal</Link></li>
                                <li><Link to={"/SliderPaginacionAutoplay"} className="dropdown-item" href="#">Slider con paginación y autoplay</Link></li>
                                <li><Link to={"/SliderVertical"} className="dropdown-item" href="#">Slider vertical</Link></li>
                                <li><Link to={"/SliderFade"} className="dropdown-item" href="#">Slider con efecto fade</Link></li>
                                <li><Link to={"/SliderZoomLightbox"} className="dropdown-item" href="#">Slider con zoom o lightbox</Link></li>
                                <li><Link to={"/SliderThumbnails"} className="dropdown-item" href="#">Slider con thumbnails</Link></li>
                                <li><Link to={"/SliderScrollbar"} className="dropdown-item" href="#">Slider con scrollbar</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Otros Modelos de Slider
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={"/SliderCentrado"} className="dropdown-item" href="#">Slider centrado (coverflow)</Link></li>
                                <li><Link to={"/SliderMultipleFilas"} className="dropdown-item">Slider múltiple filas</Link></li>
                                <li><Link to={"/SliderEfectoCubo"} className="dropdown-item">Slider efecto cubo 3D</Link></li>
                                <li><Link to={"/SliderCards"} className="dropdown-item">Slider tipo cards</Link></li>
                                <li><Link to={"/SliderProgreso"} className="dropdown-item">Slider con barra de progreso</Link></li>
                                <li><Link to={"/SliderParallax"} className="dropdown-item">Slider con efecto parallax</Link></li>   
                            </ul>
                        </li>
                
                    </ul>

                </div>
            </div>
        </nav>

    )
}

export default Header