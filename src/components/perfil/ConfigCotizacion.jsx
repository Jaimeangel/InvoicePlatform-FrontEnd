import ImagenPerfil from './ImagenPerfil';
import ImagenCotizacion from './ImagenCotizacion';

function ConfigCotizacion() {

    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md flex flex-col gap-5">
            <ImagenPerfil/>
            <ImagenCotizacion/>
        </div>
    )
}

export default ConfigCotizacion;
