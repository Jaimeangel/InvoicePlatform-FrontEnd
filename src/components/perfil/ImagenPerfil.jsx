import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

function ImagenPerfil() {
    const {cargarImagenUsuarioProfile,auth}=useAuth()
    const [fileImage,setFile]=useState(null)
    const [profileImange,setProfileImange]=useState(auth?.images?.profileImange?.url)

    const cargarImagen= async (e)=>{
        e.preventDefault()
        if(fileImage){
            const formData = new FormData();
            formData.append('image',fileImage)
            try {
                const response = await cargarImagenUsuarioProfile(formData)
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
                    <p className='font-bold text-2xl'>Imagen de perfil</p>
                </div>
            </div>
            <div className='mt-5 flex flex-row items-center'>
                { profileImange && 
                    (
                        <div
                            className='w-1/2'
                        > 
                            <img src={profileImange} className='w-24 h-24'/>
                        </div>
                    ) 
                }
                <form 
                    className='w-1/2 flex flex-col gap-4'
                >
                    <input 
                        type="file"
                        onChange={e=>setFile(e.target.files[0])}
                    />
                    <button
                        onClick={cargarImagen}
                        className='max-w-sm  border bg-slate-200 border-slate-600 rounded-md outline-none'
                    >
                        Subir archivo
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ImagenPerfil
