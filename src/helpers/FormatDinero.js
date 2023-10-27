function FormatDinero(value){
    const formateador = new Intl.NumberFormat("en", { style: "currency", "currency": "COP" });
    const numeroFormateado = formateador.format(value);
    return numeroFormateado;
}

export default FormatDinero;
