const { Router } = require('express');
const { getOrdered } = require('../controllers/pokemons');
// Importar todos los routers;
const pokemons = require('./pokemons')
const tipos = require('./tipos')

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemons);
router.use('/types', tipos);

//ordenamiento
router.get('/ordered/:by/:order', getOrdered)

module.exports = router;