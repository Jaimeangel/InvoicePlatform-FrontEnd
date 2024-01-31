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
    // datos contacto
    const [email,setEmail]=useState([])
/*     const [email,setEmail]=useState([
        {
            id:1,
            email:auth?.emailRepresentante,
            selected:true
        },
        {
            id:2,
            email:auth?.email,
            selected:true
        },
        {
            id:3,
            email:cliente?.email,
            selected:true
        }
    ]) */
    const [celular,setCelular]=useState([])
/*     const [celular,setCelular]=useState([
        {
            id:3,
            celular:auth?.celularEmpresarial,
            selected:true
        },
        {
            id:4,
            celular:auth?.celularRepresentante,
            selected:true
        },
        {
            id:5,
            celular:cliente?.celular,
            selected:true
        }
    ]) */

    //agregar email/celular
    const [addEmail,setAddEmail]=useState(false)
    const [addCel,setAddCel]=useState(false)

    //formularios nuevo email/celular
    const [newEmail,setNewEmail]=useState('')
    const [newCel,setNewCel]=useState('')

    useEffect(()=>{
        // cargar datos contacto a state principal
        const cargarEmailStatePrincipal = ()=>{
            let emails = [auth?.emailRepresentante,auth?.email,cliente?.email]
            emails = emails.filter( element => element != null && element != undefined)
            
            let newEmails = []

            const verifyEmail = ()=>{
                emails?.forEach( element => {
                    const isExist =  dataEnvio.email.destinos?.includes(element);
                    if(!isExist){
                        newEmails.push(element)
                    }
                })
            } 
            verifyEmail()

            newEmails = [...dataEnvio.email.destinos,...newEmails]
            
            setDataEnvio(prevDataEnvio => ({
                ...prevDataEnvio,
                email: {
                    destinos: [...newEmails]
                }
            }))
        }

        const cargarCelularStatePrincipal = ()=>{
            let celulares = [auth?.celularEmpresarial,auth?.celularRepresentante,cliente?.celular]
            celulares = celulares.filter( element => element != null && element != undefined)
            
            let newCelulares = []

            const verifyCelular = ()=>{
                celulares?.forEach( element => {
                    const isExist =  dataEnvio.celular.destinos?.includes(element);
                    if(!isExist){
                        newCelulares.push(element)
                    }
                })
            } 
            verifyCelular()

            newCelulares = [...dataEnvio.celular.destinos,...newCelulares]
            
            setDataEnvio(prevDataEnvio => ({
                ...prevDataEnvio,
                celular: {
                    destinos: [...newCelulares]
                }
            }))
        }
        cargarEmailStatePrincipal()
        cargarCelularStatePrincipal() 
    },[])

    useEffect(()=>{
        const cargarCelularStateLocal = ()=>{  
            const newCelulares = dataEnvio.celular.destinos?.map(element => {
                const newCelularAgregar={
                    id:generarIdNumerico(),
                    celular:element,
                    selected:true
                }
                return newCelularAgregar
              
            })    
            setCelular(newCelulares)
        }
        cargarCelularStateLocal() 
    },[dataEnvio.celular.destinos])

    useEffect(()=>{
        const cargarEmailStateLocal = ()=>{  
            const newEmails = dataEnvio.email.destinos?.map(element => {
                const newEmailAgregar={
                    id:generarIdNumerico(),
                    email:element,
                    selected:true
                }
                return newEmailAgregar
              
            })    
            setEmail(newEmails)
        }
        cargarEmailStateLocal() 
    },[dataEnvio.email.destinos])

    //validacion para cambiar paso
    useEffect(()=>{
        if(validatePaso){
            setValidatePaso(false)
            validateCambiarPaso()
        }
    },[validatePaso])

    // guardar informacion en state principal
/*     useEffect(()=>{
        guardarInformacionEstatePrincipal(email,'email')
    },[email]) */

    // guardar informacion en state principal
/*     useEffect(() => {
        guardarInformacionEstatePrincipal(celular,'celular')
    },[celular]) */

    const guardarInformacionEstatePrincipal = (listaContacto,atributoModificar)=>{
        const dataContacto = dataEnvio[atributoModificar];
        
        const contactosSeleccionados = listaContacto
            .filter(contacto => contacto.selected)
            .map(contacto => contacto[atributoModificar]);

        dataContacto.destinos = contactosSeleccionados;
        setDataEnvio({
            [atributoModificar]:dataContacto,
            ...dataEnvio
        })
    }

    // cambiar estado booleano de seleccion de tipo de contacto
    const cambiarEstadoListaContacto=(id,lista,callback) => {
        const listaModificada = lista.map( item => {
            if(item.id === id) {
                item.selected=!item.selected
                return item;
            }else {
                return item;
            }
        });
        callback(listaModificada)
    }
    
    // agregar nuevo email
    const agregarNewEmail=()=>{
        
        const newEmailAgregar={
            id:generarIdNumerico(),
            email:newEmail,
            selected:true
        }

        setEmail([...email,newEmailAgregar])
        setAddEmail(false)
        setNewEmail('')

    }
    // agregar nuevo celular
    const agregarNewCelular = () => {

        const newCelularAgregar={
            id:generarIdNumerico(),
            celular:newCel,
            selected:true
        }

        setCelular([...celular,newCelularAgregar])
        setAddCel(false)
        setNewCel('')

    }
    // handle cambiar de paso
    const validateCambiarPaso=()=>{
        if(pasoActual===numeroPasos) return
        cambiarPaso(value=>value+1)
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
                                    <h1 className="text-lg font-semibold italic text-justify px-5">Tu cotizacion sera enviada a los siguientes emails listados abajo. Puedes agregar otro email .</h1>
                                    {
                                        addEmail ?
                                        
                                            <div className='flex flex-col gap-3 my-2 shadow px-5 py-3 rounded-lg border'>
                                                <div className='flex flex-row gap-3'>
                                                    <p className='font-bold mb-1'>nuevo email:</p>
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
                                                        className="w-[7rem] rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                                    >
                                                        agregar
                                                    </button>
                                                    <button
                                                        onClick={()=>{
                                                            setAddEmail(false)
                                                            setNewEmail('')
                                                        }}
                                                        className="w-[7rem] rounded  bg-blue-200 border-2 border-blue-400 font-semibold tracking-wide"
                                                    >
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>                                
                                        :
                                            <button
                                                onClick={()=>setAddEmail(true)}
                                                className="self-end w-[10rem] my-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                            >
                                                agregar email
                                            </button>
                                    }
                                    {   
                                        
                                        email?.map((emailItem)=>(
                                            <div key={emailItem.id} className='flex flex-row items-center  justify-between shadow px-5 py-2 my-2 rounded-lg border'>
                                                <div className='flex flex-row'>
                                                    <h3 className='font-bold'>email:&nbsp;</h3>
                                                    <h3>{`${emailItem.email}`}</h3>
                                                </div>
                                                <div className='mt-2'>
                                                    <SwitchButtonPequeño
                                                        enabled={emailItem.selected}
                                                        setEnabled={()=>cambiarEstadoListaContacto(emailItem.id,email,setEmail)}
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
                                <h1 className="text-lg font-semibold italic text-justify px-5">Tu cotizacion sera enviada a la siguiente lista de celulares mediante WhatsApp. Puedes agregar otro celular.</h1>
                                    {
                                        addCel ?
                                        
                                            <div className='flex flex-col gap-3 my-2 shadow px-5 py-3 rounded-lg border'>
                                                <div className='flex flex-row gap-3'>
                                                    <p className='font-bold mb-1'>nuevo celular:</p>
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
                                                        className="w-[7rem] rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                                    >
                                                        agregar
                                                    </button>
                                                    <button
                                                        onClick={()=>{
                                                            setAddCel(false)
                                                            setNewCel('')
                                                        }}
                                                        className="w-[7rem] rounded  bg-blue-200 border-2 border-blue-400 font-semibold tracking-wide"
                                                    >
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        :  
                                            <button
                                                onClick={()=>setAddCel(true)}
                                                className="self-end w-[10rem] my-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                            >
                                                agregar celular
                                            </button>
                                    }
                                    {
                                        celular?.map((celularItem)=>(
                                            <div key={celularItem.id} className='flex flex-row items-center  justify-between shadow px-5 py-2 my-2 rounded-lg border'>
                                                <div className='flex flex-row'>
                                                    <h3 className='font-bold'>celular:&nbsp;</h3>
                                                    <h3>{`${celularItem.celular}`}</h3>
                                                </div>
                                                <div className='mt-2'>
                                                    <SwitchButtonPequeño
                                                        enabled={celularItem.selected}
                                                        setEnabled={()=>cambiarEstadoListaContacto(celularItem.id,celular,setCelular)}
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
