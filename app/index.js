var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Welcome to the njsquared RSVP API.');
});

app.post('/guests', function (req, res) {
  console.log(req.body)
});

app.listen(port, function() {
  console.log('App listening on port %s.', port);
});
