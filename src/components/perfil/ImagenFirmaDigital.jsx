import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

function ImagenFirmaDigital(){
    const {cargarImagenUsuarioFirmaDigital,auth}=useAuth()
    const [fileImage,setFile]=useState(null)
    const [firmaRepresentante,setFirmaRepresentante]=useState(auth?.images?.firmaRepresentante?.url)

    const cargarImagen= async (e)=>{
        e.preventDefault()
        if(fileImage){
            const formData = new FormData();
            formData.append('image',fileImage)
            try {
                const response = await cargarImagenUsuarioFirmaDigital(formData)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('debe cargar una imagen')
        }
    }

    return (
        <div className='flex flex-col px-5 py-5 border rounded-md shadow-sm'>   
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p className='font-bold text-2xl'>Imagen firma digital</p>
                    <p className='font-semibold text-lg'>Cargar firma digital para tu cotizacion. Cargar tu firma en tu documento de cotizacion es opcional</p>
                </div>
            </div>
            <div className='mt-5 flex flex-col items-center'>
                { firmaRepresentante && (
                        <div
                            className='w-full'
                        > 
                            <img src={firmaRepresentante} className='max-w-md'/>
                        </div>
                    )
                }
                <form 
                    className='w-full flex flex-col gap-4 mt-3'
                >
                    <input 
                        type="file"
                        onChange={e=>setFile(e.target.files[0])}
                    />
                    <button
                        onClick={cargarImagen}
                        className='max-w-sm border bg-slate-200 border-slate-600 rounded-md outline-none'
                    >
                        Subir archivo
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ImagenFirmaDigital