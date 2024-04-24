import extraerInformacionCotizacion from "./extraerInformacionCotizacion";

export function FormatoVisualCotizacion(lista, callbackState) {
    if (!Array.isArray(lista)){
        return lista
    }

    if (lista.length === 0) {
        return lista;
    }

    const listaFormateada = lista.map(item => {
        if (!item || !item.cliente) {
            return item; 
        }
        return extraerInformacionCotizacion(item, item.cliente);
    }).reverse();


    callbackState(listaFormateada);
    return listaFormateada;
}
