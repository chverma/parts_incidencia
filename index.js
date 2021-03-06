require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
var path = require('path');
var Session = require('express-session');
const nocache = require('nocache');

app.use(nocache());
// Init Session
app.use(Session({
    secret: 'raysources-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));


app.use((req,res,next) => {
    console.log("-----------------log route", req.path)
    next();
})
app.use(checkUser);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure bodyParser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


function checkUser(req, res, next) {
  console.log("checkUser", req.path)
  if ((req.path === '/login' || req.path === '/oauthCallback') || (req.session && req.session.tokens!==undefined)) {
    return next();
  } else {
    //authenticate user
    return res.redirect(301, '/login');
  }


}

var routes = require('./app/routes/routes'); // importing route
routes(app); // register the routes
var incidenceRoutes = require('./app/routes/routesIncidence'); // importing route
incidenceRoutes(app);
var faultRoutes = require('./app/routes/routesFaults'); // importing route
faultRoutes(app);
var signInRoutes = require('./app/routes/routesGoogle');
signInRoutes(app);
var userRoutes = require('./app/routes/routesUser');
userRoutes(app);
var proposalsRoutes = require('./app/routes/routesProposals');
proposalsRoutes(app);

// Listen & run server
app.listen(port, function () {
  console.log('App listening on port 8080');
});
