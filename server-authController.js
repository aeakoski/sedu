'use strict'
const { Client } = require('pg')
const jwt = require('jsonwebtoken')
const secure = require('./server-secure')
const crypto = require('crypto')

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432
})

client.connect()

exports.refreshToken = function (req, res) {
  try {
    jwt.verify(req.query.token, secure.secret)
    res.send(req.query.token)
  } catch (e) {
    if (e.name !== 'TokenExpiredError') {
      res.send(401)
      return
    }
    let oldTokenData = jwt.verify(req.query.token, secure.secret, {ignoreExpiration: true})
    console.log(oldTokenData)
    let token = jwt.sign(
      {
        username: oldTokenData.username,
        isTeacher: oldTokenData.isTeacher
      },
      secure.secret,
      {expiresIn: '1h'}
    )
    res.send(token)
  }
}

exports.login = function (req, res) {
  console.log('Login-atempt')
  console.log(req.body)
  client.query("SELECT * FROM users WHERE username = '" + req.body.username + "';",
  (err, result) => {
    if (err) {
      res.send(501)
      return
    }
    if (result.rows.length !== 1) {
      res.send(401)
      return
    }
    const passwordHash = crypto.createHmac('sha256', result.rows[0].salt)
                       .update(req.body.password)
                       .digest('hex')
    if (passwordHash !== result.rows[0].password) {
      res.send(401)
      return
    }
    let token = jwt.sign(
      {
        username: result.rows[0].username,
        isTeacher: result.rows[0].isTeacher
      },
      secure.secret,
      {expiresIn: '1h'}
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
