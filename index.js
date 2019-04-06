require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
var path = require('path');
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure bodyParser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var routes = require('./app/routes/routes'); // importing route
routes(app); // register the routes
var incidenceRoutes = require('./app/routes/routesIncidence'); // importing route
incidenceRoutes(app);

// Listen & run server
app.listen(port, function () {
  console.log('App listening on port 8080');
});
