import React, { useState } from 'react'
//componentes
import InputForm from '../InputForm'
import SelectForm from '../SelectForm.jsx'
import AlertaForm from '../alertas/AlertaForm.jsx'
//tipos de responsabilidad fiscal
import { regimen } from '../../data/formatoDataCliente.js'
//hooks
import useAuth from '../../hooks/useAuth.jsx'

function DataEmpresa({data}){
    const {
        actualizarInfoUsuarioEmpresa
    }=useAuth()

    //estado de alerta
    const [alert,setAlert]=useState({msg:'',error:false})

    //permitir habilitar editar un campo input
    const [disabled,setDisabled]=useState(true)
    //data
    const [razonSocial,setRazonSocial]=useState(data?.razonSocial)
    const [nit,setNit]=useState(data?.nit)
    const [digitVerify,setDigitVerify]=useState(data?.digitVerify)
    const [ciudad,setCiudad]=useState(data?.ciudad)
    const [departamento,setDepartamento]=useState(data?.departamento)
    const [direccion,setDireccion]=useState(data?.direccion)
    const [nombreComercial,setNombreComercial]=useState(data?.nombreComercial)
    const [tipoFiscal,setTipoFiscal]=useState(data?.tipoFiscal)
    const [email,setEmail]=useState(data?.email)
    const [celularEmpresarial,setCelularEmpresarial]=useState(data?.celularEmpresarial)

    const handleActualizarInformacion = async ()=>{
        const data = {
            razonSocial,
            nit,
            digitVerify,
            ciudad,
            departamento,
            direccion,
            nombreComercial,
            tipoFiscal,
            email,
            celularEmpresarial
        }

        try {
            const response =  await actualizarInfoUsuarioEmpresa(data)
            setDisabled(true)

            setAlert({
                msg:response.msg,
                error:false
            });
              
            setTimeout(() => {
                setAlert({
                  msg:'',
                  error:false
                })
            }, 4000);

        } catch (err) {
            setDisabled(true)
            setAlert({
                msg:err.message,
                error:true
            });
              
            setTimeout(() => {
                setAlert({
                  msg:'',
                  error:true
                })
            }, 4000);
        }
    }

    return (
        <div className='flex flex-col px-5 py-5 border rounded-md shadow-sm mt-5'>
            {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
            
            <div className='flex flex-row justify-between items-center mt-4'>
                <div>
                    <p className='font-bold text-2xl'>Datos de la empresa</p>
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
                                    onClick={handleActualizarInformacion} 
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
                    <div className='w-1/2'>
                        <InputForm
                            callback={setRazonSocial}
                            value={razonSocial}
                            typeInput='text'
                            name='razon social'
                            disabled={disabled}
                        />
                    </div>
                    <div className='w-1/2 flex flex-row gap-3'>
                        <div className='w-[80%]'>
                            <InputForm
                                callback={setNit}
                                value={nit}
                                typeInput='number'
                                name='nit'
                                disabled={disabled}
                            />
                        </div>
                        <div className='w-[20%]'>
                            <InputForm
                                callback={setDigitVerify}
                                value={digitVerify}
                                typeInput='number'
                                name='digit'
                                disabled={disabled}
                            />
                        </div>
                    </div>
            </div>

            <div className='mt-5 w-full flex flex-row gap-3'>
                <div className='w-1/2'>
                    <InputForm
                        callback={setNombreComercial}
                        value={nombreComercial}
                        typeInput='text'
                        name='nombre comercial'
                        disabled={disabled}
                    />
                </div>
                <div className='w-1/2'>
                    <SelectForm
                        value={tipoFiscal}
                        callback={setTipoFiscal}
                        name='responsabilidad fiscal'
                        options={regimen}
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className='w-full mt-5 flex flex-row gap-3'>
                <div className='w-1/4'>
                    <InputForm
                        callback={setCiudad}
                        value={ciudad}
                        typeInput='text'
                        name='ciudad'
                        disabled={disabled}
                    />
                </div>
                <div className='w-1/4'>
                    <InputForm
                        callback={setDepartamento}
                        value={departamento}
                        typeInput='text'
                        name='departamento'
                        disabled={disabled}
                    />
                </div>
                <div className='w-2/4'>
                    <InputForm
                        callback={setDireccion}
                        value={direccion}
                        typeInput='text'
                        name='dirección'
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className='w-full mt-5 flex flex-row gap-3'>
                <div className='w-2/3'>
                    <InputForm
                        callback={setEmail}
                        value={email}
                        typeInput='email'
                        name='email empresarial'
                        disabled={disabled}
                    />
                </div>
                <div className='w-1/3'>
                    <InputForm
                        callback={setCelularEmpresarial}
                        value={celularEmpresarial}
                        typeInput='number'
                        name='contacto empresarial'
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataEmpresa
