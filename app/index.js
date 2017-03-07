var express = require('express');
var bodyParser = require('body-parser');
var google = require('./google');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (request, response) {
  res.send('Welcome to the njsquared RSVP API.');
});

app.post('/guests', function (request, response) {
  google.addRsvp(request.body, function(err, result) {
    if(err) {
      response.status(510).render('error', { error: err });
    } else {
      response.redirect('http://localhost:80');
    }
  });
});

app.listen(port, function() {
  console.log('App listening on port %s.', port);
});
