document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Mock Exam JS loaded");

  // --- Question pools ---
  const euKnowledge = [
    "What are the main goals of the European Green Deal?",
    "How does the EU plan to achieve climate neutrality by 2050?",
    "What is the role of the 'Fit for 55' package in EU climate policy?",
    "How does the EU balance environmental goals with economic competitiveness?",
    "What measures has the EU adopted to promote a circular economy?",
    "What are the objectives of the EU’s Digital Decade strategy?",
    "How does the EU regulate artificial intelligence and emerging technologies?",
    "What role does Horizon Europe play in supporting research and innovation?",
    "How does the EU address cybersecurity challenges across member states?",
    "What are the key priorities for the EU’s digital single market?",
    "What is the purpose of the EU’s cohesion policy?",
    "How does the EU aim to reduce disparities between regions?",
    "What is the role of the European Social Fund Plus (ESF+)?",
    "How does the EU promote youth employment and mobility (e.g., Erasmus+)?",
    "How does the Recovery and Resilience Facility support post-pandemic recovery?",
    "How is the EU working to reduce dependence on fossil fuels?",
    "What are the main goals of the REPowerEU plan?",
    "How does the EU ensure energy security across member states?",
    "How is the EU promoting renewable energy and energy efficiency?",
    "How does the EU integrate climate and energy security into foreign policy?",
    "How does the EU monitor rule of law in member states?",
    "What tools does the EU have to address breaches of democratic values?",
    "How does the EU promote gender equality and inclusion?",
    "How does the Charter of Fundamental Rights influence EU policymaking?",
    "What is the role of the EU Agency for Fundamental Rights?",
    "What are the EU’s enlargement priorities for the next decade?",
    "How does the EU support its neighbourhood policy?",
    "What role does the EU play in global climate negotiations?",
    "How does the EU coordinate its foreign and security policy (CFSP)?",
    "What are the EU’s priorities in international trade agreements?",
    "How does the EU integrate sustainability into all policies?",
    "How does the EU address migration in a fair and effective way?",
    "What role does the EU play in global health policy (e.g., pandemic response)?",
    "How does the EU ensure strategic autonomy in key sectors (e.g., energy, tech)?",
    "How does the Multiannual Financial Framework (MFF) reflect EU priorities?",
    "How does the EU balance solidarity and responsibility in asylum policy?",
    "What are the EU’s priorities in tackling disinformation and protecting media freedom?",
    "How is the EU promoting resilience in supply chains and critical raw materials?",
    "How does the EU mainstream climate and digital priorities into its budget?",
    "How does the EU coordinate with international organisations (UN, NATO, WTO) on global challenges?"
  ];

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
    "Tell me about a time you delivered above expectations",
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

  const motivation = [
    "Why do you want to work for the European Commission?",
    "What attracts you specifically to this department or policy area?",
    "Where do you see yourself in five years within the European institutions?",
    "What are your main professional strengths and how will they help here?",
    "What is one area for improvement (weakness) and how are you addressing it?",
    "Why the European Commission and not another international organisation or national public service?",
    "What might be a downside of working at the Commission and how would you handle it?",
    "How does your personal profile (values/interests) match the Commission's mission?",
    "Which parts of your professional experience prepare you for work at the Commission?",
    "How does your educational background support a role in EU policy-making?",
    "Tell us about a time your values aligned with an organisational mission.",
    "How would you adapt to working in a multicultural, multilingual environment?",
    "What motivates you to work on public policy versus private sector tasks?",
    "Describe a moment when your communication skills made a difference.",
    "How do you handle long bureaucratic processes and stay productive?",
    "What unique perspective would you bring to the Commission?",
    "How do you keep up-to-date with EU policy and current affairs?",
    "How would you explain a complex policy to a non-specialist audience?",
    "Why is public service important to you personally?",
    "How does mobility (relocation/rotation) fit into your career plans?"
  ];

  // --- DOM elements ---
  const content = document.getElementById("content");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startBtn");

  let timerInterval;
  let remainingSeconds;

  if (startBtn) startBtn.addEventListener("click", startKnowledgeStage);

  // --- Stage Functions ---
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

  function startCompetencyStage() {
    const randomQs = competencies.sort(() => 0.5 - Math.random()).slice(0, 5);
    let index = 0;

    function showNextQuestion() {
      if (index >= randomQs.length) {
        startMotivationStage();
        return;
      }

      content.innerHTML = `
        <h2>Competency Question ${index + 1}</h2>
        <p class="question">${randomQs[index]}</p>
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

  function startMotivationStage() {
    const randomQs = motivation.sort(() => 0.5 - Math.random()).slice(0, 3);
    let index = 0;

    function showNextQuestion() {
      if (index >= randomQs.length) {
        showSelfAssessmentForm();
        return;
      }

      content.innerHTML = `
        <h2>Motivation Question ${index + 1}</h2>
        <p class="question">${randomQs[index]}</p>
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

    if (remainingSeconds <= 30) timerEl.style.color = "red";
    else if (remainingSeconds <= 90) timerEl.style.color = "orange";
    else if (remainingSeconds <= 180) timerEl.style.color = "yellow";
    else timerEl.style.color = "#ffffff";
  }

  // --- Self-assessment (local only, no Firebase) ---
  function showSelfAssessmentForm() {
    content.innerHTML = `
      <h2>Mock Exam Complete 🎉</h2>
      <p>Great job! Please rate your overall performance (1–10):</p>
      <div style="margin: 20px 0;">
        <input id="scoreInput" type="number" min="1" max="10" placeholder="Enter score (1–10)" style="padding: 10px; border-radius: 8px; width: 120px; text-align: center; font-size: 1.1em;">
      </div>
      <div class="controls">
        <button id="submitScoreBtn">Submit</button>
      </div>
      <p id="feedbackMsg" style="margin-top: 20px; font-weight: bold;"></p>
    `;

    timerEl.textContent = "";

    const submitBtn = document.getElementById("submitScoreBtn");
    const scoreInput = document.getElementById("scoreInput");
    const feedbackMsg = document.getElementById("feedbackMsg");

    submitBtn.addEventListener("click", () => {
      const score = parseInt(scoreInput.value.trim());
      if (isNaN(score) || score < 1 || score > 10) {
        feedbackMsg.textContent = "⚠️ Please enter a valid score between 1 and 10.";
        feedbackMsg.style.color = "orange";
        return;
      }

      feedbackMsg.textContent = `✅ Thank you! Your self-assessed score is ${score}/10.`;
      feedbackMsg.style.color = "lightgreen";
      scoreInput.disabled = true;
      submitBtn.disabled = true;
    });
  }
});
