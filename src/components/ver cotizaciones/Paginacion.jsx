import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong,faRightLong } from "@fortawesome/free-solid-svg-icons";
 
const Paginacion = ({
  longitud,
  numeroItems,
  numeroActualItem,
  cambiarNumeroActualItem
})=> {
  const [numberItems] = useState(numeroItems)
  const [numberTotalPaginacion,setNumberTotalPaginacion] = useState([])
  
  const next = () => {
    if (numeroActualItem === numberTotalPaginacion.length) return;
 
    cambiarNumeroActualItem(prev => prev + 1);
  };
 
  const prev = () => {
    if (numeroActualItem === 1) return;
 
    cambiarNumeroActualItem(prev => prev - 1 );
  };

  const calcularNumeroTotalPaginacion = (longitud)=>{
    const numberTotal = Math.floor(longitud/numberItems)
    const respuesta = [];
    for (let i = 1; i <= numberTotal; i++) {
      respuesta.push(i);
    }
    return respuesta;
  }

  useEffect(()=>{
    const paginacionTotal = calcularNumeroTotalPaginacion(longitud)
    setNumberTotalPaginacion(paginacionTotal)
  },[longitud])
 
  return (
    <div className="flex items-center gap-4 justify-center mt-5">
      
      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={prev}
        disabled={numeroActualItem === 1}
      >
        <FontAwesomeIcon icon={faLeftLong} /> Anterior
      </button>

      <div className="flex items-center gap-2">
        {
          numberTotalPaginacion?.map( item =>{
            return <button key={item} value={item} className={`${item === numeroActualItem && 'bg-yellow-400'} border shadow hover:shadow-md font-semibold px-3.5 py-1.5 rounded-full`}>{item}</button>
          })
        }
      </div>

      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={next}
        disabled={numeroActualItem === numberTotalPaginacion.length}
      >
        Siguiente
        <FontAwesomeIcon icon={faRightLong} />
      </button>

    </div>
  );
}


export default Paginacion;