document.addEventListener("DOMContentLoaded", () => {
  // --- EU Knowledge Questions ---
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
    "Explain how the EU handles enlargement and neighbourhood policies.",
    "What is the EU’s approach to digital transformation?",
    "What is the function of the European Court of Auditors?",
    "What is the role of the European Ombudsman?",
    "How does the EU promote gender equality?",
    "Describe how the EU supports sustainable development globally.",
    "Explain the function of the European Central Bank.",
    "What is the difference between the Council of the EU and the European Council?",
    "What are the EU values enshrined in Article 2 of the Treaty on European Union?",
    "How does the EU ensure data protection and privacy?",
    "What are the goals of the European Semester?",
    "Explain what cohesion policy aims to achieve.",
    "What is the EU Charter of Fundamental Rights?",
    "What is the NextGenerationEU recovery plan?",
    "Describe the purpose of Erasmus+.",
    "How does the EU’s legislative process work?"
  ];

  // --- Competency-Based Questions ---
  const competencies = [
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

  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  let timerInterval;
  let remainingSeconds;

  startBtn.addEventListener("click", startKnowledgeSection);

  // --- Step 1: EU Knowledge (10 minutes) ---
  function startKnowledgeSection() {
    const randomQs = euKnowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
    content.innerHTML = `
      <h2>Preparation Stage</h2>
      <p>Prepare your answers to these 3 EU Knowledge questions:</p>
      <ol>${randomQs.map(q => `<li>${q}</li>`).join("")}</ol>
      <p><strong>Time left: 10 minutes</strong></p>
    `;
    startTimer(10 * 60, startPresentationSection);
  }

  // --- Step 2: Presentation (5 minutes) ---
  function startPresentationSection() {
    content.innerHTML = `
      <h2>Presentation Stage</h2>
      <p>Now, present your answer to one of the questions you prepared.</p>
      <p><strong>Time left: 5 minutes</strong></p>
    `;
    startTimer(5 * 60, startCompetencySection);
  }

  // --- Step 3: Competency Questions (5 × 3 minutes) ---
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
        <p><strong>Time left: 3 minutes</strong></p>
      `;
      startTimer(3 * 60, () => {
        index++;
        askNext();
      });
    }

    askNext();
  }

  // --- Generic Timer ---
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
