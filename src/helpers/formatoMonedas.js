function formatoMonedaDosDecimales(inputNumber) {
    // Check if the input is a valid number
    if (isNaN(inputNumber)) {
        return 'Invalid Number';
    }

    // Round the number to two decimal places
    const roundedNumber = Number(inputNumber.toFixed(2));

    // Convert the number to a string with the desired format
    const formattedNumber = roundedNumber.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedNumber;
}

const formatoMonedaInputChange = (value) => {
    if (!value) return '';
    
    // Remover cualquier formato existente, como comas
    const unformattedValue = value.replace(/,/g, '');
    
    // Dividir el valor en parte entera y parte decimal
    const parts = unformattedValue.split('.');
    
    let formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Si hay parte decimal, limitar a tres decimales
    if (parts.length === 2) {
        formattedValue += `.${parts[1].substring(0, 3)}`;
    }
  
    return formattedValue;
};

function formatearMonedaStringToNumber(formattedString) {
    if(formattedString === ''){
        return 0
    }
    // Remove commas from the formatted string
    const stringWithoutCommas = formattedString.replace(/,/g, '');

    // Convert the string to a float
    const parsedNumber = parseFloat(stringWithoutCommas);

    // Check if the conversion was successful
    if (isNaN(parsedNumber)) {
        return 'Invalid Number';
    }

    return parsedNumber;
};

export {
    formatoMonedaDosDecimales,
    formatoMonedaInputChange,
    formatearMonedaStringToNumber
}