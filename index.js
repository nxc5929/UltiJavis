var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/findFood', function (req, res) {
    console.log(req.body)
    res.send('Hello World!');
  });

app.use('/challenge', function (req, res) {
    console.log(req)
    console.log(req.body.challenge)
    res.send(req.body.challenge);
});

app.listen(this.port, function () {
  console.log('Example app listening on port 8080!');
});