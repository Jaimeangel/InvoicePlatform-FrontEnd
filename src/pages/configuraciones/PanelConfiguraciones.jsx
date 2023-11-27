import { useEffect, useState } from "react";
import { Outlet , Link, redirect} from "react-router-dom";

const configuraciones=[
    {
        id:1,
        texto:'datos perfil',
        link:'data-perfil'
    },
/*     {
        id:2,
        texto:'cotizacion',
        link:'configuracion-cotizacion'
    } */
]

function PanelConfiguraciones(){
    return (
        <div>
            <div className="w-full flex flex-row bg-white shadow-md">
                {
                    configuraciones.map(item=>(
                        <Link
                            key={item.id}
                            to={`${item.link}`}
                        >
                            <button className='px-20 py-2 hover:bg-slate-50 font-bold first-letter:uppercase tracking-wide'>
                                {item.texto}
                            </button>
                        </Link>
                    ))
                }
            </div>

            <div className="w-full mt-5">
                <Outlet/>
            </div>
        </div>
    )
}

export default PanelConfiguraciones;
