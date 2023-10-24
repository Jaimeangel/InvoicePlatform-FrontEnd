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
        <div className="flex flex-col gap-2">
            {/* {alert.msg.length!==0 && <AlertaForm alert={alert}/>} */}
            <div className="w-full flex flex-row  border border-black rounded bg-white">
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
                        /* value={descripcion} */
                        /* onChange={(e)=>setDescrip(e.target.value)} */
                        rows="3"
                        className="w-full bg-white outline-none px-3 py-1 font-semibold"
                    >{descripcion}</p>
                </div>
                <input
                    value={precioUnitario}
                    /* onChange={(e)=>setValUni(e.target.value)} */
                    type="number"
                    disabled
                    className='border-r border-black font-semibold py-2 outline-none text-center'
                    style={{
                        width:`15%`
                    }} 
                />
                <input
                    value={cantidad}
                    /* onChange={(e)=>setCant(e.target.value)} */
                    type="number"
                    disabled
                    className='border-r border-black font-semibold py-2 outline-none text-center'
                    style={{
                        width:`8%`
                    }} 
                />
                <p
                    /* value={impuesto} */
                    /* onChange={(e)=>setImpuesto(e.target.value)} */
                    className="text-center border-r border-black outline-none font-semibold py-2 flex items-center justify-center"
                    style={{
                        width:`11%`
                    }} 
                >
                    {`${impuesto} %`}
                </p>
                <input
                    value={total}
                    /* onChange={(e)=>setTotal(e.target.value)} */
                    className="bg-white text-center rounded font-semibold"
                    style={{
                        width:`15%`
                    }}  
                    type="number"
                    disabled 
                />
            </div>
        </div>
    )
}

export default CardProducto
