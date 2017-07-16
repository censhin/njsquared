var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var google = require('./google');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.get('/', function (request, response) {
  res.send('Welcome to the njsquared RSVP API.');
});

app.post('/guests', function (request, response) {
  request.checkBody('name', 'The first guest must enter a valid name').isAlpha();
  request.checkBody('entree1', 'Please select an entree').notEmpty();
  request.checkBody('password', 'Invalid password').equals('101517rsvp');

  request.sanitizeBody('name').escape();
  request.sanitizeBody('guest').escape();
  request.sanitizeBody('dietary').escape();
  request.sanitizeBody('song').escape();
  request.sanitizeBody('password').escape();

  var validationErrors = request.validationErrors();

  if(validationErrors) {
    var error = validationErrors[0];
    if(error.param === 'password') {
      response.writeHeader(403)
    } else {
      response.writeHeader(422);
    }
    response.end(error.msg);
  } else {
    google.addRsvp(request.body, function(err, result) {
      if(err) {
        response.writeHeader(510);
        response.end("Something went wrong");
      } else {
        response.writeHeader(200);
        response.end('Updated Successfully!');
      }
    });
  }
});

app.listen(port, function() {
  console.log('App listening on port %s.', port);
});
