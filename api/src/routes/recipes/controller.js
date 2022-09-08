require('dotenv').config();
const { API_KEY } = process.env;
const { Op, Diet, Recipe } = require('../../db');
const axios = require('axios');
const capitalize = require('../../capitalize')
let createId = 0;

const recipesDetail = async (req, res, next) => {
    const { id } = req.params;
    let diet = [];
    let food = [];
    //Si ID es numero busca en la API
    if (!isNaN(id)) {
        await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.data)
        .then(res => {
            //Uso el array de las diets de la res
            diet = res.diets;  
            //Itera en cada propiedad de res y pusheo las dietas true que no esten agregadas
            for (const property in res) {      
                if ( res[property] === true && !diet.includes(property) ){
                    diet.push(property)
                }
            }
            food = [{
                img: res.image,
                name: res.title,
                type: res.dishTypes,
                diet: diet,
                resume: res.summary,
                health: res.healthScore,
                steps: res.analyzedInstructions[0].steps
            }]
        })
        .catch(error=> next(error))
    } 
    //Si id es string busca en la DB
    else {
        food = await Recipe.findByPk(id, {
            include: [{
                model: Diet, 
                attributes: ["name"], 
                through: {
                    attributes: []
                }
            }]
        });
    }
    if(!food){
        next('Error en la base de Datos')
    } else {
        res.status(200).send(food)
    }
};


const getRecipes = async (req, res, next) => {
    let name = capitalize(req.query.name);
    //Hago los 10 pedidos a la API y meto en array
    let promiseLoop = [];
    for (let i = 0; i < 1; i++){
        promiseLoop[i] = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${i}&addRecipeInformation=true`)
        .then(response => response.data)
        .catch(error => next(error));
    };
    //Creo un array y meto las respuestas de la API que incluyan el nombre
    let foodListApi = [];
    await Promise.all(promiseLoop)
        .then(data => {
            data.map(d => foodListApi = foodListApi.concat(d.results)) //Mapeo las respuestas y concateno los resultados al array de comidas
        })
        .catch(error => next(error));
    foodListApi = foodListApi.filter(r => r.title.includes(name)) //Filtro las comidas que contienen name
    //Creo un array y meto las comidas de la DB que incluyan el nombre
    const foodListDb = await Recipe.findAll(
        {where: 
            {name: {
                [Op.substring]:`${name}`
            }},
        include: [{
            model: Diet, 
            attributes: ["name"], 
            through: {
                attributes: []
            }
        }]}
    );
    //Uno el array de API con DB
    const foodListMerge = foodListApi.concat(foodListDb);
    if(foodListMerge.length != 0) {
        res.status(200).send(foodListMerge);
    }
    else {
        res.status(400).send('Comida no encontrada')
    }
    console.log(foodListMerge.length)
};

const createRecipe = async (req, res) => {
    const { name, resume, health, diet } = req.body;
    console.log(diet)
    req.body.id = createId; //Cuento las recetas y agrego el numero siguiente de ID
    if (!name || !resume || !health) {
        return res.status(404).send("Falta enviar datos obligatorios");
    } else {
        const food = await Recipe.create(req.body);
        await food.setDiets(diet);
        res.status(201).send(food)
    }
    createId++
};

module.exports = {
    recipesDetail, 
    getRecipes, 
    createRecipe
}