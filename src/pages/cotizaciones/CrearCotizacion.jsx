import { useState } from "react";
//components
import BarraProgreso from "../../components/BarraProgreso";
import BotonesBarraProgreso from "../../components/BotonesBarraProgreso";
//Componentes paso
import DatosCliente from "../../components/crear cotizaciones/DatosCliente";
import EncabezadoCotizacion from "../../components/crear cotizaciones/EncabezadoCotizacion";
//Datos
import formatData from "../../data/formatoDataCotizacion.js";
import pasos from "../../data/pasosCotizacion.js";

function CrearCotizacion() {
  //botones cambiar paso
  const numeroPasos=pasos.length;
  const [pasoActual,setPasoActual]=useState(2)
  const [validatePaso,setValidatePaso]=useState(false)

  //datos cotizacion
  const [cotizacion,setCotizacion]=useState(formatData)
  //datos cliente
  const [cliente,setCliente]=useState({})

  return (
    <div className="w-full flex flex-col gap-3">
      <BarraProgreso
        pasos={pasos}
        pasoActual={pasoActual}
      />

      {
        pasoActual === 1 && (
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
        )
      }

      {
        pasoActual === 2 && (
          <EncabezadoCotizacion
          />
        )
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
