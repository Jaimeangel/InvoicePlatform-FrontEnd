import { useEffect, useState } from 'react'

import CardCotizaciones from '../../components/ver cotizaciones/CardCotizaciones'
import EncabezadoCotizaciones from '../../components/ver cotizaciones/EncabezadoCotizaciones'
import Paginacion from '../../components/ver cotizaciones/Paginacion'
import Filtro from '../../components/ver cotizaciones/Filtro'

import useCotizacion from '../../hooks/useCotizacion'

import extraerInformacionCotizacion from '../../helpers/extraerInformacionCotizacion'

function VisualizarCotizaciones() {

    const {
        obtenerCotizaciones
    }=useCotizacion()
    
    const [cotizaciones,setCotizaciones]=useState([])
    const [cotizacionesFormateadas,setCotizacionesFormateadas]=useState([])
    const [cotizacionesPaginacion,setCotizacionesPaginacion]=useState([])

    const [maximoItems]=useState(4)
    const [activePaginacion,setActivePaginacion] = useState(1);

    function obtenerElementosPorPagina(arrayOriginal, paginacion) {
        const startIndex = (paginacion - 1) * maximoItems;
        const endIndex = paginacion * maximoItems;
        return arrayOriginal.slice(startIndex, endIndex);
    }

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

    useEffect(()=>{
        if(cotizacionesFormateadas.length !==0){
            const newArray = obtenerElementosPorPagina(cotizacionesFormateadas,activePaginacion)
            setCotizacionesPaginacion(newArray)
        }
    },[activePaginacion,cotizacionesFormateadas])


    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2 mb-5 text-3xl font-bold">Cotizaciones</h1>

            <Filtro
                cotizaciones={cotizaciones}
                setCotizacionesFormateadas={setCotizacionesFormateadas}
                primerFormatoInicialCotizaciones={primerFormatoInicialCotizaciones}
            />

            <EncabezadoCotizaciones>
                {
                    cotizacionesPaginacion?.map( data => (
                        <CardCotizaciones
                            key={data._id}
                            data={data}
                        />
                    )) 
                }
            </EncabezadoCotizaciones>

            <Paginacion 
                longitud={cotizacionesFormateadas.length}
                numeroItems={maximoItems}
                numeroActualItem={activePaginacion}
                cambiarNumeroActualItem={setActivePaginacion}
            />
        </div>
    )
}

export default VisualizarCotizaciones;
