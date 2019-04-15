'use strict';

exports.getUserData = function (req, res) {
  res.send(req.session.userData);
};
