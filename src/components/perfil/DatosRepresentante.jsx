import { useState } from "react";
//componentes
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
//data
import { identificaciones } from "../../data/formatoDataCliente";

function DatosRepresentante({data}) {
    //permitir habilitar editar un campo input
    const [disabled,setDisabled]=useState(true)
    //data form
    const [nombres,setNombres]=useState(data?.nombres)
    const [apellidos,setApellidos]=useState(data?.apellidos)
    const [tipoIdenti,setTipoIdenti]=useState(data?.tipoIdenti)
    const [identificacion,setIdentificacion]=useState(data?.identificacion)
    const [cargoRepresentante,setCargoRepresentante]=useState(data?.cargoRepresentante)
    const [emailRepresentante,setEmailRepresentante]=useState(data?.emailRepresentante)
    const [celularRepresentante,setCelularRepresentante]=useState(data?.celularRepresentante)
    return (
        <div className='flex flex-col px-5 py-5 border rounded-md shadow-sm mt-5'>
            
                <div className='flex flex-row justify-between items-center'>

                    <div>
                        <p className='font-bold text-2xl'>Datos de Representante</p>
                    </div>

                    <div className='flex flex-row gap-5'>
                        {
                            disabled === true && (
                                <button
                                    onClick={()=>setDisabled(false)} 
                                    className='bg-yellow-400 tracking-wider cursor-pointer border-black border rounded-md px-10 py-1 font-semibold first-letter:uppercase'
                                >
                                    editar
                                </button>
                            )
                        }
                        {
                            disabled === false && (
                                <div className='flex flex-row gap-5'>
                                    <button 
                                        className='bg-green-400 tracking-wider cursor-pointer border-black border rounded-md px-10 py-1 font-semibold first-letter:uppercase'
                                    >
                                        guardar
                                    </button>
                                    <button
                                        onClick={()=>setDisabled(true)} 
                                        className='bg-red-400 tracking-wider cursor-pointer border-black border rounded-md px-10 py-1 font-semibold first-letter:uppercase'
                                    >
                                        cancelar
                                    </button>
                                </div>
                            )
                        }
                        
                    </div>

                </div>

                <div className='w-full flex flex-row gap-3 mt-5'>
                    <div className='w-1/3   '>
                        <InputForm
                            callback={setNombres}
                            value={nombres}
                            typeInput='text'
                            name='nombres'
                            disabled={disabled}
                        />
                    </div>
                    <div className='w-1/3'>
                        <InputForm
                            callback={setApellidos}
                            value={apellidos}
                            typeInput='text'
                            name='apellidos'
                            disabled={disabled}
                        />
                    </div>
                    <div className='w-1/3'>
                        <InputForm
                            callback={setCargoRepresentante}
                            value={cargoRepresentante}
                            typeInput='text'
                            name='cargo en la empresa'
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-row gap-3 mt-5'>
                    <div className='w-1/2'>
                        <SelectForm
                            value={tipoIdenti}
                            callback={setTipoIdenti}
                            name='tipo de identificación'
                            options={identificaciones}
                            disabled={disabled}
                        />
                    </div>
                    <div className='w-1/2'>
                        <InputForm
                            callback={setIdentificacion}
                            value={identificacion}
                            typeInput='text'
                            name='identificación'
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-row gap-3 mt-5'>
                    <div className='w-2/3'>
                        <InputForm
                            callback={setEmailRepresentante}
                            value={emailRepresentante}
                            typeInput='email'
                            name='email representante'
                            disabled={disabled}
                        />
                    </div>
                    <div className='w-1/3'>
                        <InputForm
                            callback={setCelularRepresentante}
                            value={celularRepresentante}
                            typeInput='number'
                            name='contacto representante'
                            disabled={disabled}
                        />
                    </div>
                </div>
        </div>
    )
}

export default DatosRepresentante;
