import { useEffect, useState } from "react";
//hooks
import useCliente from '../../hooks/useCliente.jsx'
import useAuth from '../../hooks/useAuth.jsx'
import useCotizacion from "../../hooks/useCotizacion.jsx";
//herlpers
import ContadorCotizaciones from "../../helpers/ContadorCotizaciones.js";
//componentes
import SearchForm from "../SearchForm.jsx";
import ModalCrearCliente from "../cliente/ModalCrearCliente.jsx";
import AlertaForm from "../alertas/AlertaForm.jsx";


import useCrearCotizacion from "../../hooks/useCrearCotizacion.jsx";

function DatosCliente(){

  const {
    cotizacion, 
    dispatch
  }=useCrearCotizacion()

  const {
    obtenerClientesByUsuario,
    clientes // clientes de bases de datos
  }=useCliente()

  const {
    auth
  }=useAuth()

  const {
    obtenerCotizacionesLength
  }=useCotizacion()

  const [numeroCotizacion,SetNumberCotizacion]=useState('ctz')
  const [fecha,setDate]=useState(cotizacion?.fecha)

  //estado de alerta
  const [alert,setAlert]=useState({msg:'',error:false})
  
  useEffect(()=>{
    const getClientes= async ()=>{
      const clientes = await obtenerClientesByUsuario()
    }
    getClientes()

  },[])

  useEffect(()=>{
    const numberCotizacion = async ()=>{
      try {
        const number = await obtenerCotizacionesLength()
        const numberCotizacion = ContadorCotizaciones(number)
        SetNumberCotizacion(numberCotizacion)
      } catch (error) {
        console.log(error)
      }
    }
    numberCotizacion()
  },[])

  //actulizando informacion en state principal
  useEffect(()=>{
    const newData={
      numeroCotizacion,
      fecha
    }
    dispatch({
      type:'ADD_DATA_COTIZACION',
      payload:newData
    })
  },[fecha])

  
  const handleChangeCliente =(dataCliente)=>{
    dispatch({
      type:'ADD_CLIENTE',
      payload:dataCliente
    })
  }


  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">

      {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
      
      <h1 className="mt-2 mb-5 text-2xl font-bold italic">Datos del cliente</h1>

      <div className="flex flex-row justify-between">

        <div className="w-2/3 flex flex-col gap-2 pr-5">

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">tipo de documento:</p>
            <p className="text-xl tracking-wider italic font-bold">cotización comercial</p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg">cliente</label>
            <div className="flex flex-row gap-1">
              
              <SearchForm
                cliente={cotizacion?.cliente}
                list={clientes}
                onChangeCliente={handleChangeCliente}
              />
              
              <ModalCrearCliente/>
            </div>
          </div>

          {
            cotizacion?.cliente  && (
              <div className="w-full flex flex-col gap-1">
                <p className="font-semibold text-lg">contacto</p>
                <p className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm">
                  {`${cotizacion?.cliente.nombreContacto} ${cotizacion?.cliente.apellidoContacto}`}
                </p>
              </div>
            )
          }


          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg">responsables de cotización</label>
            <p className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm">
              {auth.razonSocial}
            </p>
          </div>

        </div>

        <div className="w-1/3 flex flex-col gap-2 pl-10">

          <div className="flex flex-wrap gap-1">
            <p className="font-semibold text-lg">numero de cotización:</p>
            <p className="text-lg tracking-wider italic font-semibold">{numeroCotizacion}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-lg">fecha de creación</p>
            <input
              value={fecha}
              onChange={(e)=>setDate(e.target.value)} 
              type="date" 
              className="border rounded-md px-3"
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export default DatosCliente;
