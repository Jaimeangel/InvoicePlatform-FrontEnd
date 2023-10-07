import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faFileLines } from "@fortawesome/free-solid-svg-icons";

function SideBar({sideNav}) {
  return (
    <aside className={`${sideNav ? 'block':'hidden'} w-1/5 pr-5 py-5`}>
        <button className='w-full flex flex-row justify-center items-center  text-black text-lg tracking-wide font-semibold py-3 rounded-xl  hover:bg-slate-100'>
          <FontAwesomeIcon icon={faFileLines} style={{color: "#000000",}} className="mr-5" />
          Cotizaciones
        </button>
    </aside>
  )
}

export default SideBar;
