import formatFechaDataMongo from "../../helpers/formatFechaDataMongo";
import { formatoMonedaDosDecimales } from "../../helpers/formatoMonedas";

import { Link } from 'react-router-dom';

const items=[    
  {
      id:1,
      categoria:'tipo',
      proporcion:12
  },
  {
      id:2,
      categoria:'referencia',
      proporcion:10
  },
  {
      id:3,
      categoria:'fecha elaboración',
      proporcion:17
  },
  {
      id:4,
      categoria:'identificacion',
      proporcion:15
  },
  {
      id:5,
      categoria:'Nombre del cliente',
      proporcion:31
  },
  {
      id:6,
      categoria:'total',
      proporcion:15
  }
]

function CardCotizaciones({data}){
  const {
    _id,
    fecha,
    valorTotal,
    numeroCotizacion,
    nombre,
    identificacion
  }=data;

  return (
    <Link
        to={`${_id}`}
    >
        <div
            className='w-full flex flex-row cursor-pointer border border-black rounded bg-white hover:shadow-lg'
        >
        <p
            className='border-r border-black text-center font-semibold py-2'
            style={{
                width:`12%`
            }} 
        >
            COTIZACION
        </p>
        <div
            className='border-r border-black'
            style={{
                width:`10%`
            }} 
        >
            <p
                className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
            >{numeroCotizacion}</p>
        </div>
        <div
            className='border-r border-black'
            style={{
                width:`15%`
            }} 
        >
            <p
                className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
            >{formatFechaDataMongo(fecha)}</p>
        </div>
        <div
            className='border-r border-black'
            style={{
                width:`13%`
            }} 
        >
            <p
                className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
            >{identificacion}</p>
        </div>
        <div
            className='border-r border-black'
            style={{
                width:`35%`
            }} 
        >
            <p
                className="w-full bg-white outline-none px-3 py-1 font-semibold text-justify first-letter:uppercase"
            >{nombre}</p>
        </div>
        <input
            value={formatoMonedaDosDecimales(valorTotal)}
            type="text"
            className="bg-white text-center rounded font-semibold"
            style={{
                width:`15%`
            }}  
            disabled 
        />
        </div>
    </Link>
  )
}

export default CardCotizaciones;
