import { useState } from 'react';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines,faUser } from '@fortawesome/free-solid-svg-icons';
//Hooks
import useAuth from '../../hooks/useAuth'
//componentes
import Perfil from '../perfil/Perfil';

function Nav({openSideNav}) {
    const {auth}=useAuth()
    const [openPerfil,setOpenPerfil]=useState(false)
    return (
        <div className='w-full h-20 flex flex-row px-4 py-4 justify-between items-center'>

            <div className='w-3/12 flex flex-row items-center'>
                <div className='w-[70%]'>
                    <img src={auth?.images?.profileImange.url} className='w-16 h-16' />
                </div>
                <button
                    className='w-[30%] text-start'
                    onClick={()=>openSideNav(value=>!value)}
                >
                    <FontAwesomeIcon className='bg-slate-100 hover:bg-slate-300 py-1 px-2 rounded-lg' icon={faGripLines} size='xl' style={{color: "#000000",}} />
                </button>
            </div>

            <div className='w-7/12'>
                <h1 className='font-black text-2xl text-yellow-500 tracking-wider'>
                    {auth.razonSocial}
                </h1>
            </div>

            <div className='w-2/12 flex flex-column relative justify-end'>
                <button
                    onClick={()=>setOpenPerfil(value=>!value)}
                >
                    <FontAwesomeIcon className='bg-slate-100 hover:bg-slate-300 py-3 px-4 rounded-full' icon={faUser} size='lg' style={{color: "#000000",}} />
                </button>
                <Perfil
                    open={openPerfil}
                    close={()=>setOpenPerfil(false)}
                />
            </div>
        </div>
    )
}

export default Nav;
