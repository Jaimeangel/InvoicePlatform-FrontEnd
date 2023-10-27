import { useEffect, useState } from "react";
import FormatDinero from "../../helpers/FormatDinero";

function CalculoTotalCotizacion({productos}) {
    //hide/show
    const [hide,setHide]=useState(true)
    //data
    const [subtotal,setSubtotal]=useState('')
    const [iva,setIVA]=useState('')
    const [totalNeto,setTotalNeto]=useState('')

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

    },[productos])

    useEffect(()=>{
        //hide/show barra de agregar producto
        const productosLongitud=productos.length;
        if(productosLongitud !==0){
            setHide(false)
        }
    },[productos])

    return (
        <>
            {
                !hide && (
                    <div className="w-full flex flex-col items-end">
                        <p className="text-lg font-medium">{`Subtotal: ${subtotal}`}</p>
                        <p className="text-lg font-medium">{`IVA 19%: ${iva}`}</p>
                        <p className="text-2xl font-semibold">{`Total Neto: ${totalNeto}`}</p>
                    </div>
                )
            }
        </>
    )
}

export default CalculoTotalCotizacion;
