import { useState,useEffect } from "react";
//pasos
const pasos=[
    {
        paso:1,
        text:'datos del cliente',
        porcentaje:6
    },
    {
        paso:2,
        text:'informacion encabezado',
        porcentaje:24
    },
    {
        paso:3,
        text:'agregar producto/servicio',
        porcentaje:45
    },
    {
        paso:4,
        text:'condiciones comerciales',
        porcentaje:62
    },
    {
        paso:5,
        text:'notas',
        porcentaje:78
    },
    {
        paso:6,
        text:'datos de envio',
        porcentaje:95
    }
]

function BarraProgreso() {
    const [pasoActual,setPasoActual]=useState(1)
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
        <div className="w-full  bg-white rounded-lg px-10 py-6 flex flex-col">
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
            <button 
                className="w-[10rem] bg-red-500"
                onClick={()=>setPasoActual(value=>value+1)}
            >
                next
            </button>
        </div>
    )
}

export default BarraProgreso;
