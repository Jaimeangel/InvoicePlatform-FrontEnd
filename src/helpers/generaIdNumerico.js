function generarIdNumerico() {
    const caracteres = '0123456789';
    const longitud = 6;
  
    let id = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }
  
    return id;
}

export default generarIdNumerico;