//router
import { Link } from 'react-router-dom';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

function Perfil({open,close}) {

    const navigate = useNavigate()

    const cerrarSesion =()=>{
        localStorage.removeItem('tkns')
        navigate('/login')
    }

    return (
        <ul
            className={`${open ? 'block':'hidden'} w-full flex flex-col  bg-white absolute mt-11 px-2 pt-8 pb-5 border shadow-md rounded-md`}
        >
            <Link
                to={'configuraciones'}
                onClick={close}
            >
                <li className='cursor-pointer flex flex-row items-center gap-4 px-2 py-2 rounded-md hover:bg-slate-100 font-semibold'>
                    <FontAwesomeIcon icon={faGear} size='lg' style={{color: "#000000",}} />  
                    <span className='text-lg'>Configuraciones</span>
                </li>
            </Link>
            <hr className='my-2'/>
            <li
                onClick={cerrarSesion}
                className='cursor-pointer flex flex-row items-center gap-4 px-2 py-2 rounded-md hover:bg-slate-100 font-semibold'
            >
                <FontAwesomeIcon icon={faRightFromBracket} size='lg' style={{color: "#000000",}} />  
                <span className='text-lg'>Cerrar sesión</span>
            </li>
        </ul>
    )
}

export default Perfil;
