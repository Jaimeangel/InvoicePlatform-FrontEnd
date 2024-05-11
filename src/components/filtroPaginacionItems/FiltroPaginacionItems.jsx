import { useState,useEffect,createContext } from "react"

import Filtro from "./Filtro"
import Paginacion from "./Paginacion"
import WraperItems from "./WraperItems"

import { obtenerElementosPorPagina } from "../../helpers/obtenerElementosPaginacion"

const filtroPaginacionItemsContext = createContext()


function FiltroPaginacion({
    children,
    lista,
    dataItems,
    numberItems=4
}){

    const [listItems,setListItems]=useState([])
    const [listFilter,setListFilter]=useState([])
    const [itemsPage]=useState(numberItems)
    const [index,setIndex] = useState(1)
    const [lengthPaginacion,setLengthPaginacion]=useState(null)

    useEffect(()=>{
        let listaElementos
        /* if items filter exist, then select them or original list was selected */
        if(listFilter.length){
            listaElementos = listFilter
            setIndex(1) // restore the index to 1
        }else{
            listaElementos = lista
        }

        /* update length pagination */
        setLengthPaginacion(listaElementos.length)

        /* update items list showed */
        const newArray = obtenerElementosPorPagina(listaElementos,index,itemsPage)
        setListItems(newArray)

    },[lista,listFilter,index])

    const value={
        array:lista,
        items:listItems,
        updateListFilter:setListFilter,
        index,
        updateIndex:setIndex,
        itemsPage,
        dataItems,
        lengthPaginacion
    }

    return (
        <filtroPaginacionItemsContext.Provider value={value}>
            {children}
        </filtroPaginacionItemsContext.Provider>
    )
}

export {
    filtroPaginacionItemsContext
}

export default FiltroPaginacion;

FiltroPaginacion.Filtro = Filtro;
FiltroPaginacion.Paginacion = Paginacion;
FiltroPaginacion.WraperItems  = WraperItems;

