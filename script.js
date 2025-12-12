// ===== USUÁRIO LOGADO =====
const loggedUser = localStorage.getItem("logged");
if (!loggedUser) location.href = "index.html";

let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(u => u.user === loggedUser);

if (!user.score) user.score = 0;

document.getElementById("userName").innerText = user.user;
document.getElementById("score").innerText = user.score;

updateLevel();
updateRanking();

// ===== SITE =====
let current = 0;
let flipped = false;

function showSection(id) {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

function flipCard() {
  flipped = !flipped;
  cardText.innerText = flipped
    ? flashcards[current].back
    : flashcards[current].front;
}

function nextCard() {
  flipped = false;
  current = (current + 1) % flashcards.length;
  cardText.innerText = flashcards[current].front;
}

// ===== PROGRESSO =====
function addPoint() {
  user.score += 10;
  document.getElementById("score").innerText = user.score;
  saveUser();
  updateLevel();
  updateRanking();
}

function updateLevel() {
  let level = "Iniciante";
  if (user.score >= 200) level = "Avançado";
  else if (user.score >= 100) level = "Intermediário";
  document.getElementById("level").innerText = level;
}

function saveUser() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== ATIVIDADES =====
function checkGrammar(a) {
  const el = document.getElementById("grammarResult");
  if (a === "is") {
    el.innerText = "Correto!";
    addPoint();
  } else el.innerText = "Errado!";
}

function checkQuiz(c) {
  const el = document.getElementById("quizResult");
  if (c) {
    el.innerText = "Acertou!";
    addPoint();
  } else el.innerText = "Errado!";
}

function checkReading(c) {
  const el = document.getElementById("readingResult");
  if (c) {
    el.innerText = "Muito bem!";
    addPoint();
  } else el.innerText = "Errado!";
}

function playAudio() {
  new Audio(
    "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hello--_us_1.mp3"
  ).play();
}

// ===== RANKING =====
function updateRanking() {
  const list = document.getElementById("rankingList");
  list.innerHTML = "";

  [...users]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .forEach(u => {
      const li = document.createElement("li");
      li.innerText = `${u.user} — ${u.score || 0} pts`;
      list.appendChild(li);
    });
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("logged");
  location.href = "index.html";
}
