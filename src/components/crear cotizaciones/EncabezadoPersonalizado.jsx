import { useEffect, useState } from "react";
import AlertaForm from "../alertas/AlertaForm.jsx";

function EncabezadoPersonalizado({
    stateInicial,
    cambiarContenido
}){

    const [texto,setTexto]=useState(stateInicial['PERSONALIZADO'].text)

    const handleChange = (e)=>{
        e.preventDefault()

        setTexto({
            ...texto,
            [e.target.name]:e.target.value
        })

        const newData = {
            ...stateInicial,
            'PERSONALIZADO':{
                ...stateInicial['PERSONALIZADO'],
                text:texto
            }
        }

        cambiarContenido(newData)
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2 font-semibold'>
                <textarea
                    name="texto1" 
                    onChange={handleChange}
                    className='text-justify border px-3 py-1 rounded-md'
                ></textarea>
                <textarea
                    name="texto2" 
                    onChange={handleChange}
                    className='text-justify border px-3 py-1 rounded-md'
                ></textarea>
            </div>
        </div>
    )
}

export default EncabezadoPersonalizado;
