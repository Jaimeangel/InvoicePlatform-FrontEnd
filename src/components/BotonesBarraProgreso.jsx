import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

import useCrearCotizacion from "../hooks/useCrearCotizacion";

function BotonesBarraProgreso() {

    const {
        retroceder,
        aprobarAvanzar,
        index,
        limitIndex
    }=useCrearCotizacion()

    return (
        <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md flex flex-row justify-between">
            
            <button
                disabled={index === 1 ? true : false}
                onClick={retroceder}
                className='disabled:hidden flex flex-row justify-center items-center gap-2 text-black text-lg tracking-wide font-semibold py-3 rounded-xl hover:bg-slate-100 shadow border-2  px-8'
            >   
                <FontAwesomeIcon icon={faLeftLong} />
                <p className="first-letter:uppercase pb-1">paso anterior</p>
            </button>

            <button
                disabled={index === limitIndex ? true : false}
                onClick={aprobarAvanzar} 
                className='disabled:hidden flex flex-row justify-center items-center gap-2 text-black text-lg tracking-wide font-semibold py-3 rounded-xl hover:bg-slate-100 shadow border-2  px-8'
            >
                <p className="first-letter:uppercase pb-1">Siguiente</p>
                <FontAwesomeIcon icon={faRightLong} />
            </button>

        </div>
    )
}

export default BotonesBarraProgreso;
