import React from 'react'
import { useEffect,useState } from 'react';
//router
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
//font awesome icons
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
//components
import CardOptionsDashboard from '../../components/cardOptionsDashboard';
//opciones dashboard
const opciones=[
    {
        id:1,  
        text:'crea una cotizacion electronica',
        link:'crear-cotizacion',
        icon:faFileLines
    },
    {
        id:2,  
        text:'ver cotizaciones creadas',
        link:'ver-cotizaciones',
        icon:faReceipt
    }
]


function CotizacionesDashboard() {
    let location = useLocation();

    const [path,setPath]=useState('/dashboard/cotizaciones');

    useEffect(()=>{
        setPath(location.pathname)
    },[location.pathname])

    return (
        <div className='w-full flex flex-row gap-5 items-stretch'>
            
            {
                path === '/dashboard/cotizaciones' ?
                (
                    opciones.map((opcion)=>(
                        <CardOptionsDashboard
                            key={opcion.id}
                            text={opcion.text}
                            icon={opcion.icon}
                            link={opcion.link}
                        />
                    ))
                ):
                (
                    <Outlet/>
                )

            }
        </div>
    )
}

export default CotizacionesDashboard;
