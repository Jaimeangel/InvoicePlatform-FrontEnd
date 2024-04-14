import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import EncabezadoCotizaciones from '../../components/ver cotizaciones/EncabezadoCotizaciones'

import useCotizacion from '../../hooks/useCotizacion'

import extraerInformacionCotizacion from '../../helpers/extraerInformacionCotizacion'
import FiltroPaginacion from '../../components/filtroPaginacion/FiltroPaginacion'

function VisualizarCotizaciones() {

    const {
        obtenerCotizaciones
    }=useCotizacion()
    
    const [cotizaciones,setCotizaciones]=useState([])
    const [cotizacionesFormateadas,setCotizacionesFormateadas]=useState([])

    function primerFormatoInicialCotizaciones(){
        if(cotizaciones.length !==0){
            const cotizacionesFormato = cotizaciones.map( cotizacion => {
                return extraerInformacionCotizacion(cotizacion,cotizacion.cliente)
            }).reverse()
            setCotizacionesFormateadas(cotizacionesFormato)
        }
    }

    useEffect(()=>{
        const obtenerCotizacionesUser = async ()=>{
            try{
                const cotizaciones =  await obtenerCotizaciones()
                setCotizaciones(cotizaciones)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCotizacionesUser()
    },[])

    useEffect(() => {
        primerFormatoInicialCotizaciones()
    },[cotizaciones])



    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2 mb-5 text-3xl font-bold">Cotizaciones</h1>
            <FiltroPaginacion
                WraperEncabezado={EncabezadoCotizaciones}
                CardItems={CardCotizaciones}
                lista={cotizacionesFormateadas}
                itemsPaginacion={4}
            />
        </div>
    )
}

export default VisualizarCotizaciones;
