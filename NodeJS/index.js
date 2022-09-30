/*  EXPRESS */
const express = require('express');
const app = express();
const path = require('path');;
var access_token = "";

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../../mobiik')));
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

// index.js

// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering on github app
const clientID = 'db20f763f2566f09f27b'
const clientSecret = '1c2707a68d003e7f895daa70b54141724638c622'

// Declare the callback route
app.get('/github/callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    console.log(response);
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.render('../../EJS/success',{ userData: response.data });
  }).catch(function(err) {
    res.redirect('/index.html');
  })
});
