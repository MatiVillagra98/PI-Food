const { Router } = require('express');
const dietController = require('./controller')

const router = Router();

router.get('/', dietController);

module.exports = router;