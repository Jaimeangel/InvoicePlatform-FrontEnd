//react
import { useState,useEffect } from 'react';
import { Disclosure } from '@headlessui/react'
//font awesome
import { faChevronUp, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//componentes
import SwitchButtonPequeño from '../SwitchButtonPequeño.jsx'
//helpers
import generarIdNumerico from '../../helpers/generaIdNumerico.js';

function CondicionesComerciales({
    cotizacion,
    setCotizacion,
    cambiarPaso,
    validatePaso,
    setValidatePaso,
    numeroPasos,
    pasoActual
}){
    //condiciones comerciales
    const [condiciones,setCondiciones]=useState([
        {
            id:1,
            titulo:'pago inicial de la mitad del monto total',
            text:`para iniciar el pedido, se solicita un pago inicial equivalente al 50% del monto total. El importe restante deberá abonarse tras la recepción satisfactoria de los productos solicitados.`,
            selected:false
        },
        {
            id:2,
            titulo:'pago completo al inicio del pedido',
            text:`se requiere el pago total de los productos y servicios al inicio del pedido.`,
            selected:false
        },
        {
            id:3,
            titulo:'pago a 30 dias',
            text:`el pago del monto total facturado se realizará 30 días después de la entrega de los productos.`,
            selected:false
        }
    ])

    //agregar condicion
    const [agregar,setAgregar]=useState(false)
    //datos nueva condicion
    const [tipo,setTipo]=useState('')
    const [text,setText]=useState('')
    //notas comerciales
    const [notas,setNotas]=useState('')

    //handle cambiar de paso
    const validateCambiarPaso=()=>{
        if(pasoActual===numeroPasos) return
        cambiarPaso(value=>value+1)
    }
    
    //cambiar estado de eleccion de las condiciones
    const cambiarEstado=(id)=>{
        const categoriesModificado = condiciones.map(item => {
            if(item.id === id) {
                item.selected=!item.selected
                return item;
            }else {
                item.selected=false
                return item;
            }
        });
        setCondiciones(categoriesModificado)
    }

    //mostrar ocultar formulario para agregar nueva condicion
    const showAgregarCondicion=()=>{
        setAgregar(true)
    }

    const agregarCondicion=()=>{
        const newCondicion={
            id:generarIdNumerico(),
            titulo:tipo,
            text:text,
            selected:false
        }
        setCondiciones([newCondicion,...condiciones])

        setTipo('')
        setText('')
        setAgregar(false)
        /* cambiarEstado(newCondicion.id) */
    }

    //verificar si exite objeto
    function verificarExistenciaID(array, idBuscado) {
        return array.some(objeto => objeto.id === idBuscado);
    }
    //cancelar agregar condicion y limpiar el estado
    const cancelarAgregarCondicion=()=>{
        setAgregar(false)
        setTipo('')
        setText('')
    }

    //validacion para cambiar paso
    useEffect(()=>{
        if(validatePaso){
            setValidatePaso(false)
            validateCambiarPaso()
        }
    },[validatePaso])

    //persistencia de informacion
    useEffect(()=>{
        if('condiciones' in cotizacion){
            if(Object.keys(cotizacion.condiciones).length !== 0){
                const existe = verificarExistenciaID(condiciones, cotizacion.condiciones.id);
                if(existe){
                    const condicionesModificado = condiciones.map((item) => {
                        if(item.id === cotizacion.condiciones.id){
                            return cotizacion.condiciones;
                        }else{
                            return item;
                        }
                    });
                    setCondiciones(condicionesModificado)
                }else{
                    setCondiciones([cotizacion.condiciones,...condiciones])
                }
            }
        }

        if('notas' in cotizacion){
            if(cotizacion.notas !== ''){
                setNotas(cotizacion.notas)
            }
        }
    },[])
    
    //actulizando informacion en state principal [condiciones]
    useEffect(()=>{
        const condicionesModificado = condiciones.find((item) => {
            if(item.selected === true){
                return item;
            }
        });
            
        if(condicionesModificado){
            const newData={
                ...cotizacion,
                condiciones:condicionesModificado
            }
            setCotizacion(newData)
        }
    },[condiciones])

    //actulizando informacion en state principal [notas]
    useEffect(()=>{
        if(notas.length !==''){
            const newData={
                ...cotizacion,
                notas:notas
            }
            setCotizacion(newData)
        }
    },[notas])


    return (
        <div className="w-full  bg-white rounded-lg px-10 py-6 shadow-md">

            <h1 className="mt-2  text-2xl font-bold">Condiciones comerciales y notas</h1>

            <span className='text-red-600 text-sm'>* los siguiente campos son opcionales</span>
            
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-2">
                
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full items-center border border-black justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-md font-semibold text-black">
                                <span>Condiciones comerciales</span>
                                <FontAwesomeIcon 
                                    icon={faChevronUp}
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-black`} 
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 border rounded-lg mt-2">
                                <div className='flex flex-col'>
                                    <h1 className="text-lg font-semibold italic text-justify px-5">Selecciona una opción de terminos de pago predefinida o crea tu propio término de pago personalizado</h1>
                                    {
                                        agregar && (
                                            <div className='flex flex-col gap-3 my-2 shadow px-5 py-3 rounded-lg border'>
                                                <div className='flex flex-row gap-3'>
                                                    <p className='font-bold mb-1'>Tipo:</p>
                                                    <input
                                                        value={tipo}
                                                        onChange={(e)=>setTipo(e.target.value)} 
                                                        className='border outline-none rounded-md' 
                                                        type="text" 
                                                    />
                                                </div>
                                                <textarea
                                                    value={text}
                                                    onChange={(e)=>setText(e.target.value)}  
                                                    rows="3"
                                                    className='border outline-none rounded-md px-2 py-1'
                                                ></textarea>
                                                <div className='flex flex-row gap-5'>
                                                    <button
                                                        onClick={agregarCondicion}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                                    >
                                                        agregar
                                                    </button>
                                                    <button
                                                        onClick={cancelarAgregarCondicion}
                                                        className="w-[7rem] first-letter:uppercase rounded  bg-blue-200 border-2 border-blue-400 font-semibold tracking-wide"
                                                    >
                                                        cancelar
                                                    </button>
                                                </div>
                                            </div>                                
                                        )
                                    }
                                    {
                                        !agregar && (
                                            <button
                                                onClick={showAgregarCondicion}
                                                className="self-end w-[20rem] my-1 first-letter:uppercase rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                                            >
                                                crear termino de pago personalizado
                                            </button>
                                        )
                                    }
                                    {
                                        condiciones.map((condicion)=>(
                                            <div key={condicion.id} className='flex flex-col shadow px-5 py-3 my-2 rounded-lg border'>
                                                <p className='font-bold mb-1 first-letter:uppercase'>{`Terminos de pago: ${condicion.titulo}`}</p>
                                                <p className='text-justify first-letter:uppercase'>{`${condicion.text}`}</p>
                                                <div className='text-end mt-2'>
                                                    <SwitchButtonPequeño
                                                        enabled={condicion.selected}
                                                        setEnabled={()=>cambiarEstado(condicion.id)}
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
                                <span>Notas comerciales</span>
                                <FontAwesomeIcon 
                                    icon={faChevronUp}
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-black`} 
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 border rounded-lg mt-2">
                                <h2 className='font-semibold mb-2 first-letter:uppercase text-lg'>Agregar nota</h2>
                                <textarea
                                    value={notas}
                                    onChange={(e)=>setNotas(e.target.value)}  
                                    rows="3"
                                    className='w-full border outline-none rounded-md px-2 py-1'
                                ></textarea>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>

        </div>
    )
}

export default CondicionesComerciales;