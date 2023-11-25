//router
import { Link } from 'react-router-dom';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

function Perfil({open,close}) {
  return (
    <ul
        className={`${open ? 'block':'hidden'} w-full flex flex-col  bg-white absolute mt-14 px-2 pt-8 pb-5 border shadow-md rounded-md`}
    >
        <Link
            to={'configuraciones'}
            onClick={close}
        >
            <li className='flex flex-row items-center gap-4 px-2 py-2 rounded-md hover:bg-slate-100 font-semibold'>
                <FontAwesomeIcon icon={faGear} size='lg' style={{color: "#000000",}} />  
                <span className='text-lg'>Configuraciones</span>
            </li>
        </Link>
        <hr className='my-2'/>
        <li
            className='flex flex-row items-center gap-4 px-2 py-2 rounded-md hover:bg-slate-100 font-semibold'
        >
            <FontAwesomeIcon icon={faRightFromBracket} size='lg' style={{color: "#000000",}} />  
            <span className='text-lg'>Cerrar sesión</span>
        </li>
    </ul>
  )
}

export default Perfil;
