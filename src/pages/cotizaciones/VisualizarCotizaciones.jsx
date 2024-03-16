import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import EncabezadoCotizaciones from '../../components/ver cotizaciones/EncabezadoCotizaciones'

import useCotizacion from '../../hooks/useCotizacion'

import extraerInformacionCotizacion from '../../helpers/extraerInformacionCotizacion'

import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Paginacion from '../../components/ver cotizaciones/Paginacion'

function VisualizarCotizaciones() {

    let location = useLocation();

    const [path,setPath]=useState('/dashboard/cotizaciones');
    
    const [cotizaciones,setCotizaciones]=useState([])
    const [cotizacionesFormateadas,setCotizacionesFormateadas]=useState([])
    
    const {
        obtenerCotizaciones
    }=useCotizacion()

    const obtenerCotizacionesUser = async ()=>{
        try{
            const cotizaciones =  await obtenerCotizaciones()
            setCotizaciones(cotizaciones)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCotizacionesUser()
    },[])

    useEffect(()=>{
        if(cotizaciones.length !==0){
            const cotizacionesFormato = cotizaciones.map( cotizacion => {
                return extraerInformacionCotizacion(cotizacion,cotizacion.cliente)
            }).reverse()
            setCotizacionesFormateadas(cotizacionesFormato)
        }
    },[cotizaciones])

    useEffect(()=>{
        setPath(location.pathname)
    },[location.pathname])
    

    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            {
                path === '/dashboard/cotizaciones/ver-cotizaciones' ?
                <>
                    <h1 className="mt-2 mb-5 text-3xl font-bold">Cotizaciones</h1>
{/*                     <EncabezadoCotizaciones>
                        {
                            cotizacionesFormateadas?.map( data =>(
                                <CardCotizaciones
                                    key={data._id}
                                    data={data}
                                />
                            )) 
                        }
                    </EncabezadoCotizaciones> */}

                    <Paginacion longitud={cotizacionesFormateadas.length}/>

                </>
                :
                    <Outlet/>
            }
        </div>
    )
}

export default VisualizarCotizaciones;
