import { useEffect, useState } from "react";
//hooks
import useCliente from '../../hooks/useCliente.jsx'
import useAuth from '../../hooks/useAuth.jsx'
//herlpers
import ContadorCotizaciones from "../../helpers/ContadorCotizaciones.js";
//componentes
import SearchForm from "../SearchForm.jsx";
import ModalCrearCliente from "../cliente/ModalCrearCliente.jsx";
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
  const {
    obtenerClientesByUsuario,
    clientes // clientes de bases de datos
  }=useCliente()

  const {
    auth
  }=useAuth()

  //data componente
  const [contacto,setContacto]=useState(cliente) // la informacion de cliente elegido viene del state principal
  const [numeroCotizacion,SetNumberCotizacion]=useState('ctz')
  const [fecha,setDate]=useState('')

  //estado de alerta
  const [alert,setAlert]=useState({msg:'',error:false})
  
  useEffect(()=>{
    //cargar clientes base de datos
    const getClientes= async ()=>{
      const clientes = await obtenerClientesByUsuario()
    }
    getClientes()

    //persistencia de informacion
    const { fecha, numeroCotizacion } = cotizacion;
    setDate(fecha); //fecha
    
    if (numeroCotizacion !== '') {
      SetNumberCotizacion(numeroCotizacion); // numero cotizacion
    }
  },[])

  //validacion para cambiar al siguiente paso
  useEffect(()=>{
    if(validatePaso){
      const camposRequeridos = [contacto,numeroCotizacion,fecha].includes('');
      if(camposRequeridos){
          
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
      cambiarPasoSiguiente()
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

  //guardar informacion del cliente elegido
  const handleChange =(dataCliente)=>{
    setCliente(dataCliente) // guarda informacion de cliente en state principal
    setContacto(dataCliente) // guarda informacion de cliente en state local
  }

  const cambiarPasoSiguiente=()=>{
    if(pasoActual===numeroPasos ) return
    cambiarPaso(value => value + 1 ) //cambiar al paso siguiente
  }

  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">

      {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
      
      <h1 className="mt-2 mb-5 text-2xl font-bold">Datos del cliente</h1>

      <div className="flex flex-row justify-between">

        <div className="w-2/3 flex flex-col gap-2 pr-5">

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
            Object.keys(contacto).length !== 0 && (
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

        <div className="w-1/3 flex flex-col gap-2 pl-10">

          <div className="flex flex-row gap-3">
            <p className="font-semibold text-lg">Numero:</p>
            <p className="text-lg tracking-wider italic font-semibold">{numeroCotizacion}</p>
          </div>

          <div className="flex flex-col gap-3">
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
