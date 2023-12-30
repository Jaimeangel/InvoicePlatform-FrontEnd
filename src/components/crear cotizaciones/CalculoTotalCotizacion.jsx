import { useEffect, useState } from "react";
import FormatDinero from "../../helpers/FormatDinero";
import SwitchButtonPequeño from "../SwitchButtonPequeño";

function CalculoTotalCotizacion({productos,setCotizacion,cotizacion}) {
    //hide/show componente
    const [hide,setHide]=useState(true)
    // show datos en cotizacion pdf
    const [estado,setEstado]=useState(cotizacion.mostrarTotal)
    //data
    const [subtotal,setSubtotal]=useState('')
    const [iva,setIVA]=useState('')
    const [totalNeto,setTotalNeto]=useState('')

    //actualizar valores subTotal,IVA,total
    useEffect(()=>{
        //calculo total neto
        const sumaTotalNeto = productos.reduce(function (acumulador, elemento) {
            return acumulador + parseFloat(elemento.total);
        }, 0);

        const formatSumaTotalNeto = FormatDinero(sumaTotalNeto);
        setTotalNeto(formatSumaTotalNeto)

        //calculo total subtotal
        const sumaSubtotal = productos.reduce(function (acumulador, elemento) {
            // Convertimos los valores de cantidad y precioUnitario a números usando parseFloat
            const cantidad = parseFloat(elemento.cantidad);
            const precioUnitario = parseFloat(elemento.precioUnitario);
            
            // Realizamos la multiplicación y la sumamos al acumulador
            return acumulador + (cantidad * precioUnitario);
        }, 0);

        const formatSumaSubtotal = FormatDinero(sumaSubtotal);
        setSubtotal(formatSumaSubtotal)

        //calculo total iva
        const sumaTotalIVA = productos.reduce(function (acumulador, elemento) {
            const cantidad = parseFloat(elemento.cantidad);
            const precioUnitario = parseFloat(elemento.precioUnitario);
            const subtotal=cantidad * precioUnitario;
            const ivaOperacion= (parseFloat(elemento.impuesto)/100) * subtotal;
            return acumulador + ivaOperacion;
        }, 0);

        const formatSumaTotalIVA = FormatDinero(sumaTotalIVA);
        setIVA(formatSumaTotalIVA)

        //actulizando informacion en state principal
        const newData={
            ...cotizacion,
            productos:productos,
            valorTotal:sumaTotalNeto,
            subTotal:sumaSubtotal,
            IVA:sumaTotalIVA
        }
        setCotizacion(newData)

    },[productos])

    //hide/show componente calculo total cotizacion
    useEffect(()=>{
        const productosLongitud=productos.length;
        if(productosLongitud !== 0){
            setHide(false)
            return
        }
        setHide(true)
    },[productos])

    useEffect(()=>{
        //actulizando informacion en state principal
        if(estado){
            const newData={
                ...cotizacion,
                mostrarTotal:true
            }
            setCotizacion(newData)
        }else{
            const newData={
                ...cotizacion,
                mostrarTotal:false
            }
            setCotizacion(newData)
        }
    },[estado])


    return (
        <>
            {
                !hide && (
                    <div className="w-11/12 flex flex-row justify-between mt-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-semibold">¿Incluir datos totales en documento cotizacion?</p>
                            <SwitchButtonPequeño
                                enabled={estado}
                                setEnabled={()=> setEstado(value => !value)}
                            />
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-lg font-medium">{`Subtotal: ${subtotal}`}</p>
                            <p className="text-lg font-medium">{`IVA 19%: ${iva}`}</p>
                            <p className="text-xl font-semibold">{`Total Neto: ${totalNeto}`}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CalculoTotalCotizacion;
