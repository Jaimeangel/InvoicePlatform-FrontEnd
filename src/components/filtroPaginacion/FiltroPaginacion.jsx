import { useState,useEffect } from "react";

import Filtro from "./Filtro";
import Paginacion from "./Paginacion"

import { obtenerElementosPorPagina } from "../../helpers/obtenerElementosPaginacion";

function FiltroPaginacion({
    WraperEncabezado,
    CardItems,
    lista,
    itemsPaginacion
}){
    const [listaFiltrada,setListaFiltrada]=useState([])
    const [itemsPorPagina]=useState(itemsPaginacion)

    useEffect(()=>{
        const newArray = obtenerElementosPorPagina(lista,1,itemsPorPagina)
        setListaFiltrada(newArray)
    },[lista])

    return (
        <div>
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
                numeroItems={itemsPorPagina}
                items={lista}
                actualizarItems={setListaFiltrada}
            />
        </div>
    )
}

export default FiltroPaginacion;
