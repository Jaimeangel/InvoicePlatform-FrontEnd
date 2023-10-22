import { useState,useEffect } from "react";
//data
const itemsCotizacion=[
    {
        id:1,
        categoria:'item',
        proporcion:10
    },
    {
        id:2,
        categoria:'descripción',
        proporcion:50
    },
    {
        id:3,
        categoria:'cant',
        proporcion:10
    },
    {
        id:4,
        categoria:'impuesto',
        proporcion:10
    },
    {
        id:5,
        categoria:'valor total',
        proporcion:20
    }
]

function AgregarProductos() {
    return (
        <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">
            <h1 className="mt-2 mb-5 text-2xl font-bold">Agrega tus productos/servicios</h1>
            <div className="w-full flex flex-col gap-5">
                <div className="w-full flex flex-row bg-slate-100 border border-black rounded">
                    {
                        itemsCotizacion?.map((item)=>(
                            <p 
                                key={item.id} 
                                className={`${item.id === itemsCotizacion.length ?'border-r-none' :'border-r border-black'} text-center first-letter:uppercase font-semibold py-2`}
                                style={{
                                    width:`${item.proporcion}%`
                                }} 
                            >{item.categoria}</p>
                        ))
                    }
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default AgregarProductos;
