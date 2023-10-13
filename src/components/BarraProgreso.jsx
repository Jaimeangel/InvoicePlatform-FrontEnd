import { useState,useEffect } from "react";

function BarraProgreso({pasos,pasoActual,cambiarPaso}) {
    const [porcentajeActual,setPorcentajeActual]=useState(0)

    useEffect(()=>{
        const resultado = pasos.reduce((porcentajeEncontrado, paso) => {
            if (paso.paso === pasoActual) {
              return paso.porcentaje;
            }
            return porcentajeEncontrado;
        }, null);
        setPorcentajeActual(resultado)
    },[pasoActual])

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
                    pasos.map((paso,i)=>(
                        <p key={i} className="first-letter:uppercase max-w-[5rem] text-center font-semibold text-md">{paso.text}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default BarraProgreso;
