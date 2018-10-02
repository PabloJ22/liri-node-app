//dotenv
let request = require("request");

console.log('Enter "my-tweets", "spotify-this-song", "movie-this" or "do-what-it-says"');
// require("dotenv").config();

// const db = require('db')
// db.connect({
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS
// });

//omdb api
//request

// //input letiables
let userInput = process.argv[2];
let alternateUserInput = process.argv[3];
let request = require("request");


switch (userInput) {
    // case 'my-tweets':
    //     twitterFunction();
    //     break;

    case 'spotify-this-song':
        spotifyFunction();
        break;

    case 'movie-this':
        movieFunction();
        break;

    case 'do-what-it-says':
        doWhatItSaysFunction();
        break;

    default:
        console.log("Enter 'myTwitter', 'spotifyThisSong', 'movie-this', or 'do-what-it-says'");
}


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