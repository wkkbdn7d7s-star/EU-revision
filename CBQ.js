document.addEventListener("DOMContentLoaded", () => {
  // Full set of Competency Based questions/fit questions (sample + common).
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

  let remaining = [];
  let shownCount = 0;
  let timerInterval;
  let elapsed = 0;

  const questionEl = document.getElementById("question");
  const counterEl = document.getElementById("counter");
  const timerEl = document.getElementById("timer");
  const nextBtn = document.getElementById("nextBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const copyBtn = document.getElementById("copyBtn");

  // Initialize by shuffling
  shuffleQuestions();

  function shuffleQuestions() {
    remaining = [...questions].sort(() => Math.random() - 0.5);
    shownCount = 0;
    updateCounter();
    questionEl.textContent = "Shuffled — click Next Question to begin.";
    resetTimer();
  }

  function nextQuestion() {
    if (!remaining.length) {
      questionEl.textContent = "All questions shown. Shuffle to restart.";
      resetTimer();
      return;
    }
    const q = remaining.shift();
    // fade effect
    questionEl.classList.add("fade");
    setTimeout(() => {
      questionEl.textContent = q;
      questionEl.classList.remove("fade");
    }, 160);

    shownCount++;
    updateCounter();
    resetTimer();
    startTimer();
  }

  function updateCounter() {
    counterEl.textContent = `${shownCount} / ${questions.length}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerEl.textContent = "00:00";
    timerInterval = setInterval(() => {
      elapsed++;
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      // subtle pulse
      timerEl.classList.add('pulse');
      setTimeout(() => timerEl.classList.remove('pulse'), 250);
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerEl.textContent = "00:00";
  }

  function copyQuestion() {
    const text = questionEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      // small visual confirmation
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(()=> copyBtn.textContent = prev, 900);
    }).catch(()=> alert("Copy failed — try selecting text manually."));
  }

  // Event listeners
  nextBtn.addEventListener('click', nextQuestion);
  shuffleBtn.addEventListener('click', shuffleQuestions);
  copyBtn.addEventListener('click', copyQuestion);
});
