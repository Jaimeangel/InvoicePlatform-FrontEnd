import {FormatoVisualCliente} from '../../helpers/FormatoVisualCliente'

export default function CardCliente({
    data,
    callback
}){
    const {
        tipoIdenti,
        identificacion,
        nombreCliente 
    } = FormatoVisualCliente(data)

    return (
        <div className="w-full flex flex-row justify-between">
            <div
                className='w-[100%] flex flex-row cursor-pointer border border-black rounded bg-white hover:shadow-lg'
            >
                <div
                    className='border-r  border-black'
                    style={{
                        width:`20%`
                    }} 
                >
                    <p
                        className="w-full outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                    >
                        {tipoIdenti}
                    </p>
                </div>
                                
                <div
                    className='border-r border-black'
                    style={{
                        width:`17%`
                    }} 
                >
                    <p
                        className="w-full bg-white outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                    >
                        {identificacion}
                    </p>
                </div>
                                
                <div
                    className='border-r border-black'
                    style={{
                        width:`53%`
                    }} 
                >
                    <p
                        className="w-full  outline-none px-3 py-1 font-semibold text-center first-letter:uppercase"
                    >
                        {nombreCliente}
                    </p>
                </div>
                <button
                    onClick={()=>callback(data)} 
                    className="w-[10%] text-center font-semibold italic bg-yellow-400 rounded rounded-l-none"
                >
                    ver más
                </button>
            </div>
        </div>
    )
}