import { useState,useEffect } from "react";
//componentes
import AgregarProductos from "./AgregarProductos";
import CardProducto from "./CardProducto";
import CalculoTotalCotizacion from "./CalculoTotalCotizacion";
import AlertaForm from "../alertas/AlertaForm";
//data
const itemsCotizacion=[
    {
        id:1,
        categoria:'item',
        proporcion:6
    },
    {
        id:2,
        categoria:'descripción',
        proporcion:45
    },
    {
        id:3,
        categoria:'valor unitario',
        proporcion:15
    },
    {
        id:4,
        categoria:'cant',
        proporcion:8
    },
    {
        id:5,
        categoria:'impuesto',
        proporcion:11
    },
    {
        id:6,
        categoria:'valor total',
        proporcion:15
    }
]

function ProductosCotizacion({
        cotizacion,
        setCotizacion,
        cambiarPaso,
        validatePaso,
        setValidatePaso,
        numeroPasos,
        pasoActual
}){
    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //productos
    const [productos,setProductos]=useState([])

    //handle cambiar de paso
    const validateCambiarPaso=()=>{
        if(pasoActual===numeroPasos) return
        cambiarPaso(value=>value+1)
    }

    //validacion para cambiar paso
    useEffect(()=>{
        if(validatePaso){
            const isEmptyProductos = productos.length ===0;
            if(isEmptyProductos){
                    
                setAlert({
                    msg:'Debe agregar al menos un producto/servicio',
                    error:true
                })
                    
                setTimeout(() => {
                    setAlert({
                        msg:'',
                        error:true
                    })
                }, 4000);
            
                setValidatePaso(false)
            
                return
            }
            setValidatePaso(false)
            validateCambiarPaso()
        }
    },[validatePaso])

    //persistencia de informacion
    useEffect(()=>{
        if(cotizacion.productos.length !==0){
            setProductos(cotizacion.productos)
        }
    },[])

    return (
        <div className="bg-white w-full flex flex-col gap-2 rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2 mb-2 text-2xl font-bold">Agrega tus productos/servicios</h1>
            {alert.msg.length!==0 && <AlertaForm alert={alert}/>}

            <div className="w-11/12 flex flex-row bg-slate-100 border border-black rounded">
                    {
                        itemsCotizacion?.map((item)=>(
                            <p 
                                key={item.id} 
                                className={`${item.id === itemsCotizacion.length ?'border-r-none' :'border-r border-black'} text-center first-letter:uppercase font-semibold`}
                                style={{
                                    width:`${item.proporcion}%`
                                }} 
                            >{item.categoria}</p>
                        ))
                    }
            </div>


            <div className="w-full flex flex-col gap-2">
                {
                    productos?.map((item,index)=>(
                        <CardProducto
                            index={index}
                            key={item.item}
                            data={item}
                            productos={productos}
                            agregarProductos={setProductos}
                        />
                    ))
                }
                <AgregarProductos
                    productos={productos}
                    agregarProductos={setProductos}
                />
            </div>

            <CalculoTotalCotizacion
                productos={productos}
                setCotizacion={setCotizacion}
                cotizacion={cotizacion}
            />
        </div>
    )
}

export default ProductosCotizacion;
