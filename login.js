// JavaScript to toggle overlay on menu hover
document.querySelector('.navbar-nav .nav-item.dropdown').addEventListener('mouseenter', function() {
    document.querySelector('.overlay').style.display = 'block'; // Show overlay when hovering over the dropdown
    document.querySelector('.overlay').style.opacity = '1'; // Show full opacity
    document.querySelector('.overlay').style.pointerEvents = 'auto'; // Allow interaction
});

document.querySelector('.navbar-nav .nav-item.dropdown').addEventListener('mouseleave', function() {
    document.querySelector('.overlay').style.display = 'none'; // Hide overlay when mouse leaves the dropdown
    document.querySelector('.overlay').style.opacity = '0'; // Reset opacity
    document.querySelector('.overlay').style.pointerEvents = 'none'; // Disable interaction
});


// Toggle between login, signup, and forgot password forms
function showLogin() {
    document.getElementById("login-form").classList.add("active");
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("forgot-password-form").classList.remove("active");
}

function showSignup() {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
    document.getElementById("forgot-password-form").classList.remove("active");
}

function showForgotPassword() {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("forgot-password-form").classList.add("active");
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Validate password complexity
function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

// Validate phone number format
function validatePhone(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

// Login functionality
document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  alert(data.message);

  if (response.ok) {
    window.location.href = "detail.html";
  }
});


// Signup functionality
document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, phone, password })
  });

  const data = await response.json();
  alert(data.message);

  if (response.ok) showLogin();
});
