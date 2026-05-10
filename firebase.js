import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZPvZKpwZAOwP8bnWb5bl1JqG8h4DpSO8",
  authDomain: "studenthub-c3588.firebaseapp.com",
  projectId: "studenthub-c3588",
  storageBucket: "studenthub-c3588.firebasestorage.app",
  messagingSenderId: "142385985967",
  appId: "1:142385985967:web:e04cb207ffe611808b175a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);