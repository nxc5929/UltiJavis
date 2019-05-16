var express = require('express');
var bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api');

const web = new WebClient('xoxb-637835815733-631566328737-8N42X5apPWM7pDZikOdyIh3R');
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