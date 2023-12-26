import { formatoMonedaDosDecimales } from './formatoMonedas';

function CalcularValorIVA(valor,iva) {
    const ivaValor = Number(valor)*(Number(iva)/100)
    const newValor = Number(valor) + ivaValor
    const formatNewValor = formatoMonedaDosDecimales(newValor);
    return formatNewValor;
}

export default CalcularValorIVA;
