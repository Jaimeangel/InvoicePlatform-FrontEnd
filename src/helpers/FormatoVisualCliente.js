export function FormatoVisualCliente(data) {
    if(!data){
        return data
    }
    const { tipoIdenti, identificacion, tipo } = data;

    const infoCliente = {
        tipoIdenti,
        identificacion,
        nombreCliente: tipo === 'empresa' ? data.nombreComercial || data.razonSocial : data.nombreComercial || `${data.nombres} ${data.apellidos}`
    };

    return infoCliente;
}

