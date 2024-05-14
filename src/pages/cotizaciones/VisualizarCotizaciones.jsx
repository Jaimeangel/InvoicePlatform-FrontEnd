import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import AlertaWrapper from '../../components/alertas/AlertaWrapper'

import FiltroPaginacion from '../../components/filtroPaginacionItems/FiltroPaginacionItems'

import SearchForm from '../../components/SearchForm'

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

                    <FiltroPaginacion.Filtro>
                        {(contacto,clientes,handleChange,filterDate,handleDate)=>(
                            <>
                                <div className="w-1/2 flex flex-col gap-4">
                                    <p className="font-bold text-xl">Cliente</p>
                                    <SearchForm
                                        cliente={contacto}
                                        list={clientes}
                                        onChangeCliente={handleChange}
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-1">
                                    <p className="font-bold text-xl">Fecha elaboración</p>

                                    <div className="flex flex-row justify-between gap-5">

                                        <div className="w-full flex flex-col">
                                            <p className="font-semibold text-md">Desde</p>
                                            <input
                                                name='fechaInicio'
                                                value={filterDate["fechaInicio"]}
                                                onChange={handleDate} 
                                                type="date" 
                                                className="border rounded-md px-3"
                                            />
                                        </div>

                                        <div className="w-full flex flex-col">
                                            <p className="font-semibold text-md">Hasta</p>
                                            <input
                                                name="fechaFinal"
                                                value={filterDate["fechaFinal"]}
                                                onChange={handleDate} 
                                                type="date" 
                                                className="border rounded-md px-3"
                                            />
                                        </div>

                                    </div>

                                </div>
                            </>
                        )}
                    </FiltroPaginacion.Filtro>

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
