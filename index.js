const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// console.log( process.env.PORT );

// Crear servidor express
const app = express();

// Base de datos
dbConnection();

// Cors configuracion básica
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body "middleware"
app.use(express.json());

// Rutas
// TODO auth / crear, login, renew token
app.use('/api/auth', require('./routes/auth'));

// app.use('/api/auth', router);
// TODO: CRUD Eventos CRUD


// escuchar peticiones
app.listen(process.env.PORT,  () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});