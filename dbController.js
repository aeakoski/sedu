'use strict';

var website_url = "http://localhost:5432/"
//var mongoose = require('mongoose');
//var Track = mongoose.model('Tracks');

const { Client } = require('pg')

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432,
})

client.connect()


exports.section = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.newSection = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.part = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.newPart = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.saveResults = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.getQuestion = function(req, res) {
  console.log(req.body);
  //req.params.sectionid
  res.send(200);
};

exports.login = function(req, res) {
  console.log(req.body);
  //req.params.sectionid

  client.query("SELECT * FROM Student WHERE username = 'jdoe' AND password = '12345'", (err, res) => {
    console.log(err, res)
    
  });
  res.send(200);
};
