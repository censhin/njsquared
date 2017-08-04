var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var google = require('./google');

var app = express();
var host = '0.0.0.0';
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
  response.send('Welcome to the njsquared RSVP API.');
});

app.post('/guests', function (request, response) {
  request.checkBody('name', 'The first guest must enter a valid name').notEmpty();
  request.checkBody('attendance', 'Please indicate if you will attend').notEmpty();
  request.checkBody('password', 'Invalid password').equals('101517rsvp');

  request.sanitizeBody('name').escape();
  request.sanitizeBody('guest').escape();
  request.sanitizeBody('password').escape();

  request.getValidationResult().then(function(result) {
    error = result.mapped();
    if(Object.keys(error).length > 0) {
      if (error.password) {
        response.status(403).json({msg: error});
      } else {
        response.status(422).json({msg: error});
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
});

app.listen(port, host, function() {
  console.log('App listening on port %s.', port);
});
