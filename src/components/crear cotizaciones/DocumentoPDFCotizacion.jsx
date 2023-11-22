import React from 'react'
//componentes React Pdf 
import {Document} from '@react-pdf/renderer'
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
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '8px', // o cualquier valor que se corresponda con el estilo redondeado que desees
                padding: '16px', // px-10 se traduce a 16px en Tailwind por defecto, ajusta según tus necesidades
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
        >
            <p
                style={{
                    fontWeight: '600', // El valor '600' corresponde a font-semibold en Tailwind
                    fontSize: '1.125rem', // El valor '1.125rem' corresponde a text-lg en Tailwind
                }}
            >{`${capitalizarPrimeraLetra(auth.ciudad)} , ${capitalizarPrimeraLetra(auth.departamento)} ${formatoFecha(cotizacion.fecha)}`}</p>
            <br/><br/>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        width: '50%',
                    }}
                >
                    <p
                        style={{
                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                            fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                        }}
                    >Respetados</p>
                    <p
                        style={{
                            fontStyle: 'italic', // Establece la fuente en cursiva
                            fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                            fontWeight: '700', // '700' corresponde a font-bold en Tailwind CSS
                        }}
                    >{`${clienteCotizacion()}`}</p>
                    <p
                        style={{
                            fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                        }}
                    >{`${capitalizarPrimeraLetra(cliente.ciudad)}`}</p>
                </div>
                <div
                    style={{
                        width: '50%', // '50%' corresponde a w-1/2 en Tailwind CSS
                        textAlign: 'end', // 'end' corresponde a text-end en Tailwind CSS
                    }}
                >
                    <p
                        style={{
                            fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                        }}
                    >{`${cotizacion.numeroCotizacion}`}</p>
                </div>
            </div>
            <br />
            <h2
                style={{
                    fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                }}
            >Ref: Cotizacion</h2>
            <br/><br />
            <h2
                style={{
                    fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                }}
            >Cordial saludo</h2>
            <br/>
            <p
                style={{
                    fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                    textAlign: 'justify', // 'justify' corresponde a text-justify en Tailwind CSS
                }}
            >{`${cotizacion.encabezado.text.texto1} ${cotizacion.encabezado.text.texto2} ${cotizacion.encabezado.text.texto3}`}</p>
            <br/>

            <div
                style={{
                    width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#cbd5e0', // Reemplaza con el valor correcto de bg-slate-100 en Tailwind CSS
                    border: '1px solid #000', // Reemplaza con el valor correcto de border-black en Tailwind CSS
                    borderRadius: '0.375rem', // Reemplaza con el valor correcto de rounded en Tailwind CSS
                    marginBottom: '0.5rem', // Reemplaza con el valor correcto de mb-2 en Tailwind CSS
                }}
            >
                    {
                        itemsCotizacion?.map((item)=>(
                            <p 
                                key={item.id} 
                                style={{
                                    width:`${item.proporcion}%`,
                                    borderRight:`${item.id === itemsCotizacion.length ? 'none' : '1px solid #000' }`,
                                    textAlign: 'center',
                                    fontWeight: '600',
                                }} 
                            >{capitalizarPrimeraLetra(item.categoria)}</p>
                        ))
                    }
            </div>
            <div
                style={{
                    width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem', // Reemplaza con el valor correcto de gap-1 en Tailwind CSS
                }}
            >
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
            <div
                style={{
                    width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end', // 'flex-end' corresponde a items-end en Tailwind CSS
                    gap: '0.25rem', // Reemplaza con el valor correcto de gap-1 en Tailwind CSS
                    marginTop: '1.25rem', // Reemplaza con el valor correcto de mt-5 en Tailwind CSS
                }}
            >
                <p
                    style={{
                        fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                        fontWeight: '500', // '500' corresponde a font-medium en Tailwind CSS
                    }}
                >{`Subtotal: ${formatSumaSubtotal}`}</p>
                <p
                    style={{
                        fontSize: '1.125rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                        fontWeight: '500', // '500' corresponde a font-medium en Tailwind CSS
                    }}
                >{`IVA 19%: ${formatSumaTotalIVA}`}</p>
                <p
                    style={{
                        fontSize: '1.5rem', // '1.5rem' corresponde a text-2xl en Tailwind CSS
                        fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                    }}
                >{`Total Neto: ${formatSumaTotalNeto}`}</p>
            </div>

            <div
                style={{
                    width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '1.25rem', // Reemplaza con el valor correcto de mt-5 en Tailwind CSS
                    textAlign: 'justify', // 'justify' corresponde a text-justify en Tailwind CSS
                }}
            >
                {
                    Object.keys(cotizacion.condiciones).length !== 0 && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '1.25rem', // Reemplaza con el valor correcto de mt-5 en Tailwind CSS
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: '700', // '700' corresponde a font-bold en Tailwind CSS
                                    fontSize: '1.3rem', // '1.875rem' corresponde a text-xl en Tailwind CSS
                                }}
                            >{`Condiciones comerciales: ${capitalizarPrimeraLetra(cotizacion.condiciones.titulo)}`}</p>
                            <p
                                style={{
                                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                    fontSize: '1.1rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                    fontStyle: 'italic', // Establece la fuente en cursiva
                                }}
                            >{`${capitalizarPrimeraLetra(cotizacion.condiciones.text)}`}</p>
                        </div>
                    )
                }
                {
                    cotizacion.notas !== '' && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '1.25rem', // Reemplaza con el valor correcto de mt-5 en Tailwind CSS
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: '700', // '700' corresponde a font-bold en Tailwind CSS
                                    fontSize: '1.3rem', // '1.875rem' corresponde a text-xl en Tailwind CSS
                                }}
                            >{`Notas`}</p>
                            <p
                                style={{
                                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                    fontSize: '1.1rem', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                    fontStyle: 'italic', // Establece la fuente en cursiva
                                }}
                            >{`${capitalizarPrimeraLetra(cotizacion.notas)}`}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DocumentoPDFCotizacion;
