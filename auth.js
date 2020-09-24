'use strict';

const jwt = require('jsonwebtoken'),
      response = require('./response');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    // verified token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return response.error("Unauthorized access.", res);
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return response.error("No token provided", res);
  }
};