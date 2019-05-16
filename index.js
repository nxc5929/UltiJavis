var express = require('express');
var bodyParser = require('body-parser')
const { WebClient } = require('@slack/web-api');

const web = new WebClient("xoxp-637835815733-639699376823-637878576005-d7952ee7ad03a7db38c93ecd998f33ed");
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
            channel: req.bodychannel
          }
        web.chat.postMessage(data);
        res.send("HELLO MY PEEPS!");
    }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080);
});