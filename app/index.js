var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var google = require('./google');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
      response.status(403).json({msg: error.msg});
    } else {
      response.status(422).json({msg: error.msg});
    }
  } else {
    google.addRsvp(request.body, function(err, result) {
      if(err) {
        response.status(510).json({msg: 'Something went wrong'});
      } else {
        response.status(200).json({msg: 'Updated successfully'});
      }
    });
  }
});

app.listen(port, function() {
  console.log('App listening on port %s.', port);
});
