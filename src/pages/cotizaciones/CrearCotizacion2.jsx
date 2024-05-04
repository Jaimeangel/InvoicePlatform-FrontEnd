import CrearCotizacionProvider from "../../context/CrearCotizacionProvider";
import PanelCrearCotizacion from "../../components/crear cotizaciones/PanelCrearCotizacion";


function CrearCotizacion2() {
    return (
        <CrearCotizacionProvider>
            <PanelCrearCotizacion/>
        </CrearCotizacionProvider>
    )
}

export default CrearCotizacion2;
