var form = document.getElementById('rsvp-form');
var formName = document.getElementById('for-name');
var formAttendance = document.getElementById('for-attendance');
var formPassword = document.getElementById('for-password');
var nameInput = document.getElementById('name');
var attendanceInput = document.getElementById('attendance');
var passwordInput = document.getElementById('password');
var nameInputFooter = document.getElementById('name-input-footer');
var attendanceInputFooter = document.getElementById('attendance-input-footer');
var passwordInputFooter = document.getElementById('password-input-footer');
var errorColor = '#c41f1d';

form.addEventListener('submit', function(event) {
  var json = JSON.stringify({
    name: this.name.value,
    guest: this.guest.value,
    entree1: validateAttendance(this.entree1.value),
    entree2: validateAttendance(this.entree2.value),
    dietary: this.dietary.value,
    attendance: this.attendance.value,
    password: this.password.value
  });

  submit(json);
  event.preventDefault();
});

function validateAttendance(attendance) {
  return attendance === 'Choose One...' ? undefined : attendance;
}

function submit(data) {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://njsquared.love/api/guests');
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = handle;
  request.send(data);
}

function handle() {
  var res = JSON.parse(this.responseText).msg;
  if(this.status > 399) {
    handleError(res);
  } else {
    handleSuccess();
  }
}

function handleError(error) {
  var name = form.name.value;
  var attendance = validateAttendance(form.attendance.value);
  var password = form.password.value;

  clearAlerts();

  if(emptyValue(name) || error.name) {
    formName.style.color = errorColor;
    nameInput.style.borderColor = errorColor;
    createNewAlert(nameInputFooter, 'name-error-msg', 'Please enter a name');
  } else {
    formName.style.color = null;
    nameInput.style.borderColor = null;
  }

  if(emptyValue(attendance) || error.attendance) {
    formAttendance.style.color = errorColor;
    attendanceInput.style.borderColor = errorColor;
    createNewAlert(attendanceInputFooter, 'attendance-error-msg', 'Please indicate if you will attend');
  } else {
    formAttendance.style.color = null;
    attendanceInput.style.borderColor = null;
  }

  if(emptyValue(password) || error.password) {
    formPassword.style.color = errorColor;
    passwordInput.style.borderColor = errorColor;
    createNewAlert(passwordInputFooter, 'password-error-msg', 'Please enter the correct password');
  } else {
    formPassword.style.color = null;
    passwordInput.style.borderColor = null;
  }
}

function emptyValue(value) {
  if(value === '' || value === null || value === undefined) {
    return true;
  }
  return false;
}

function handleSuccess() {
  clearAlerts();
  formName.style.color = null;
  nameInput.style.borderColor = null;
  formAttendance.style.color = null;
  attendanceInput.style.borderColor = null;
  formPassword.style.color = null;
  passwordInput.style.borderColor = null;

  var header = document.getElementById('form-header');
  var success = document.createElement('p');
  var successMsg = document.createTextNode('Success! Thank you!');

  success.appendChild(successMsg);
  header.appendChild(success);

  document.getElementById('submit-button').remove();
}

function createNewAlert(anchor, id, msg) {
  var alertItem = document.createElement('p');
  var alertText = document.createTextNode(msg);
  alertItem.setAttribute('id', id);
  alertItem.appendChild(alertText);
  anchor.appendChild(alertItem);
}

function deleteAlert(id) {
  var alertItem = document.getElementById(id);
  alertItem.remove();
}

function clearAlerts() {
  if(document.getElementById('name-error-msg')) {
    deleteAlert('name-error-msg');
  }

  if(document.getElementById('attendance-error-msg')) {
    deleteAlert('attendance-error-msg');
  }

  if(document.getElementById('password-error-msg')) {
    deleteAlert('password-error-msg');
  }
}

function overlay() {
  var el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
