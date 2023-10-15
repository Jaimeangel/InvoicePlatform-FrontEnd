import InputForm from '../../components/InputForm.jsx'

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

function FormCreateCliente() {
  return (
    <>
        <h1 className='text-3xl font-bold tracking-wider px-5 pb-5'>Registrar un nuevo cliente</h1>
        <div className="w-full flex flex-row gap-5">

            <div className="w-1/2 flex flex-col border shadow px-5 py-5 rounded-md">
                <h1 className='text-2xl font-bold tracking-wider'>Datos basicos</h1>
                <div className="w-full flex flex-row gap-3">
                    <div className='w-1/2 flex flex-col'>

                        <div className='flex flex-col gap-1 items-left mt-3'>
                            <label className='text-lg font-bold tracking-wider italic'>Tipo</label>
                            <select
                                type='select'
                                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                            >
                                {
                                    tipo.map((item)=>{
                                        return <option value={item.value}>{item.text}</option>
                                    })
                                }
                            </select>
                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                        </div>

                        <div className='flex flex-col gap-1 items-left mt-3'>
                            <label className='text-lg font-bold tracking-wider italic'>Tipo de identificacion</label>
                            <select
                                type='select'
                                className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                            >
                                {
                                    identificaciones.map((item)=>{
                                        return <option value={item.value}>{item.text}</option>
                                    })
                                }   
                            </select>
                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                        </div>

                        <div className='flex flex-col gap-1 items-left mt-3'>
                            <label className='text-lg font-bold tracking-wider italic'>Identificacion</label>
                            <div className='flex flex-row w-full gap-2'>
                                <input className='w-10/12 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black' type="text" />
                                <input className='w-2/12 placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-3 py-2 border-black' type="text" maxlength="1"/>
                            </div>
                            <span className='text-red-600 text-sm'>* campo obligatorio</span>
                        </div>

                    </div>

                    <div className="w-1/2 border-l-2 pl-5">
                        <InputForm
                            name='Nombres'
                            type='text'
                            obligatorio={true}
                        />
                        <InputForm
                            name='Apellidos'
                            type='text'
                            obligatorio={true}
                        />
                        <InputForm
                            name='Razon social'
                            type='text'
                            obligatorio={true}
                        />
                        <InputForm
                            name='Nombre comercial'
                            type='text'
                        />
                        <InputForm
                            name='Ciudad'
                            type='text'
                        />
                        <InputForm
                            name='Direccion'
                            type='text'
                        />
                    </div>
                </div>

            </div>


            <div className="w-1/2 flex flex-col border shadow px-5 py-5 rounded-md">
                <h1 className='text-2xl font-bold tracking-wider'>Datos para facturación y envío</h1>
                <div className="w-full flex flex-col gap-3">
                    <InputForm
                        name='Nombres del contacto'
                        type='text'
                        obligatorio={true}
                    />
                    <InputForm
                        name='Apellidos del contacto'
                        type='text'
                        obligatorio={true}
                    />
                    <InputForm
                        name='correo electronico'
                        type='email'
                        obligatorio={true}
                    />
                    <InputForm
                        name='Celular'
                        type='tel'
                        obligatorio={true}
                    />
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg font-bold tracking-wider italic'>Tipo</label>
                        <select
                            type='select'
                            className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg outline-none tracking-wider bg-gray-50 cursor-pointer border rounded-md px-6 py-2 border-black'
                        >
                            {
                                regimen.map((item)=>{
                                    return <option value={item.value}>{item.text}</option>
                                })
                            }
                        </select>
                        <span className='text-red-600 text-sm'>* campo obligatorio</span>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default FormCreateCliente;
