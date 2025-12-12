let currentCard = 0;
let flipped = false;
let score = 0;

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function flipCard() {
  const cardText = document.getElementById("card-text");
  flipped = !flipped;
  cardText.innerText = flipped
    ? flashcards[currentCard].back
    : flashcards[currentCard].front;
}

function nextCard() {
  flipped = false;
  currentCard = (currentCard + 1) % flashcards.length;
  document.getElementById("card-text").innerText =
    flashcards[currentCard].front;
}

function checkGrammar(answer) {
  document.getElementById("grammar-result").innerText =
    answer === "is" ? addPoint("Correto!") : "Errado";
}

function checkQuiz(result) {
  document.getElementById("quiz-result").innerText =
    result === "certo" ? addPoint("Acertou!") : "Errado";
}

function checkReading(result) {
  document.getElementById("reading-result").innerText =
    result === "certo" ? addPoint("Boa!") : "Errado";
}

function playAudio() {
  const audio = new Audio("https://ssl.gstatic.com/dictionary/static/sounds/oxford/hello--_us_1.mp3");
  audio.play();
}

function addPoint(msg) {
  score += 10;
  document.getElementById("score").innerText = score;
  return msg;
}
