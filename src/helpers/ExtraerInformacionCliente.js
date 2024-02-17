function extraerInformacionCliente(clte) {
    const info = {
        'cliente': {
            'value': '',
            'identificacion':'',
            'data': clte
        }
    }

    Object.keys(info).forEach(key => {
        const element = info[key];
        if (element.data.tipo === 'empresa') {
            element.value = element.data.razonSocial;
            element.identificacion = element.data.identificacion;
        } else if (element.data.tipo === 'persona') {
            if (element.data.nombreComercial !== '') {
                element.value = element.data.nombreComercial;
                element.identificacion = element.data.identificacion;
            } else {
                element.value = `${element.data.nombres} ${element.data.apellidos}`;
                element.identificacion = element.data.identificacion;
            }
        }
    });


    return {
        nombre:info.cliente.value,
        identificacion:info.cliente.identificacion
    }

    
}


export default extraerInformacionCliente;