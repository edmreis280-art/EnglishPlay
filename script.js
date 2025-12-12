// ====== CADASTRO ======
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const msg = document.getElementById("regMsg");

  if (!user || !pass) {
    msg.innerText = "Preencha todos os campos.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.user === user)) {
    msg.innerText = "Usuário já existe.";
    return;
  }

  users.push({ user, pass, score: 0 });
  localStorage.setItem("users", JSON.stringify(users));

  msg.innerText = "Conta criada! Redirecionando...";
  setTimeout(() => {
    location.href = "index.html";
  }, 1000);
}

// ====== LOGIN ======
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const msg = document.getElementById("loginMsg");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const valid = users.find(u => u.user === user && u.pass === pass);

  if (!valid) {
    msg.innerText = "Usuário ou senha incorretos.";
    return;
  }

  localStorage.setItem("logged", user);
  location.href = "app.html";
}
