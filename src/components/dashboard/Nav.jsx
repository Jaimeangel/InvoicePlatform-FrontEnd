import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

function Nav({openSideNav}) {
  return (
    <div className='w-full flex flex-row px-7 py-4 justify-between items-center'>
        <div className='w-3/12 flex flex-row items-center justify-evenly'>
            <h1 className='font-black text-3xl text-yellow-500 tracking-wider'>
                MSproject
            </h1>
            <button
                onClick={()=>openSideNav(value=>!value)}
            >
                <FontAwesomeIcon className='bg-slate-100 hover:bg-slate-300 py-1 px-2 rounded-lg' icon={faGripLines} size='xl' style={{color: "#000000",}} />
            </button>
        </div>
        <div className='w-7/12'>
            <h1 className='font-black text-2xl text-yellow-500 tracking-wider'>
                La CentraL De Overoles SAS ZOMAC
            </h1>
        </div>
        <div className='w-2/12'>
            <h1 className='font-black text-3xl text-yellow-500 tracking-wider'>
                MSproject
            </h1>
        </div>
    </div>
  )
}

export default Nav;
