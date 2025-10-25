// Import from Firebase CDN (browser-compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtJstcWHSwJVPogm-MXAehNR4FBhh8Iuo",
  authDomain: "a-b-s-a-upgrade-system.firebaseapp.com",
  databaseURL: "https://a-b-s-a-upgrade-system-default-rtdb.firebaseio.com", // ✅ Correct
  projectId: "a-b-s-a-upgrade-system",
  storageBucket: "a-b-s-a-upgrade-system.firebasestorage.app",
  messagingSenderId: "618721346269",
  appId: "1:618721346269:web:2548672e789231e4e95134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export initialized database
export const database = getDatabase(app);

