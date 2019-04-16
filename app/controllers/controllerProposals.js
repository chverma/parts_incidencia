'use strict';

var Proposal = require('../model/modelProposal.js');

exports.list_all_proposals = function (req, res) {
  Proposal.getAllProposals(function (err, fault) {
    if (err) {
      res.send(err);
    }
    res.send(fault);
  });
};
