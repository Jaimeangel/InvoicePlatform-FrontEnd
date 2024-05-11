import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import AlertaWrapper from '../../components/alertas/AlertaWrapper'

import FiltroPaginacion from '../../components/filtroPaginacionItems/FiltroPaginacionItems'


const items=[    
    {
        id:1,
        categoria:'tipo',
        proporcion:13
    },
    {
        id:2,
        categoria:'referencia',
        proporcion:10
    },
    {
        id:3,
        categoria:'fecha',
        proporcion:13
    },
    {
        id:4,
        categoria:'identificacion',
        proporcion:14
    },
    {
        id:5,
        categoria:'nombre del cliente',
        proporcion:35
    },
    {
        id:6,
        categoria:'total',
        proporcion:17
    }
]

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

    const obtenerCotizacionesUser = async ()=>{
        try{
            const cotizaciones =  await obtenerCotizaciones()
            cotizaciones.reverse()
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

    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            <AlertaWrapper alert={catchError}>
                <h1 className="mt-2 mb-5 text-3xl font-bold">Cotizaciones</h1>

                <FiltroPaginacion lista={cotizaciones} dataItems={items} numberItems={4}>

                    <FiltroPaginacion.Filtro/>

                    <FiltroPaginacion.WraperItems>
                        {(items)=>(
                            items?.map((item) =>(
                                <CardCotizaciones key={item._id} data={item}/>
                            ))
                        )}
                    </FiltroPaginacion.WraperItems>
                    
                    <FiltroPaginacion.Paginacion/>

                </FiltroPaginacion>


            </AlertaWrapper>
        </div>
    )
}

export default VisualizarCotizaciones;
