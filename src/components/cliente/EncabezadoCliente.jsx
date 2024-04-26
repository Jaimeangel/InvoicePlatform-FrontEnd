const items=[    
    {
        id:1,
        categoria:'tipo identificación',
        proporcion:20
    },
    {
        id:2,
        categoria:'identificación',
        proporcion:17
    },
    {
        id:3,
        categoria:'nombre del cliente',
        proporcion:53
    },
    {
        id:4,
        categoria:'',
        proporcion:10
    }
]
function EncabezadoCliente({children}) {
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

export default EncabezadoCliente;