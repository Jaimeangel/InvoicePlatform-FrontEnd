const FormatoCotizacionDB = ({
    dataContacto,
    dataCotizacion,
    dataCliente,
    dataUser
})=>{
    const formatCondiciones = {
        titulo:dataCotizacion.condiciones.titulo,
        text:dataCotizacion.condiciones.text
    }
    function concatenarTextos(objeto) {
        if (objeto.hasOwnProperty('text')) {
          const textosConcatenados = Object.values(objeto.text).join('');
          return textosConcatenados;
        } else {
          return 'Es un gusto presentarles la siguiente cotizacion';
        }
    }

    function eliminarAtributoItem(arrayDeObjetos) {
        return arrayDeObjetos.map(objeto => {
          const copiaObjeto = JSON.parse(JSON.stringify(objeto));
          delete copiaObjeto.item;
          return copiaObjeto;
        });
      }
    const formatEncabezado = concatenarTextos(dataCotizacion.encabezado)
    const formatProductos = eliminarAtributoItem(dataCotizacion.productos)
    
    const data={
        cliente:dataCliente._id,
        fecha:dataCotizacion.fecha,
        numeroCotizacion:dataCotizacion.numeroCotizacion,
        creador:dataUser._id,
        productos:formatProductos,
        valorTotal:dataCotizacion.valorTotal,
        subTotal:dataCotizacion.subTotal,
        IVA:dataCotizacion.IVA,
        notas:dataCotizacion.notas,
        condiciones:formatCondiciones,
        encabezado:formatEncabezado,
        celular:dataContacto.celular,
        email:dataContacto.email
    }

    return data
}

export default FormatoCotizacionDB
