const questions = [
  {
    category: "JavaScript",
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ],
    explanation: "JavaScript is the language supported natively by all modern browsers."
  },
  {
    category: "HTML",
    question: "Which tag is used to create a link in HTML?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false }
    ],
    explanation: "The <a> tag is used to define hyperlinks."
  },
  {
    category: "CSS",
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Coded Style Syntax", correct: false },
      { text: "Computer Style Sheets", correct: false }
    ],
    explanation: "CSS stands for Cascading Style Sheets."
  },
  {
    category: "JavaScript",
    question: "How do you call a function in JavaScript?",
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "myFunction;", correct: false },
      { text: "call.myFunction()", correct: false }
    ],
    explanation: "You call a function using parentheses: myFunction()"
  },
  {
    category: "HTML",
    question: "Which HTML element is used to insert a line break?",
    answers: [
      { text: "<br>", correct: true },
      { text: "<lb>", correct: false },
      { text: "<break>", correct: false },
      { text: "<line>", correct: false }
    ],
    explanation: "<br> is the correct tag for a line break."
  },
  {
    category: "DOM",
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Output Method", correct: false },
      { text: "Desktop Oriented Mode", correct: false },
      { text: "Document Oriented Markup", correct: false }
    ],
    explanation: "DOM is a programming interface for HTML and XML documents."
  },
  {
    category: "HTML",
    question: "Which element holds JavaScript in HTML?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false }
    ],
    explanation: "<script> is the correct tag to include JavaScript."
  },
  {
    category: "JavaScript",
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Netscape", correct: true },
      { text: "Google", correct: false },
      { text: "Oracle", correct: false }
    ],
    explanation: "Netscape created JavaScript in 1995."
  },
  {
    category: "JavaScript",
    question: "Which operator assigns a value to a variable?",
    answers: [
      { text: "*", correct: false },
      { text: "=", correct: true },
      { text: "-", correct: false },
      { text: "==", correct: false }
    ],
    explanation: "'=' assigns a value. '==' is used for comparison."
  },
  {
    category: "JavaScript",
    question: "What is the correct syntax to refer to an external script?",
    answers: [
      { text: "<script src='app.js'>", correct: true },
      { text: "<script href='app.js'>", correct: false },
      { text: "<script ref='app.js'>", correct: false },
      { text: "<script file='app.js'>", correct: false }
    ],
    explanation: "<script src='app.js'> is the right way to include external scripts."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const categoryEl = document.getElementById("category");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreText = document.getElementById("score");
const explanationEl = document.getElementById("explanation");
const timerEl = document.getElementById("timer");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  resultContainer.classList.add("hide");
  resultContainer.classList.remove("show");
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  categoryEl.innerText = `Category: ${currentQuestion.category}`;
  explanationEl.innerText = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => selectAnswer(button, answer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  answerButtons.innerHTML = "";
  explanationEl.innerText = "";
  clearInterval(timer);
  timeLeft = 30;
  timerEl.innerText = `Time: ${timeLeft}`;
  startTimer();
}

function selectAnswer(button, answer) {
  const buttons = Array.from(answerButtons.children);
  buttons.forEach(btn => btn.disabled = true);
  if (answer.correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // Highlight correct answer
  buttons.forEach(btn => {
    const ans = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText);
    if (ans.correct) btn.classList.add("correct");
  });

  explanationEl.innerText = questions[currentQuestionIndex].explanation;
  nextButton.classList.remove("hide");
  clearInterval(timer);
}

function showScore() {
  questionEl.innerText = "";
  answerButtons.innerHTML = "";
  categoryEl.innerText = "";
  timerEl.innerText = "";
  nextButton.classList.add("hide");
  explanationEl.innerText = "";
  scoreText.innerText = `You scored ${score} out of ${questions.length}!`;
  resultContainer.classList.remove("hide");
  setTimeout(() => resultContainer.classList.add("show"), 10);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      explanationEl.innerText = "⏰ Time's up!";
      nextButton.classList.remove("hide");
      const buttons = Array.from(answerButtons.children);
      buttons.forEach(btn => {
        const ans = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText);
        if (ans.correct) btn.classList.add("correct");
        btn.disabled = true;
      });
    }
  }, 1000);
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

window.onload = startQuiz;
