let password = '555999';
let lastSuccessfulAttempt = localStorage.getItem('lastSuccessfulAttempt');
let now = Date.now();

if (!lastSuccessfulAttempt || now - lastSuccessfulAttempt >= 7 * 24 * 60 * 60 * 1000) {
    guess = prompt("Bitte gib das Passwort ein.\n Mit der richtigen eingabe bestätigst du, dass das Datum gespeichert wird, worrauf die Webseite zugriff hat.");

  while (guess !== password) {
    guess = prompt("Passwort ist Falsch. Bitte versuche es erneut");
  }

  localStorage.setItem('lastSuccessfulAttempt', now);
}

var element = document.querySelector('div[style="text-align:right;position:fixed;bottom:3px;right:3px;width:100%;z-index:999999;cursor:pointer;line-height:0;display:block;"]');
element.remove();
