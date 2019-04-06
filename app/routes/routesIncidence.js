'use strict';
const Incidence = require('../model/modelIncidence');

module.exports = function (app) {
  var incidencesList = require('../controllers/controllerIncidence');

  // todoList Routes
  app.get('/incidences', incidencesList.list_all_incidences);
  app.post('/incidences', incidencesList.create_an_incidence);

  app.get('/incidences/:incidenceId', incidencesList.read_an_incidence);
  app.put('/incidences/:incidenceId', incidencesList.update_an_incidence);
  app.delete('/incidences/:incidenceId', incidencesList.delete_an_incidence);
  app.get('/incidences/generate/:incidenceId', incidencesList.generate_pdf);
};
/*
exports.create_an_incidence = function (req, res) {
  var newIncidence = new Incidence(req.body);
  console.log(newIncidence, newIncidence)
  // handles null error
  if (!newIncidence.incidence) {
    res.status(400).send({error: true, message: 'Please provide incidence'});
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
  Incidence.getTaskById(req.params.incidenceId, function (err, incidence) {
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
};*/
