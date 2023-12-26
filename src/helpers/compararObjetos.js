function compararDosObjetos(obj1, obj2) {
    for (let prop in obj1) {
        if (obj1[prop] !== obj2[prop]) {
            return false;
        }
    }
    return true;
}

export{
    compararDosObjetos
}