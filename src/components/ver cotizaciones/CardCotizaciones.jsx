import { useEffect,useState } from "react";
import formatFechaDataMongo from "../../helpers/formatFechaDataMongo";
import { formatoMonedaDosDecimales } from "../../helpers/formatoMonedas";

import useCotizacion from "../../hooks/useCotizacion";

import extraerInformacionCotizacion from "../../helpers/extraerInformacionCotizacion";

function CardCotizaciones({data}){

    const [pdf,setPdf]=useState(null)

    const {
        obtenerUrlCotizacionById
    }=useCotizacion()

    const {
        _id,
        fecha,
        valorTotal,
        numeroCotizacion,
        nombre,
        identificacion
    }=extraerInformacionCotizacion(data,data.cliente);

    const obtenerURLCotizacionById = async ()=>{
        try {
            const urlCotizacion = await obtenerUrlCotizacionById(_id)
            setPdf(urlCotizacion)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerURLCotizacionById()
    },[])

    return (
        <>
            {
                pdf !== null && (
                    <a
                        href={`${pdf}`}
                        target="_blank"
                    >
                        <div
                            className='w-full flex flex-row cursor-pointer border border-black rounded bg-white hover:shadow-lg'
                        >
                            <p
                                className='border-r border-black text-center font-semibold py-2'
                                style={{
                                    width:`13%`
                                }} 
                            >
                                COTIZACION
                            </p>
                            <div
                                className='border-r border-black'
                                style={{
                                    width:`10%`
                                }} 
                            >
                                <p
                                    className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                                >{numeroCotizacion}</p>
                            </div>
                            <div
                                className='border-r border-black'
                                style={{
                                    width:`16%`
                                }} 
                            >
                                <p
                                    className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                                >{formatFechaDataMongo(fecha)}</p>
                            </div>
                            <div
                                className='border-r border-black'
                                style={{
                                    width:`14%`
                                }} 
                            >
                                <p
                                    className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                                >{identificacion}</p>
                            </div>
                            <div
                                className='border-r border-black'
                                style={{
                                    width:`30%`
                                }} 
                            >
                                <p
                                    className="w-full bg-white outline-none px-3 py-1 font-semibold text-justify first-letter:uppercase"
                                >{nombre}</p>
                            </div>
                            <input
                                value={formatoMonedaDosDecimales(valorTotal)}
                                type="text"
                                className="bg-white text-center rounded font-semibold"
                                style={{
                                    width:`17%`
                                }}  
                                disabled 
                            />
                        </div>
                    </a>
                )
            }
        </>
    )
}

export default CardCotizaciones;
