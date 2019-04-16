'user strict';
var sql = require('./db.js');

// Incidence object constructor
var Proposal = function (proposal) {
  this.proposal_id = proposal.proposal_id;
  this.descripcio = proposal.descripcio;
};

Proposal.getAllProposals = function (result) {
  sql.query('Select * from propostes', function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Proposal.getProposalById = function (id, result) {
  sql.query('Select descripcio from propostes where proposal_id = ?', [id], function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Proposal;
