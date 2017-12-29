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


exports.section = function(req, response) {
  console.log(req.body);
  client.query("SELECT s.name, s.description, s.section_id, t.part_count \
                FROM section AS s\
                LEFT JOIN\
                	(\
                	SELECT COUNT(section_id) AS part_count, section_id \
                	FROM part \
                	GROUP BY section_id \
                ) AS t \
                ON s.section_id = t.section_id;", (err, res) => {
    //console.log(err, res)
    response.send(res.rows)
  });
  //req.params.sectionid

};

exports.newSection = function(req, res) {
  console.log(req.body);
  client.query("INSERT INTO Section (name, description)\
                VALUES ('"+req.body.name+"','"+req.body.description+"');", (err, res) => {
    //console.log(err, res)
  });
  //req.params.sectionid
  res.send(200);
};

exports.editSection = function(req, res) {
  console.log("editSection");
  console.log(req.body);
  client.query("UPDATE section\
                SET name = '"+req.body.name+"', description = '"+req.body.description+"'\
                WHERE section_id = "+req.body.section_id+";", (err, res) => {
  });
  //req.params.sectionid
  res.send(200);
};

exports.part = function(req, response) {
  client.query("SELECT * FROM part WHERE section_id = " + req.query.sectionid + ";", (err, res) => {
    response.send(res.rows);
  });
};

exports.newPart = function(req, res) {
  console.log(req.body);
  client.query("INSERT INTO Part (name, description, videourl)\
                VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.videourl+"','"+req.body.sectionid+"');", (err, res) => {
    //console.log(err, res)
  });
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
    //console.log(err, res)

  });
  res.send(200);
};
