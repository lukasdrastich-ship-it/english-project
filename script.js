const questions = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Which tense is used in: "I have lived here for five years"?",
    options: ["Past Simple", "Present Perfect", "Past Perfect", "Present Continuous"],
    answer: "Present Perfect"
  },
  {
    question: "What is the opposite of "generous"?",
    options: ["Self-centred", "Reliable", "Considerate", "Supportive"],
    answer: "Self-centred"
  },
  {
    question: "Which word means "to meet someone unexpectedly"?",
    options: ["let down", "bump into", "put up with", "catch up on"],
    answer: "bump into"
  },
  {
    question: "Which country is London the capital of?",
    options: ["Ireland", "Scotland", "England", "Wales"],
    answer: "England"
  },
  {
    question: "Choose the correct sentence.",
    options: [
      "She has been studying English for three years.",
      "She is studying English since three years.",
      "She studied English since three years.",
      "She has studying English for three years."
    ],
    answer: "She has been studying English for three years."
  },
  {
    question: "What does "upbringing" mean?",
    options: [
      "A person's education and treatment while growing up",
      "A person's place of employment",
      "A person's favourite hobby",
      "A person's travel experience"
    ],
    answer: "A person's education and treatment while growing up"
  },
  {
    question: "Which word best describes someone who is able to do a job successfully?",
    options: ["insecure", "competent", "naïve", "insensitive"],
    answer: "competent"
  },
  {
    question: "What does "put up with somebody" mean?",
    options: [
      "To tolerate somebody",
      "To meet somebody",
      "To become friends with somebody",
      "To disappoint somebody"
    ],
    answer: "To tolerate somebody"
  },
  {
    question: "Which phrase means "to become friends quickly because you like each other"?",
    options: ["fall apart", "hit it off", "dwell on", "get in the way of"],
    answer: "hit it off"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let quizQuestions = [];

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  quizQuestions = shuffle(questions);
  currentQuestion = 0;
  score = 0;
  answered = false;

  quizElement.hidden = false;
  resultElement.hidden = true;

  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestion];

  questionNumber.textContent =
    `Otázka ${currentQuestion + 1} z ${quizQuestions.length}`;

  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  checkBtn.hidden = false;
  nextBtn.hidden = true;
  checkBtn.disabled = false;
  answered = false;

  shuffle(q.options).forEach(optionText => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = optionText;

    button.addEventListener("click", () => {
      if (answered) return;

      document.querySelectorAll(".option").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    optionsElement.appendChild(button);
  });

  updateScore();
}

function checkAnswer() {
  if (answered) return;

  const selected = document.querySelector(".option.selected");

  if (!selected) {
    feedbackElement.textContent = "Nejdříve vyber odpověď.";
    feedbackElement.className = "feedback wrong";
    return;
  }

  const q = quizQuestions[currentQuestion];
  const buttons = document.querySelectorAll(".option");

  answered = true;
  checkBtn.disabled = true;

  buttons.forEach(button => {
    button.disabled = true;

    if (button.textContent === q.answer) {
      button.classList.add("correct");
    }
  });

  if (selected.textContent === q.answer) {
    score++;
    feedbackElement.textContent = "✓ Správně!";
    feedbackElement.className = "feedback correct";
  } else {
    selected.classList.add("wrong");
    feedbackElement.textContent =
      `✗ Špatně. Správná odpověď: ${q.answer}`;
    feedbackElement.className = "feedback wrong";
  }

  updateScore();
  nextBtn.hidden = false;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= quizQuestions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function finishQuiz() {
  quizElement.hidden = true;
  resultElement.hidden = false;

  const percentage = Math.round((score / quizQuestions.length) * 100);

  finalScoreElement.textContent =
    `Dosáhl/a jsi ${score} z ${quizQuestions.length} bodů (${percentage} %).`;

  updateScore();
}

function updateScore() {
  scoreElement.textContent = `${score} / ${quizQuestions.length}`;
}

checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

startQuiz();
