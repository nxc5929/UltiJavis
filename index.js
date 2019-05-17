var deals = require('./ultideals.json')

function containsIgnoreCase(list, str) {
    for (let member of list)
        if (str.toUpperCase() === member.toUpperCase())
            return true
    return false
}

function extractTags(input) {

    var tags = ["random"]
    for (let restaurant of deals.food) {
        if (!tags.includes(restaurant.category))
            tags.push(restaurant.category)
    }

    var results = []
    var words = input.split(" ")
    for (let word of words) {
        if (containsIgnoreCase(tags, word))
            results.push(word)
    }

    return results
}

function constructResponse(input) {

    var tags = extractTags(input)
    var suggestions = []

    if (tags.length == 0) {
        return "Unfortunately I didn't find anything to match that. Please forgive me."
    }

    for (let tag of tags) {
        for (let restaurant of deals.food)
            if (restaurant.category == tag || tag.toLowerCase() === "random")
                suggestions.push(restaurant)
    }
    var restaurant = suggestions[Math.floor(Math.random()*suggestions.length)];

    var response = "I found a place you might like. Have you tried "
    response = response + restaurant.name + "?\n"
    response = response + "Here's more information:\n"
    response = response + restaurant.address + "\n"
    response = response + restaurant.discount + "\n"
    response = response + restaurant.url

    return response
}


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
        if(req.body.event.username == "UltiJavis"){
            res.send("OK");
            return;
        }
        var text = req.body.event.text;
        var user = req.body.event.user
        console.log(text)
        var response = "Hey <@" + user + ">, " + constructResponse(text); //THIS IS WHT CHAT BOT WILL SAY
        var data = {
            text: response,
            channel: req.body.event.channel
          }
        web.chat.postMessage(data);
        res.send("OK");
    }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port ' + process.env.PORT || 8080);
});
