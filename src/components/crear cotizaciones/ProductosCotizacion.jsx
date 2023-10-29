import { useState,useEffect } from "react";
//componentes
import AgregarProductos from "./AgregarProductos";
import CardProducto from "./CardProducto";
import CalculoTotalCotizacion from "./CalculoTotalCotizacion";
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

function ProductosCotizacion() {
    const [productos,setProductos]=useState([])
    return (
        <div className="bg-white w-full flex flex-col gap-2 rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2 mb-2 text-2xl font-bold">Agrega tus productos/servicios</h1>

            <div className="flex flex-col gap-5">
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
            </div>

            <div className="w-full flex flex-col gap-2">
                {
                    productos?.map((item,index)=>(
                        <CardProducto
                            key={index}
                            data={item}
                        />
                    ))
                }
                <AgregarProductos
                    productos={productos}
                    agregarProductos={setProductos}
                />
            </div>

            <div>
                <CalculoTotalCotizacion
                    productos={productos}
                />
            </div>
        </div>
    )
}

export default ProductosCotizacion;
