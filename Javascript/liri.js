//dotenv

require("dotenv").config();

const db = require('db')
db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
});

//omdb api
//request
var request = require("request");

request("http://www.omdbapi.com/?apikey=[yourkey]&", function (error, response, body) {
    console.log(typeof body);
    // If the request was successful...
    if (!error && response.statusCode === 200) {
        console.log(body);
    }
});



request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
});

//spotify api

//search: 
function ({
    type: 'artist OR album OR track',
    query: 'My search query',
    limit: 20
}, callback);


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: < your spotify client id > ,
    secret: < your spotify client secret >
});

spotify.search({
    type: 'track',
    query: 'All the Small Things'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});