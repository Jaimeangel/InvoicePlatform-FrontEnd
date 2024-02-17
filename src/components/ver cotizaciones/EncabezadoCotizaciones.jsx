const items=[    
    {
        id:1,
        categoria:'tipo',
        proporcion:12
    },
    {
        id:2,
        categoria:'referencia',
        proporcion:10
    },
    {
        id:3,
        categoria:'fecha elaboración',
        proporcion:15
    },
    {
        id:4,
        categoria:'identificacion',
        proporcion:13
    },
    {
        id:5,
        categoria:'Nombre del cliente',
        proporcion:35
    },
    {
        id:6,
        categoria:'total',
        proporcion:15
    }
]
function EncabezadoCotizaciones({children}) {
    return (
        <div>
            <div className="w-full flex flex-row bg-slate-100 border border-black rounded mb-2">
                {
                    items?.map((item)=>(
                        <p 
                            key={item.id} 
                            className={`${item.id === items.length ?'border-r-none' :'border-r border-black'} text-center first-letter:uppercase font-semibold`}
                            style={{
                                width:`${item.proporcion}%`
                            }} 
                        >
                            {item.categoria}
                        </p>
                    ))
                }
            </div>

            <div className="w-full flex flex-col gap-3">
                {children}
            </div>
        </div>
    )
}

export default EncabezadoCotizaciones;
