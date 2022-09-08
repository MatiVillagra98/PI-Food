const { Diet } = require('./db');


function capitalize(value) {
    let capitalWord = value.split(' ').map(p=>p[0].toUpperCase() + p.slice(1)).join(' ');
    return capitalWord;
};

createDiets = async function() {
    try {
        if(await Diet.count() === 0) {
            const diets = [
                {name: 'Gluten Free'}, 
                {name: 'Ketogenic'},
                {name: 'Vegetarian'},
                {name: 'Lacto-Vegetarian'},
                {name: 'Ovo-Vegetarian'},
                {name: 'Vegan'},
                {name: 'Pescetarian'},
                {name: 'Paleo'},
                {name: 'Primal'},
                {name: 'Low FODMAP'},
                {name: 'Whole30'}
            ];
            await diets.map(d => Diet.create(d));
        } 
        const dietsList = await Diet.findAll({attributes: ['name']});
        return dietsList;
    } catch (error) {
        next(error)
    }
}

module.exports = { 
    capitalize,
    createDiets
};