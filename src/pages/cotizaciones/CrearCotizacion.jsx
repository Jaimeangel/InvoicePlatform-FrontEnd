import { useState } from "react";
//components
import BarraProgreso from "../../components/BarraProgreso";
import DatosCliente from "../../components/crear cotizaciones/DatosCliente";
import BotonesBarraProgreso from "../../components/BotonesBarraProgreso";
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
