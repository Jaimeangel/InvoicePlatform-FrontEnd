import { useEffect, useState } from "react";
//hooks
import useCliente from '../../hooks/useCliente.jsx'
import useAuth from '../../hooks/useAuth.jsx'
//herlpers
import ContadorCotizaciones from "../../helpers/ContadorCotizaciones.js";
//componentes
import SearchForm from "../SearchForm.jsx";
import ModalCrearCliente from "./ModalCrearCliente.jsx";
import AlertaForm from "../alertas/AlertaForm.jsx";

function DatosCliente({
  setCliente,
  cliente,
  cotizacion,
  setCotizacion,
  validatePaso,
  cambiarPaso,
  setValidatePaso,
  pasoActual,
  numeroPasos
}){
  //hooks
  const {
    obtenerClientesByUsuario,
    clientes
  }=useCliente()

  const {
    auth
  }=useAuth()

  //state
  const [contacto,setContacto]=useState('')
  const [numeroCotizacion,SetNumberCotizacion]=useState('ctz')
  const [fecha,setDate]=useState('')

  //alertas
  const [alert,setAlert]=useState({msg:'',error:false})

  const validateCambiarPaso=()=>{
    if(pasoActual===numeroPasos) return
    cambiarPaso(value=>value+1)
  }
  
  //cargar clientes
  useEffect(()=>{
    const getClientes= async ()=>{
      const clientes = await obtenerClientesByUsuario()
    }
    getClientes()
  },[])

  //persistencia de informacion
  useEffect(()=>{
    if(Object.keys(cliente).length !== 0){
      setContacto(cliente)
    }

    if('fecha' && 'numeroCotizacion' in cotizacion){
      if(cotizacion.numeroCotizacion !== ''){
        SetNumberCotizacion(cotizacion.numeroCotizacion)
      }
      if(cotizacion.fecha !== ''){
        setDate(cotizacion.fecha)
      }
    }
  },[])

  //validacion para cambiar paso
  useEffect(()=>{
    if(validatePaso){
      if([contacto,numeroCotizacion,fecha].includes('')){
          
          setAlert({
            msg:'Es necesario llenar todos los campos para pasar al siguiente paso',
            error:true
          })
          
          setTimeout(() => {
            setAlert({
              msg:'',
              error:true
            })
          }, 4000);
  
          setValidatePaso(false)
  
          return
      }
      setValidatePaso(false)
      validateCambiarPaso()
    }
  },[validatePaso])

  //actulizando informacion en state principal
  useEffect(()=>{
    const newData={
      ...cotizacion,
      numeroCotizacion,
      fecha
    }
    setCotizacion(newData)
  },[contacto,fecha])

  //guardar informacion del cliente
  const handleChange =(dataCliente)=>{
    setCliente(dataCliente) 
    setContacto(dataCliente)
  }

  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">

      {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
      
      <h1 className="mt-2 mb-5 text-2xl font-bold">Datos del cliente</h1>

      <div className="flex flex-row justify-between">

        <div className="w-1/2 flex flex-col gap-2 px-5">

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Tipo de documento:</p>
            <p className="text-lg tracking-wider italic font-semibold">COTIZACION COMERCIAL</p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg">Cliente</label>
            <div className="flex flex-row gap-1">
              
              <SearchForm
                cliente={cliente}
                list={clientes}
                onChangeCliente={handleChange}
              />
              
              <ModalCrearCliente/>
            </div>
          </div>

          {
            contacto !== '' && (
              <div className="w-full flex flex-col gap-1">
                <label className="font-semibold text-lg">Contacto</label>
                <p className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm">
                  {`${contacto.nombreContacto} ${contacto.apellidoContacto}`}
                </p>
              </div>
            )
          }


          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-lg">Responsables de cotizacion</label>
            <p className="w-11/12 border rounded-md px-3 py-2 outline-none shadow-sm">
              {auth.razonSocial}
            </p>
          </div>

        </div>

        <div className="w-1/2 flex flex-col gap-2 px-5">

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Numero:</p>
            <p className="text-lg tracking-wider italic font-semibold">{numeroCotizacion}</p>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-lg">Fecha de elaboracion:</p>
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
