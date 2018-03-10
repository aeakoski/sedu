/*
Put content of angular2 build into 'dist' folder.
*/

const path = require('path')
const html = path.join(__dirname, '/dist')
const port = 4444
// const apiUrl = '/api';

// Express
const bodyParser = require('body-parser')
// const compression = require('compression');
const express = require('express')
// var mongoose = require('mongoose')
// var Task = require('./spotifyModel'); //created model loading here

var app = express()

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tracksdb');

app
    // .use(compression())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Static content
    .use(express.static(html))
    // .use('/admin', express.static(html));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

var routes = require('./server-routes') // importing route
routes(app)

/*
  //Dis dont work, i do no wy :( All req gets catched by dis!

    app.use(function(req, res) {
      res.status(404).send({url: req.originalUrl + ' not found MFS!'})
    });
*/

    // Start server
app.listen(port, function () {
  console.log('Port: ' + port)
  console.log('Html: ' + html)
})
