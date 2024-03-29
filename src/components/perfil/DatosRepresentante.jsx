import { useState } from "react";
//componentes
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";
import AlertaForm from "../alertas/AlertaForm";
//hooks
import useAuth from "../../hooks/useAuth";
//data
import { identificaciones } from "../../data/formatoDataCliente";

function DatosRepresentante({data}) {
    const {
        actualizarInfoUsuarioEmpresa
    }=useAuth()

    //estado de alerta
    const [alert,setAlert]=useState({msg:'',error:false})
    
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

    //Data original
    const [nombresEdit]=useState(data?.nombres)
    const [apellidosEdit]=useState(data?.apellidos)
    const [tipoIdentiEdit]=useState(data?.tipoIdenti)
    const [identificacionEdit]=useState(data?.identificacion)
    const [cargoRepresentanteEdit]=useState(data?.cargoRepresentante)
    const [emailRepresentanteEdit]=useState(data?.emailRepresentante)
    const [celularRepresentanteEdit]=useState(data?.celularRepresentante)

    const handleActualizarInformacion = async ()=>{
        const data = {
            nombres,
            apellidos,
            tipoIdenti,
            identificacion,
            cargoRepresentante,
            emailRepresentante,
            celularRepresentante,
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
            cancelarActualizarInformacion()
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

    const cancelarActualizarInformacion = ()=>{
        setNombres(nombresEdit)
        setApellidos(apellidosEdit)
        setTipoIdenti(tipoIdentiEdit)
        setIdentificacion(identificacionEdit)
        setCargoRepresentante(cargoRepresentanteEdit)
        setEmailRepresentante(emailRepresentanteEdit)
        setCelularRepresentante(celularRepresentanteEdit)
        
        setDisabled(true)
    }

    return (
        <div className='flex flex-col px-5 py-5 border rounded-md shadow-sm mt-5'>
                {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
                <div className='flex flex-row justify-between items-center mt-4'>

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
                                        onClick={handleActualizarInformacion} 
                                        className='bg-green-400 tracking-wider cursor-pointer border-black border rounded-md px-10 py-1 font-semibold first-letter:uppercase'
                                    >
                                        guardar
                                    </button>
                                    <button
                                        onClick={cancelarActualizarInformacion} 
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
