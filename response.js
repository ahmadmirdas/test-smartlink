'use strict';

exports.ok = function(values, res) {
  let data = {}
  if (values == null) {
    data = {
      'code': 200,
      'status': 'success',
      'message': 'berhasil terdaftar'
    };
  } else {
    data = {
      'code': 200,
      'status': 'success',
      'data': values
    };
  }
  res.json(data);
  res.end();
};

exports.error = function(values, res) {
  let data = {
    'code': 400,
    'status': 'failed',
    'data': values
  };
  res.json(data);
  res.end();
};