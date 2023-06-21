/**
 *  Rutas de Events 
 *  host + /api/events
 */


// Imports
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, updateEvent, deleteEvent, createEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Inicializaciones
const router = Router();
// todas las rutas deben validar el token
router.use(validarJWT);

// Ejercicio: Todas tienen que estar validadas y autenticadas con JWT
// Obtener eventos
router.get('/', getEvents);


// Crear un nuevo evento
router.post(
    '/', 
    [
        // middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        check('user', 'El id del usuario es obligatorio').not().isEmpty(),
        validarCampos

    ],
    createEvent);

// Actualizar un evento
router.put('/:id', updateEvent);

// Eliminar un evento
router.delete('/:id', deleteEvent);

// Exportaciones
module.exports = router;