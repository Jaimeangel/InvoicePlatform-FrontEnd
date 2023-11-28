//react
import { useState,useEffect } from 'react';
import { Disclosure } from '@headlessui/react'
//font awesome
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//helpers
import generarIdNumerico from '../../helpers/generaIdNumerico';
//componentes
import SwitchButtonPequeño from '../SwitchButtonPequeño';
//hooks
import useAuth from '../../hooks/useAuth';

function DatosEnvio({
    setDataEnvio,
    dataEnvio,
    cliente,
    cambiarPaso,
    validatePaso,
    setValidatePaso,
    numeroPasos,
    pasoActual
}){
    const {auth}=useAuth()
    //datos contacto
    const [email,setEmail]=useState([])
    const [celular,setCelular]=useState([])

    //agregar email/celular
    const [addEmail,setAddEmail]=useState(false)
    const [addCel,setAddCel]=useState(false)

    //formularios nuevo email/celular
    const [newEmail,setNewEmail]=useState('')
    const [newCel,setNewCel]=useState('')

    //cargar informacion de contacto del Cliente/Usuario
    useEffect(()=>{
        //data contacto
        const emails=[auth?.emailRepresentante,auth?.email,cliente?.email]
        const celulares=[cliente?.celular,auth?.celularEmpresarial,auth?.celularRepresentante]
        //cargar contacto state
        const emailToSend=emails?.forEach((emailValidate)=>{
            const existEmailUsuario=email.some(email => email?.email === emailValidate)
            if(!existEmailUsuario){
                const newEmail={
                    id:generarIdNumerico(),
                    email:emailValidate,
                    selected:true
                }
                setEmail((prevEmail) => [...prevEmail, newEmail])
            }
        })
        
        const celularToSend=celulares?.forEach((celularValidate)=>{
            const existCelularCliente=celular.some(celular => celular?.celular === celularValidate)
            if(!existCelularCliente){
                const newCelular={
                    id:generarIdNumerico(),
                    celular:celularValidate,
                    selected:true
                }
                setCelular((prevCelular) => [...prevCelular,newCelular])
            }
        })
    },[])

    //validacion para cambiar paso
    useEffect(()=>{
        if(validatePaso){
            setValidatePaso(false)
            validateCambiarPaso()
        }
    },[validatePaso])

    //guardar informacion de contacto en state principal
    useEffect(()=>{
        const dataContactoEmail=dataEnvio.email;

        const newDestinosEmail=email
            .filter(email => email.selected)
            .map(email => email.email);

        dataContactoEmail.destinos=newDestinosEmail;
        setDataEnvio({
            email:dataContactoEmail,
            ...dataEnvio
        })
    },[email])

    //guardar informacion de contacto en state principal
    useEffect(()=>{
        const dataContactoCelular=dataEnvio.celular;
        
        const newDestinosCelular=celular
            .filter(celular => celular.selected)
            .map(celular => celular.celular);

        dataContactoCelular.destinos=newDestinosCelular;
        setDataEnvio({
            celular:dataContactoCelular,
            ...dataEnvio
        })
    },[celular])

    //handle cambiar de paso
    const validateCambiarPaso=()=>{
        if(pasoActual===numeroPasos) return
        cambiarPaso(value=>value+1)
    }
    //cambiar estado de email seleccionados
    const cambiarEstadoEmail=(id)=>{
        const emailModificado = email.map(email => {
            if(email.id === id) {
                email.selected=!email.selected
                return email;
            }else {
                return email;
            }
        });
        setEmail(emailModificado)
    }
    //cambiar estado de celular seleccionados
    const cambiarEstadoCelular=(id)=>{
        const celularModificado = celular.map(celular => {
            if(celular.id === id) {
                celular.selected=!celular.selected
                return celular;
            }else {
                return celular;
            }
        });
        setCelular(celularModificado)
    }
    //show/hide agregar email
    const showAddEmail=()=>{
        setAddEmail(true)
    }
    //show/hide agregar celular
    const showAddCelular=()=>{
        setAddCel(true)
    }
    //cancelar agregar nuevo email
    const cancelarAddEmail=()=>{
        setAddEmail(false)
        setNewEmail('')
    }
    //cancelar agregar nuevo email
    const cancelarAddCelular=()=>{
        setAddCel(false)
        setNewCel('')
    }
    //add nuevo email
    const agregarNewEmail=()=>{
        const newEmailAgregar={
            id:generarIdNumerico(),
            email:newEmail,
            selected:false
        }
        setEmail([...email,newEmailAgregar])
        setAddEmail(false)
        setNewEmail('')
    }
    //add nuevo celular
    const agregarNewCelular=()=>{
        const newCelularAgregar={
            id:generarIdNumerico(),
            celular:newCel,
            selected:false
        }
        setCelular([...celular,newCelularAgregar])
        setAddCel(false)
        setNewCel('')
    }

    return (
        <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">

            <h1 className="mt-2  text-2xl font-bold tracking-wide">Datos de envio</h1>

            <h1 className="mt-2 mb-2 text-xl font-semibold italic tracking-wide">Verifica la informacion de contacto de tu cliente a donde llegara su cotizacion.</h1>

            
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full items-center border border-black justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-md font-semibold text-black">
                                <span>contacto via Email</span>
                                <FontAwesomeIcon 
                                    icon={faChevronUp}
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-black`} 
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 border rounded-lg mt-2">
                                <div className='flex flex-col'>
                                    <h1 className="text-lg font-semibold italic text-justify px-5">Tu cotizacion sera enviada a los siguientes emails listados. Puedes agregar otro destino agregando otro email.</h1>
                                    {
                                        addEmail && (
                                            <div className='flex flex-col gap-3 my-2 shadow px-5 py-3 rounded-lg border'>
                                                <div className='flex flex-row gap-3'>
                                                    <p className='font-bold mb-1'>Nuevo email:</p>
                                                    <input
                                                        value={newEmail}
                                                        onChange={(e)=>setNewEmail(e.target.value)} 
                                                        className='border outline-none rounded-md w-[20rem]' 
                                                        type="email" 
                                                    />
                                                </div>
                                                <div className='flex flex-row gap-5'>
                                                    <button
                                                        onClick={agregarNewEmail}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                                    >
                                                        agregar
                                                    </button>
                                                    <button
                                                        onClick={cancelarAddEmail}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-blue-200 border-2 border-blue-400 font-semibold tracking-wide"
                                                    >
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>                                
                                        )
                                    }
                                    {
                                        !addEmail && (
                                            <button
                                                onClick={showAddEmail}
                                                className="self-end w-[10rem] my-1 first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                            >
                                                agregar email
                                            </button>
                                        )
                                    }
                                    {   
                                        
                                        email?.map((email)=>(
                                            <div key={email.id} className='flex flex-row items-center  justify-between shadow px-5 py-2 my-2 rounded-lg border'>
                                                <div className='flex flex-row'>
                                                    <h3 className='font-bold'>email:&nbsp;</h3>
                                                    <h3>{`${email.email}`}</h3>
                                                </div>
                                                <div className='mt-2'>
                                                    <SwitchButtonPequeño
                                                        enabled={email.selected}
                                                        setEnabled={()=>cambiarEstadoEmail(email.id)}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full items-center border border-black justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-md font-semibold text-black">
                                <span>contacto via WhatsApp</span>
                                <FontAwesomeIcon 
                                    icon={faChevronUp}
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-black`} 
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 border rounded-lg mt-2">
                                <div className='flex flex-col'>
                                <h1 className="text-lg font-semibold italic text-justify px-5">Tu cotizacion sera enviada a los siguientes celulares listados mediante WhatsApp. Puedes agregar otro destino agregando otro celular.</h1>
                                    {
                                        addCel && (
                                            <div className='flex flex-col gap-3 my-2 shadow px-5 py-3 rounded-lg border'>
                                                <div className='flex flex-row gap-3'>
                                                    <p className='font-bold mb-1'>Nuevo celular:</p>
                                                    <input
                                                        value={newCel}
                                                        onChange={(e)=>setNewCel(e.target.value)} 
                                                        className='border outline-none rounded-md w-[20rem]' 
                                                        type="tel" 
                                                    />
                                                </div>
                                                <div className='flex flex-row gap-5'>
                                                    <button
                                                        onClick={agregarNewCelular}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                                    >
                                                        agregar
                                                    </button>
                                                    <button
                                                        onClick={cancelarAddCelular}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-blue-200 border-2 border-blue-400 font-semibold tracking-wide"
                                                    >
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>                                
                                        )
                                    }
                                    {
                                        !addCel && (
                                            <button
                                                onClick={showAddCelular}
                                                className="self-end w-[10rem] my-1 first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                            >
                                                agregar celular
                                            </button>
                                        )
                                    }
                                    {
                                        celular?.map((celular)=>(
                                            <div key={celular.id} className='flex flex-row items-center  justify-between shadow px-5 py-2 my-2 rounded-lg border'>
                                                <div className='flex flex-row'>
                                                    <h3 className='font-bold'>celular:&nbsp;</h3>
                                                    <h3>{`${celular.celular}`}</h3>
                                                </div>
                                                <div className='mt-2'>
                                                    <SwitchButtonPequeño
                                                        enabled={celular.selected}
                                                        setEnabled={()=>cambiarEstadoCelular(celular.id)}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>

        </div>
    )
}

export default DatosEnvio;
