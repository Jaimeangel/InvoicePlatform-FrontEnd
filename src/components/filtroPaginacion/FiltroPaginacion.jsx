import { useState,useEffect } from "react";

import { obtenerElementosPorPagina } from "../../helpers/obtenerElementosPaginacion";

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

    useEffect(()=>{
        const newArray = obtenerElementosPorPagina(lista,paginaActual,itemsPorPagina)
        setListaFiltrada(newArray)
    },[lista])

    
    return (
        <div>
            <Filtro
                items={lista}
                actualizarItems={setListaFiltrada}
                paginaActual={paginaActual}
                itemsPorPagina={itemsPorPagina}
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
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />
        </div>
    )
}

export default FiltroPaginacion;
