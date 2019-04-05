'use strict';

var Incidence = require('../model/modelIncidence.js');

exports.list_all_incidences = function (req, res) {
  Incidence.getAllIncidence(function (err, incidence) {
    console.log('controller');
    if (err) {
      res.send(err);
    }
    console.log('res', incidence);
    res.send(incidence);
  });
};

exports.create_an_incidence = function (req, res) {
  var newIncidence = new Incidence(req.body);

  // handles null error
  if (!newIncidence.incidence || !newIncidence.status) {
    res.status(400).send({error: true, message: 'Please provide incidence/status'});
  } else {
    Incidence.createIncidence(newIncidence, function (err, incidence) {
      if (err) {
        res.send(err);
      }
      res.json(incidence);
    });
  }
};

exports.read_an_incidence = function (req, res) {
  Incidence.getIncidenceById(req.params.incidenceId, function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json(incidence);
  });
};

exports.update_an_incidence = function (req, res) {
  Incidence.updateById(req.params.incidenceId, new Incidence(req.body), function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json(incidence);
  });
};

exports.delete_an_incidence = function (req, res) {
  Incidence.remove(req.params.incidenceId, function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Incidence successfully deleted' });
  });
};
