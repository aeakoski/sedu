'use strict'
const { Client } = require('pg')

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
    } else {
      console.log(result.rows)
      if (result.rows.length === 1) {
        let r = {
          token: 'abc',
          error: false,
          first_name: 'Förnamn',
          last_name: 'Efternamn'
        }
        if (result.rows[0].isteacher) {
          r.isTeacher = true
          // TODO Generate token and add it to a active sessions map
        } else {
          r.isTeacher = false
        }
        res.json(r)
          // res.send(result.rows[0]);
      } else {
        res.send(401)
      }
    }
  })
  // res.send(200);
}
