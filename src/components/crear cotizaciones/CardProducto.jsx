//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CardProducto({data}) {
    const {
        item,
        descripcion,
        cantidad,
        precioUnitario,
        impuesto,
        total
    }=data;

    

    return (
        <div className="flex flex-row">
            <div className="w-11/12 flex flex-row  border border-black rounded bg-white">
                <p
                    className='border-r border-black text-center font-semibold py-2'
                    style={{
                        width:`6%`
                    }} 
                >
                    {item}
                </p>
                <div
                    className='border-r border-black'
                    style={{
                        width:`45%`
                    }} 
                >
                    <p
                        rows="3"
                        className="w-full bg-white outline-none px-3 py-1 font-semibold"
                    >{descripcion}</p>
                </div>
                <input
                    value={precioUnitario}
                    type="number"
                    disabled
                    className='border-r border-black font-semibold py-2 outline-none text-center bg-white'
                    style={{
                        width:`15%`
                    }} 
                />
                <input
                    value={cantidad}
                    type="number"
                    disabled
                    className='border-r border-black font-semibold py-2 outline-none text-center bg-white'
                    style={{
                        width:`8%`
                    }} 
                />
                <p
                    className="text-center border-r border-black outline-none font-semibold py-2 flex items-center justify-center"
                    style={{
                        width:`11%`
                    }} 
                >
                    {`${impuesto} %`}
                </p>
                <input
                    value={total}
                    type="number"
                    className="bg-white text-center rounded font-semibold"
                    style={{
                        width:`15%`
                    }}  
                    disabled 
                />
            </div>
            <div className="w-1/12 flex flex-row justify-between px-3 items-center">
                <button
                    className="bg-blue-300 px-1 py-1 rounded-md"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                    className="bg-red-300 px-1 py-1 rounded-md"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}

export default CardProducto
