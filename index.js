const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const PORT = process.env.PORT || 8062;

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
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// escuchar peticiones
app.listen(PORT,  () => {
    console.log(`Servidor corriendo en puerto ${ PORT }`);
});