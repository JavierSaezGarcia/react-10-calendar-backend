const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const {  email, password } = req.body;

    try {
        let user = await User.findOne({ email }); // Busca si hay un usuario con este email
        // Si user no es null es porque ya existe
        if (user) {
            // entro porque el user no es null por tanto existe
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            })
        } 
        // El usuario no existe
        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();  
        // generar JWT
        const token = await generarJWT(user.id, user.name);
       
        return res.status(201).json({
            ok: true,
            msg: 'Registered User',
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        
    }
        
    
}

const loginUsuario = async(req, res = response) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email }); // Busca si hay un usuario con este email
       
        if (!user) {            
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto'
            });
        } 
        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            msg: `Hello ${user.name}, you are now logged`,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,           
            msg: 'Por favor hable con el administrador'
        })
        
    }
    
    
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;  

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,       
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}