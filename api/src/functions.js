
function capitalize(value) {
    let capitalWord = value.toLowerCase().split(' ').map(p=>p[0].toUpperCase() + p.slice(1)).join(' ');
    return capitalWord;
};

function repetidos(arreglo, comida) {
    if(arreglo.length > 0){
        for (let i = 0; i < arreglo.length; i++) {
            if(arreglo[i].id === comida.id) {
                return true
            }
        }
    }
    return false;   
};

module.exports = {
    capitalize,
    repetidos
};