require('dotenv').config();
const { API_KEY } = process.env;
const { Op, Diet, Recipe } = require('../../db');
const axios = require('axios');
const capitalize = require('../../capitalize');
let createId = 0;
const { createDiets } = require('../diets/controller')

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
                title: res.title,
                type: res.dishTypes,
                diet: diet,
                summary: res.summary,
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
                attributes: ["title"], 
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
    let name = req.query.name;
    //Hago los 10 pedidos a la API y meto en array
    let promiseLoop = [];
    for (let i = 0; i < 2; i++){
        promiseLoop[i] = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${i}&addRecipeInformation=true`)
        .then(response => response.data)
        .catch(error => console.log(error));
    };
    let foodListApi = [];

    await Promise.all(promiseLoop)
        .then(data => {
            data.map(d => {
                for (let i = 0; i < d.results.length; i++) {
                    d.results[i].diets = d.results[i].diets.map(d => capitalize(d))  
                    foodListApi.push(d.results[i])            
                }
            }) //Mapeo las respuestas y concateno los resultados al array de comidas
            
        })
        .catch(error => next(error));

    let foodListDb = await Recipe.findAll(
        {include: [{
            model: Diet,
            as: 'diet',
            attributes: ["name"], 
            through: {
                attributes: []
            }
        }]}, 
    )
    const dietsToArray = []
    for (let i = 0; i < foodListDb.length; i++) {
        const diets = foodListDb[i].diet
        diets.map(d => dietsToArray.push(d.dataValues.name))
        foodListDb[i].dataValues.diets = dietsToArray;
    }

    if(name) {
        //Creo un array y meto las respuestas de la API que incluyan el nombre
        name = capitalize(name)
        foodListApi = foodListApi.filter(r => r.title.includes(name)) //Filtro las comidas que contienen name
        foodListDb = foodListDb.filter(r => r.title.includes(name))
    }
    //Uno el array de API con DB
    const foodListMerge = foodListApi.concat(foodListDb);
    if(foodListMerge.length != 0) {
        res.status(200).send(foodListMerge);
    }
    else {
        let notFound = [{
            id: 'NotFound',
            image: 'https://wetaca.com/images/404.png'
        }];
        res.send(notFound)
    }
};

const createRecipe = async (req, res) => {
    await createDiets();
    const { title, summary, health, diet } = req.body;
    req.body.id = createId;
    try {
        if (!title || !summary || !health) {
            return res.status(404).send("Falta enviar datos obligatorios");
        } else {
            const food = await Recipe.create(req.body);
            await food.setDiet(diet);
            res.status(201).send(food)
        }
    } catch (error) {
        res.status(500).send(console.log(error))
    }
    createId++
};

module.exports = {
    recipesDetail, 
    getRecipes, 
    createRecipe
}