import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// --- FIREBASE CONFIG ---
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
  console.log("✅ Mock Exam JS loaded");

  let euKnowledge = [];
  let competencies = [];
  let motivation = [];

  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const finishBtn = document.getElementById("finishBtn");

  let timerInterval;
  let remainingSeconds = 0;

  // --- Load all question pools from Firestore ---
  try {
    // EU Knowledge
    const knowledgeSnap = await getDocs(collection(db, "EUknowledge"));
    euKnowledge = knowledgeSnap.docs.map(doc => doc.data().text || doc.data().question || "Missing question");

    // Competencies
    const competencySnap = await getDocs(collection(db, "EUcompetencies"));
    competencies = competencySnap.docs.map(doc => doc.data().text || doc.data().question || "Missing question");

    // Motivation
    const motivationSnap = await getDocs(collection(db, "EUmotivation"));
    motivation = motivationSnap.docs.map(doc => doc.data().text || doc.data().question || "Missing question");

    if (!euKnowledge.length || !competencies.length || !motivation.length) {
      content.innerHTML = "<p>No questions found in one or more collections. Please check Firestore.</p>";
      return;
    }

    console.log("✅ Loaded questions from Firestore:");
    console.log("EU Knowledge:", euKnowledge.length);
    console.log("Competencies:", competencies.length);
    console.log("Motivation:", motivation.length);
  } catch (err) {
    console.error("Error loading questions from Firestore:", err);
    content.innerHTML = "<p>Failed to load questions. Please try again later.</p>";
    return;
  }

  if (startBtn) startBtn.addEventListener("click", startKnowledgeStage);

  // --- Stage 1: EU Knowledge ---
  function startKnowledgeStage() {
    const randomQs = euKnowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
    content.innerHTML = `
      <h2>Preparation Stage</h2>
      <p>You have <strong>10 minutes</strong> to prepare a presentation on <strong>one</strong> of the following EU Knowledge questions:</p>
      <ol>${randomQs.map(q => `<li>${q}</li>`).join("")}</ol>
      <div class="button-group">
        <button id="skipBtn">Skip</button>
      </div>
    `;
    document.getElementById("skipBtn").addEventListener("click", startPresentationStage);
    startTimer(10 * 60, startPresentationStage);
  }

  // --- Stage 2: Presentation ---
  function startPresentationStage() {
    content.innerHTML = `
      <h2>Presentation Stage</h2>
      <p>You now have <strong>5 minutes</strong> to present your prepared answer.</p>
      <div class="button-group">
        <button id="skipBtn">Skip</button>
      </div>
    `;
    document.getElementById("skipBtn").addEventListener("click", startCompetencyStage);
    startTimer(5 * 60, startCompetencyStage);
  }

  // --- Stage 3: Competency ---
  function startCompetencyStage() {
    const randomQs = competencies.sort(() => 0.5 - Math.random()).slice(0, 5);
    let index = 0;

    const showNext = () => {
      if (index >= randomQs.length) return startMotivationStage();
      content.innerHTML = `
        <h2>Competency Question ${index + 1}</h2>
        <p>${randomQs[index]}</p>
        <div class="button-group">
          <button id="skipBtn">Skip</button>
        </div>
      `;
      document.getElementById("skipBtn").addEventListener("click", () => {
        clearInterval(timerInterval);
        index++;
        showNext();
      });
      startTimer(3 * 60, () => { index++; showNext(); });
    };
    showNext();
  }

  // --- Stage 4: Motivation ---
  function startMotivationStage() {
    const randomQs = motivation.sort(() => 0.5 - Math.random()).slice(0, 3);
    let index = 0;

    const showNext = () => {
      if (index >= randomQs.length) {
        content.innerHTML = `
          <h2>All questions completed!</h2>
          <p>Click "Finish Exam" below to submit your self-assessment.</p>
        `;
        if (finishBtn) finishBtn.style.display = "inline-block";
        clearInterval(timerInterval);
        timerEl.textContent = "00:00";
        return;
      }

      content.innerHTML = `
        <h2>Motivation Question ${index + 1}</h2>
        <p>${randomQs[index]}</p>
        <div class="button-group">
          <button id="skipBtn">Skip</button>
        </div>
      `;
      document.getElementById("skipBtn").addEventListener("click", () => {
        clearInterval(timerInterval);
        index++;
        showNext();
      });
      startTimer(3 * 60, () => { index++; showNext(); });
    };
    showNext();
  }

  // --- Timer system ---
  function startTimer(duration, callback) {
    clearInterval(timerInterval);
    remainingSeconds = duration;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        if (typeof callback === "function") callback();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
});
