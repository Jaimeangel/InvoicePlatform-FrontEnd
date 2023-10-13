import { useState } from "react";
//components
import BarraProgreso from "../../components/BarraProgreso";
import DatosCliente from "../../components/crear cotizaciones/DatosCliente";
import BotonesBarraProgreso from "../../components/BotonesBarraProgreso";
//pasos barra de progreso
const pasos=[
  {
      paso:1,
      text:'datos del cliente',
      porcentaje:6
  },
  {
      paso:2,
      text:'informacion encabezado',
      porcentaje:24
  },
  {
      paso:3,
      text:'agregar producto/servicio',
      porcentaje:45
  },
  {
      paso:4,
      text:'condiciones comerciales',
      porcentaje:62
  },
  {
      paso:5,
      text:'notas',
      porcentaje:78
  },
  {
      paso:6,
      text:'datos de envio',
      porcentaje:95
  }
]


function CrearCotizacion() {
  const [pasoActual,setPasoActual]=useState(1)
  return (
    <div className="w-full flex flex-col gap-3">
      <BarraProgreso
        pasos={pasos}
        pasoActual={pasoActual}
      />
      {
        pasoActual === 1 && (
          <DatosCliente/>
        )
      }
      <BotonesBarraProgreso
        cambiarPaso={setPasoActual}
      />
    </div>
  )
}

export default CrearCotizacion;
