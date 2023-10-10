function BotonesBarraProgreso({cambiarPaso}) {
  return (
    <div className="w-full  bg-white rounded-lg px-10 py-6 shadow flex flex-row justify-between">
        <button
            onClick={()=>cambiarPaso(value=>value-1)}
            className='flex flex-row justify-center items-center  text-black text-lg tracking-wide font-semibold py-3 rounded-xl hover:bg-slate-100 shadow border px-8'
        >
            <p className="first-letter:uppercase">paso anterior</p>
        </button>
        <button
            onClick={()=>cambiarPaso(value=>value+1)} 
            className='flex flex-row justify-center items-center  text-black text-lg tracking-wide font-semibold py-3 rounded-xl hover:bg-slate-100 shadow border px-8'
        >
            <p className="first-letter:uppercase">Siguiente</p>
        </button>
    </div>
  )
}

export default BotonesBarraProgreso;
