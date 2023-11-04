import numeral from 'numeral';

function CalcularValorIVA(valor,iva) {
    const ivaValor = Number(valor)*(Number(iva)/100)
    const newValor = Number(valor) + ivaValor
    const formatNewValor = numeral(newValor).format('0,0.000');
    return formatNewValor;
}

export default CalcularValorIVA;
