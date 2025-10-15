document.addEventListener("DOMContentLoaded", () => {
  // Full set of motivation/fit questions (sample + common).
  const questions = [
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

  // Initialize by shuffling
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
    // fade effect
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
    timerInterval = setInterval(() => {
      elapsed++;
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      // subtle pulse
      timerEl.classList.add('pulse');
      setTimeout(() => timerEl.classList.remove('pulse'), 250);
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsed = 0;
    timerEl.textContent = "00:00";
  }

  function copyQuestion() {
    const text = questionEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      // small visual confirmation
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(()=> copyBtn.textContent = prev, 900);
    }).catch(()=> alert("Copy failed — try selecting text manually."));
  }

  // Event listeners
  nextBtn.addEventListener('click', nextQuestion);
  shuffleBtn.addEventListener('click', shuffleQuestions);
  copyBtn.addEventListener('click', copyQuestion);
});
