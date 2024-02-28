import { useEffect, useState } from "react";
import useCotizacion from "../../hooks/useCotizacion"

import { useLocation } from "react-router-dom";

function VerCotizacionesById() {

    const [url,setUrl]=useState(null)
    
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
                    console.log(cotizacion)
                } catch (error) {
                    console.log(error)
                }
            }
    
            obtenerCotizacionById()
        }
    },[url])
    
    return(
        <div>
            <h1>Aqui va la cotizacion</h1>
        </div>
    )
}

export default VerCotizacionesById;
