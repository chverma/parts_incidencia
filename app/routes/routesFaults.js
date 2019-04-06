'use strict';

module.exports = function (app) {
  var controllerFaults = require('../controllers/controllerFaults');

  // todoList Routes
  app.get('/faults', controllerFaults.list_all_faults);
};
