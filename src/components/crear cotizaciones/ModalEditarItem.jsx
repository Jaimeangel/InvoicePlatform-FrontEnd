import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
//componentes
import AlertaForm from '../../components/alertas/AlertaForm'
//helpers
import CalcularValorIva from '../../helpers/CalcularValorIva.js'
import numeral from 'numeral';
//data
const itemsCotizacion=[
    {
        id:1,
        categoria:'item',
        proporcion:6
    },
    {
        id:2,
        categoria:'descripción',
        proporcion:45
    },
    {
        id:3,
        categoria:'valor unitario',
        proporcion:15
    },
    {
        id:4,
        categoria:'cant',
        proporcion:8
    },
    {
        id:5,
        categoria:'impuesto',
        proporcion:11
    },
    {
        id:6,
        categoria:'valor total',
        proporcion:15
    }
]

function ModalEditarItem({handleEditarItem,data,index}){
    /* console.log('aqui') */
    //alertas
    const [alert,setAlert]=useState({msg:'',error:false})
    //hide/show
    let [isOpen, setIsOpen]=useState(false)
    //data comparacion
    const [dataComparacion,setDataComparacion]=useState({})
    //data
    const [item,setItem]=useState(0)
    const [descrip,setDescrip]=useState('')
    const [valUni,setValUni]=useState('')
    const [cant,setCant]=useState(1)
    const [impuesto,setImpuesto]=useState(0)
    const [total,setTotal]=useState('')

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalSinEditar(){
        const producto={
            item:item,
            descripcion:descrip,
            cantidad:cant,
            precioUnitario:valUni,
            impuesto:impuesto,
            total:total
        }

        function sonObjetosIguales(obj1, obj2) {
            for (let prop in obj1) {
                if (obj1[prop] !== obj2[prop]) {
                    return false;
                }
            }
            return true;
        }

        const sonIguales = sonObjetosIguales(producto, dataComparacion);

        if(!sonIguales) {
            setItem(dataComparacion.item)
            setDescrip(dataComparacion.descripcion)
            setValUni(dataComparacion.precioUnitario)
            setCant(dataComparacion.cantidad)
            setImpuesto(dataComparacion.impuesto)
            setTotal(dataComparacion.total)
        }
        
        closeModal()
    }

    //handler editar el producto
    const handleEditarProducto=()=>{
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
        
        //formateando los valores valor unitario y total de string a numero
        const valUniFormat = numeral(valUni).value();
        const valTotalFormat = numeral(total).value();

        //objeto de datos del producto
        const editProducto={
            item:item,
            descripcion:descrip,
            cantidad:cant,
            precioUnitario:valUniFormat,
            impuesto:impuesto,
            total:valTotalFormat
        }

        handleEditarItem(editProducto)
        
        closeModal()
    }

    //cargar la informacion del producto/item
    useEffect(()=>{
        setItem(data.item)
        setDescrip(data.descripcion)
        setValUni(data.precioUnitario)
        setCant(data.cantidad)
        setImpuesto(data.impuesto)
        setTotal(data.total)

        //objeto de datos del producto
        const valUniNumber = data.precioUnitario.toString()
        const valUniStringFormatMoney= formatCurrency(valUniNumber);
        const valorTotalStringFormatMoney = numeral(data.total).format('0,0.000');
        
        const dataProducto={
            item:data.item,
            descripcion:data.descripcion,
            cantidad:data.cantidad,
            precioUnitario:valUniStringFormatMoney,
            impuesto:data.impuesto,
            total:valorTotalStringFormatMoney
        }
        setDataComparacion(dataProducto)
    },[data])

    //actualizar el valor total del item de acuerdo a cant,val unitario e impuesto 
    useEffect(()=>{
        //calculamos del valor total (dependiendo si hay un inpuesto aplicable)
        const valorInpuesto= Number(impuesto)
        //convertimos el valor unitario string a numero
        const valUniFormat = numeral(valUni).value();
        if(valorInpuesto===0){
            const valorTotal = Number(cant)*valUniFormat
            //convirtiendo valor numerico a string formato moneda
            const valorTotalFormat = numeral(valorTotal).format('0,0.000');
            setTotal(valorTotalFormat)
        }else if(valorInpuesto===19){
            const valorTotal = Number(cant)*valUniFormat
            const valorTotalIva= CalcularValorIva(valorTotal,impuesto)
            setTotal(valorTotalIva)
        }
    },[cant,valUni,impuesto])

    useEffect(()=>{
        if(isOpen===true){
            const inputNumber = valUni.toString()
            const formattedValue = formatCurrency(inputNumber);
            setValUni(formattedValue);
        }
    },[isOpen])

    //funcion utilizada para cambiar el val Unitario a un formato especifico [tipo string]
    const handleValorUnitarioChange = (event) => {
        const inputNumber = event.target.value;
        const formattedValue = formatCurrency(inputNumber);
        setValUni(formattedValue);
    };
    
    //funcion formatea el valor a uno tipo moneda
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
    <>
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-300 px-2 py-1 rounded-md mx-auto outline-none"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>


      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl flex flex-col gap-2 transform overflow-hidden border rounded-md  bg-white p-10 text-left align-middle shadow-xl transition-all">
                    {alert.msg.length!==0 && <AlertaForm alert={alert}/>}
                    <h1 className="mt-1 mb-1 text-2xl font-bold">Editar el producto</h1>
                    <div className="w-full flex flex-row bg-slate-100 border border-black rounded">
                        {
                            itemsCotizacion?.map((item)=>(
                                <p 
                                    key={item.id} 
                                    className={`${item.id === itemsCotizacion.length ?'border-r-none' :'border-r border-black'} text-center first-letter:uppercase font-semibold`}
                                    style={{
                                        width:`${item.proporcion}%`
                                    }} 
                                >{item.categoria}</p>
                            ))
                        }
                    </div>
                    <div className="w-full flex flex-row  border border-black rounded bg-white">
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
                            className="bg-white text-center rounded font-semibold"
                            style={{
                                width:`15%`
                            }}  
                            type="text"
                            disabled 
                        />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <button
                            onClick={handleEditarProducto}
                            className='bg-blue-500 px-5 text-black text-lg tracking-wide font-bold py-1 rounded-md shadow border outline-none'
                        >
                            Editar
                        </button>
                        <button
                            onClick={closeModalSinEditar}
                            className='bg-green-500 px-5 text-black text-lg tracking-wide font-bold py-1 rounded-md shadow border outline-none'
                        >
                            Cancelar
                        </button>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalEditarItem