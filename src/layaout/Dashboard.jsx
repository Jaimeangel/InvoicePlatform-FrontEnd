import { useState } from 'react';
//componentes
import Nav from '../components/dashboard/Nav.jsx'
import SideBar from '../components/dashboard/sideBar.jsx';
//router
import { Outlet } from 'react-router-dom';

function Dashboard(){
    const [open,setOpen]=useState(true)
    return (
        <div className='w-full h-full'>
    
          <Nav
            openSideNav={setOpen}
          />
    
          <div className='w-full h-full flex flex-row px-5 pb-5'>
    
            <SideBar
                sideNav={open}
            />
            
            <div className={`${open ?'w-4/5' : 'w-full'} h-screen shadow px-10 py-5  bg-gray-100 rounded-2xl`}>
              <Outlet/>
            </div>
    
          </div>
    
        </div>
      )
}

export default Dashboard;
