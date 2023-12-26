import { useEffect, useState } from "react";
//imagen
import createEncabezado from '../../assets/undraw_create_re_57a3.svg'
//componentes
import AlertImage from "../alertas/AlertaImagen.jsx";
import SwitchButton from "../Switch.jsx";
import AlertaForm from "../alertas/AlertaForm.jsx";

function EncabezadoPersonalizado({
    encabezado,
    estado,
    id,
    cambiarEstado,
    encabezados,
    cambiarEstadoEncabezado
}){
    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //visualizar UI encabezado personalizado
    const [showEncabezadoCreado,setShowEncabezadoCreado]=useState(false)
    //texto
    const [parrafo1,setParrafo1]=useState('')
    const [parrafo2,setParrafo2]=useState('')
    const [parrafo3,setParrafo3]=useState('')

    const handleCrearEncabezadoNuevo = ()=>{
        if(!(parrafo1.trim() || parrafo2.trim() || parrafo3.trim())){
            setAlert({
                msg:'Es necesario llenar por lo menos alguno de los campos',
                error:true
            })
            
            setTimeout(() => {
                setAlert({
                    msg:'',
                    error:true
                })
            }, 4000);

            return
        }
        const new_data={
            texto1:parrafo1,
            texto2:parrafo2,
            texto3:parrafo3
        }

        const encabezadosModificados = encabezados.map(item => {
            if(item.id === id) {
                item.text = new_data
                return item;
            }else {
                return item;
            }
        });

        cambiarEstadoEncabezado(encabezadosModificados)
        setShowEncabezadoCreado(true)

    }

    //persistencia de informacion
    useEffect(()=>{
        //verifica si esta seleccionado,y si lo esta, verifica si tiene contenido agregado por boton.
        if (encabezado.selecionado === true &&
            (encabezado.text.texto1 !== '' || 
             encabezado.text.texto2 !== '' ||
             encabezado.text.texto3 !== '')) {
        
            setParrafo1(encabezado.text.texto1);
            setParrafo2(encabezado.text.texto2);
            setParrafo3(encabezado.text.texto3);
        
            // Cambiar boton
            setShowEncabezadoCreado(true);
        }
    },[])

    //resetear valores por defecto cuando la opcion encabezado personalizado se desactive
    useEffect(()=>{
        if(estado === false){
            //reset valores de data encabezado personalizado
            setParrafo1('');
            setParrafo2('');
            setParrafo3('');

            setShowEncabezadoCreado(false)

            //reset valores categoria personalizado del state padre
            const new_data={
                texto1:parrafo1,
                texto2:parrafo2,
                texto3:parrafo3
            }
            
            const encabezadosModificados = encabezados.map(item => {
                if(item.id === id) {
                    item.text = new_data
                    return item;
                }else {
                    return item;
                }
            });
    
            cambiarEstadoEncabezado(encabezadosModificados)
        }
    },[estado])

    return (
        <div>
            {
                !estado 
                ?
                    <div className="w-full flex flex-col items-center">
                        <AlertImage
                            imgAlert={createEncabezado}
                            msg='Crear un encabezado personalizado'
                        >
                            <SwitchButton
                                enabled={estado}
                                setEnabled={()=>cambiarEstado(id)}
                            />
                        </AlertImage>
                    </div>
                :
                    <div className="flex flex-col gap-5">
                        {
                            !showEncabezadoCreado 
                            ? 
                            
                                <div className="w-full">
                                    <h1 className="mt-2 mb-2 text-lg font-semibold italic text-justify">¡Personaliza tu encabezado! Completa uno de los campos a continuación. Para obtener mejores resultados, te sugerimos dividir tu contenido en tres párrafos. Esto ayudará a mejorar la presentación y legibilidad de tu encabezado. Despues haz click en crear encabezado.</h1>
                                    {alert.msg.length!==0 && <AlertaForm alert={alert}/>}

                                    <div className="w-full">
                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-md font-bold tracking-wider italic pl-1'>parrafo 1</label>
                                            <textarea name="" id="" cols="5" rows="1"
                                                value={parrafo1}
                                                onChange={(e)=>setParrafo1(e.target.value)}
                                                className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                            >
                                            </textarea>
                                        </div>
                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-md font-bold tracking-wider italic pl-1'>parrafo 2</label>
                                            <textarea name="" id="" cols="5" rows="1"
                                                value={parrafo2}
                                                onChange={(e)=>setParrafo2(e.target.value)}
                                                className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                            >
                                            </textarea>
                                        </div>
                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-md font-bold tracking-wider italic pl-1'>parrafo 3</label>
                                            <textarea name="" id="" cols="5" rows="1"
                                                value={parrafo3}
                                                onChange={(e)=>setParrafo3(e.target.value)}
                                                className="bg-gray-50 w-full cursor-pointer border rounded-md px-6 py-2 outline-none"
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            :
                                <div className='flex flex-col gap-4 font-semibold'>
                                    <p className='text-justify'>{parrafo1}</p>
                                    <p className='text-justify'>{parrafo2}</p>
                                    <p className='text-justify'>{parrafo3}</p>
                                </div>
                        }
                        <div className="flex flex-row justify-between px-3 items-center">
                            <SwitchButton
                                enabled={estado}
                                setEnabled={()=>cambiarEstado(id)}
                            />
                            {
                                !showEncabezadoCreado && (
                                    <input
                                        type="button"
                                        onClick={handleCrearEncabezadoNuevo}
                                        value={'crear encabezado'}
                                        className='bg-yellow-300 border-2 border-yellow-500 text-black text-lg tracking-wide font-semibold px-4 rounded-md cursor-pointer'
                                    />
                                )
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default EncabezadoPersonalizado;
