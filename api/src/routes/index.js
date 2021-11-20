const { Router } = require('express');
// Importar todos los routers;
const pokemons = require('./pokemons')
const tipos = require('./tipos')


const router = Router();

// Configurar los routers
router.use('/pokemons', pokemons);
router.use('/types', tipos);


module.exports = router;
