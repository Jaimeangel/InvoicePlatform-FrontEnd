import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import EncabezadoCotizaciones from '../../components/ver cotizaciones/EncabezadoCotizaciones'
import FiltroPaginacion from '../../components/filtroPaginacion/FiltroPaginacion'
import AlertaWrapper from '../../components/alertas/AlertaWrapper'

import { FormatoVisualCotizacion } from '../../helpers/FormatoVisualCotizacion'
import useCotizacion from '../../hooks/useCotizacion'

function VisualizarCotizaciones() {

    const {
        obtenerCotizaciones
    }=useCotizacion()

    const [catchError,setCatchError]=useState({
        msg:false,
        error:''
    })
    
    const [cotizaciones,setCotizaciones]=useState([])
    const [cotizacionesFormateadas,setCotizacionesFormateadas]=useState([])

    const obtenerCotizacionesUser = async ()=>{
        try{
            const cotizaciones =  await obtenerCotizaciones()
            setCotizaciones(cotizaciones)
        } catch (err) {
            setCatchError({
                error:true,
                msg:err.message
            })

            setTimeout(()=>{
                setCatchError({
                    error:false,
                    msg:''
                })
            },15000)
        }
    }
    
    useEffect(()=>{
        obtenerCotizacionesUser()
    },[])

    useEffect(() => {
        FormatoVisualCotizacion(cotizaciones,setCotizacionesFormateadas)
    },[cotizaciones])



    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            <AlertaWrapper alert={catchError}>
                <h1 className="mt-2 mb-5 text-3xl font-bold">Cotizaciones</h1>
                <FiltroPaginacion
                    WraperEncabezado={EncabezadoCotizaciones}
                    CardItems={CardCotizaciones}
                    lista={cotizacionesFormateadas}
                    itemsPaginacion={4}
                />
            </AlertaWrapper>
        </div>
    )
}

export default VisualizarCotizaciones;
