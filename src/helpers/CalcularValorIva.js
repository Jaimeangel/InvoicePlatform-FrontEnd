function CalcularValorIVA(valor,iva) {
    const ivaValor= Number(valor)*(Number(iva)/100)
    const newValor= Number(valor) + ivaValor
    return newValor;
}

export default CalcularValorIVA;
