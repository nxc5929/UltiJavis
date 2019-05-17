var express = require('express');
var bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api');

var token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/challenge', function (req, res) {
    console.log(req.body)
    if(req.body.challenge){
        res.send(req.body.challenge);
    }else{
        var text = req.body.event.text;
        console.log(text)
        var resposne = text; //THIS IS WHT CHAT BOT WILL SAY
        var data = {
            text: resposne,
            channel: req.body.event.channel
          }
        web.chat.postMessage(data);
        res.send("OK");
    }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080);
});