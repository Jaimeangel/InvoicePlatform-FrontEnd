function obtenerElementosPorPagina(arrayOriginal, numeroPagina,itemsPorPagina) {
    const startIndex = (numeroPagina - 1) * itemsPorPagina;
    const endIndex = numeroPagina * itemsPorPagina;
    return arrayOriginal?.slice(startIndex, endIndex);
}

export {
    obtenerElementosPorPagina
}