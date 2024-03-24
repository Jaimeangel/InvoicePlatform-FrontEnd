const formatFechaDataMongo = (date) => {
    const campoFecha = new Date(date);

    // Obtener la diferencia entre la hora local y UTC en minutos
    const zonaHorariaOffset = campoFecha.getTimezoneOffset();

    // Sumar el offset de zona horaria para obtener la fecha correcta en UTC
    campoFecha.setMinutes(campoFecha.getMinutes() + zonaHorariaOffset);

    const año = campoFecha.getUTCFullYear();
    const mes = (campoFecha.getUTCMonth() + 1).toString().padStart(2, '0'); // Se suma 1 al mes ya que los meses en JavaScript van de 0 a 11
    const día = campoFecha.getUTCDate().toString().padStart(2, '0');

    const fechaFormateada = año + '-' + mes + '-' + día;
    return fechaFormateada;
};

export default formatFechaDataMongo;