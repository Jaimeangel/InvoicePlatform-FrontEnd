//router
import { Link } from "react-router-dom";
//font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
//opciones sibebar
const menuSibeBar=[
  {
    id:1, 
    opcion:'cotizaciones',
    link:'cotizaciones',
    icon:faFileLines
  }
]

function SideBar({sideNav}) {
  return (
    <aside className={`${sideNav ? 'block':'hidden'} w-1/5 pr-5 pt-8`}>
      {
        menuSibeBar.map(opcion=>(
          <Link
            key={opcion.id}
            to={`${opcion.link}`}
          >
            <button className='w-full flex flex-row justify-center items-center  text-black text-lg tracking-wide font-semibold py-3 rounded-xl  hover:bg-slate-100 shadow border-2'>
              <FontAwesomeIcon icon={opcion.icon} style={{color: "#000000",}} className="mr-5" />
              <p className="first-letter:uppercase">{opcion.opcion}</p>
            </button>
          </Link>
        ))
      }
    </aside>
  )
}

export default SideBar;
