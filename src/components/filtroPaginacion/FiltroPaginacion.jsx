import { useState,useEffect } from "react";

import Filtro from "./Filtro";
import Paginacion from "./Paginacion"

function FiltroPaginacion({
    WraperEncabezado,
    CardItems,
    lista,
    itemsPaginacion
}){
    const [listaFiltrada,setListaFiltrada]=useState([])

    const [itemsPorPagina]=useState(itemsPaginacion)
    const [paginaActual,setPaginaActual] = useState(1)

    function obtenerElementosPorPagina(arrayOriginal, paginacion) {
        const startIndex = (paginacion - 1) * itemsPorPagina;
        const endIndex = paginacion * itemsPorPagina;
        return arrayOriginal.slice(startIndex, endIndex);
    }

    useEffect(()=>{
        setListaFiltrada(lista)
    },[lista])

    useEffect(()=>{
        if(lista.length !== 0){
            const newArray = obtenerElementosPorPagina(lista,paginaActual)
            console.log(newArray)
            setListaFiltrada(newArray)
        }
    },[paginaActual,lista])

    return (
        <>
            <Filtro
                items={lista}
                actualizarItems={setListaFiltrada}
            />
            <WraperEncabezado>
                {
                    listaFiltrada?.map( data => (
                        <CardItems
                            key={data._id}
                            data={data}
                        />
                    )) 
                }
            </WraperEncabezado>
            <Paginacion
                longitud={lista.length}
                numeroItems={itemsPorPagina}
                numeroActualItem={paginaActual}
                cambiarNumeroActualItem={setPaginaActual}
            />
        </>
    )
}

export default FiltroPaginacion;
