import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong,faRightLong } from "@fortawesome/free-solid-svg-icons";
 
const Paginacion = ({longitud})=> {
  const NUMBER_ITEMS = 5
  const [activePaginacion,setActivePaginacion] = useState(1);
  const [numberTotalPaginacion,setNumberTotalPaginacion] = useState([])
  
  const next = () => {
    if (activePaginacion === 5) return;
 
    setActivePaginacion(prev => prev + 1);
  };
 
  const prev = () => {
    if (activePaginacion === 1) return;
 
    setActivePaginacion(prev => prev - 1 );
  };

  const calcularNumeroTotalPaginacion = (longitud)=>{
    const numberTotal = Math.floor(longitud/NUMBER_ITEMS)
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
    <div className="flex items-center gap-4 justify-center">
      
      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={prev}
        disabled={activePaginacion === 1}
      >
        <FontAwesomeIcon icon={faLeftLong} /> Anterior
      </button>

      <div className="flex items-center gap-2">
        {
          numberTotalPaginacion?.map( item =>{
            return <button key={item} value={item} className="border shadow hover:shadow-md font-semibold px-3.5 py-1.5 rounded-full">{item}</button>
          })
        }
      </div>

      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={next}
        disabled={activePaginacion === 5}
      >
        Siguiente
        <FontAwesomeIcon icon={faRightLong} />
      </button>

    </div>
  );
}


export default Paginacion;