import { useEffect, useState } from 'react';
//componentes
import Nav from '../components/dashboard/Nav.jsx'
import SideBar from '../components/dashboard/sideBar.jsx';
//router
import { Outlet,useNavigate } from 'react-router-dom';

function Dashboard(){
    const navigate = useNavigate()
    const [open,setOpen]=useState(true)

    useEffect(()=>{
      navigate('/dashboard/cotizaciones')
    },[])

    return (
        <div className='w-full h-screen flex flex-col'>
    
          <Nav
            openSideNav={setOpen}
          />
    
          <div className='w-full h-screen flex flex-row mb-5 overflow-auto'>
    
            <SideBar
                sideNav={open}
            />
            
            <div className={`${open ?'w-4/5' : 'w-full'} shadow-inner p-8 bg-gray-100 overflow-y-scroll`}>
              <Outlet/>
            </div>
    
          </div>
    
        </div>
    )
}

export default Dashboard;
