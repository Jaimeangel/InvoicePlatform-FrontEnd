import { useState, useEffect } from "react";

import SearchForm from "../SearchForm";
import useCliente from "../../hooks/useCliente";

function Filtro(){

    const [contacto,setContacto]=useState('')
    const [fechaInicio,setFechaInicio]=useState('')
    const [fechaFinal,setFechaFinal]=useState('')

    const {
        obtenerClientesByUsuario,
        clientes
    }=useCliente()

    const handleChange =(dataCliente)=>{
        setContacto(dataCliente)
    }

    useEffect(()=>{
        const getClientes= async ()=>{
            const clientes = await obtenerClientesByUsuario()
        }
        getClientes()
    },[])

    const limpiarFiltro = ()=>{
        setContacto('')
        setFechaInicio('')
        setFechaFinal('')
    }

    return (
        <div className="w-full flex flex-col gap-3 mb-5 px-5 py-3 border-2 shadow-sm rounded-md">
        
            <div className="flex flex-row">

                <div className="w-1/2 flex flex-col gap-4">
                    <p className="font-bold text-xl">Cliente</p>
                    <SearchForm
                        cliente={contacto}
                        list={clientes}
                        onChangeCliente={handleChange}
                    />
                </div>

                <div className="w-1/2 flex flex-col gap-2">
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

export default Filtro;
