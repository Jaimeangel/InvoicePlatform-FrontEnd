import { useEffect, useState } from 'react'
//headlessui
import { Tab } from '@headlessui/react'
//componentes
import EncabezadoPersonalizado from '../crear cotizaciones/EncabezadoPersonalizado.jsx'
import SwitchButtonPequeño from '../SwitchButtonPequeño.jsx'
import AlertaForm from '../alertas/AlertaForm.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EncabezadoCotizacion({
}) {
      //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //categorias
    const [categories,setCategories] = useState({
      'DEFAULT':{
        categoria:'encabezado uno',
        text:{
            texto1:'Es un gusto para nosotros presentarle la siguiente cotizacion para los productos/servicios que fueron solicitados.',
            texto2:'Esperamos que esta cotización cumpla con sus expectativas y que tengamos la oportunidad de colaborar con ustedes. Estamos a su disposición para cualquier consulta que pueda surgir.'
        },
        selecionado:false
      },
      'PERSONALIZADO':{
        categoria:'encabezado personalizado',
        text:{
            texto1:'',
            texto2:''
        },
        selecionado:false
      },
    })

    const cambiarEstado=(target)=>{
        const stateInicial = {
            'DEFAULT':{
                ...categories['DEFAULT'],
                selecionado:false
            },
            'PERSONALIZADO':{
                ...categories['PERSONALIZADO'],
                selecionado:false
            }
        }
        const newData = {
            ...stateInicial,
            [target]:{
                ...stateInicial[target],
                selecionado:true
            }
        }

        setCategories(newData)
    }

  return(
    <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">

        <h1 className="mt-2 mb-2 text-2xl font-bold italic">Encabezado de cotizacion</h1>
        <h1 className="mt-2 mb-2 text-xl font-semibold italic">Puede elegir una opción de encabezado disponible o puede crear un encabezado personalizado.</h1>

        {alert.msg.length!==0 && <AlertaForm alert={alert}/>}

        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 border mt-5">
                <Tab className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black first-letter:uppercase border-none outline-none',
                            selected
                                ? 'bg-white shadow'
                                : 'text-black'
                            )
                }>
                    {categories['DEFAULT'].categoria}
                </Tab>
                <Tab className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black first-letter:uppercase border-none outline-none',
                            selected
                                ? 'bg-white shadow'
                                : 'text-black'
                            )
                }>
                    {categories['PERSONALIZADO'].categoria}
                </Tab>
            </Tab.List>

            <Tab.Panels className="mt-2">
                <Tab.Panel>
                    <div className='flex flex-col gap-2 px-3 py-3 border rounded-md'>
                        <div className='flex flex-col gap-2 font-semibold'>
                            <p className='text-justify'>{categories['DEFAULT'].text.texto1}</p>
                            <p className='text-justify'>{categories['DEFAULT'].text.texto2}</p>
                        </div>
                        <SwitchButtonPequeño
                            enabled={categories['DEFAULT'].selecionado}
                            setEnabled={()=>cambiarEstado('DEFAULT')}
                        />
                    </div>
                </Tab.Panel>
                <Tab.Panel>
                    <EncabezadoPersonalizado
                        stateInicial={categories}
                        cambiarContenido={setCategories}
                    />
                    <SwitchButtonPequeño
                        enabled={categories['PERSONALIZADO'].selecionado}
                        setEnabled={()=>cambiarEstado('PERSONALIZADO')}
                    />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default EncabezadoCotizacion;
