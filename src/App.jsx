import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import BasicoHorizontal from './pages/BasicoHorizontal'
import SliderPaginacionAutoplay from './pages/SliderPaginacionAutoplay'
import SliderVertical from './pages/SliderVertical '
import SliderFade from './pages/SliderFade'
import SliderZoomLightbox from './pages/SliderZoomLightbox'
import SliderThumbnails from './pages/SliderThumbnails'
import SliderScrollbar from './pages/SliderScrollbar'
import SliderCentrado from './pages/SliderCentrado'
import SliderMultipleFilas from './pages/SliderMultipleFilas'
import SliderEfectoCubo from './pages/SliderEfectoCubo'
import SliderCards from './pages/SliderCards'
import SliderProgreso from './pages/SliderProgreso'
import SliderParallax from './pages/SliderParallax'
import SliderManipulacion from './pages/SliderManipulacion'
import SliderGrid from './pages/SliderGrid'



const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/sliderbasicohorizontal" element={<BasicoHorizontal />} />
                    <Route path="/SliderPaginacionAutoplay" element={<SliderPaginacionAutoplay />} />
                    <Route path="/SliderVertical" element={<SliderVertical />} />
                    <Route path="/SliderFade" element={<SliderFade />} />
                    <Route path="/SliderZoomLightbox" element={<SliderZoomLightbox />} />
                    <Route path="/SliderThumbnails" element={<SliderThumbnails />} />
                    <Route path="/SliderScrollbar" element={<SliderScrollbar />} />

                    <Route path="/SliderCentrado" element={<SliderCentrado />} />
                    <Route path="/SliderMultipleFilas" element={<SliderMultipleFilas />} />
                    <Route path="/SliderEfectoCubo" element={<SliderEfectoCubo />} />
                    <Route path="/SliderCards" element={<SliderCards />} />
                    <Route path="/SliderProgreso" element={<SliderProgreso />} />
                    <Route path="/SliderParallax" element={<SliderParallax />} />
                    <Route path="/SliderManipulacion" element={<SliderManipulacion />} />
                  
                 
                   
                    <Route path="*" element={<Inicio />} />
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
        )
    }
    export default App