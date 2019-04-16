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
  this.email = incidence.email;
  this.proposal_id = incidence.proposal_id;
};

Incidence.createIncidence = function (newIncidence, result) {
  sql.query('INSERT INTO incidence set ?', newIncidence, function (err, res) {
    if (err) {
      //console.error('error: ', err);
      result(err, null);
    } else {
      newIncidence.incidence_id = res.insertId;
      result(null, newIncidence);
    }
  });
};

Incidence.getIncidenceById = function (incidenceId, result) {
  sql.query('Select * from incidence where incidence_id = ? ', incidenceId, function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Incidence.getAllIncidence = function (email, result) {
  sql.query(`Select email from administrators`, [], function (err, res) {
    var emails = res.reduce((total, elem) => {total.push(elem.email); return total;}, [])

    if (err) {
        console.error('error: ', err);
        result(null, err);
      } else {
        var where = '';
        if (!emails.includes(email)) {
          where = 'WHERE email = ?';
        }
        sql.query(`Select * from incidence ${where}`, [email], function (err, res) {
          if (err) {
            console.error('error: ', err);
            result(null, err);
          } else {
            result(null, res);
          }
        });
      }
  });
};

Incidence.updateById = function (id, incidence, result) {
  sql.query('UPDATE incidence SET ? WHERE incidence_id = ?', [incidence, id], function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, incidence);
    }
  });
};

Incidence.removeById = function (id, result) {
  sql.query('DELETE FROM incidence WHERE incidence_id = ?', [id], function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Incidence;
