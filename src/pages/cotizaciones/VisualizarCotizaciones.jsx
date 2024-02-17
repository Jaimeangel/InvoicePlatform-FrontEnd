import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import EncabezadoCotizaciones from '../../components/ver cotizaciones/EncabezadoCotizaciones'

import useCotizacion from '../../hooks/useCotizacion'

import extraerInformacionCotizacion from '../../helpers/extraerInformacionCotizacion'

function VisualizarCotizaciones() {
    const [cotizaciones,setCotizaciones]=useState([])
    const [cotizacionesFormateadas,setCotizacionesFormateadas]=useState([])
    
    const {
        obtenerCotizaciones
    }=useCotizacion()

    useEffect(()=>{
        obtenerCotizacionesUser()
    },[])

    useEffect(()=>{
        if(cotizaciones.length !==0){
            const cotizacionesFormato = cotizaciones.map( cotizacion => {
                return extraerInformacionCotizacion(cotizacion,cotizacion.cliente)
            })
            setCotizacionesFormateadas(cotizacionesFormato)
        }
    },[cotizaciones])

    const obtenerCotizacionesUser = async ()=>{
        try{
            const cotizaciones =  await obtenerCotizaciones()
            setCotizaciones(cotizaciones)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            <EncabezadoCotizaciones>
                {
                    cotizacionesFormateadas?.map( data =>(
                        <CardCotizaciones
                            key={data._id}
                            data={data}
                        />
                    )) 
                }
            </EncabezadoCotizaciones>
        </div>
    )
}

export default VisualizarCotizaciones;
