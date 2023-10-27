import { useEffect, useState } from "react";
//componentes
import AlertaForm from "../alertas/AlertaForm";
//helpers
import CalcularValorIva from '../../helpers/CalcularValorIva.js'
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function AgregarProductos({productos,agregarProductos}) {
    const [hideBarItem,setHideBarItem]=useState(false)
    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //data
    const [item,setItem]=useState(0)
    const [descrip,setDescrip]=useState('')
    const [valUni,setValUni]=useState('')
    const [cant,setCant]=useState(1)
    const [impuesto,setImpuesto]=useState(0)
    const [total,setTotal]=useState(0)

    useEffect(()=>{
        //actualiza el numerador del campo items
        const item_lenght=productos.length + 1;
        setItem(item_lenght)
        //Esconde o muestra la barra de creacion de items
        if(productos.length !== 0){
            setHideBarItem(true)
        }
    },[productos])

    useEffect(()=>{
        const valorInpuesto= Number(impuesto)
        if(valorInpuesto===0){
            const valorTotal = Number(cant)*Number(valUni)
            setTotal(valorTotal)
        }else if(valorInpuesto===19){
            const valorTotal = Number(cant)*Number(valUni)
            const valorTotalIva= CalcularValorIva(valorTotal,impuesto)
            setTotal(valorTotalIva)
        }
    },[cant,valUni,impuesto])

    const handleAgregarProducto=()=>{
        if([descrip,valUni].includes('') && [total].includes(0)){  
            setAlert({
                msg:'Es necesario llenar todos los campos para agregar un item',
                error:true
            })
            
            setTimeout(() => {
                setAlert({
                msg:'',
                error:true
                })
            }, 4000);

            return
        }
        const newProducto={
            item:item,
            descripcion:descrip,
            cantidad:cant,
            precioUnitario:valUni,
            impuesto:impuesto,
            total
        }

        agregarProductos([...productos,newProducto])

        //resetear estado
        setItem(0)
        setDescrip('')
        setValUni('')
        setCant(1)
        setImpuesto(0)
        setTotal(0)
    }

    const cambiarEstadoHideBarItem=()=>{
        setHideBarItem(false)
    }
    
    return (
        <div className="flex flex-col gap-2">
            {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
            {
                !hideBarItem && (
                    <div className="w-full flex flex-row  border border-black rounded bg-white">
                        <p
                            className='border-r border-black text-center font-semibold py-2'
                            style={{
                                width:`6%`
                            }} 
                        >
                            {productos.length+1}
                        </p>
                        <div
                            className='border-r border-black'
                            style={{
                                width:`45%`
                            }} 
                        >
                            <textarea
                                value={descrip}
                                onChange={(e)=>setDescrip(e.target.value)}
                                rows="3"
                                className="w-full bg-white outline-none px-3 font-semibold"
                            ></textarea>
                        </div>
                        <input
                            value={valUni}
                            onChange={(e)=>setValUni(e.target.value)}
                            type="number"
                            className='border-r border-black font-semibold py-2 outline-none text-center'
                            style={{
                                width:`15%`
                            }} 
                        />
                        <input
                            value={cant}
                            onChange={(e)=>setCant(e.target.value)}
                            type="number"
                            className='border-r border-black font-semibold py-2 outline-none text-center'
                            style={{
                                width:`8%`
                            }} 
                        />
                        <select
                            value={impuesto}
                            onChange={(e)=>setImpuesto(e.target.value)}
                            className="text-center border-r border-black outline-none font-semibold py-2 "
                            style={{
                                width:`11%`
                            }} 
                        >
                            <option value={0}>0 %</option>
                            <option value={19}>19 %</option>
                        </select>
                        <input
                            value={total}
                            onChange={(e)=>setTotal(e.target.value)}
                            className="bg-white text-center rounded font-semibold"
                            style={{
                                width:`15%`
                            }}  
                            type="number"
                            disabled 
                        />
                    </div>
                )
            }
            {
                hideBarItem ? (
                    <button
                        onClick={cambiarEstadoHideBarItem}
                        className="w-2/12 first-letter:uppercase py-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                ):(
                    <button
                        onClick={handleAgregarProducto}
                        className="w-2/12 first-letter:uppercase py-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                    >
                        agregar item
                    </button>
                )

            }
        </div>
    )
}

export default AgregarProductos;
