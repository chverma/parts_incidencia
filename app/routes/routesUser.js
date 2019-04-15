'use strict';

module.exports = function (app) {
  var controllerUser = require('../controllers/controllerUser');

  // todoList Routes
  app.get('/user', controllerUser.getUserData);
};
