import { useState } from "react";
//components dashboard principal
import BarraProgreso from "../../components/BarraProgreso";
import BotonesBarraProgreso from "../../components/BotonesBarraProgreso";
//Componentes pasos cotizacion
import DatosCliente from "../../components/crear cotizaciones/DatosCliente";
import EncabezadoCotizacion from "../../components/crear cotizaciones/EncabezadoCotizacion";
import ProductosCotizacion from "../../components/crear cotizaciones/ProductosCotizacion";
import CondicionesComerciales from "../../components/crear cotizaciones/CondicionesComerciales.jsx";
import DatosEnvio from "../../components/crear cotizaciones/DatosEnvio.jsx";
import EnviarCotizacion from "../../components/crear cotizaciones/EnviarCotizacion.jsx";
//Datos
import formatData from "../../data/formatoDataCotizacion.js";
import pasos from "../../data/pasosCotizacion.js";

function CrearCotizacion() {
  //botones cambiar paso
  const numeroPasos=pasos.length;
  const [pasoActual,setPasoActual]=useState(1)
  const [validatePaso,setValidatePaso]=useState(false)

  //datos cotizacion
  const [cotizacion,setCotizacion]=useState(formatData)
  //datos cliente
  const [cliente,setCliente]=useState({})
  //datos de envio
  const [dataEnvio, setDataEnvio] = useState({
    email:{
      destinos:[]
    },
    celular:{
      destinos:[]
    }
  })

  return (
    <div className="w-full flex flex-col gap-3">
      <BarraProgreso
        pasos={pasos}
        pasoActual={pasoActual}
      />

      {
        pasoActual === 1 && 
          <DatosCliente
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cliente={cliente}
            setCliente={setCliente}
            setCotizacion={setCotizacion}
            cotizacion={cotizacion}
          />
      }

      {
        pasoActual === 2 && 
          <EncabezadoCotizacion
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cotizacion={cotizacion}
            setCotizacion={setCotizacion}
          />
      }

      {
        pasoActual === 3 && 
          <ProductosCotizacion
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cotizacion={cotizacion}
            setCotizacion={setCotizacion}
          />
      }

      {
        pasoActual === 4 && 
          <CondicionesComerciales
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cotizacion={cotizacion}
            setCotizacion={setCotizacion}
          />
      }

      {
        pasoActual === 5 && 
          <DatosEnvio
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cliente={cliente}
            setDataEnvio={setDataEnvio}
            dataEnvio={dataEnvio}
          />
      }

      {
        pasoActual === 6 && 
          <EnviarCotizacion
            cambiarPaso={setPasoActual}
            validatePaso={validatePaso}
            setValidatePaso={setValidatePaso}
            numeroPasos={numeroPasos}
            pasoActual={pasoActual}
            cotizacion={cotizacion}
            setCotizacion={setCotizacion}
            cliente={cliente}
          />
      }
      
      <BotonesBarraProgreso
        numeroPasos={numeroPasos}
        pasoActual={pasoActual}
        cambiarPaso={setPasoActual}
        setValidatePaso={setValidatePaso}
      />
    </div>
  )
}

export default CrearCotizacion;
