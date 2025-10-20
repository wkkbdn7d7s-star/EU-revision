import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- FIREBASE CONFIG (replace with yours) ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  questionEl.textContent = "Loading EU Knowledge questions...";

  // --- Load questions dynamically from Firestore ---
  try {
    // Correctly reference subcollection
    const masterDocRef = doc(db, "questions", "masterQuestions");
    const colRef = collection(masterDocRef, "EUknowledge");

    const snapshot = await getDocs(colRef);
    questions = snapshot.docs.map(doc => doc.data().text);

    if (!questions.length) {
      questionEl.textContent = "No questions found in Firestore.";
      return;
    }

    console.log(`Loaded ${questions.length} EU Knowledge questions.`);
    shuffleQuestions();
  } catch (error) {
    console.error("Error loading questions:", error);
    questionEl.textContent = "Failed to load questions. Please try again later.";
    return;
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
    timerEl.style.color = "var(--timer-white)";

    timerInterval = setInterval(() => {
      elapsed++;
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;

      if (elapsed >= 270) {
        timerEl.style.color = "var(--timer-red)";
      } else if (elapsed >= 240) {
        timerEl.style.color = "var(--timer-orange)";
      } else if (elapsed >= 180) {
        timerEl.style.color = "var(--timer-yellow)";
      } else {
        timerEl.style.color = "var(--timer-white)";
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerEl.textContent = "00:00";
    timerEl.style.color = "var(--timer-white)";
  }

  function copyQuestion() {
    const text = questionEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = prev, 900);
    }).catch(() => alert("Copy failed — try selecting text manually."));
  }

  // --- EVENT LISTENERS ---
  nextBtn.addEventListener('click', nextQuestion);
  shuffleBtn.addEventListener('click', shuffleQuestions);
  copyBtn.addEventListener('click', copyQuestion);
});
