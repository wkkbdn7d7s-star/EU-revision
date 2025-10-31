// howto.js
export function loadHowToSection(topic) {
  const sections = {
    knowledge: {
      title: "How to Approach EU Knowledge Questions",
      tips: [
        {
          title: "🧭 Structure Your Response",
          text: "Begin by defining the key concept or policy area. Explain its relevance to the EU context, and end with concrete examples or recent developments."
        },
        {
          title: "📚 Use EU References",
          text: "Refer to official EU sources, strategies, or communications (e.g., the European Green Deal, Digital Strategy). Show awareness of institutional priorities."
        },
        {
          title: "🗣️ Delivery Tips",
          text: "Keep answers clear, confident, and to the point. Avoid jargon. Speak as if explaining to a non-expert colleague."
        },
        {
          title: "💡 Preparation Strategy",
          text: "Review key EU policy summaries regularly. Create flashcards for major initiatives, and practice explaining them in under 2 minutes."
        }
      ]
    },
    competencies: {
      title: "How to Approach Competency Questions",
      tips: [
        {
          title: "💬 Use the STAR Method",
          text: "Structure your responses around Situation, Task, Action, and Result to ensure clarity and focus."
        },
        {
          title: "👥 Show Self-Awareness",
          text: "Reflect on your role, what you learned, and how you could improve. Assessors value maturity and reflection."
        },
        {
          title: "🎯 Be Results-Oriented",
          text: "Explain the concrete outcomes of your actions and their impact. Quantify results if possible."
        },
        {
          title: "🧠 Preparation Strategy",
          text: "List examples from your career that show different competencies. Practice adapting them to different questions."
        }
      ]
    },
    motivation: {
      title: "How to Approach Motivation Questions",
      tips: [
        {
          title: "💬 Be Authentic",
          text: "Explain what drives you to serve the EU. Authentic, personal motivation always resonates more than memorized phrases."
        },
        {
          title: "🏛️ Connect to EU Values",
          text: "Mention how your motivation aligns with the EU’s mission — unity, diversity, sustainability, and service to citizens."
        },
        {
          title: "🗣️ Communicate Passionately",
          text: "Use confident tone and natural enthusiasm. Balance professionalism with genuine conviction."
        },
        {
          title: "🧩 Preparation Strategy",
          text: "Write your motivation down, refine it, and rehearse aloud. Keep a few sentences ready for interviews or presentations."
        }
      ]
    }
  };

  const data = sections[topic];
  if (!data) return;

  // Create the container
  const section = document.createElement("section");
  section.className = "how-to";

  // Button + content container
  section.innerHTML = `
    <button class="toggle-howto">📘 Show ${data.title}</button>
    <div class="howto-content">
      <h2>${data.title}</h2>
      <div class="tips-grid">
        ${data.tips.map(t => `
          <div class="tip">
            <h3>${t.title}</h3>
            <p>${t.text}</p>
          </div>`).join("")}
      </div>
    </div>
  `;

  // Append to page
  document.body.appendChild(section);

  // Add toggle behavior
  const btn = section.querySelector(".toggle-howto");
  const content = section.querySelector(".howto-content");
  let visible = false;

  btn.addEventListener("click", () => {
    visible = !visible;
    content.style.maxHeight = visible ? content.scrollHeight + "px" : "0";
    content.style.opacity = visible ? "1" : "0";
    btn.textContent = visible
      ? `📘 Hide ${data.title}`
      : `📘 Show ${data.title}`;
  });
}
