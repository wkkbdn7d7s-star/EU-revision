const questions = [
  "Tell me about a time you dealt with a difficult colleague?",
  "Tell me about a time you developed a new skill or competency",
  "Tell me about a time you disagreed with your hierarchy",
  "Tell me about a time you did not deliver on time",
  "Tell me about a time you did not deliver up to the quality required",
  "Tell me about a time you delivered above expectations but were disappointed",
  "Tell me about a time you had to improve your interpersonal skills in a new job",
  "Tell me about a time you managed low-intensity work periods",
  "Tell me about a time you led a team",
  "Tell me about a time you changed your mind",
  "Tell me about a time you received feedback you disagreed with",
  "Tell me about a time you implemented a new idea",
  "Tell me about a time when you valued diversity and inclusion",
  "Tell me about a time when you delivered above expectations",
  "Tell me about a time you showed adaptive behaviours",
  "Tell me about a time you faced a challenge",
  "Tell me about a time you represented the European Commission",
  "Tell me about a time you questioned procedures",
  "Tell me about a time you delegated a task",
  "Tell me about a time you could not agree with a colleague",
  "Tell me about a time you motivated others to achieve a goal",
  "Tell me about a time you had to adapt quickly to a new policy or procedure",
  "Tell me about a time you influenced a decision through collaboration",
  "Tell me about a time you resolved a conflict between team members",
  "Tell me about a time you handled a sensitive situation with discretion",
  "Tell me about a time you prioritized competing tasks under pressure",
  "Tell me about a time you implemented a process improvement",
  "Tell me about a time you took initiative beyond your assigned role",
  "Tell me about a time you managed a project from start to finish",
  "Tell me about a time you built consensus among stakeholders",
  "Tell me about a time you had to make a difficult ethical decision",
  "Tell me about a time you innovated to solve a problem",
  "Tell me about a time you had to work with limited resources",
  "Tell me about a time you handled constructive criticism positively",
  "Tell me about a time you mentored or coached someone"
];

let timerInterval;
let elapsedSeconds = 0;

const questionEl = document.getElementById("question");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const copyBtn = document.getElementById("copyBtn");

function nextQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  questionEl.style.opacity = 0;
  setTimeout(() => {
    questionEl.innerText = questions[randomIndex];
    questionEl.style.opacity = 1;
  }, 200);

  resetTimer();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  timerEl.innerText = "00:00";
  timerEl.style.color = "#003399";

  timerInterval = setInterval(() => {
    elapsedSeconds++;
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    timerEl.innerText = `${minutes}:${seconds}`;

    if (elapsedSeconds < 180) timerEl.style.color = "#003399"; // blue
    else if (elapsedSeconds < 240) timerEl.style.color = "#FFFF00"; // yellow
    else if (elapsedSeconds < 270) timerEl.style.color = "#FFA500"; // orange
    else timerEl.style.color = "#FF0000"; // red

    timerEl.classList.add("pulse");
    setTimeout(() => timerEl.classList.remove("pulse"), 300);
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  timerEl.innerText = "00:00";
  timerEl.style.color = "#003399";
}

function copyQuestion() {
  navigator.clipboard.writeText(questionEl.innerText).then(() => {
    alert("Question copied to clipboard!");
  });
}

// Event listeners
nextBtn.addEventListener("click", nextQuestion);
copyBtn.addEventListener("click", copyQuestion);

// Initialize first question
questionEl.innerText = 'Click "Next Question" to start';
