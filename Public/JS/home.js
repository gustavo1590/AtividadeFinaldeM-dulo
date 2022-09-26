let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};

checkLogged();

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username-create-input").value;
  const password = document.getElementById("password-create-input").value;
  const RepeatPassword = document.getElementById(
    "repeat-password-create-input"
  ).value;

  if (username.length < 5) {
    alert("Preencha o campo com um e-mail válido");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 digitos.");
    return;
  }
  if (password !== RepeatPassword) {
    alert("As senhas não coincidem");
    return;
  }
  saveAccount({
    login: username,
    password: password,
    transactions: [],
  });

  alert("Conta criada com sucesso.");
  window.location.href = "index.html";
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

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}
