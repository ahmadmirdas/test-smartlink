'use strict';

const cryptoJS = require('crypto-js'),
      jwt = require('jsonwebtoken'),
      Promise = require('bluebird');
let response = require('./response'),
    model = require('./models');

exports.register = function(req, res) {
  let encryptPass = cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(req.body.password)); //Simple crypto
  model.user.create({
    nama: req.body.nama,
    username: req.body.username,
    password: encryptPass,
    telepon: req.body.telepon
  })
  .then((result) => {
    response.ok(null, res)
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.login = function(req, res) {
  model.user.findOne({
    where: { username: req.body.username }
  })
  .then((result) => {
    if (result < 1) {
      response.error('username tidak ditemukan', res)
    }
    let decryptPass = cryptoJS.enc.Base64.parse(result.password).toString(cryptoJS.enc.Utf8);
    if (decryptPass === req.body.password) {
      let token = jwt.sign({
        user_id: result.id,
        username: req.body.username
      }, process.env.SECRET_KEY, { expiresIn: "1h" })
      response.ok({
        id: result.id,
        nama: result.nama,
        username: result.username,
        token: token
      }, res)
    } else {
      response.error('password yang anda masukkan salah', res)
    }
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.layanan = function(req, res) {
  let dataUser = req.decoded;
  model.layanan.create({
    nama: req.body.nama,
    unit: req.body.unit,
    harga: req.body.harga,
    userId: dataUser.user_id
  })
  .then((result) => {
    response.ok({
      id: result.id,
      nama: result.nama,
      unit: result.unit,
      harga: result.harga,
      user_id: result.user_id
    }, res)
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.transaksi = function(req, res) {
  let dataUser = req.decoded;
  let detail = [],
      layananId = req.body.layanan_id,
      qty = req.body.qty,
      total = 0,
      diskon_rupiah, tagihan;
  Promise.each(layananId, (values, index, arrayLength) => {
    return model.layanan.findOne({
      where: { id: values }
    })
    .then((result) => {
      let data = {
        id: result.id,
        nama: result.nama,
        unit: result.unit,
        harga: result.harga
      }
      detail.push({
        id: index + 1,
        qty: qty[index],
        layanan: data
      })
    })
    .catch((err) => {
      console.error(err);
    });
  })
  .then(() => {
    for (let i = 0; i < detail.length; i++) {
      total += detail[i].qty * detail[i].layanan.harga;
    }
    diskon_rupiah = req.body.diskon_persen * total / 100;
    tagihan = total - diskon_rupiah;
    model.transaction.create({
      pelanggan: req.body.pelanggan,
      total: total,
      diskon_persen: req.body.diskon_persen,
      diskon_rupiah: diskon_rupiah,
      tagihan: tagihan,
      userId: dataUser.user_id,
      detail: JSON.stringify(detail)
    })
    .then((result) => {
      response.ok({
        id: result.id,
        pelanggan: result.pelanggan,
        total: result.total,
        diskon_persen: result.diskon_persen,
        diskon_rupiah: result.diskon_rupiah,
        tagihan: result.tagihan,
        userId: result.userId,
        detail: JSON.parse(result.detail)
      }, res)
    })
    .catch((err) => {
      console.error(err);
    });
  })
  .catch((err) => {
    console.error(err)
  })
};
