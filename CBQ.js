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

function getQuestion() {
  // Random question
  const randomIndex = Math.floor(Math.random() * questions.length);
  const questionBox = document.getElementById("question");

  questionBox.style.opacity = 0;
  setTimeout(() => {
    questionBox.innerText = questions[randomIndex];
    questionBox.style.opacity = 1;
  }, 200);

  // Reset and start timer
  resetTimer();
  startTimer();
}

function startTimer() {
  const timerBox = document.getElementById("timer");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    timerBox.innerText = `${minutes}:${seconds}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  document.getElementById("timer").innerText = "00:00";
}

function copyQuestion() {
  const questionText = document.getElementById("question").innerText;
  navigator.clipboard.writeText(questionText).then(() => {
    alert("Question copied to clipboard!");
  });
}
