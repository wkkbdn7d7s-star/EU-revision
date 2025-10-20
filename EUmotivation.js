import { getFirestore, collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Get Firestore instance from window
const db = window.firebaseFns.db;

document.addEventListener("DOMContentLoaded", async () => {
  let questions = [];
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

  questionEl.textContent = "Loading EU Motivation questions...";

  // --- Load questions from Firestore ---
  try {
    const masterDocRef = doc(db, "questions", "masterQuestions");
    const colRef = collection(masterDocRef, "EUmotivation");
    const snapshot = await getDocs(colRef);

    questions = snapshot.docs.map(d => d.data().text);

    if (!questions.length) {
      questionEl.textContent = "No questions found in Firestore.";
      return;
    }

    console.log(`Loaded ${questions.length} EU Motivation questions.`);

    // Initialize after questions are loaded
    shuffleQuestions();
    attachEventListeners();
  } catch (err) {
    console.error(err);
    questionEl.textContent = "Failed to load questions from Firestore.";
  }

  // --- FUNCTIONS ---
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
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerEl.textContent = "00:00";
  }

  function copyQuestion() {
    const text = questionEl.textContent;
    navigator.clipboard.writeText(text)
      .then(() => {
        const prev = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = prev, 900);
      })
      .catch(() => alert("Copy failed — try selecting text manually."));
  }

  function attachEventListeners() {
    nextBtn.addEventListener("click", nextQuestion);
    shuffleBtn.addEventListener("click", shuffleQuestions);
    copyBtn.addEventListener("click", copyQuestion);
  }
});
