require('dotenv').load();
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000,
  mysql = require('mysql');


// Localización de los ficheros estÃ¡ticos
app.use(express.static(__dirname + '/public'));



var routes = require('./app/routes/routes'); //importing route
routes(app); //register the routes

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});