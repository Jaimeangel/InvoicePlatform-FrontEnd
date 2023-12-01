import React, { useState } from 'react'
//hooks
import useAuth from '../../hooks/useAuth'

function ConfigCotizacion() {
    const {cargarImagenesUsuario}=useAuth()
    const [fileImage,setFile]=useState(null)

    const cargarImagen= async (e)=>{
        e.preventDefault()
        if(fileImage){
            const formData = new FormData();
            formData.append('image',fileImage)
            try {
                const response = await cargarImagenesUsuario(formData)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('debe cargar una imagen')
        }
    }

    return (
        <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">
        <form 
            className=' w-1/2 flex flex-col gap-4'
        >
            <input type="text" placeholder='nombre del archivo' className='border border-black outline-none px-6'/>
            <input 
                type="file"
                onChange={e=>setFile(e.target.files[0])}
            />
            <button
                onClick={cargarImagen}
                className='border bg-slate-200 border-slate-600 rounded-md outline-none'
            >
                Subir archivo
            </button>
        </form>
        </div>
    )
}

export default ConfigCotizacion;
