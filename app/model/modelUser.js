'user strict';
var sql = require('./db.js');

// Incidence object constructor
var User = function (user) {
  this.email = user.email;
  this.userName = user.userName;
  this.firstFamilyName = user.firstFamilyName;
  this.secondFamilyName = user.secondFamilyName;
};

User.getUserData = function (result) {
  sql.query('Select * from faltes', function (err, res) {
    if (err) {
      console.error('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
