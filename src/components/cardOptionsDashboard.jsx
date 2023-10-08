import React from 'react'
//router
import { Link } from 'react-router-dom';
//font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardOptionsDashboard({icon,text,link}) {
  return (
    <Link
        to={`${link}`}
    >
        <div className='bg-white max-w-xs h-[11rem] rounded-lg p-5 flex flex-col justify-around shadow-sm hover:shadow-md'>
            <FontAwesomeIcon className='my-5' icon={icon} size="2xl" style={{color: "#000000",}}/>
            <p className='text-xl first-letter:uppercase font-mono text-center font-semibold'>{text}</p>
        </div>
    </Link>
  )
}

export default CardOptionsDashboard;
