'use strict'
const { Client } = require('pg')
const crypto = require('crypto')

const client = new Client({
  user: 'sedu',
  host: '127.0.0.1',
  database: 'sedu',
  password: 'pass',
  port: 5432
})

client.connect()

let insertUser = function (username, pass, isTeacher, name) {
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = crypto.createHmac('sha256', salt)
                     .update(pass)
                     .digest('hex')

  client.query(`
    INSERT INTO users (username, salt, password, isTeacher)
    VALUES ('${username}','${salt}','${passwordHash}',${isTeacher});
    INSERT INTO ${(isTeacher) ? 'Teacher' : 'Student'} (name, username)
    VALUES('${name}', '${username}');
    `,
    (err, res) => {
      if (err) { console.log(err) }
    })
  console.log(passwordHash)
}

let users = [
  {
    username: 'aaa',
    password: 'aaa',
    isTeacher: true,
    name: 'Anders Asson'
  }, {
    username: 'sss',
    password: 'sss',
    isTeacher: false,
    name: 'Bertil Bsson'
  }, {
    username: 'ddd',
    password: 'ddd',
    isTeacher: false,
    name: 'Cesar Csson'
  }]

for (var i = 0; i < users.length; i++) {
  insertUser(
    users[i].username,
    users[i].password,
    users[i].isTeacher,
    users[i].name
  )
}
