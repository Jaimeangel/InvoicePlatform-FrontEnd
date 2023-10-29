//modales
import ModalEliminarItem from "./ModalEliminarItem";
import ModalEditarItem from "./ModalEditarItem";

function CardProducto({data,productos,agregarProductos}) {
    const {
        item,
        descripcion,
        cantidad,
        precioUnitario,
        impuesto,
        total
    }=data;

    const editarItem=()=>{

    }

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
            <div className="w-1/12 flex flex-row justify-between px-1 items-center">
{/*                 <button
                    className="bg-blue-300 px-2 py-1 rounded-md mx-auto"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button> */}
                <ModalEditarItem
                    productos={productos}
                    agregarProductos={agregarProductos}
                    data={data}
                />
                <ModalEliminarItem
                    productos={productos}
                    agregarProductos={agregarProductos}
                    id={item}
                />
            </div>
        </div>
    )
}

export default CardProducto