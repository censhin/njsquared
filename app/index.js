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
  var passwords = [];
  google.getPasswords(function (err, result) {
    if (err) {
      response.status(510).render('error', { error: err });
      return;
    } else {
      passwords = [].concat.apply([], result.values);
    }

    var passIndex = passwords.indexOf(request.body.password);
    if (passIndex === -1) {
      var msg = 'Your password was incorrect. Try again, or get a new password from Neill.';
      response.writeHeader(403, {'Content-Type': 'text/html'});
      response.end(msg);
      return;
    } else {
      var range = 'Sheet2!A' + (passIndex+1) + ':A' + (passIndex+1);
      google.deletePassword(range, function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  });

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
