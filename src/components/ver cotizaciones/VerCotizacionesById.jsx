import { Worker } from '@react-pdf-viewer/core';

// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { useEffect, useState } from "react";

import useCotizacion from "../../hooks/useCotizacion"

import { useLocation } from "react-router-dom";

function VerCotizacionesById() {

    const [url,setUrl]=useState(null)
    const [pdf,setPdf]=useState(null)
    
    const {
        obtenerUrlCotizacionById
    }=useCotizacion()

    const path = useLocation()

    useEffect(()=>{
        const string = path.pathname.split('/')
        const url = string[4]
        setUrl(url)
    },[])

    useEffect(()=>{
        if(url !== null){
            const obtenerCotizacionById = async ()=>{
                try {
                    const cotizacion = await obtenerUrlCotizacionById(url)
                    setPdf(cotizacion)
                    console.log(cotizacion)
                } catch (error) {
                    console.log(error)
                }
            }
    
            obtenerCotizacionById()
        }
    },[url])

    
    return(
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className='w-full'>
                {
                    pdf !== null && <Viewer fileUrl={pdf}/>
                }
            </div>
        </Worker>
    )
}

export default VerCotizacionesById;
