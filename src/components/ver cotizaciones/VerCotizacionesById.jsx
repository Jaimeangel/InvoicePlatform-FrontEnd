import { Worker } from '@react-pdf-viewer/core';

// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { useEffect, useState } from "react";

import useCotizacion from "../../hooks/useCotizacion"

import { useLocation } from "react-router-dom";


import extraerInformacionCotizacion from '../../helpers/extraerInformacionCotizacion';

import { formatoMonedaDosDecimales } from '../../helpers/formatoMonedas';
import formatFechaDataMongo from '../../helpers/formatFechaDataMongo';

function VerCotizacionesById() {

    const [url,setUrl]=useState(null)
    const [pdf,setPdf]=useState(null)
    const [dataCotizacion,setDataCotizacion]=useState(null)
    
    const {
        obtenerUrlCotizacionById,
        obtenerCotizacionById
    }=useCotizacion()

    const path = useLocation()

    useEffect(()=>{
        const string = path.pathname.split('/')
        const url = string[4]
        setUrl(url)
    },[])

    useEffect(()=>{
        if(url !== null){

            const getCotizacionById = async ()=>{
                try {
                    const cotizacion = await obtenerCotizacionById(url)
                    const data = extraerInformacionCotizacion(cotizacion,cotizacion.cliente)
                    setDataCotizacion(data)
                } catch (error) {
                    console.log(error)
                }
            }
            const obtenerURLCotizacionById = async ()=>{
                try {
                    const urlCotizacion = await obtenerUrlCotizacionById(url)
                    setPdf(urlCotizacion)
                } catch (error) {
                    console.log(error)
                }
            }

            obtenerURLCotizacionById()
            getCotizacionById()

        }
        
    },[url])

    
    return(
        <div className='flex flex-col gap-5'>

            {   
                dataCotizacion !== null && (
                    <div className='w-full flex flex-row justify-between shadow hover:shadow-md bg-gray-100 border rounded px-5 py-2'>
                        <div className='text-center'>
                            <p className='font-semibold uppercase'>{'cotización '}</p>
                            <p className='font-semibold'>{dataCotizacion.numeroCotizacion}</p>
                        </div>
                        <div className='text-center'>
                            <p className='font-semibold'>{dataCotizacion.nombre}</p>
                            <p className='font-semibold'>{`Nit: ${dataCotizacion.identificacion}`}</p>
                        </div>
                        <div className='text-center'>
                            <p className='font-semibold'>{`VALOR: ${formatoMonedaDosDecimales(dataCotizacion.valorTotal)}`}</p>
                            <p className='font-semibold'>{formatFechaDataMongo(dataCotizacion.fecha)}</p>
                        </div>
                    </div>
                )
            }

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className='w-full'>
                    {
                        pdf !== null && <Viewer fileUrl={pdf}/>   
                    }
                </div>
            </Worker>
        </div>
    )
}

export default VerCotizacionesById;
