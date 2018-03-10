'use strict'
const { Client } = require('pg')
const jwt = require('jsonwebtoken')
const secure = require('./server-secure')

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432
})

client.connect()

let decode = function (token) {
  try {
    jwt.verify(token, secure.secret)
    return true
  } catch (e) {
    return false
  }
}

/* ------------ REGULAR GETS ---------------- */

exports.section = function (req, response) {
  if (!decode(req.query.token)) {
    response.send(401)
    return
  }

  client.query(`SELECT s.name, s.description, s.section_id, t.part_count
                FROM section AS s
                LEFT JOIN
                (
                SELECT COUNT(section_id) AS part_count, section_id
                FROM part
                GROUP BY section_id
                ) AS t
                ON s.section_id = t.section_id;`, (err, res) => {
    if (err) { console.log(err) }
    response.send(res.rows)
  })
}

exports.part = function (req, response) {
  if (!decode(req.query.token)) {
    response.send(401)
    return
  }
  client.query('SELECT * FROM part WHERE section_id = ' + req.query.sectionid + ';', (err, res) => {
    if (err) { console.log(err) }
    response.send(res.rows)
  })
}

exports.question = function (req, response) {
  if (!decode(req.query.token)) {
    response.send(401)
    return
  }
  let q = ''
  if (parseInt(req.query.exam)) {
    console.log(req.query.exam)
    q = `
    SELECT q.question, q.answer, q.question_id, ps.section_id, ps.part_id \
    FROM question as q\
    LEFT JOIN\
    (SELECT section_id, part_id FROM part) AS ps\
    ON q.part_id = ps.part_id\
    WHERE q.isexam = 't' AND ps.section_id = ${req.query.id};`
  } else {
    q = `\
    SELECT question, answer, question_id, part_id, isexam \
    FROM question\
    WHERE part_id = '${req.query.id}';`
  }
  client.query(q, (err, res) => {
    if (err) { console.log(err) }
    response.send(res.rows)
  })
}

/* ------------ NEWS ---------------- */

exports.newSection = function (req, res) {
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`INSERT INTO section (name, description)
                VALUES ('${req.body.name}','${req.body.description}');`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.newPart = function (req, res) {
  // TODO Sanitize video!!!
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`INSERT INTO part (name, description, video, section_id)
                VALUES ('${req.body.name}','${req.body.description}','${req.body.video}','${req.body.section_id}');`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.newQuestion = function (req, res) {
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`INSERT INTO question (question, answer, isexam, part_id)
                VALUES ('${req.body.question}','${req.body.answer}','${req.body.isexam}','${req.body.part_id}');`, (err, res) => {
    console.log(err)
  })
  res.send(200)
}

/* ------------ EDITS ---------------- */

exports.editSection = function (req, res) {
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`UPDATE section
                SET name = '${req.body.name}', description = '${req.body.description}'
                WHERE section_id = ${req.body.section_id};`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.editPart = function (req, res) {
  // TODO Sanitize video URL!!!!!!!!
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`UPDATE part
                SET name = '${req.body.name}', description = '${req.body.description}', video = '${req.body.video}'
                WHERE part_id = ${req.body.part_id};`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.editQuestion = function (req, res) {
  if (!decode(req.body.token)) {
    res.send(401)
    return
  }
  client.query(`UPDATE question
                SET question = '${req.body.question}', answer = '${req.body.answer}'
                WHERE question_id = ${req.body.question_id};`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

/* ------------ DELETES ---------------- */
exports.removeQuestion = function (req, res) {
  if (!decode(req.query.token)) {
    res.send(401)
    return
  }
  client.query(`DELETE FROM question
                WHERE question_id = ${req.query.id};`, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.removePart = function (req, res) {
  if (!decode(req.query.token)) {
    res.send(401)
    return
  }
  console.log('DELETEING PART')
  client.query(`DELETE FROM question
                WHERE part_id = ${req.query.id};
                DELETE FROM part
                WHERE part_id = ${req.query.id};
                `, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

exports.removeSection = function (req, res) {
  if (!decode(req.query.token)) {
    res.send(401)
    return
  }
  console.log('DELETEING SECTION')
  client.query(`DELETE FROM question
                WHERE part_id IN
                (SELECT part_id FROM part WHERE section_id = ${req.query.id});
                DELETE FROM part
                WHERE part_id IN
                (SELECT part_id FROM part WHERE section_id = ${req.query.id});
                DELETE FROM section
                WHERE section_id = ${req.query.id};
                `, (err, res) => {
    if (err) { console.log(err) }
  })
  res.send(200)
}

/* ------------ QUESTIONS ---------------- */

exports.saveResults = function (req, res) {
  console.log(req.body)
  res.send(200)
}
