import { useEffect, useState } from "react";
//imagen
import createEncabezado from '../../assets/undraw_create_re_57a3.svg'
//componentes
import AlertImage from "../alertas/AlertaImagen.jsx";
import SwitchButton from "../Switch.jsx";

function EncabezadoPersonalizado({estado,id,cambiarEstado,encabezados,cambiarEstadoEncabezado}) {
    //boton
    const [ok,setOk]=useState(false)
    //texto
    const [parrafo1,setParrafo1]=useState('')
    const [parrafo2,setParrafo2]=useState('')
    const [parrafo3,setParrafo3]=useState('')

    const handleEncabezadoNuevo =()=>{
        const new_data={
            texto1:parrafo1,
            texto2:parrafo2,
            texto3:parrafo3
        }

        const encabezadosModificados = encabezados.map(item => {
            if(item.id === id) {
                item.text= new_data
                return item;
            }else {
                return item;
            }
        });

        cambiarEstadoEncabezado(encabezadosModificados)
        setOk(true)

    }

    return (
        <div>
            {
                !estado ? (
                    <div className="w-full flex flex-col items-center">
                        <AlertImage
                            imgAlert={createEncabezado}
                            msg='¿Te gustaria crear un encabezado personalizado?'
                        >
                            <SwitchButton
                                enabled={estado}
                                setEnabled={()=>cambiarEstado(id)}
                            />
                        </AlertImage>
                    </div>
                ):(
                    <div className="flex flex-col gap-5">
                        <div className="w-full">
                            <div className='flex flex-col gap-1 items-left'>
                                <label className='text-lg font-bold tracking-wider italic pl-1'>Parrafo 1</label>
                                <textarea name="" id="" cols="5" rows="1"
                                    value={parrafo1}
                                    onChange={(e)=>setParrafo1(e.target.value)}
                                    className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                >
                                </textarea>
                            </div>
                            <div className='flex flex-col gap-1 items-left'>
                                <label className='text-lg font-bold tracking-wider italic pl-1'>Parrafo 2</label>
                                <textarea name="" id="" cols="5" rows="1"
                                    value={parrafo2}
                                    onChange={(e)=>setParrafo2(e.target.value)}
                                    className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                >
                                </textarea>
                            </div>
                            <div className='flex flex-col gap-1 items-left'>
                                <label className='text-lg font-bold tracking-wider italic pl-1'>Parrafo 2</label>
                                <textarea name="" id="" cols="5" rows="1"
                                    value={parrafo3}
                                    onChange={(e)=>setParrafo3(e.target.value)}
                                    className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between px-3 items-center">
                            <SwitchButton
                                enabled={estado}
                                setEnabled={()=>cambiarEstado(id)}
                            />
                            <input
                                type="button"
                                onClick={handleEncabezadoNuevo}
                                value={`${ok ?'Encabezado listo':'Personalizar encabezado'}`}
                                className={`${ok ?'bg-blue-300 border border-blue-600' :'bg-slate-200 border border-slate-300'} text-black text-lg tracking-wide font-bold px-4 py-2 rounded-lg cursor-pointer`}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EncabezadoPersonalizado;
