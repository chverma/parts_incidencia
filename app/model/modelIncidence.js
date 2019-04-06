'user strict';
var sql = require('./db.js');

// Incidence object constructor
var Incidence = function (incidence) {
  this.grup = incidence.grup;
  this.data = incidence.data;
  this.motiu = incidence.motiu;
  this.observacions = incidence.observacions;
  this.dia_com_pares = incidence.dia_com_pares;
  this.comentaris = incidence.comentaris;
  this.prof_nom = incidence.prof_nom;
  this.prof_cog1 = incidence.prof_cog1;
  this.prof_cog2 = incidence.prof_cog2;
  this.al_nom = incidence.al_nom;
  this.al_cog1 = incidence.al_cog1;
  this.al_cog2 = incidence.al_cog2;
  this.assignatura = incidence.assignatura;
  this.created_at = new Date();
};

Incidence.createIncidence = function (newIncidence, result) {
  sql.query('INSERT INTO incidence set ?', newIncidence, function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      newIncidence.incidence_id = res.insertId;
      result(null, newIncidence);
    }
  });
};

Incidence.getIncidenceById = function (incidenceId, result) {
  sql.query('Select task from incidence where id = ? ', incidenceId, function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Incidence.getAllIncidence = function (result) {
  sql.query('Select * from incidence', function (err, res) {
    if (err) {
      console.error('error: ', err);
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
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Incidence.removeById = function (id, result) {
  sql.query('DELETE FROM incidence WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Incidence;
