var form = document.querySelector('form');

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
  if(this.status > 399) {
    alert(JSON.parse(this.responseText).msg);
  } else {
    alert('Success!');
  }
}
