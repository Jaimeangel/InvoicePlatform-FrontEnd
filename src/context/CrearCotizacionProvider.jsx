import { createContext, useEffect, useState } from "react";

//Componentes pasos cotizacion
import DatosCliente from "../components/crear cotizaciones/DatosCliente";
import EncabezadoCotizacion from "../components/crear cotizaciones/EncabezadoCotizacion";
import ProductosCotizacion from "../components/crear cotizaciones/ProductosCotizacion";
import CondicionesComerciales from "../components/crear cotizaciones/CondicionesComerciales.jsx";
import DatosEnvio from "../components/crear cotizaciones/DatosEnvio.jsx";
import EnviarCotizacion from "../components/crear cotizaciones/EnviarCotizacion.jsx";

const CrearCotizacionContext = createContext()

const indexCotizacion = {
    1:{
        index:1,
        label:'datos del cliente',
        porcentaje:8,
        componente:<DatosCliente/>
    },
    2:{
        index:2,
        label:'informacion de encabezado',
        porcentaje:25,
        componente:<EncabezadoCotizacion/>
    },
    3:{
        index:3,
        label:'agregar producto/servicio',
        porcentaje:44,
        componente:<ProductosCotizacion/>
    },
    4:{
        index:4,
        label:'informacion comercial',
        porcentaje:63,
        componente:<CondicionesComerciales/>
    },
    5:{
        index:5,
        label:'datos de envio',
        porcentaje:80,
        componente:<DatosEnvio/>
    },
    6:{
        index:6,
        label:'enviar cotizacion',
        porcentaje:100,
        componente:<EnviarCotizacion/>
    }
}

const CrearCotizacionProvider = ({children})=>{
    const [limitIndex]=useState(Object.keys(indexCotizacion).length)
    const [index,setIndex]=useState(1)
    const [approve,setApprove]=useState(false)
    const [componente,setComponente]=useState(null)

    const retroceder = ()=>{
        if(index === 1) return null
        setIndex(prev => prev - 1)
    }

    const avanzar = ()=>{
        setIndex(prev => prev + 1)
    }

    const aprobarAvanzar =()=>{
        setApprove(true)
    }

    const verificarDataCompleta = ()=>{
        avanzar()
        setApprove(false)
    }

    useEffect(()=>{
        approve && verificarDataCompleta()
    },[approve])

    useEffect(()=>{
        setComponente(indexCotizacion[index].componente)
    },[index])

    return (
        <CrearCotizacionContext.Provider 
            value={{
                retroceder,
                aprobarAvanzar,
                index,
                componente,
                limitIndex,
                indexCotizacion
            }}
        >
            {children}
        </CrearCotizacionContext.Provider>
    )
}


export {
    CrearCotizacionContext
}

export default CrearCotizacionProvider;