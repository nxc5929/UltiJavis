var express = require('express');
var bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api');

var token = "xoxp-637835815733-639702220471-631872712785-cce1f88d1feec52c4b016ad24094cb50"
const web = new WebClient(token);
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/challenge', function (req, res) {
    console.log(req.body)
    if(req.body.challenge){
        console.log("SENT CHALLENGE");
        res.send(req.body.challenge);
    }else{
        console.log("REGULAR");
        console.log(req.body.event.text);
        var data = {
            text: 'HELLO WORLD',
            channel: req.body.event.channel
          }
        web.chat.postMessage(data);
        res.send("HELLO MY PEEPS!");
    }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080);
});