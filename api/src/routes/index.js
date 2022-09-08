const { Router } = require('express');
const recipesRouter = require('./recipes')
const dietsController = require('./diets')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/diets', dietsController);
router.use((error, req, res, next) => {
    res.status(500).send(error)
});

module.exports = router;
