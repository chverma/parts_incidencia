'user strict';
var sql = require('./db.js');

// Incidence object constructor
var Incidence = function (incidence) {
  this.task = incidence.task;
  this.status = incidence.status;
  this.created_at = new Date();
};

Incidence.createIncidence = function (newIncidence, result) {
  sql.query('INSERT INTO incidence set ?', newIncidence, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Incidence.getIncidenceById = function (incidenceId, result) {
  sql.query('Select task from incidence where id = ? ', incidenceId, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Incidence.getAllIncidence = function (result) {
  sql.query('Select * from incidence', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('tasks : ', res);
      result(null, res);
    }
  });
};

Incidence.updateById = function (id, incidence, result) {
  sql.query('UPDATE incidence SET task = ? WHERE id = ?', [incidence.incidence, id], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Incidence.removeById = function (id, result) {
  sql.query('DELETE FROM incidence WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Incidence;
