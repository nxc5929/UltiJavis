var express = require('express');
var bodyParser = require('body-parser')
const https = require('https')

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

const options = {
  hostname: "slack.com",
  path: "/api/chat.postMessage",
  method: 'POST',
  authorization: "Bearer xoxb-637835815733-631566328737-BhmZAu8I8qrWcDVAe2HOpiDB",
  headers: {
    'Content-Type': 'application/json'
  }
}

const request = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

app.use('/challenge', function (req, res) {
    console.log(req.body)
    if(req.body.challenge){
        console.log("SENT CHALLENGE");
        res.send(req.body.challenge);
    }else{
        console.log("REGULAR");
        console.log(req.body.event.text);
        var data = JSON.stringify({
            text: 'Buy the milk',
            channel: req.bodychannel
          })
        request.write(data);
        res.send("HELLO MY PEEPS!");
    }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080);
});