require("dotenv").config();

let dEnv = process.env;

let request = require("request");
let keys = require("./keys.js");
let Twitter = require('twitter');
let inquirer = require("inquirer");
let Spotify = require('node-spotify-api');
let nodeArgs = process.argv;
let movieName = "";


//initalizing twitter
let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);


inquirer.prompt([{
    type: "input",
    message: "Whatcha wanna do???",
    name: "search"
}]).then(function (inquirerResponse) {


    switch (inquirerResponse.search) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":

            spotifyThis();
            break;
        case "movie-this":
            movie();
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("unusable command, please use an appropriate command. ")
    }





})

function myTweets() {
    console.log("Tweet Tweet");
    let params = {
        screen_name: ''
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            // console.log(JSON.stringify(tweets,['text',]));
            let tweetArr = JSON.stringify(tweets, ['text', ]);
            let twObj = JSON.parse(tweetArr);
            console.log(twObj);


        }
    });
}

function spotifyThis() {

    spotify.search({
        type: 'track',
        query: 'And the beat goes on'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

}

function movie() {
    console.log("Watch a Movie!");

    inquirer.prompt([{
        type: "input",
        message: "What movie?",
        name: "search"
    }]).then(function (inquirerResponse) {
        movieName = inquirerResponse.search;
        let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        //   console.log(queryUrl);

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title)
                console.log("Release Year: " + JSON.parse(body).Year)
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Tomatoes)
                console.log("Country: " + JSON.parse(body).Country)
                console.log("Language: " + JSON.parse(body).Language)
                console.log("Plot: " + JSON.parse(body).Plot)
                console.log("Actors: " + JSON.parse(body).Actors)

            }
        });
    });

}

function doIt() {
    console.log("Do it...");
}