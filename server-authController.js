'use strict'
const { Client } = require('pg')
const jwt = require('jsonwebtoken')

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432
})

client.connect()

exports.login = function (req, res) {
  console.log('Login-atempt')
  console.log(req.body)
  client.query("SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';", (err, result) => {
    // console.log(err, res)
    if (err) {
      res.send(501)
      return
    }
    if (result.rows.length !== 1) {
      res.send(401)
      return
    }
    console.log(result.rows[0])
    let token = jwt.sign(
      {username: result.rows[0].username},
      'supersecret',
      {expiresIn: '4h'}
    )
    console.log(token)

    let r = {
      token: token,
      error: false,
      first_name: 'Förnamn',
      last_name: 'Efternamn',
      isTeacher: result.rows[0].isteacher
    }
    res.json(r)
  })
}
