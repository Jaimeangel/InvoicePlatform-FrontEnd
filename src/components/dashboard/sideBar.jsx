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
  },
  {
    id:2, 
    opcion:'clientes',
    link:'clientes',
    icon:faFileLines
  }
]

function SideBar({sideNav}) {
  return (
    <aside className={`${sideNav ? 'block':'hidden'} w-1/5 px-4 pt-8 flex flex-col gap-5 border shadow`}>
      {
        menuSibeBar.map(opcion=>(
          <Link
            key={opcion.id}
            to={`${opcion.link}`}
          >
            <button className='w-full flex flex-row justify-start items-center  text-black text-lg tracking-wide font-semibold py-3 px-10 rounded-lg  hover:bg-slate-100 shadow border-2'>
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
