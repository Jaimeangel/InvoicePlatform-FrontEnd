import { useEffect, useState } from 'react'
//headlessui
import { Tab } from '@headlessui/react'
//componentes
import EncabezadoPersonalizado from '../EncabezadoPersonalizado'
import SwitchButton from '../Switch'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EncabezadoCotizacion() {
    let [categories,setCategories] = useState([
      {
        id: 1,
        categoria:'opcion 1',
        text:{
            texto1:'Deseamos comenzar esta cotización extendiéndole un cordial saludo. Es un gusto para nosotros presentarle la siguiente cotizacion para los productos/servicios que fueron solicitados. Valoramos su consideración y la oportunidad de ser su proveedor de confianza.',
            texto2:'La presente cotización incluye la descripción de los productos/servicios, los precios unitarios correspondientes, las cantidades y los impuestos aplicables. Creemos que nuestra oferta es competitiva y perfectamente adaptada a sus necesidades. Queremos recordarle que estamos disponibles en todo momento para atender sus preguntas y proporcionar información adicional. Su satisfacción es nuestra prioridad, y estamos comprometidos a brindarle la mejor experiencia posible en este proceso.',
            texto3:'Esperamos que esta cotización cumpla con sus expectativas y que tengamos la oportunidad de colaborar con usted. Agradecemos su interés y quedamos a su disposición para cualquier consulta que pueda surgir.'
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
        console.log(categoriesModificado)
    }


  return (
    <div className="w-full bg-white rounded-lg px-10 py-6 shadow-md">

        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1 border">
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
                            (
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
                            )
                            :
                            (
                                <EncabezadoPersonalizado
                                    estado={item.selecionado}
                                    id={item.id}
                                    cambiarEstado={cambiarEstado}
                                />
                            )
                        }
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default EncabezadoCotizacion;