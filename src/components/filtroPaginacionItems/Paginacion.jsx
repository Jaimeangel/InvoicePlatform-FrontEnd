import { useEffect, useState,useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong,faRightLong } from "@fortawesome/free-solid-svg-icons";
import { filtroPaginacionItemsContext } from "../filtroPaginacionItems/FiltroPaginacionItems";

const Paginacion = () => {

  const {
    itemsPage,
    index,
    updateIndex,
    lengthPaginacion
  }=useContext(filtroPaginacionItemsContext)

  const [numberTotalPaginacion,setNumberTotalPaginacion] = useState([])
  
  const next = () => {
    if (index === numberTotalPaginacion.length) return;
 
    updateIndex(prev => prev + 1);
  };
 
  const prev = () => {
    if (index === 1) return;
 
    updateIndex(prev => prev - 1 );
  };

  const calcularNumeroTotalPaginacion = (longitud)=>{
    let numberTotal = Math.floor(longitud/itemsPage)

    if(numberTotal === 0){
      numberTotal = 1
    }
    const respuesta = [];
    for (let i = 1; i <= numberTotal; i++) {
      respuesta.push(i);
    }
    return respuesta;
  }

  useEffect(()=>{
    const paginacionTotal = calcularNumeroTotalPaginacion(lengthPaginacion)
    setNumberTotalPaginacion(paginacionTotal)
  },[lengthPaginacion])
 
  return (
    <div className="flex items-center gap-4 justify-center mt-5">
      
      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={prev}
        disabled={index === 1}
      >
        <FontAwesomeIcon icon={faLeftLong} /> Anterior
      </button>

      <div className="flex items-center gap-2">
        {
          numberTotalPaginacion?.map( item =>{
            return <button key={item} value={item} className={`${item === index && 'bg-yellow-400'} border border-black shadow hover:shadow-md font-semibold px-3.5 py-1.5 rounded-full`}>{item}</button>
          })
        }
      </div>

      <button
        variant="text"
        className="flex items-center gap-2 border px-3 py-2 rounded-md font-semibold shadow-sm hover:shadow"
        onClick={next}
        disabled={index === numberTotalPaginacion.length}
      >
        Siguiente
        <FontAwesomeIcon icon={faRightLong} />
      </button>

    </div>
  );
}


export default Paginacion;