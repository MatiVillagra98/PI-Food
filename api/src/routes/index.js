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
    const food = [];
    let diet = [];
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
            
        })
        .catch(err => console.log(err))
        console.log(diet)
        res.status(200).send()
    }
});

// {
//     vegetarian: false,
//     vegan: false,
//     glutenFree: false,
//     dairyFree: true,
//     veryHealthy: false,
//     cheap: false,
//     veryPopular: false,
//     sustainable: false,
//     lowFodmap: false,
//     weightWatcherSmartPoints: 1,
//     gaps: 'no',
//     preparationMinutes: -1,
//     cookingMinutes: -1,
//     aggregateLikes: 0,
//     healthScore: 4,
//     creditsText: 'bla5@bla.com',
//     sourceName: 'The Kitchn',
//     pricePerServing: 82.06,
//     extendedIngredients: [
//       {
//         id: 15001,
//         aisle: 'Seafood',
//         image: 'anchovies.jpg',
//         consistency: 'SOLID',
//         name: 'anchovies',
//         nameClean: 'boquerones',
//         original: '6 oz marinated anchovies',
//         originalName: 'marinated anchovies',
//         amount: 6,
//         unit: 'oz',
//         meta: [],
//         measures: [Object]
//       },
//       {
//         id: 18064,
//         aisle: 'Bakery/Bread',
//         image: 'white-bread.jpg',
//         consistency: 'SOLID',
//         name: 'bread',
//         nameClean: 'bread',
//         original: '2 oz day-old bread',
//         originalName: 'day-old bread',
//         amount: 2,
//         unit: 'oz',
//         meta: [],
//         measures: [Object]
//       },
//       {
//         id: 11215,
//         aisle: 'Produce',
//         image: 'garlic.png',
//         consistency: 'SOLID',
//         name: 'garlic clove',
//         nameClean: 'garlic',
//         original: '1/2 garlic clove',
//         originalName: 'garlic clove',
//         amount: 0.5,
//         unit: '',
//         meta: [],
//         measures: [Object]
//       },
//       {
//         id: 4053,
//         aisle: 'Oil, Vinegar, Salad Dressing',
//         image: 'olive-oil.jpg',
//         consistency: 'LIQUID',
//         name: 'olive oil',
//         nameClean: 'olive oil',
//         original: '2 tsps olive oil plus 1/4 for drizzling',
//         originalName: 'olive oil plus 1/4 for drizzling',
//         amount: 2,
//         unit: 'tsps',
//         meta: [Array],
//         measures: [Object]
//       },
//       {
//         id: 11291,
//         aisle: 'Produce',
//         image: 'spring-onions.jpg',
//         consistency: 'SOLID',
//         name: 'scallions',
//         nameClean: 'spring onions',
//         original: '2 whole scallions, julienned',
//         originalName: 'whole scallions, julienned',
//         amount: 2,
//         unit: '',
//         meta: [Array],
//         measures: [Object]
//       }
//     ],
//     id: 2,
//     title: 'Anchovies Appetizer With Breadcrumbs & Scallions',
//     author: 'bla5@bla.com',
//     readyInMinutes: 15,
//     servings: 8,
//     sourceUrl: 'http://www.thekitchn.com/other-two-veg-recipes-notes-85779',
//     image: 'https://spoonacular.com/recipeImages/2-556x370.jpg',
//     imageType: 'jpg',
//     summary: 'Anchovies Appetizer With Breadcrumbs & Scallions is a <b>dairy free and pescatarian</b> recipe with 8 servings. One serving contains <b>57 calories</b>, <b>5g of protein</b>, and <b>2g of fat</b>. For <b>82 cents per serving</b>, this recipe <b>covers 4%</b> of your daily requirements of vitamins and minerals. A mixture of marinated anchovies, scallions, garlic clove, and a handful of other ingredients are all it takes to make this recipe so delicious. From preparation to the plate, this recipe takes roughly <b>15 minutes</b>. Try <a href="https://spoonacular.com/recipes/spaghetti-with-anchovies-and-breadcrumbs-68">Spaghetti with Anchovies and Breadcrumbs</a>, <a href="https://spoonacular.com/recipes/broccoli-rabe-with-anchovies-and-breadcrumbs-84627">Broccoli Rabe with Anchovies and Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/italian-string-beans-with-anchovies-and-breadcrumbs-648259">Italian String Beans With Anchovies and Breadcrumbs</a> for similar recipes.',
//     cuisines: [],
//     dishTypes: [
//       'antipasti',
//       'starter',
//       'snack',
//       'appetizer',
//       'antipasto',
//       "hor d'oeuvre"
//     ],
//     diets: [ 'dairy free', 'pescatarian' ],
//     occasions: [],
//     winePairing: {},
//     instructions: '<ol><li>Preheat oven to 400 F.</li><li>Remove crusts from bread and cut into bite-sized croutons.</li><li>Rub garlic in bottom of a small oven-safe skillet, add 2 teaspoons olive oil.</li><li> Rub croutons in oil until they absorb it all. </li><li>Bake for 7-10 minutes or until deep golden brown. </li><li>Remove and set aside.</li><li>Slice anchovies in thirds. </li><li>Toss with scallions. </li><li>Divide into small cups, ramekins or bowls between 4 and 8 ounces and nestle in the croutons.</li></ol>',
//     analyzedInstructions: [ { name: '', steps: [Array] } ],
//     originalId: null
//   }

router.get('/recipes', async (req, res) => {
    const name = req.query.name[0].toUpperCase() + req.query.name.slice(1); //Capitalizo el name

    let promiseLoop = [];
    for (let i = 0; i < 2; i++){
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





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
