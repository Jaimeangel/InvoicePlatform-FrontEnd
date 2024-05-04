import { useState,useEffect } from "react";
import useCrearCotizacion from "../hooks/useCrearCotizacion";

function BarraProgreso({pasos}) {

    const {
        index,
        indexCotizacion
    }=useCrearCotizacion()

    const [porcentajeActual]=useState(indexCotizacion[index].porcentaje)

    return (
        <div className="w-full  bg-white rounded-lg shadow-md  px-10 py-6 flex flex-col">
            <div className="w-full border rounded-2xl shadow-inner">
                <div
                    style={{
                        height:'12px',
                        width:`${porcentajeActual}%`,
                        borderRadius: '1rem',
                        backgroundColor: 'rgb(34 197 94)'
                    }} 
                ></div>
            </div>
            <div className="w-full flex flex-row justify-between mt-5 items-center">
                {
                    Object.entries(indexCotizacion).map(([key, value])=>{
                        const { index, label} = value;
                        return <p key={index} className="first-letter:uppercase max-w-[10rem] font-semibold text-md text-center">{label}</p>
                    })
                }
            </div>
        </div>
    )
}

export default BarraProgreso;
