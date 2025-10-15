document.addEventListener("DOMContentLoaded", () => {
  const questions = [
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

  shuffleQuestions();

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
      const m = String(Math.floor(elapsed / 60)).padStart(2,'0');
      const s = String(elapsed % 60).padStart(2,'0');
      timerEl.textContent = `${m}:${s}`;

      // change color at milestones
      if (elapsed >= 270) { // 4:30
        timerEl.style.color = "var(--timer-red)";
      } else if (elapsed >= 240) { // 4:00
        timerEl.style.color = "var(--timer-orange)";
      } else if (elapsed >= 180) { // 3:00
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
      setTimeout(()=> copyBtn.textContent = prev, 900);
    }).catch(()=> alert("Copy failed — try selecting text manually."));
  }

  nextBtn.addEventListener('click', nextQuestion);
  shuffleBtn.addEventListener('click', shuffleQuestions);
  copyBtn.addEventListener('click', copyQuestion);
});
