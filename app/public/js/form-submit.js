var form = document.getElementById('rsvp-form');
var formName = document.getElementById('for-name');
var formEntree = document.getElementById('for-entree1');
var formPassword = document.getElementById('for-password');
var errorColor = '#2F3F58';

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

function handle() {
  var res = JSON.parse(this.responseText).msg;
  if(this.status > 399) {
    if(res.includes('guest')) {
      handleNameError();
    } else if(res.includes('entree')) {
      handleEntreeError();
    } else if(res.includes('password')) {
      handlePasswordError();
    }
  } else {
    handleSuccess();
  }
}

function handleNameError() {
  formName.style.color = errorColor;
  formEntree.style.color = errorColor;
  formPassword.style.color = errorColor;
}

function handleEntreeError() {
  formName.style.color = null;
  formEntree.style.color = errorColor;
  formPassword.style.color = errorColor;
}

function handlePasswordError() {
  formName.style.color = null;
  formEntree.style.color = null;
  formPassword.style.color = errorColor;
}

function handleSuccess() {
  formName.style.color = null;
  formEntree.style.color = null;
  formPassword.style.color = null;
}
