import useCrearCotizacion from "../../hooks/useCrearCotizacion"
import BotonesBarraProgreso from './../BotonesBarraProgreso'
import BarraProgreso from './../BarraProgreso'


function PanelCrearCotizacion() {
    const {
        componente
    }=useCrearCotizacion()

    return (
        <div className="w-full flex flex-col gap-3">
            <BarraProgreso/>
            {componente}
            <BotonesBarraProgreso/>
        </div>
    )
}

export default PanelCrearCotizacion
