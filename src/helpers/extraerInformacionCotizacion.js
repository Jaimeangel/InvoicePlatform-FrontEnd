import extraerInformacionCliente from "./ExtraerInformacionCliente";

function extraerInformacionCotizacion(cotizacion,cliente) {
    const {
        _id,
        fecha,
        valorTotal,
        numeroCotizacion
    }=cotizacion;

    const {nombre,identificacion} = extraerInformacionCliente(cliente)

    return {
        _id,
        fecha,
        valorTotal,
        numeroCotizacion,
        nombre,
        identificacion
    }
    
}

export default extraerInformacionCotizacion;
