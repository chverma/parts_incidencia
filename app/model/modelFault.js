'user strict';
var sql = require('./db.js');

// Incidence object constructor
var Fault = function (fault) {
  this.falta_id = fault.falta_id;
  this.descripcio = fault.descripcio;
};

Fault.getAllFaults = function (result) {
  sql.query('Select * from faltes', function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Fault.getFaultById = function (id, result) {
  sql.query('Select descripcio from faltes where falta_id = ?', [id], function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Fault;
