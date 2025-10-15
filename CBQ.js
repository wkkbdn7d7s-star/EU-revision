document.addEventListener("DOMContentLoaded", () => {
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

  const questionEl = document.getElementById("question");
  const timerEl = document.getElementById("timer");
  const nextBtn = document.getElementById("nextBtn");
  const copyBtn = document.getElementById("copyBtn");

  let timerInterval;
  let elapsedSeconds = 0;

  function showQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);

    // Fade effect
    questionEl.classList.add("fade");
    setTimeout(() => {
      questionEl.textContent = questions[randomIndex];
      questionEl.classList.remove("fade");
    }, 200);

    resetTimer();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    timerEl.textContent = "00:00";
    timerEl.style.color = "#ffffff";

    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
      const seconds = String(elapsedSeconds % 60).padStart(2, "0");
      timerEl.textContent = `${minutes}:${seconds}`;

      // Dynamic color changes
      if (elapsedSeconds < 180) timerEl.style.color = "#ffffff";        // white
      else if (elapsedSeconds < 240) timerEl.style.color = "#FFFF00";   // yellow
      else if (elapsedSeconds < 270) timerEl.style.color = "#FFA500";   // orange
      else timerEl.style.color = "#FF0000";                             // red

      // subtle pulse animation
      timerEl.classList.add("pulse");
      setTimeout(() => timerEl.classList.remove("pulse"), 300);
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    timerEl.textContent = "00:00";
    timerEl.style.color = "#ffffff";
  }

  function copyQuestion() {
    navigator.clipboard.writeText(questionEl.textContent).then(() => {
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = prev, 900);
    }).catch(() => alert("Copy failed — select text manually"));
  }

  nextBtn.addEventListener("click", showQuestion);
  copyBtn.addEventListener("click", copyQuestion);
});
