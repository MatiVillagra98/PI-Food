require('dotenv').config();
const { API_KEY } = process.env;
const { Op, Diet, Recipe } = require('../../db');
const axios = require('axios');
const { capitalize, repetidos } = require('../../functions');
let createId = 0;
const { createDiets } = require('../diets/controller')

const recipesDetail = async (req, res) => {
    const { id } = req.params;
    let diet = [];
    let food = [];

    //Si ID es numero busca en la API
    if (!isNaN(id)) {
        await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.data)
        .then(response => {
          //Uso el array de las diets de la respuesta
          diet = response.diets;  
          //Itera en cada propiedad de respuesta y pusheo las dietas true que no esten agregadas
          for (const property in response) {      
            if ( response[property] === true && !diet.includes(property) ){
              diet.push(property)
            }
          }
          food = [{
            id: response.id,
            image: response.image,
            title: response.title,
            type: response.dishTypes,
            diets: diet.map(d => capitalize(d)),
            summary: response.summary,
            health: response.healthScore,
            steps: response.analyzedInstructions[0] ? response.analyzedInstructions[0].steps : null
          }];
          res.status(200).send(food)
        })
        .catch(error => res.status(500).send(error.message))
    } 
    //Si id es string busca en la DB
    else {
      food.push(await Recipe.findByPk(id, {
        include: [{
          model: Diet, 
          as: 'diet',
          attributes: ["name"], 
          through: {
            attributes: []
          } 
        }]
      }))
      const dietsToArray = []
      const diets = food[0].diet
      diets.map(d => dietsToArray.push(d.dataValues.name))
      food[0].dataValues.diets = dietsToArray;
      const stepsToArray = [];
      food[0].steps.map(s => stepsToArray.push(JSON.parse(s)))
      food[0].steps = stepsToArray;
      res.status(200).send(food)
    }
};


const getRecipes = async (req, res) => {
  try {
    let name = req.query.name;
    // Hago los 10 pedidos a la API y meto en array
    let promiseLoop = [];
    for (let i = 0; i < 1; i++){
        promiseLoop[i] = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${i}&addRecipeInformation=true`)
        .then(response => response.data)
        .catch(error => console.log(error));
    };
    let foodListApi = [];

    await Promise.all(promiseLoop)
      .then(data => {
        promiseLoop.map(d => {
          for (let i = 0; i < d.results.length; i++) {
            d.results[i].diets = d.results[i].diets.map(d => capitalize(d)) 
            if(!repetidos(foodListApi, d.results[i])) { //Funcion repetidos para meter los que no estan
              foodListApi.push(d.results[i])  
            } 
          }
        })
      })
      .catch(error => console.log(error));

    let foodListDb = await Recipe.findAll({
      include: [{
      model: Diet,
      as: 'diet',
      attributes: ["name"], 
      through: {
          attributes: []
      }
    }]})
    for (let i = 0; i < foodListDb.length; i++) {
      const dietsToArray = []
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
        res.status(202).send(foodListMerge);
    }
    else {
      let notFound = [{
        id: 'NotFound',
        image: 'https://wetaca.com/images/404.png'
      }];
      res.status(200).send(notFound)
    }
  }
  catch (error) {
    res.status(500).send(error)
  }
};

const createRecipe = async (req, res) => {
    await createDiets();
    const { title, summary, diet } = req.body;
    req.body.id = createId;
    try {
        if (!title || !summary ) {
          return res.status(400).send("Falta enviar datos obligatorios");
        } else {
          const food = await Recipe.create(req.body);
          await food.setDiet(diet);
          res.status(201).send(food)
        }
    } catch (error) {
      res.status(505).send(error.message) 
    } 
    createId++
};

module.exports = {
    recipesDetail, 
    getRecipes, 
    createRecipe
}

