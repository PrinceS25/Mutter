/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const AppConfig = require('../../src/components/config/app');
const AuthConfig = require('../../src/components/config/auth');

const redirect_uri = AppConfig.HOST;
const client_id = AuthConfig.CLIENT_ID;
const client_secret = AuthConfig.CLIENT_SECRET;
/*
var client_id = '253c9f9496a3402292afcac6494edd05'; // Your client id
var client_secret = '017ba64d2469488686442087cc78a652'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
/*
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state user-read-recently-played user-top-read' ;
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log("******************************************************************************");
console.log("******************************************************************************");
console.log("******************************************************************************");
  //console.log(req);
console.log("******************************************************************************");
console.log("******************************************************************************");
console.log("******************************************************************************");
  //console.log(res);
console.log("******************************************************************************");
console.log("******************************************************************************");
console.log("******************************************************************************");
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        var options ={
                url : 'https://api.spotify.com/v1/me',
                headers: { 'Authorization' : 'Bearer ' + access_token},
                json: true
            };
        request.get(options, function(error, response, body) {
            console.log("the access_token is "+ body);
        });

/*
        var options = {
          url: 'https://api.spotify.com/v1/me/player/recently-played?limit=5',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
    //limit 5
        };

        // use the access token to access the the most recently played song
        request.get(options, function(error, response, body) {
          //console.log(body);
        });

*/
  let topartists="";
  let recommendedurl =""
console.log("******************************************************************************");
console.log("******************************************************************************");
console.log("******************************************************************************");
  /////testing 
  var options3 = {
          url: 'https://api.spotify.com/v1/search?q=taylor&type=artist&limit=5',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
    //limit 5
        };
  // use the access token to access the most recommended song by artistID
        request.get(options3, function(error, response, body) {
          console.log(body);
          //console.log(body.artists.items[0].name)
          console.log("******************************************************************************");
        });
console.log("******************************************************************************");
console.log("******************************************************************************");
console.log("******************************************************************************");
  //end testing......


  //trying to get the top artist
  var options2 = {
          url: 'https://api.spotify.com/v1/me/top/artists?limit=1',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
    //limit 5
        };

        // use the access token to access the top artists
        request.get(options2, function(error, response, body) {
          console.log(body);
          console.log("******************************************************************************");
          console.log("******************************************************************************");
          console.log("******************************************************************************");
              
    topartists = body.items[0].id;
    //console.log(body.items[0].id);
    recommendedurl ='https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=' + topartists + '&min_energy=0.4&min_popularity=50';
    //console.log(recommendedurl);
    // *********************** try to put options3 here inside 2 ************
    var options3 = {
      url: recommendedurl,
      headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
    };
    // use the access token to access the most recommended song by artistID
          request.get(options3, function(error, response, body) {
          console.log(body);
          console.log("******************************************************************************");
          console.log("******************************************************************************");
          console.log("******************************************************************************");
              //console.log(response);
        });
  });



/*  
  
  var options3 = {
          url: 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=6rs1KAoQnFalSqSU4LTh8g&min_energy=0.4&min_popularity=50',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
    //limit 5
        };
  console.log(topartists);
  console.log(recommendedurl);
  // use the access token to access the most recommended song by artistID
        request.get(options3, function(error, response, body) {
          console.log(body);
    
     
        });
  //end try

*/

  




        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});
/*
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me', ///player/recently-played
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});
*/
app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);