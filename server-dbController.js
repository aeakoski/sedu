'use strict';
const { Client } = require('pg')

var website_url = "http://localhost:5432/"

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432,
})

client.connect()

/* ------------ REGULAR GETS ---------------- */

exports.section = function(req, response) {
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
};

exports.part = function(req, response) {
  client.query("SELECT * FROM part WHERE section_id = " + req.query.sectionid + ";", (err, res) => {
    response.send(res.rows);
  });
};

exports.question = function(req, response){
  let q = "";
  if (parseInt(req.query.exam)) {
    console.log(req.query.exam);
    q = "\
    SELECT q.question, q.answer, q.question_id, ps.section_id, ps.part_id \
    FROM question as q\
    LEFT JOIN\
    (SELECT section_id, part_id FROM part) AS ps\
    ON q.part_id = ps.part_id\
    WHERE q.isexam = 't' AND ps.section_id = " + req.query.id + ";";
  }else{
    q = "\
    SELECT question, answer, question_id, part_id, isexam \
    FROM question\
    WHERE part_id = "+ req.query.id +";";
  }
  client.query(q, (err, res)=>{

    response.send(res.rows);
  });
}


/* ------------ NEWS ---------------- */

exports.newSection = function(req, res) {
  console.log("NEW Section");
  console.log(req.body);
  client.query("INSERT INTO section (name, description)\
                VALUES ('"+req.body.name+"','"+req.body.description+"');", (err, res) => {
    //console.log(err, res)
  });
  res.send(200);
};

exports.newPart = function(req, res) {
  //TODO Sanitize video!!!
  client.query("INSERT INTO part (name, description, video, section_id)\
                VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.video+"','"+req.body.section_id+"');", (err, res) => {
  });
  res.send(200);
};

exports.newQuestion=function(req, res){
  client.query("INSERT INTO question (question, answer, isexam, part_id)\
                VALUES ('"+req.body.question+"','"+req.body.answer+"','"+req.body.isexam+"','"+req.body.part_id+"');", (err, res) => {
                  console.log(err);
  });
  res.send(200);
}


/* ------------ EDITS ---------------- */

exports.editSection = function(req, res) {
  client.query("UPDATE section\
                SET name = '"+req.body.name+"', description = '"+req.body.description+"'\
                WHERE section_id = "+req.body.section_id+";", (err, res) => {
  });
  res.send(200);
};

exports.editPart = function(req, res){
  //TODO Sanitize video URL!!!!!!!!
  client.query("UPDATE part\
                SET name = '"+req.body.name+"', description = '"+req.body.description+"', video = '"+req.body.video+"'\
                WHERE part_id = "+req.body.part_id+";", (err, res) => {
  });
  res.send(200);
}

exports.editQuestion=function(req, res){}

/* ------------ QUESTIONS ---------------- */

exports.saveResults = function(req, res) {
  console.log(req.body);
  res.send(200);
};



/* ------------ AUTHENTICATION ---------------- */

exports.login = function(req, res) {
  console.log(req.body);
  client.query("SELECT * FROM Student WHERE username = 'jdoe' AND password = '12345'", (err, res) => {
    //console.log(err, res)
  });
  res.send(200);
};
