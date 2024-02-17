const formatFechaDataMongo=(date)=>{
    const campoFecha = new Date(date)
  
    const año = campoFecha.getFullYear();
    const mes = (campoFecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 al mes ya que los meses en JavaScript van de 0 a 11
    const día = campoFecha.getDate().toString().padStart(2, '0');

    const fechaFormateada = año + '-' + mes + '-' + día
    return fechaFormateada
}

export default formatFechaDataMongo;