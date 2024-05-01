import { useEffect, useState } from "react";

import AlertaWrapper from "../../components/alertas/AlertaWrapper";
import FiltroPaginacion from "../../components/filtroPaginacion/FiltroPaginacion";
import EncabezadoCliente from "../../components/cliente/EncabezadoCliente"
import CardCliente from "../../components/cliente/CardCliente";
import ModalDataCliente from "../../components/modal/ModalDataCliente";

import useCliente from "../../hooks/useCliente";


function VisualizarClientes() {

  const {
    obtenerClientesByUsuario,
    clientes
  }=useCliente()


  const [catchError,setCatchError]=useState({
    msg:false,
    error:''
  })

  const [openModal,setOpenModal]=useState(false)
  const [dataCotizacion,setDataCotizacion]=useState({})

  const getClientes = async ()=>{
    try {
      const clientes = await obtenerClientesByUsuario()
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
    getClientes()
  },[])

  useEffect(()=>{
    if(!openModal){
      setDataCotizacion({})
    }
  },[openModal])

  const callbackModalCotizacion=(data)=>{
    setOpenModal(true)
    setDataCotizacion(data)
  }

  return (
    <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
      <AlertaWrapper alert={catchError}>
        <h1 className="mt-2 mb-5 text-3xl font-bold italic">Clientes</h1>
        <ModalDataCliente 
          open={openModal} 
          close={()=>setOpenModal(false)} 
          data={dataCotizacion}
        >
          <FiltroPaginacion
            WraperEncabezado={EncabezadoCliente}
            CardItems={CardCliente}
            lista={clientes}
            itemsPaginacion={4}
            callback={callbackModalCotizacion}
          />
        </ModalDataCliente>
      </AlertaWrapper>
    </div>
  )
}

export default VisualizarClientes;
