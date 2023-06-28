/**
 *  Rutas de Usuarios / Auth
 *  host + /api/auth
 */

// Imports
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, 
        loginUsuario, 
        revalidarToken 
    } = require('../controllers/auth');


// Inicializaciones
const router = Router();


//Crear un nuevo usuario
router.post(
    '/new', 
    [   
        // Validaciones middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
       
    ], 
    crearUsuario );
// Login de usuario
router.post(
    '/', 
    [   
        check('email', 'El email es obligatorio', validarCampos ).isEmail(),        
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario );
// Validar y revalidar token
router.get('/renew', validarJWT , revalidarToken ); 

module.exports = router;