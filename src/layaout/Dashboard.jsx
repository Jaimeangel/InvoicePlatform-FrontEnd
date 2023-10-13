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
    
          <div className='w-full h-screen flex flex-row px-4 mb-5'>
    
            <SideBar
                sideNav={open}
            />
            
            <div className={`${open ?'w-5/6' : 'w-full'} h-screen shadow-inner p-8 bg-gray-100 rounded-2xl overflow-y-scroll`}>
              <Outlet/>
            </div>
    
          </div>
    
        </div>
      )
}

export default Dashboard;
