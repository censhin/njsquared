var form = document.getElementById('rsvp-form');
var formName = document.getElementById('for-name');
var formEntree = document.getElementById('for-entree1');
var formPassword = document.getElementById('for-password');
var nameInput= document.getElementById('name-input');
var entreeInput = document.getElementById('entree1');
var passwordInput = document.getElementById('password-input');
var errorColor = '#c41f1d';

form.addEventListener('submit', function(event) {
  var json = JSON.stringify({
    name: this.name.value,
    guest: this.guest.value,
    entree1: validateEntree(this.entree1.value),
    entree2: validateEntree(this.entree2.value),
    dietary: this.dietary.value,
    song: this.song.value,
    password: this.password.value
  });

  submit(json);
  event.preventDefault();
});

function validateEntree(entree) {
  return entree === "Choose One..." ? undefined : entree;
}

function submit(data) {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/guests');
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = handle;
  request.send(data);
}

function handle(error) {
  var res = JSON.parse(this.responseText).msg;
  if(this.status > 399) {
    handleError(res);
  } else {
    handleSuccess(res);
  }
}

function handleError(error) {
  var name = form.name.value;
  var entree = validateEntree(form.entree1.value);
  var password = form.password.value;

  if(emptyValue(name) || error.name) {
    formName.style.color = errorColor;
    nameInput.style.borderColor = errorColor;
  } else {
    formName.style.color = null;
    nameInput.style.borderColor = null;
  }

  if(emptyValue(entree) || error.entree1) {
    formEntree.style.color = errorColor;
    entreeInput.style.borderColor = errorColor;
  } else {
    formEntree.style.color = null;
    entreeInput.style.borderColor = null;
  }

  if(emptyValue(password) || error.password) {
    formPassword.style.color = errorColor;
    passwordInput.style.borderColor = errorColor;
  } else {
    formPassword.style.color = null;
    passwordInput.style.borderColor = null;
  }
}

function emptyValue(value) {
  if(value === "" || value === null || value === undefined) {
    return true;
  }
  return false;
}

function handleSuccess(res) {
  formName.style.color = null;
  nameInput.style.borderColor = null;
  formEntree.style.color = null;
  entreeInput.style.borderColor = null;
  formPassword.style.color = null;
  passwordInput.style.borderColor = null;
  alert('Success');
}
