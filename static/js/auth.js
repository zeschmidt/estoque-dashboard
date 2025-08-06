firebase.auth().onAuthStateChanged(user => {
  const path = window.location.pathname;
  if (!user && path !== '/login') {
    window.location.href = '/login';
  } else if (user && path === '/login') {
    window.location.href = '/';
  }
});

function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = '/';
    })
    .catch(error => {
      document.getElementById('msg').innerText = 'Login inválido';
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('logout-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        window.location.href = '/login';
      });
    });
  }
});
