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

exports.login = function (req, res) {
  console.log('Login-atempt')
  console.log(req.body)
  client.query("SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "';", (err, result) => {
    if (err) {
      res.send(501)
      return
    }
    if (result.rows.length !== 1) {
      res.send(401)
      return
    }
    let token = jwt.sign(
      {
        username: result.rows[0].username,
        isTeacher: result.rows[0].isTeacher
      },
      secure.secret,
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
