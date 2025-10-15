document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Mock Exam JS loaded");

  // --- Question pools ---
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
    "Tell me about a time you dealt with a difficult colleague.",
    "Tell me about a time you developed a new skill or competency.",
    "Tell me about a time you disagreed with your hierarchy.",
    "Tell me about a time you did not deliver on time.",
    "Tell me about a time you did not deliver up to the quality required.",
    "Tell me about a time you delivered above expectations but were disappointed.",
    "Tell me about a time you led a team.",
    "Tell me about a time you implemented a new idea.",
    "Tell me about a time you handled a sensitive situation with discretion.",
    "Tell me about a time you resolved a conflict between team members."
  ];

  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  let timerInterval;
  let remainingSeconds;

  if (startBtn) startBtn.addEventListener("click", startKnowledgeStage);

  // --- Step 1: Preparation Stage (EU Knowledge) ---
  function startKnowledgeStage() {
    const randomQs = euKnowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
    content.innerHTML = `
      <h2>Preparation Stage</h2>
      <p>You have 10 minutes to prepare a presentation on <strong>one</strong> of the following three EU Knowledge questions:</p>
      <ol>${randomQs.map(q => `<li>${q}</li>`).join("")}</ol>
      <div class="button-group">
        <button id="skipBtn">Skip</button>
      </div>
    `;
    document.getElementById("skipBtn").addEventListener("click", startPresentationStage);
    startTimer(10 * 60, startPresentationStage);
  }

  // --- Step 2: Presentation Stage ---
  function startPresentationStage() {
    content.innerHTML = `
      <h2>Presentation Stage</h2>
      <p>Now, present your answer to the question you selected. You have 5 minutes.</p>
      <div class="button-group">
        <button id="skipBtn">Skip</button>
      </div>
    `;
    document.getElementById("skipBtn").addEventListener("click", startCompetencyStage);
    startTimer(5 * 60, startCompetencyStage);
  }

  // --- Step 3: Competency Stage (5 questions, 3 minutes each) ---
  function startCompetencyStage() {
    const randomQs = competencies.sort(() => 0.5 - Math.random()).slice(0, 5);
    let index = 0;

    function showNextQuestion() {
      if (index >= randomQs.length) {
        content.innerHTML = `
          <h2>Mock Exam Complete</h2>
          <p>Excellent work — you’ve completed the full ECi simulation!</p>
        `;
        timerEl.textContent = "";
        return;
      }

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
        showNextQuestion();
      });

      startTimer(3 * 60, () => {
        index++;
        showNextQuestion();
      });
    }

    showNextQuestion();
  }

  // --- Timer functions ---
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
