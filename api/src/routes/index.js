const { Router } = require('express');
const dogRouter = require('./dogRoute');
const dogsRouter = require('./dogsRoute');
const temperamentRoute = require('./temperamentRoute')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', dogRouter)
router.use('/dogs', dogsRouter)
router.use('/temperament', temperamentRoute)

module.exports = router;
