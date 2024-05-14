import { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm";
import useCliente from "../../hooks/useCliente";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong,faUpLong } from "@fortawesome/free-solid-svg-icons";

import { filtroPaginacionItemsContext } from "../filtroPaginacionItems/FiltroPaginacionItems";

function Filtro({children}){

    const {
        array,
        updateListFilter,
        updateIndex
    }=useContext(filtroPaginacionItemsContext)

    const {
        obtenerClientesByUsuario,
        clientes
    }=useCliente()

    const [contacto,setContacto]=useState('')
    const [filterDate,setFilterDate]=useState({
        'fechaInicio':'',
        'fechaFinal':''
    })

    const [open,setOpen]=useState(false)

    useEffect(()=>{
        const getClientes= async ()=>{
            try {
                const clientesList = await obtenerClientesByUsuario()
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

    const handleChange =(dataCliente)=>{
        setContacto(dataCliente)
    }

    const handleDate = (e)=>{
        e.preventDefault()

        setFilterDate({
            ...filterDate,
            [e.target.name]:[e.target.value]
        })
    }

    const limpiarFiltro = ()=>{
        setFilterDate({
            'fechaInicio':'',
            'fechaFinal':''
        })
        updateIndex(1)
        updateListFilter([])
    }

    function filtrarPorRango(array, fechaInicio, fechaFin) {
        // Convertir las fechas de tipo "date" a objetos Date
        const fechaInicioObj = new Date(fechaInicio + 'T00:00:00');
        const fechaFinObj = new Date(fechaFin + 'T23:59:59');
    
        // Filtrar el array para obtener solo los elementos dentro del rango de fechas
        const elementosFiltrados = array.filter(elemento => {
            // Convertir la fecha del elemento al formato de objeto Date
            const fechaElemento = new Date(elemento.fecha);
            // Verificar si la fecha del elemento está dentro del rango especificado
            return fechaElemento >= fechaInicioObj && fechaElemento <= fechaFinObj;
        });
    
        return elementosFiltrados;
    }


    const ventanaFiltro = ()=>{
        setOpen(prev => !prev)
    }
    
    const filtrar = ()=>{
        let lista=[]
        
        if(![filterDate["fechaInicio"],filterDate["fechaFinal"]].includes('')){
            const newCotizaciones = filtrarPorRango(array,filterDate["fechaInicio"],filterDate["fechaFinal"])
            lista = newCotizaciones
        }

        if(Object.keys(contacto).length !== 0){
            if(lista.length !== 0){
                const newList = lista.filter(item => item.cliente.identificacion === contacto.identificacion)
                lista = newList
            }else{
                const newList = array.filter(item => item.cliente.identificacion === contacto.identificacion)
                lista = newList
            }
        }
        updateListFilter(lista)
    }


    return (
        <>
            <div
                onClick={ventanaFiltro} 
                className={`${!open && 'mb-5 rounded-b'} cursor-pointer flex flex-row items-center gap-5 bg-slate-100 px-5 rounded-t shadow-sm shadow-b-0 border-black border`}
            >
                {
                    open ? <FontAwesomeIcon icon={faUpLong} size="xs" /> : <FontAwesomeIcon icon={faDownLong} size="xs" className="mt-1"/>
                }
                <h1 className="font-bold text-lg tracking-wider italic">Filtros</h1>
            </div>

            {
                open &&
                <div className="w-full flex flex-col gap-3 mb-5 px-5 py-4 border border-t-0 shadow rounded-b-md">
                    
                    <div className="flex flex-row">
                        {children(contacto,clientes,handleChange,filterDate,handleDate)}
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
            }

        </>
    )
}

export default Filtro;
