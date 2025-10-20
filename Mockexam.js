import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Mock Exam JS loaded");

  // --- Firebase Config ---
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

  // --- Local fallback question pools ---
  let euKnowledge = [
    "What are the main goals of the European Green Deal?",
    "How does the EU plan to achieve climate neutrality by 2050?"
  ];
  let competencies = [
    "Tell me about a time you dealt with a difficult colleague?",
    "Tell me about a time you developed a new skill or competency."
  ];
  let motivation = [
    "Why do you want to work for the European Commission?",
    "What attracts you specifically to this department or policy area?"
  ];

  // --- Load from Firestore (with fallback) ---
  const content = document.getElementById("content");
  content.innerHTML = "<p>Loading questions from Firestore...</p>";

  try {
    const [knowledgeSnap, compSnap, motSnap] = await Promise.all([
      getDocs(collection(db, "EUknowledge")),
      getDocs(collection(db, "EUcompetencies")),
      getDocs(collection(db, "EUmotivation"))
    ]);

    const k = knowledgeSnap.docs.map(doc => doc.data().text || doc.data().question).filter(Boolean);
    const c = compSnap.docs.map(doc => doc.data().text || doc.data().question).filter(Boolean);
    const m = motSnap.docs.map(doc => doc.data().text || doc.data().question).filter(Boolean);

    if (k.length) euKnowledge = k;
    if (c.length) competencies = c;
    if (m.length) motivation = m;

    console.log(`📘 EUknowledge: ${euKnowledge.length}`);
    console.log(`💼 EUcompetencies: ${competencies.length}`);
    console.log(`💬 EUmotivation: ${motivation.length}`);
    content.innerHTML = `<p>Questions loaded. Click <strong>"Start Mock Exam"</strong> to begin.</p>`;
  } catch (err) {
    console.error("❌ Error loading questions:", err);
    content.innerHTML = "<p>⚠️ Could not load Firestore questions. Using local defaults instead.</p>";
  }

  // --- DOM elements ---
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");
  const finishBtn = document.getElementById("finishBtn");

  let timerInterval;
  let remainingSeconds = 0;

  if (startBtn) startBtn.addEventListener("click", startKnowledgeStage);

  // --- Stage 1: EU Knowledge (Preparation) ---
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

  // --- Timer System ---
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
