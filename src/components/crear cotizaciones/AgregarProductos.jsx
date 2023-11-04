import { useEffect, useState } from "react";
//componentes
import AlertaForm from "../alertas/AlertaForm";
//helpers
import CalcularValorIva from '../../helpers/CalcularValorIva.js'
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import numeral from 'numeral';

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
        const longitudProductos=productos.length
        //actualiza el numerador del campo items
        const item_lenght=longitudProductos + 1;
        setItem(item_lenght)
        //Esconde o muestra la barra de creacion de items
        if(longitudProductos !== 0){
            setHideBarItem(true)
        }else{
            setHideBarItem(false)
        }
    },[productos])

    useEffect(()=>{
        //calculamos del valor total (dependiendo si hay un inpuesto aplicable)
        const valorInpuesto= Number(impuesto)
        const valUniFormat = numeral(valUni).value();
        if(valorInpuesto===0){
            const valorTotal = Number(cant)*valUniFormat
            const valorTotalFormat = numeral(valorTotal).format('0,0.000');
            setTotal(valorTotalFormat)
        }else if(valorInpuesto===19){
            const valorTotal = Number(cant)*valUniFormat
            const valorTotalIva= CalcularValorIva(valorTotal,impuesto)
            setTotal(valorTotalIva)
        }
    },[cant,valUni,impuesto])

    const handleAgregarProducto=()=>{
        //validaciones
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
        //formateando los valores valor unitario y total de string a numero
        const valUniFormat = numeral(valUni).value();
        const valTotalFormat = numeral(total).value();
        //objeto de datos del producto
        const newProducto={
            item:item,
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

    const cambiarEstadoHideBarItem=()=>{
        setHideBarItem(false)
    }

    
    const handleValorUnitarioChange = (event) => {
        const inputNumber = event.target.value;
        const formattedValue = formatCurrency(inputNumber);
        setValUni(formattedValue);
    };
    
    const formatCurrency = (value) => {
        if (!value) return '';
        
        // Remover cualquier formato existente, como comas
        const unformattedValue = value.replace(/,/g, '');
        
        // Dividir el valor en parte entera y parte decimal
        const parts = unformattedValue.split('.');
        
        let formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
        // Si hay parte decimal, limitar a tres decimales
        if (parts.length === 2) {
          formattedValue += `.${parts[1].substring(0, 3)}`;
        }
      
        return formattedValue;
    };
    
    return (
        <div className="flex flex-col gap-2">
            {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
            {
                !hideBarItem && (
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
                hideBarItem ? (
                    <button
                        onClick={cambiarEstadoHideBarItem}
                        className="w-1/12 first-letter:uppercase py-1 rounded  bg-yellow-300 border-2 border-yellow-500 font-semibold tracking-wide"
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
