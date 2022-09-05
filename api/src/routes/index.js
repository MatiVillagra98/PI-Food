require('dotenv').config();
const { Router } = require('express');
const { Op, Diet, Recipe } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


router.get('/recipes', async (req, res) => {
    const { name } = req.query;
    let foodList = [];
    await
    axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`)
        .then(response => response.data)
        .then(data => {
            data.results.map(r => {
                console.log(r.title)
                if(r.title.includes(name)) foodList.push(r)
            })
        })
        .catch(err => console.log(err));
    foodList.concat(await Recipe.findAll(
        {where: 
            {name: {
                [Op.like]:`%${name}%`
            }}
        }
    ));
    if(foodList.length != 0) {
        res.status(200).json(foodList);
    }
    else {
        console.log(foodList)
        res.status(400).send('Comida no encontrado')
    }
});

router.get('/details/recipes/:id', async (req, res) => {
    const id = req.params;
    const food = [];
    if (!isNaN(id)) {
        axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(res => res.json())
        .then(res => food = res.map())
    }
})



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
