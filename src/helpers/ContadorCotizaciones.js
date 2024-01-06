function ContadorCotizaciones(number) {
    console.log(number)
    const cotizacionNumero = number+1
    const formatNumero = String(cotizacionNumero).padStart(3, '0')
    return `CTZ-${formatNumero}`
}

export default ContadorCotizaciones;
