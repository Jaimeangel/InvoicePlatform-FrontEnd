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
            setPdf(null)
        }
    }

    useEffect(()=>{
        obtenerURLCotizacionById()
    },[data])

    return (
        <>
            {
                pdf && (
                    <a
                        href={`${pdf}`}
                        target="_blank"
                    >
                        <div
                            className='w-full flex flex-row cursor-pointer border border-black rounded bg-white shadow hover:shadow-lg'
                        >
                            <p
                                className='border-r border-black text-center font-semibold py-2'
                                style={{
                                    width:`13%`
                                }} 
                            >
                                cotizacion
                            </p>
                            <p
                                style={{
                                    width:`10%`
                                }}
                                className="border-r border-black px-3 py-1 font-semibold text-center"
                            >
                                {numeroCotizacion}
                            </p>
                            <p
                                style={{
                                    width:`13%`
                                }} 
                                className="border-r border-black px-3 py-1 font-semibold text-center"
                            >
                                {formatFechaDataMongo(fecha)}
                            </p>
                            <p
                                style={{
                                    width:`14%`
                                }} 
                                className="border-r border-black px-3 py-1 font-semibold text-center"
                            >
                                {identificacion}
                            </p>
                            <p
                                style={{
                                    width:`35%`
                                }} 
                                className="border-r border-black px-3 py-1 font-semibold text-center"
                            >
                                {nombre}
                            </p>
                            <p
                                style={{
                                    width:`17%`
                                }}
                                className="px-3 py-1 font-semibold text-center"  
                            >
                                {formatoMonedaDosDecimales(valorTotal)}
                            </p>
                        </div>
                    </a>
                )
            }
        </>
    )
}

export default CardCotizaciones;
