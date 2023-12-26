//modales
import ModalEliminarItem from "./ModalEliminarItem";
import ModalEditarItem from "./ModalEditarItem";
import { formatoMonedaDosDecimales } from "../../helpers/formatoMonedas";

function CardProducto({data,productos,agregarProductos,index,view=false}) {
    const {
        item,
        descripcion,
        cantidad,
        precioUnitario,
        impuesto,
        total
    }=data;

    const formatNumberDosDecimales = (value) => {
        const numberFormat = formatoMonedaDosDecimales(value);
        return numberFormat
    }

    const eliminarItem = () => {
        const id=item;
        const nuevaListaProductos = [...productos];
        const indexAEliminar = nuevaListaProductos.findIndex(producto => producto.item === id);
        if(indexAEliminar !== -1){
          nuevaListaProductos.splice(indexAEliminar, 1);
          agregarProductos(nuevaListaProductos);
        }
    };

    const handleEditarProducto=(data)=>{       
        const editListaProductos=productos.map(producto=>producto.item===data.item ? data:producto)
        agregarProductos(editListaProductos)
    }

    return (
        <div className="flex flex-row">
            <div className={`${view ? 'w-full': 'w-11/12 '} flex flex-row  border border-black rounded bg-white`}>
                <p
                    className='border-r border-black text-center font-semibold py-2'
                    style={{
                        width:`6%`
                    }} 
                >
                    {index+1}
                </p>
                <div
                    className='border-r border-black'
                    style={{
                        width:`45%`
                    }} 
                >
                    <p
                        className="w-full bg-white outline-none px-3 py-1 font-semibold text-justify first-letter:uppercase"
                    >{descripcion}</p>
                </div>
                <input
                    value={formatNumberDosDecimales(precioUnitario)}
                    type="text"
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
                    value={formatNumberDosDecimales(total)}
                    type="text"
                    className="bg-white text-center rounded font-semibold"
                    style={{
                        width:`15%`
                    }}  
                    disabled 
                />
            </div>

            {
                !view && (
                    <div className="w-1/12 flex flex-row justify-between px-1 items-center">
                        <ModalEditarItem
                            index={index}
                            data={data}
                            handleEditarItem={handleEditarProducto}
                        />
                        <ModalEliminarItem
                            eliminarItem={eliminarItem}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default CardProducto
