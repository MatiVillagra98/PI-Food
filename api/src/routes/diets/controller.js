const { Diet } = require('../../db');

const createDiets = async () => {
    if(await Diet.count() === 0) {
        let diets = [
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
        diets = await diets.map(d => Diet.create(d));
        return diets;
    }
}

const getDiets = async ( req, res, next ) => {
    try {
        this.createDiets();
    } catch (error) {
        next(error)
    }
    const dietsList = await Diet.findAll({attributes: ['name']});
    res.status(200).send(dietsList)
};

module.exports = {
    getDiets,
    createDiets
};