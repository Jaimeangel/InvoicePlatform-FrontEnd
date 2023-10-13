import { useEffect, useState } from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//hooks
import useCliente from '../../hooks/useCliente.jsx'
import useAuth from '../../hooks/useAuth.jsx'
//herlpers
import ContadorCotizaciones from "../../helpers/ContadorCotizaciones.js";

function DatosCliente({setCliente}){
  //hooks
  const {
    obtenerClientesByUsuario,
    clientes
  }=useCliente()

  const {auth}=useAuth()

  //state
  const [contacto,setContacto]=useState("")
  const [numberCotizacion,SetNumberCotizacion]=useState('CTZ-NONE')

  useEffect(()=>{
    const getClientes= async ()=>{
      const clientes = await obtenerClientesByUsuario()
    }
    getClientes()
  },[])

  const handleChange =(event)=>{
    const id_cliente=event.target.value
    const clienteById = clientes.find((clte) => clte._id === id_cliente);
    setCliente(clienteById) 
    setContacto(`${clienteById.nombres} ${clienteById.apellidos}`)
  }

  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">
      
      <h1 className="mb-5 text-2xl font-bold">Datos del cliente</h1>

      <div className="flex flex-row justify-between">

        <div className="w-1/2 flex flex-col gap-2 px-5">

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Tipo de documento:</p>
            <p className="text-lg tracking-wider italic font-semibold">COTIZACION COMERCIAL</p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="clientes">Cliente</label>
            <div className="flex flex-row gap-2">
              
              <select
                onChange={handleChange}  
                className="w-11/12 border rounded-md px-3 py-2 shadow-sm"
              >
                <option value="" hidden>Buscar cliente</option>
                {
                  clientes?.map(cliente=>(
                    <option  key={cliente._id} value={cliente._id}>{cliente.razonSocial}</option>
                  ))
                }
              </select>

              <button
                className="w-1/12 bg-green-400 rounded-md border-2"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="frutas">Contacto</label>
            <input placeholder="Seleccione un cliente" className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm" type="text" value={contacto}/>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg" for="frutas">Responsables de cotizacion</label>
            <input className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm" type="text" value={auth.razonSocial}/>
          </div>

        </div>

        <div className="w-1/2 flex flex-col gap-2 px-5">

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Numero:</p>
            <p className="text-lg tracking-wider italic font-semibold">{numberCotizacion}</p>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Fecha de elaboracion:</p>
            <input type="date" className="border rounded-md px-3"/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default DatosCliente;
