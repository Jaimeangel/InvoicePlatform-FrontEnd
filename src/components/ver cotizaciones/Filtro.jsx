import extraerInformacionCotizacion from "../../helpers/extraerInformacionCotizacion";

import { useState, useEffect } from "react";

import SearchForm from "../SearchForm";
import useCliente from "../../hooks/useCliente";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong,faUpLong } from "@fortawesome/free-solid-svg-icons";

function Filtro({
    cotizaciones,
    setCotizacionesFormateadas,
    primerFormatoInicialCotizaciones
}){

    const [contacto,setContacto]=useState('')
    const [fechaInicio,setFechaInicio]=useState('')
    const [fechaFinal,setFechaFinal]=useState('')

    const [open,setOpen]=useState(false)

    const {
        obtenerClientesByUsuario,
        clientes
    }=useCliente()

    useEffect(()=>{
        const getClientes= async ()=>{
            try {
                const clientes = await obtenerClientesByUsuario()
            } catch (error) {
                console.log(error)
            }
        }
        getClientes()
    },[])

    useEffect(()=>{
        if(contacto === ''){
            limpiarFiltro()
        }
    },[contacto])

    function filtrarPorRango(array, fechaInicio, fechaFin) {
        // Convertir las fechas de tipo "date" a objetos Date
        const fechaInicioObj = new Date(fechaInicio + 'T00:00:00');
        const fechaFinObj = new Date(fechaFin + 'T23:59:59');
    
        // Filtrar el array para obtener solo los elementos dentro del rango de fechas
        const elementosFiltrados = array.filter(elemento => {
            // Convertir la fecha del elemento al formato de objeto Date
            const fechaElemento = new Date(elemento.createdAt);
            // Verificar si la fecha del elemento está dentro del rango especificado
            return fechaElemento >= fechaInicioObj && fechaElemento <= fechaFinObj;
        });
    
        return elementosFiltrados;
    }

    const handleChange =(dataCliente)=>{
        setContacto(dataCliente)
    }

    const limpiarFiltro = ()=>{
        setFechaInicio('')
        setFechaFinal('')
        primerFormatoInicialCotizaciones()
    }

    const ventanaFiltro = ()=>{
        setOpen(prev => !prev)
    }
    
    const filtrar = ()=>{
        let lista=[]
        
        if(![fechaInicio,fechaFinal].includes('')){
            const newCotizaciones = filtrarPorRango(cotizaciones,fechaInicio,fechaFinal)
            lista = newCotizaciones
            console.log(lista)
        }

        if(Object.keys(contacto).length !== 0){
            if(lista.length !== 0){
                const newList = lista.filter(item => item.cliente.identificacion === contacto.identificacion)
                lista = newList
            }else{
                const newList = cotizaciones.filter(item => item.cliente.identificacion === contacto.identificacion)
                lista = newList
            }
        }

        if(lista.length !== 0){
            const cotizacionesFormato = lista.map( cotizacion => {
                return extraerInformacionCotizacion(cotizacion,cotizacion.cliente)
            }).reverse()
            setCotizacionesFormateadas(cotizacionesFormato)
        }
    }


    return (
        <>
            <div
                onClick={ventanaFiltro} 
                className={`${!open && 'mb-5 rounded-b'} cursor-pointer flex flex-row items-center gap-5 bg-slate-100 px-5 py-1 rounded-t shadow-sm shadow-b-0 border-black border`}
            >
                {
                    open ? <FontAwesomeIcon icon={faUpLong}/> : <FontAwesomeIcon icon={faDownLong}  className="mt-1"/>
                }
                <h1 className="font-bold text-lg tracking-wider">Filtros</h1>
            </div>
            {
                open && (
                    <div className="w-full flex flex-col gap-3 mb-5 px-5 py-4 border border-t-0 shadow rounded-b-md">
                    
                        <div className="flex flex-row">

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
                                            value={fechaInicio}
                                            onChange={(e)=>setFechaInicio(e.target.value)} 
                                            type="date" 
                                            className="border rounded-md px-3"
                                        />
                                    </div>

                                    <div className="w-full flex flex-col">
                                        <p className="font-semibold text-md">Hasta</p>
                                        <input
                                            value={fechaFinal}
                                            onChange={(e)=>setFechaFinal(e.target.value)} 
                                            type="date" 
                                            className="border rounded-md px-3"
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="flex flex-row justify-between">
                            <button
                                onClick={filtrar} 
                                className="border-2 font-semibold px-5 py-1 rounded-md tracking-wide bg-blue-100  border-blue-600"
                            >
                                Buscar
                            </button>
                            
                            <button
                                onClick={limpiarFiltro} 
                                className="border-2 font-semibold px-5 py-1 rounded-md tracking-wide bg-yellow-100  border-yellow-400"
                            >
                                Limpiar filtros
                            </button>
                        </div>

                    </div>
                )
            }

        </>
    )
}

export default Filtro;
