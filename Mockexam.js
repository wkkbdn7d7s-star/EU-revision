document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Mock Exam JS loaded");

  const euKnowledge = [
    "What are the core priorities of the European Commission?",
    "Explain the role of the European Parliament in the legislative process.",
    "What is the Digital Europe Programme?",
    "Describe the purpose of the European Green Deal.",
    "How does the EU promote cohesion among Member States?",
    "What is the role of the European Council?",
    "Explain the EU’s climate neutrality target by 2050.",
    "What are the main institutions of the European Union?",
    "What are the main EU funding programmes for innovation?",
    "Explain how the EU handles enlargement and neighbourhood policies."
  ];

  const competencies = [
    "Tell me about a time you dealt with a difficult colleague?",
    "Tell me about a time you developed a new skill or competency",
    "Tell me about a time you disagreed with your hierarchy",
    "Tell me about a time you did not deliver on time",
    "Tell me about a time you led a team"
  ];

  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  let timerInterval;
  let remainingSeconds;

  if (startBtn) {
    startBtn.addEventListener("click", startKnowledgeSection);
  } else {
    console.error("❌ startBtn not found!");
  }

  // --- Step 1: EU Knowledge (10 min) ---
  function startKnowledgeSection() {
    const randomQs = euKnowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
    content.innerHTML = `
      <h2>Preparation Stage</h2>
      <p>Prepare your answers to these 3 EU Knowledge questions:</p>
      <ol>${randomQs.map(q => `<li>${q}</li>`).join("")}</ol>
    `;
    startTimer(10 * 60, startPresentationSection);
  }

  // --- Step 2: Presentation (5 min) ---
  function startPresentationSection() {
    content.innerHTML = `
      <h2>Presentation Stage</h2>
      <p>Now, present your answer to one of the questions you prepared.</p>
    `;
    startTimer(5 * 60, startCompetencySection);
  }

  // --- Step 3: Competency (5×3 min) ---
  function startCompetencySection() {
    const randomQs = competencies.sort(() => 0.5 - Math.random()).slice(0, 5);
    let index = 0;

    function askNext() {
      if (index >= randomQs.length) {
        content.innerHTML = `<h2>Mock Exam Complete</h2><p>Well done! You’ve finished the full simulation.</p>`;
        timerEl.textContent = "";
        return;
      }

      content.innerHTML = `
        <h2>Competency Question ${index + 1}</h2>
        <p>${randomQs[index]}</p>
      `;
      startTimer(3 * 60, () => {
        index++;
        askNext();
      });
    }

    askNext();
  }

  // --- Timer ---
  function startTimer(seconds, callback) {
    clearInterval(timerInterval);
    remainingSeconds = seconds;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        callback();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;
  }
});
