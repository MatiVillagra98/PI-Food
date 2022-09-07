require('dotenv').config();
const { Router } = require('express');
const { Op, Diet, Recipe } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    let diet = [];
    let food = [];
    if (!isNaN(id)) {
        await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.data)
        .then(res => {
            diet = diet.concat(res.diets)       //Concateno el array diets de res

            for (const property in res) {      //Itera en cada propiedad de res y pusheo las dietas true que no esten agregadas
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
        .catch(err => console.log(err))
        res.status(200).send(food)
    } 
    else {
        food = await Recipe.findByPk(id)
        res.send(food)
    }
});

router.get('/recipes', async (req, res) => {
    const name = req.query.name[0].toUpperCase() + req.query.name.slice(1); //Capitalizo el name

    let promiseLoop = [];
    for (let i = 0; i < 10; i++){
        promiseLoop[i] = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${i}&addRecipeInformation=true`) //Guardo en cada posicion del array la respuesta de la API
        .then(response => response.data);
    };

    let foodListApi = [];
    await Promise.all(promiseLoop) //Espero que se resuelvan todas las promesas
        .then(data => {
            data.map(d => foodListApi = foodListApi.concat(d.results)) //Mapeo las respuestas y concateno los resultados al array de comidas
        })
        .catch(err => console.log(err));
        foodListApi = foodListApi.filter(r => r.title.includes(name)) //Filtro las comidas que contienen name

    const foodListDb = await Recipe.findAll(    //Guardo las comidas que trae la DB
        {where: 
            {name: {
                [Op.substring]:`${name}`
            }}
        }
    );
    const foodListMerge = foodListApi.concat(foodListDb);   //Uno la DB y la API
    if(foodListMerge.length != 0) {
        res.status(200).send(foodListMerge);
    }
    else {
        res.status(400).send('Comida no encontrado')
    }
});

router.post('/recipes', async (req, res) => {
    const { name, resume, health } = req.body;
    const diet = req.body.diet;
    req.body.id = await Recipe.count()+1

    if (!name || !resume || !health) {
        return res.status(404).send("Falta enviar datos obligatorios");
    } else {
        const food = await Recipe.create(req.body);
        await food.setDiets(diet)
        res.send(food)
    }

})

router.get('/diets', async ( req, res ) => {
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
    res.send('Dietas Cargadas')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
