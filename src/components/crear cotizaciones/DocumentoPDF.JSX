import React from 'react'
//componentes
import CardProducto from './CardProducto';
//hooks
import useAuth from '../../hooks/useAuth';
//helpers
import FormatDinero from '../../helpers/FormatDinero';
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

function DocumentoPDFCotizacion({cotizacion,cliente}) {
    const {auth}=useAuth()
    console.log(auth)
    console.log(cotizacion)
    console.log(cliente)

    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatoFecha(inputFecha) {
        // Dividir la cadena de fecha en año, mes y día
        const [año, mes, dia] = inputFecha.split('-');
      
        // Obtener el nombre del mes basado en el número del mes
        const nombresMeses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
      
        const nombreMes = nombresMeses[parseInt(mes, 10) - 1];
      
        // Construir la cadena de salida
        const output = `${dia} de ${nombreMes} del año ${año}`;
      
        return output;
    }

    function clienteCotizacion(){
        let string;
        if(cliente.tipoIdenti==='nit'){
            string = cliente.razonSocial
        }else if(cliente.tipoIdenti==='cedula'){
            string = `${cliente.nombres} ${cliente.apellidos}`
        }
        return string.toUpperCase();
    }

    const formatSumaTotalNeto = FormatDinero(cotizacion.valorTotal);
    const formatSumaSubtotal = FormatDinero(cotizacion.subTotal);
    const formatSumaTotalIVA = FormatDinero(cotizacion.IVA);

    return(
        <div className='w-full flex flex-col bg-white rounded-lg px-10 py-6 shadow-md'>
            <p className='font-semibold text-lg'>{`${capitalizarPrimeraLetra(auth.ciudad)} , ${capitalizarPrimeraLetra(auth.departamento)} ${formatoFecha(cotizacion.fecha)}`}</p>
            <br/><br/>
            <div className='w-full flex flex-row justify-between'>
                <div className='w-1/2'>
                    <p className='font-semibold text-lg'>Respetados</p>
                    <p className='italic text-lg font-bold'>{`${clienteCotizacion()}`}</p>
                    <p className='text-lg font-semibold first-letter:uppercase'>{`${cliente.ciudad}`}</p>
                </div>
                <div className='w-1/2 text-end'>
                    <p className='text-lg font-semibold'>{`${cotizacion.numeroCotizacion}`}</p>
                </div>
            </div>
            <br />
            <h2 className='text-lg font-semibold'>Ref: Cotizacion</h2>
            <br/><br />
            <h2 className='text-lg font-semibold'>Cordial saludo</h2>
            <br/>
            <p className='text-lg font-semibold text-justify'>{`${cotizacion.encabezado.text.texto1} ${cotizacion.encabezado.text.texto2} ${cotizacion.encabezado.text.texto3}`}</p>
            <br/>

            <div className="w-full flex flex-row bg-slate-100 border border-black rounded mb-2">
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
            <div className="w-full flex flex-col gap-1">
                {
                    cotizacion.productos?.map((item,index)=>(
                        <CardProducto
                            index={index}
                            key={item.item}
                            data={item}
                            view={true}
                        />
                    ))
                }
            </div>
            <div className="w-full flex flex-col items-end gap-1 mt-5">
                <p className="text-lg font-medium">{`Subtotal: ${formatSumaSubtotal}`}</p>
                <p className="text-lg font-medium">{`IVA 19%: ${formatSumaTotalIVA}`}</p>
                <p className="text-2xl font-semibold">{`Total Neto: ${formatSumaTotalNeto}`}</p>
            </div>

            <div className='w-full flex flex-col mt-5 text-justify'>
                {
                    Object.keys(cotizacion.condiciones).length !== 0 && (
                        <div className='flex flex-col mt-5'>
                            <p className='font-bold text-xl'>{`Condiciones comerciales: ${cotizacion.condiciones.titulo}`}</p>
                            <p className='font-semibold text-lg italic first-letter:uppercase'>{`${cotizacion.condiciones.text}`}</p>
                        </div>
                    )
                }
                {
                    cotizacion.notas !== '' && (
                        <div className='flex flex-col mt-5'>
                            <p className='font-bold text-xl'>{`Notas`}</p>
                            <p className='font-semibold text-lg italic first-letter:uppercase'>{`${cotizacion.notas}`}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DocumentoPDFCotizacion;
