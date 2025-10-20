import { getFirestore, collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firestore instance from window
const db = window.firebaseFns.db;

document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Mock Exam JS loaded");

  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const finishBtn = document.getElementById("finishBtn");

  let euKnowledge = [];
  let competencies = [];
  let motivation = [];
  let timerInterval;
  let remainingSeconds = 0;

  content.textContent = "Loading questions from Firestore...";

  // --- Load Firestore data ---
  try {
    const masterDocRef = doc(db, "questions", "masterQuestions");

    const [knowledgeSnap, compSnap, motSnap] = await Promise.all([
      getDocs(collection(masterDocRef, "EUknowledge")),
      getDocs(collection(masterDocRef, "EUcompetencies")),
      getDocs(collection(masterDocRef, "EUmotivation"))
    ]);

    euKnowledge = knowledgeSnap.docs.map(d => d.data().text).filter(Boolean);
    competencies = compSnap.docs.map(d => d.data().text).filter(Boolean);
    motivation = motSnap.docs.map(d => d.data().text).filter(Boolean);

    if (!euKnowledge.length && !competencies.length && !motivation.length) {
      content.textContent = "No questions found in Firestore.";
      return;
    }

    console.log(`📘 Loaded ${euKnowledge.length} EU Knowledge questions.`);
    console.log(`💼 Loaded ${competencies.length} EU Competency questions.`);
    console.log(`💬 Loaded ${motivation.length} EU Motivation questions.`);

    // ✅ Show Start button
    showStartButton();
  } catch (err) {
    console.error("❌ Failed to load Firestore questions:", err);
    content.textContent = "Failed to load questions from Firestore.";
  }

  // --- Function to show Start button ---
  function showStartButton() {
    content.innerHTML = `
      <p>Questions loaded. Click <strong>"Start Mock Exam"</strong> to begin.</p>
      <div class="controls">
        <button id="startBtn">Start Mock Exam</button>
      </div>
    `;
    document.getElementById("startBtn").addEventListener("click", startKnowledgeStage);
  }

  // --- Stage 1: EU Knowledge ---
  function startKnowledgeStage() {
    const randomQs = euKnowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
    if (!randomQs.length) return (content.textContent = "No EU Knowledge questions available.");

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
    if (!randomQs.length) return (content.textContent = "No competency questions available.");
    let index = 0;

    const showNext = () => {
      if (index >= randomQs.length) return startMotivationStage();

      content.innerHTML = `
        <h2>Competency Question ${index + 1}</h2>
        <p>${randomQs[index]}</p>
        <div class="button-group">
          <button id="skipBtn">Next</button>
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
    if (!randomQs.length) return (content.textContent = "No motivation questions available.");
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
          <button id="skipBtn">Next</button>
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
