import { useEffect, useState } from 'react'
//components
import InputForm from '../../components/InputForm.jsx'
import AlertaForm from '../alertas/AlertaForm.jsx'
import AlertImage from '../alertas/AlertaImagen.jsx'
//imagen
import succesImage from '../../assets/undraw_done_re_oak4.svg'
//hooks
import useCliente from '../../hooks/useCliente.jsx'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const tipo=[
    {
        text:'Persona',
        value:'persona'
    },
    {
        text:'Empresa',
        value:'empresa'
    }
]

const identificaciones=[
    {
        text:'Cedula',
        value:'cedula'
    },
    {
        text:'Pasaporte',
        value:'pasaporte'
    },
    {
        text:'Nit',
        value:'nit'
    },
    {
        text:'Cedula extranjera',
        value:'cedula extranjera'
    }
]

const regimen=[
    {
        text:'Responsable de IVA',
        value:'iva'
    },
    {
        text:'No responsable de IVA',
        value:'no iva'
    }
]

function FormCreateCliente({close}) {
    const {
        crearClienteByUsuario
    }=useCliente()

    //succes form
    const [done,SetDone]=useState(false)

    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})

    //identificacion
    const [tipoRazon,SetTipoRazon]=useState('')
    const [tipoIdenti,setTipoIdenti]=useState('')
    const [numberIdenti,SetNumberIdenti]=useState('')
    const [digitVerify,setDigitVerify]=useState('')
    //nombre del natural o empresa
    const [nombres,SetNombres]=useState('')
    const [apellidos,SetApellidos]=useState('')
    const [razSocial,setRazSocial]=useState('')
    const [nombComercial,setNombComercial]=useState('')
    //ubicacion
    const [ciudad,setCiudad]=useState('')
    const [direccion,SetDireccion]=useState('')
    //datos de contacto    
    const [nombreContact,setNombreContact]=useState('')
    const [apellidoContact,setApellidoContact]=useState('')
    const [email,setEmail]=useState('')
    const [celular,SetCelular]=useState('')
    const [tipoFiscal,SetTipoFiscal]=useState('')

   
    /* efectos */
    //cargar con valores por defecto
    useEffect(()=>{
        SetTipoRazon('persona')
        SetTipoFiscal('no iva')
    },[])

    //cambiar tipo de identidad segun el tipo
    useEffect(()=>{
        if(tipoRazon==='persona'){
            setTipoIdenti('cedula')
        }else if(tipoRazon==='empresa'){
            setTipoIdenti('nit')
        }
    },[tipoRazon])

    //Para tipo de cliente persona
    //entonces nombre es igual a nombre de contacto
    //tambien apellidos es igual a apellidos de contacto
    useEffect(()=>{
        if(nombres!==''){
            setNombreContact(nombres)
        }
        if(apellidos!==''){
            setApellidoContact(apellidos)
        }
    },[nombres,apellidos])

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        //validacion de campos de formularios
        if(tipoRazon==='persona'){
            if([tipoIdenti,numberIdenti,tipoFiscal,nombres,apellidos,nombreContact,apellidoContact,email].includes('')){
                setAlert({
                    msg:'Todos los campos marcados como obligatorios deben ser llenados',
                    error:true
                })
                return
            }
        }else if(tipoRazon==='empresa'){
            if([tipoIdenti,numberIdenti,tipoFiscal,razSocial,nombreContact,apellidoContact,email].includes('')){
                setAlert({
                    msg:'Todos los campos marcados como obligatorios deben ser llenados',
                    error:true
                })
                return
            }
        }

        const guardarCliente = async ()=>{
            let data;
            //el objeto data se crea segun el tipo de cliente
            if(tipoRazon==='persona'){
                data={
                    "tipo":tipoRazon,
                    "tipoIdenti":tipoIdenti,
                    "identificacion":numberIdenti,
                    "digitVerify":digitVerify,
                    "nombres":nombres,
                    "apellidos":apellidos,
                    "nombreComercial":nombComercial,
                    "ciudad":ciudad,
                    "direccion":direccion,
                    "nombreContacto":nombreContact,
                    "apellidoContacto":apellidoContact,
                    "email":email,
                    "celular":celular,
                    "tipoFiscal":tipoFiscal
                }
            }else if(tipoRazon==='empresa'){
                data={
                    "tipo":tipoRazon,
                    "tipoIdenti":tipoIdenti,
                    "identificacion":numberIdenti,
                    "digitVerify":digitVerify,
                    "razonSocial":razSocial,
                    "nombreComercial":nombComercial,
                    "ciudad":ciudad,
                    "direccion":direccion,
                    "nombreContacto":nombreContact,
                    "apellidoContacto":apellidoContact,
                    "email":email,
                    "celular":celular,
                    "tipoFiscal":tipoFiscal
                }
            }

            try {
                await crearClienteByUsuario(data)
            } catch (err) {
                setAlert({
                    msg:err.response.data.msg,
                    error:true
                })
            }
        }
        guardarCliente()
    }

    return (
        <form 
            onSubmit={handleSubmit}
        >
            
            {
                !done 
                ? 
                (
                    <div className='w-full flex flex-col gap-5'>
                        {alert.msg.length!==0 && <AlertaForm alert={alert}/>}

                        <div className='w-full flex flex-row items-center justify-between px-5'>
                            <h1 className='w-1/2 text-3xl font-bold tracking-wider'>Registrar un nuevo cliente</h1>
                            <div className='w-1/2 flex flex-row justify-end gap-5'>
                                <input
                                    value='Guardar'
                                    type='submit'
                                    className='w-1/3 bg-green-400 hover:bg-green-500 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider cursor-pointer border-green-700 border rounded-md px-6 py-2 font-bold'
                                />
                                <input
                                    onClick={close}
                                    value='Cancelar'
                                    type='button'
                                    className='w-1/3 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-red-400 hover:bg-red-500 cursor-pointer border border-red-700 rounded-md px-6 py-2 font-bold'
                                />
                            </div>
                        </div>
            
                        <div className="w-full flex flex-row gap-5">

                            <div className="w-1/2 flex flex-col border shadow px-5 py-5 rounded-md">

                                <h1 className='text-2xl font-bold tracking-wider mb-3'>Datos basicos</h1>

                                <div className="w-full flex flex-row gap-3">
                                    <div className='w-1/2 flex flex-col'>

                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-lg font-bold tracking-wider italic pl-1'>Tipo</label>
                                            <select
                                                value={tipoRazon}
                                                onChange={(e)=>SetTipoRazon(e.target.value)}
                                                type='select'
                                                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                                            >
                                                {
                                                    tipo.map((item,i)=>{
                                                        return <option key={i} value={item.value}>{item.text}</option>
                                                    })
                                                }
                                            </select>
                                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                                        </div>

                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-lg font-bold tracking-wider italic pl-1'>Tipo de identificacion</label>
                                            <select
                                                value={tipoIdenti}
                                                onChange={(e)=>setTipoIdenti(e.target.value)}
                                                type='select'
                                                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                                            >
                                                {
                                                    identificaciones.map((item,i)=>{
                                                        return <option key={i} value={item.value}>{item.text}</option>
                                                    })
                                                }   
                                            </select>
                                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                                        </div>

                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-lg font-bold tracking-wider italic pl-1'>Identificacion</label>
                                            <div className='flex flex-row w-full gap-2'>
                                                <input
                                                    type='number'
                                                    value={numberIdenti}
                                                    onChange={(e)=>SetNumberIdenti(e.target.value)} 
                                                    className='w-10/12 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                                                />
                                                <input
                                                    type='text'
                                                    value={digitVerify}
                                                    onChange={(e)=>setDigitVerify(e.target.value)}  
                                                    className='w-2/12 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-3 py-2 border-black' maxLength="1"
                                                />
                                            </div>
                                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                                        </div>
                                        <div className='flex flex-col gap-1 items-left'>
                                            <label className='text-lg font-bold tracking-wider italic pl-1'>Responsabilidad fiscal</label>
                                            <select
                                                value={tipoFiscal}
                                                onChange={(e)=>SetTipoFiscal(e.target.value)}
                                                type='select'
                                                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                                            >
                                                {
                                                    regimen.map((item,i)=>{
                                                        return <option key={i} value={item.value}>{item.text}</option>
                                                    })
                                                }
                                            </select>
                                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                                        </div>

                                    </div>

                                    <div className="w-1/2 border-l-2 pl-5">
                                        {
                                            tipoRazon==='persona' && (
                                                <>
                                                    <InputForm
                                                        name='Nombres'
                                                        typeInput='text'
                                                        obligatorio={true}
                                                        value={nombres}
                                                        callback={SetNombres}
                                                    />
                                                    <InputForm
                                                        name='Apellidos'
                                                        typeInput='text'
                                                        obligatorio={true}
                                                        value={apellidos}
                                                        callback={SetApellidos}
                                                    />
                                                </>
                                            )
                                        }
                                        {
                                            tipoRazon==='empresa' && (
                                                <InputForm
                                                    name='Razon social'
                                                    typeInput='text'
                                                    obligatorio={true}
                                                    value={razSocial}
                                                    callback={setRazSocial}
                                                />
                                            )
                                        }
                                        <InputForm
                                            name='Nombre comercial'
                                            typeInput='text'
                                            value={nombComercial}
                                            callback={setNombComercial}
                                        />
                                        <InputForm
                                            name='Ciudad'
                                            typeInput='text'
                                            value={ciudad}
                                            callback={setCiudad}
                                        />
                                        <InputForm
                                            name='Dirección'
                                            typeInput='text'
                                            value={direccion}
                                            callback={SetDireccion}
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className="w-1/2 flex flex-col border shadow px-5 py-5 rounded-md">
                                <h1 className='text-2xl font-bold tracking-wider mb-3'>Datos para facturación y envío</h1>
                                <div className="w-full flex flex-col gap-3">
                                    <div className="w-full flex flex-row gap-5">
                                        <div className='w-1/2'>
                                            <InputForm
                                                name='Nombres del contacto'
                                                typeInput='text'
                                                obligatorio={true}
                                                value={nombreContact}
                                                callback={setNombreContact}
                                            />
                                        </div>
                                        <div className='w-1/2'>
                                            <InputForm
                                                name='Apellidos del contacto'
                                                typeInput='text'
                                                obligatorio={true}
                                                value={apellidoContact}
                                                callback={setApellidoContact}
                                            />
                                        </div>
                                    </div>
                                    <InputForm
                                        name='Correo electronico'
                                        typeInput='email'
                                        obligatorio={true}
                                        value={email}
                                        callback={setEmail}
                                    />
                                    <InputForm
                                        name='Telefono'
                                        typeInput='tel'
                                        value={celular}
                                        callback={SetCelular}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                )
                :
                (   
                    <div className='max-w-lg flex flex-col mx-auto'>
                        <button
                            onClick={close}
                            className='w-[2rem] self-end mr-8 tracking-wider bg-gray-100 hover:bg-gray-300 cursor-pointer border border-gray-600 rounded-full px-2 py-1 font-bold'
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                        <AlertImage imgAlert={succesImage} msg={`El cliente ha sido creado con exito`}></AlertImage>
                    </div>
                )
            }
        </form>
    )
}

export default FormCreateCliente;
