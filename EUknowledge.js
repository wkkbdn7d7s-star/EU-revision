import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVv0Ag4-i3h0bEEYOiX4pRCZF7a4_a220",
  authDomain: "eureka-63b47.firebaseapp.com",
  projectId: "eureka-63b47",
  storageBucket: "eureka-63b47.firebasestorage.app",
  messagingSenderId: "655168214317",
  appId: "1:655168214317:web:3d3ffc07706ba39efa6fa4",
  measurementId: "G-KFTB45DCFZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("eu-knowledge-page");

  let questions = [];
  let remaining = [];
  let shownCount = 0;
  let timerInterval;
  let elapsed = 0;

  const questionEl = container.querySelector("#question");
  const counterEl = container.querySelector("#counter");
  const timerEl = container.querySelector("#timer");
  const nextBtn = container.querySelector("#nextBtn");
  const shuffleBtn = container.querySelector("#shuffleBtn");
  const copyBtn = container.querySelector("#copyBtn");

  questionEl.textContent = "Loading EU Knowledge questions...";

  try {
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

      if (elapsed >= 270) timerEl.style.color = "var(--timer-red)";
      else if (elapsed >= 240) timerEl.style.color = "var(--timer-orange)";
      else if (elapsed >= 180) timerEl.style.color = "var(--timer-yellow)";
      else timerEl.style.color = "var(--timer-white)";
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

  nextBtn.addEventListener('click', nextQuestion);
  shuffleBtn.addEventListener('click', shuffleQuestions);
  copyBtn.addEventListener('click', copyQuestion);
});
