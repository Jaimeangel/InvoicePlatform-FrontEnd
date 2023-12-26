import { useEffect, useState } from "react";
//componentes
import AlertaForm from "../alertas/AlertaForm";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//herlpers
import generarID from "../../helpers/generaID.js";
import CalcularValorIva from '../../helpers/CalcularValorIva.js'
import { 
    formatoMonedaInputChange,
    formatearMonedaStringToNumber,
    formatoMonedaDosDecimales
} from "../../helpers/formatoMonedas.js";

function AgregarProductos({productos,agregarProductos}) {
    const [showPanelAgregarItem,setShowPanelAgregarItem]=useState(true)
    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //data
    const [item,setItem]=useState(0)
    const [descrip,setDescrip]=useState('')
    const [valUni,setValUni]=useState('')
    const [cant,setCant]=useState(1)
    const [impuesto,setImpuesto]=useState(0)
    const [total,setTotal]=useState('')

    // actualizar item / switch panel agregar item
    useEffect(()=>{
        const longitudProductos=productos.length
        
        const item_lenght=longitudProductos + 1;
        setItem(item_lenght)

        if(longitudProductos === 0){
            setShowPanelAgregarItem(true)
        }else{
            setShowPanelAgregarItem(false)
        }
    },[productos])

    // actualizacion del valor total dependiendo del impuesto
    useEffect(()=>{
        const valorInpuesto= Number(impuesto)
        const valUniFormat = formatearMonedaStringToNumber(valUni);
        if(valorInpuesto === 0){
            const valorTotal = Number(cant)*valUniFormat
            const valorTotalFormat = formatoMonedaDosDecimales(valorTotal);
            setTotal(valorTotalFormat)
        }else if(valorInpuesto === 19){
            const valorTotal = Number(cant)*valUniFormat
            const valorTotalIva= CalcularValorIva(valorTotal,impuesto)
            setTotal(valorTotalIva)
        }
    },[cant,valUni,impuesto])

    const handleAgregarProducto=()=>{
        //validaciones
        if([descrip,valUni,total].includes('')){  
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

        const valUniFormat = formatearMonedaStringToNumber(valUni);
        const valTotalFormat = formatearMonedaStringToNumber(total);
        
        //data producto
        const newProducto={
            item:generarID(),
            descripcion:descrip,
            cantidad:cant,
            precioUnitario:valUniFormat,
            impuesto:impuesto,
            total:valTotalFormat
        }

        //agregamos el producto
        agregarProductos([...productos,newProducto])

        //resetear estado
        setItem(0)
        setDescrip('')
        setValUni('')
        setCant(1)
        setImpuesto(0)
        setTotal(0)
    }

    const cambiarEstadoPanelAgregarItem=()=>{
        setShowPanelAgregarItem(true)
    }

    const handleValorUnitarioChange = (event) => {
        const inputNumber = event.target.value;
        const formattedValue = formatoMonedaInputChange(inputNumber);
        setValUni(formattedValue);
    };
    
    return (
        <div className="flex flex-col gap-2">
            {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
            {
                showPanelAgregarItem && (
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
                            <textarea
                                value={descrip}
                                onChange={(e)=>setDescrip(e.target.value)}
                                rows="2"
                                className="w-full bg-white outline-none px-3 font-semibold"
                            ></textarea>
                        </div>
                        <input
                            value={valUni}
                            onChange={handleValorUnitarioChange}
                            type="text"
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
                            type="text"
                            disabled 
                        />
                    </div>
                )
            }
            {
                showPanelAgregarItem ? 
                    <button
                        onClick={handleAgregarProducto}
                        className="w-2/12 first-letter:uppercase py-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                    >
                        agregar item
                    </button>
                :
                    <button
                        onClick={cambiarEstadoPanelAgregarItem}
                        className="w-1/12 first-letter:uppercase py-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
            }
        </div>
    )
}

export default AgregarProductos;
