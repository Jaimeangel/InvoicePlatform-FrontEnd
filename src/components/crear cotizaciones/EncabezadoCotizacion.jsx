import { useEffect, useState } from 'react'
//headlessui
import { Tab } from '@headlessui/react'
//componentes
import EncabezadoPersonalizado from '../crear cotizaciones/EncabezadoPersonalizado.jsx'
import SwitchButton from '../Switch'
import AlertaForm from '../alertas/AlertaForm.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EncabezadoCotizacion({
    cotizacion,
    setCotizacion,
    cambiarPaso,
    validatePaso,
    setValidatePaso,
    numeroPasos,
    pasoActual
}) {
      //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //categorias
    let [categories,setCategories] = useState([
      {
        id: 1,
        categoria:'opcion 1',
        text:{
            texto1:'Es un gusto para nosotros presentarle la siguiente cotizacion para los productos/servicios que fueron solicitados.',
            texto2:'Esperamos que esta cotización cumpla con sus expectativas y que tengamos la oportunidad de colaborar con ustedes. Estamos a su disposición para cualquier consulta que pueda surgir.',
            texto3:''
        },
        selecionado:false
      },
      {
        id: 2,
        categoria:'personalizado',
        text:{
            texto1:'',
            texto2:'',
            texto3:''
        },
        selecionado:false
      },
    ])

    //persistencia de informacion
    useEffect(()=>{
        const categoriesModificado = categories.map((item) => {
            if(item.id === cotizacion?.encabezado?.id){
                return cotizacion.encabezado;
            }else{
                return item;
            }
        });
        setCategories(categoriesModificado)
    },[])

    //actualizacion informacion en state principal
    useEffect(()=>{
        const categoriesModificado = categories.find((item) => {
            if(item.selecionado === true){
                return item;
            }
        });
        
        if(categoriesModificado){
            const newData={
                ...cotizacion,
                encabezado:categoriesModificado
            }
            setCotizacion(newData)
        }else{
            const newData={
                ...cotizacion,
                encabezado:{}
            }
            setCotizacion(newData)
        }
    },[categories])

    //validacion para cambiar al siguiente paso
    useEffect(()=>{
        if(validatePaso){
            const isSelectOption = categories.some((item) => item.selecionado === true );
            if(!isSelectOption){
                
                setAlert({
                    msg:'Es necesario seleccionar alguna de las opciones para pasar al siguiente paso',
                    error:true
                })
                
                setTimeout(() => {
                    setAlert({
                    msg:'',
                    error:true
                    })
                }, 4000);
        
                setValidatePaso(false)
        
                return
            }
            setValidatePaso(false)
            cambiarPasoSiguiente()
        }
    },[validatePaso])

    //cambiar el estado de seleccionado de las opciones de encabezado disponibles
    const cambiarEstado=(id)=>{
        const categoriesModificado = categories.map(item => {
            if(item.id === id) {
                item.selecionado=!item.selecionado
                return item;
            }else {
                item.selecionado=false
                return item;
            }
        });
        setCategories(categoriesModificado)
    }

    const cambiarPasoSiguiente=()=>{
        if(pasoActual===numeroPasos) return
        cambiarPaso(value=> value + 1 ) //cambiar al paso siguiente
    }

  return(
    <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">

        <h1 className="mt-2 mb-2 text-2xl font-bold">Encabezado de cotizacion</h1>
        <h1 className="mt-2 mb-2 text-xl font-semibold italic">Puede elegir una opción de encabezado disponible o puede crear un encabezado personalizado.</h1>

        {alert.msg.length!==0 && <AlertaForm alert={alert}/>}

        <Tab.Group>

            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 border mt-5">
                {categories?.map((category) => (
                    <Tab
                        key={category.id}
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black first-letter:uppercase border-none outline-none',
                            selected
                                ? 'bg-white shadow'
                                : 'text-black'
                            )
                        }
                    >
                        {category.categoria}
                    </Tab>
                ))}
            </Tab.List>

            <Tab.Panels className="mt-2">
                {categories?.map((item) => (
                    <Tab.Panel
                        key={item.id}
                        className='rounded-lg bg-white px-7 py-5 shadow border'
                    >
                        {
                            item.categoria !== 'personalizado' 
                            ? 
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col gap-4 font-semibold'>
                                        <p className='text-justify'>{item.text.texto1}</p>
                                        <p className='text-justify'>{item.text.texto2}</p>
                                        <p className='text-justify'>{item.text.texto3}</p>
                                    </div>
                                    <SwitchButton
                                        enabled={item.selecionado}
                                        setEnabled={()=>cambiarEstado(item.id)}
                                    />
                                </div>
                            :
                                <EncabezadoPersonalizado
                                    encabezados={categories}
                                    cambiarEstadoEncabezado={setCategories}
                                    estado={item.selecionado}
                                    id={item.id}
                                    cambiarEstado={cambiarEstado}
                                    encabezado={item}
                                />
                        }
                    </Tab.Panel>
                ))}
            </Tab.Panels>

        </Tab.Group>
    </div>
  )
}

export default EncabezadoCotizacion;
