'use strict';

module.exports = function(app) {
  var controllers = require('./controller');

  app.route('/register')
    .post(controllers.register);
  app.route('/login')
    .post(controllers.login);
  app.use(require('./auth')) // middleware -> need token to access service below
  app.route('/layanan')
    .post(controllers.layanan);
  app.route('/transaksi')
    .post(controllers.transaksi);
};