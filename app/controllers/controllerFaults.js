'use strict';

var Fault = require('../model/modelFault.js');

exports.list_all_faults = function (req, res) {
  Fault.getAllFaults(function (err, fault) {
    if (err) {
      res.send(err);
    }
    res.send(fault);
  });
};
