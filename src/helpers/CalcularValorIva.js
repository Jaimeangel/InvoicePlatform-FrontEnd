function CalcularValorIVA(valor,iva) {
    const ivaValor = Number(valor)*(Number(iva)/100)
    const newValor = Number(valor) + ivaValor
    const formatNewValor = Number(newValor.toFixed(2))
    return formatNewValor;
}

export default CalcularValorIVA;
