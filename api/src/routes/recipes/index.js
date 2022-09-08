const { Router } = require('express');
const recipesController = require('./controller')

const router = Router();

router.get('/:id', recipesController.recipesDetail);
router.get('/', recipesController.getRecipes);
router.post('/', recipesController.createRecipe);

module.exports = router;