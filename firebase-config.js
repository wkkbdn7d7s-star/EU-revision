// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.24.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.24.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.24.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== EUknowledge questions =====
const euKnowledgeQuestions = [
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

// ===== Master Questions Document ID =====
const masterQuestionDocId = "masterQuestions"; // replace with your actual document ID

// ===== Upload Function =====
async function uploadEUknowledge() {
  for (let i = 0; i < euKnowledgeQuestions.length; i++) {
    const docRef = doc(db, "Questions", masterQuestionDocId, "EUknowledge", `q${i + 1}`);
    await setDoc(docRef, { question: euKnowledgeQuestions[i] });
    console.log(`Uploaded question ${i + 1}`);
  }
  alert("All EUknowledge questions uploaded!");
}

// ===== Add a button in your HTML and link the function =====
// <button id="uploadBtn">Upload EUknowledge Questions</button>
document.getElementById("uploadBtn").addEventListener("click", uploadEUknowledge);
