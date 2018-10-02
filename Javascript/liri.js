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



// This function will have the user enter a movie title and pull information which will print to the terminal.
function movieFunction() {
    //console.log when entering the function
    console.log("Entering Movie Function");

    //variable to store the movie title the user inputs
    //if user does not put in any input the movie will default to Mr.Nobody
    var movieTitle;
    if (alternateUserInput === undefined) {
        movieTitle = "Mr. Nobody";
    } else {
        movieTitle = alternateUserInput;
    };


    //Request Code line found in OMDB in class assignment
    //var movieTitle is put in the middle of the URL where the movie title is requested
    request("http://www.omdbapi.com/?t=" + movieTitle + "&plot=short&r=json &tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //an alterative to using JSON.parse(body) for all console.logs would be to create a variable =JSON.parse(body).  e.x. console.log("The movie's title is: " + variable.Title);
            //Model Fields found at = https://media.readthedocs.org/pdf/omdbpy/latest/omdbpy.pdf
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("This movie was produced in: " + JSON.parse(body).Country);
            console.log("This movie is available in: " + JSON.parse(body).Language);
            console.log("This movie's plot is:  " + JSON.parse(body).Plot);
            console.log("The movie has the following actors: " + JSON.parse(body).Actors);
            //ROTTEN TOMATOES RATING AND WEBSITE
            console.log("The Rotten Tomatoes score for this film is " + JSON.parse(body).tomatoRating);
            console.log("The Rotten Tomatoes URL for this film is " + JSON.parse(body).tomatoURL);
        }
    });
    //The user input will append to the log.txt file(ex. movie-this + movie title)
    fs.appendFile("log.txt", ", " + userInput + " " + alternateUserInput);
};


// // //Function needed for Do-what-it-says
function doWhatItSaysFunction() {
    fs.readFile("random.txt", "utf8", function (error, body) {
        console.log(body);
        var bodyArr = body.split(",");
        if (bodyArr[0] === "my-tweets") {
            twitterFunction();
        } else if (bodyArr[0] === "spotify-this-song") {
            spotifyFunction();
        } else if (bodyArr[0] === "movie-this") {
            movieFunction();
        }

    })
    //The user input will append to the log.txt file(ex. do-what-it-says + my tweets)
    fs.appendFile("log.txt", ", " + userInput + " " + alternateUserInput);
};

//spotify api

//search: 
// function ({
//     type: 'artist OR album OR track',
//     query: 'My search query',
//     limit: 20
// }, callback);


// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: < your spotify client id > ,
//     secret: < your spotify client secret >
// });

// spotify.search({
//     type: 'track',
//     query: 'All the Small Things'
// }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

//     console.log(data);
// });