
function capitalize(value) {
    let capitalWord = value.split(' ').map(p=>p[0].toUpperCase() + p.slice(1)).join(' ');
    return capitalWord;
};


module.exports = capitalize;