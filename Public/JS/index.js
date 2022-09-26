let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  const account = getAccount(username);

  if (!account) {
    alert("Opps! Verifique o usuário ou a senha.");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Opps! Verifique o usuário ou a senha.");
      return;
    }

    saveSession(account);

    window.location.href = "transactions.html";
  }
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    window.location.href = "transactions.html";
  }
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}
