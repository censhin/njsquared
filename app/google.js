var google = require('googleapis');
var key = require('/Users/raym5847/.google/njsquared-671c562144f5.json');

var authClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
  null
)
var sheets = google.sheets('v4');
var spreadsheetId = '1QsmYrjoFWIEh73sT4AmdNDXbXZSX14sFZ5Y7Z3PbyJs';

exports.addRsvp = function(data, next) {
  authClient.authorize(function(err, tokens) {
    var request = {
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      resource: {
        values: [
          [data.name, data.guest, data.email]
        ]
      },
      auth: authClient
    }

    sheets.spreadsheets.values.append(request, function(err, response) {
      next(err, response)
    });
  });
};
