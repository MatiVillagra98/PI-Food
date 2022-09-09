const { Diet } = require('../../db');


getDiets = async ( req, res, next ) => {
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
    } catch (error) {
        next(error)
    }
    const dietsList = await Diet.findAll({attributes: ['name']});
    res.status(200).send(dietsList)
};

module.exports = getDiets;