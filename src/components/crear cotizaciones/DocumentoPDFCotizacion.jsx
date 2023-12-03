import React from 'react'
//componentes React Pdf 
import {Document,Page,View,Text,Image} from '@react-pdf/renderer'
//componentes
import CardProductoPDF from './CardProductPDF.jsx'
//helpers
import FormatDinero from '../../helpers/FormatDinero';
//hooks
import useAuth from '../../hooks/useAuth.jsx'
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
        proporcion:35
    },
    {
        id:3,
        categoria:'valor unitario',
        proporcion:19
    },
    {
        id:4,
        categoria:'cant',
        proporcion:9
    },
    {
        id:5,
        categoria:'impuesto',
        proporcion:12
    },
    {
        id:6,
        categoria:'valor total',
        proporcion:19
    }
]

function DocumentoPDFCotizacion({cotizacion,cliente,auth}) {
    
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
        <Document>
            <Page 
                size='A4'
            >
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        padding: '16px 24px', // px-10 se traduce a 16px en Tailwind por defecto, ajusta según tus necesidades
                    }}
                >
                    <Image
                        style={{
                            borderRadius: '5px',
                        }} 
                        src={{ uri:auth?.images?.cotizacionImage?.url , method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} 
                    />

                    <Text
                        style={{
                            display:'block',
                            fontWeight: '600', // El valor '600' corresponde a font-semibold en Tailwind
                            fontSize: '13px', // El valor '1.125rem' corresponde a text-lg en Tailwind
                            marginBottom:'30px',
                            marginTop:'10px'
                        }}
                    >
                        {`${capitalizarPrimeraLetra(auth.ciudad)} , ${capitalizarPrimeraLetra(auth.departamento)} ${formatoFecha(cotizacion.fecha)}`}
                    </Text>
                    
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom:'30px'
                        }}
                    >
                        <View
                            style={{
                                width: '85%',
                                display:'flex',
                                flexDirection:'column',
                                gap:'3px'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                    fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                }}
                            >
                                Respetados
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'italic', // Establece la fuente en cursiva
                                    fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                    fontWeight: '900', // '700' corresponde a font-bold en Tailwind CSS
                                }}
                            >
                                {`${clienteCotizacion()}`}
                            </Text>
                            <Text
                                style={{
                                    fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                }}
                            >
                                {`${capitalizarPrimeraLetra(cliente.ciudad)}`}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '15%', // '50%' corresponde a w-1/2 en Tailwind CSS
                                textAlign: 'end', // 'end' corresponde a text-end en Tailwind CSS
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                    fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                }}
                            >
                                {`${cotizacion.numeroCotizacion}`}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            display:'flex',
                            flexDirection:'column',
                            marginBottom:'20px'
                        }}
                    >
                        <Text
                            style={{
                                display:'block',
                                fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                alignSelf:'flex-end'
                            }}
                        >
                            Ref: Cotizacion
                        </Text>
                        <Text
                            style={{
                                display:'block',
                                fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                
                            }}
                        >
                            Cordial saludo
                        </Text>

                    </View>
                    <Text
                        style={{
                            display:'block',
                            fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                            textAlign: 'justify', // 'justify' corresponde a text-justify en Tailwind CSS
                            marginBottom:'30px',
                            lineHeight: '1.5px'
                        }}
                    >
                        {`${cotizacion.encabezado.text.texto1} ${cotizacion.encabezado.text.texto2} ${cotizacion.encabezado.text.texto3}`}
                    </Text>


                    <View
                        style={{
                            width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#cbd5e0', // Reemplaza con el valor correcto de bg-slate-100 en Tailwind CSS
                            border: '1px solid #000', // Reemplaza con el valor correcto de border-black en Tailwind CSS
                            borderRadius: '2px', // Reemplaza con el valor correcto de rounded en Tailwind CSS
                            marginBottom: '6px', // Reemplaza con el valor correcto de mb-2 en Tailwind CSS
                        }}
                    >
                            {
                                itemsCotizacion?.map((item)=>(
                                    <Text 
                                        key={item.id} 
                                        style={{
                                            width:`${item.proporcion}%`,
                                            borderRight:`${item.id === itemsCotizacion.length ? 'none' : '1px solid #000' }`,
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            fontSize: '13px'
                                        }} 
                                    >
                                        {capitalizarPrimeraLetra(item.categoria)}
                                    </Text>
                                ))
                            }
                    </View>
                    <View
                        style={{
                            width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px', // Reemplaza con el valor correcto de gap-1 en Tailwind CSS
                            marginBottom:'20px'
                        }}
                    >
                        {
                            cotizacion.productos?.map((item,index)=>(
                                <CardProductoPDF
                                    index={index}
                                    key={item.item}
                                    data={item}
                                />
                            ))
                        }
                    </View>
                    <View
                        style={{
                            width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end', // 'flex-end' corresponde a items-end en Tailwind CSS
                            gap: '4px', // Reemplaza con el valor correcto de gap-1 en Tailwind CSS
                            marginBottom:'30px'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '14px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                fontWeight: '500', // '500' corresponde a font-medium en Tailwind CSS
                            }}
                        >
                            {`Subtotal: ${formatSumaSubtotal}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: '14px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                fontWeight: '500', // '500' corresponde a font-medium en Tailwind CSS
                            }}
                        >
                            {`IVA 19%: ${formatSumaTotalIVA}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: '16px', // '1.5rem' corresponde a text-2xl en Tailwind CSS
                                fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                            }}
                        >
                            {`Total Neto: ${formatSumaTotalNeto}`}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: '100%', // '100%' corresponde a w-full en Tailwind CSS
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'justify', // 'justify' corresponde a text-justify en Tailwind CSS
                            gap:'10px'
                        }}
                    >
                        {
                            Object.keys(cotizacion.condiciones).length !== 0 && (
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap:'1px'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: '700', // '700' corresponde a font-bold en Tailwind CSS
                                            fontSize: '14px', // '1.875rem' corresponde a text-xl en Tailwind CSS
                                            marginBottom:'3px'
                                        }}
                                    >
                                        {`Condiciones comerciales: ${cotizacion.condiciones.titulo}`}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                            fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                            fontStyle: 'italic', // Establece la fuente en cursiva
                                            lineHeight: '1.2px'
                                        }}
                                    >
                                        {`${capitalizarPrimeraLetra(cotizacion.condiciones.text)}`}
                                    </Text>
                                </View>
                            )
                        }
                        {
                            cotizacion.notas !== '' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap:'1px'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: '700', // '700' corresponde a font-bold en Tailwind CSS
                                            fontSize: '14px', // '1.875rem' corresponde a text-xl en Tailwind CSS
                                            marginBottom:'3px'
                                        }}
                                    >
                                        {`Notas`}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '600', // '600' corresponde a font-semibold en Tailwind CSS
                                            fontSize: '13px', // '1.125rem' corresponde a text-lg en Tailwind CSS
                                            fontStyle: 'italic', // Establece la fuente en cursiva
                                            lineHeight: '1.2px'
                                        }}
                                    >
                                        {`${capitalizarPrimeraLetra(cotizacion.notas)}`}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>

            </Page>
        </Document>
    )
}

export default DocumentoPDFCotizacion;
