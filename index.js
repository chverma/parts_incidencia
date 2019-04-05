require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var path = require('path');
// Static files
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./app/routes/routes'); // importing route
routes(app); // register the routes
var incidenceRoutes = require('./app/routes/routesIncidence'); // importing route
incidenceRoutes(app);

// Listen & run server
app.listen(port, function () {
  console.log('App listening on port 8080');
});
