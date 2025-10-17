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
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let registeredAccounts = JSON.parse(localStorage.getItem("registeredAccounts")) || [];

    const user = registeredAccounts.find(account => account.email === email);

    if (user) {
        if (user.password === password) {
            alert("Login successful!");
            window.location.href = "detail.html";
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else {
        alert("Account not found. Please sign up first.");
        showSignup();
    }
});

// Signup functionality
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const phone = document.getElementById("signup-phone").value;

    let registeredAccounts = JSON.parse(localStorage.getItem("registeredAccounts")) || [];

    // Check email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Check password complexity
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long and include one uppercase letter, one number, and one special character.");
        return;
    }

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Check phone format
    if (!validatePhone(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (registeredAccounts.some(account => account.email === email)) {
        alert("This email is already registered. Please use a different email or log in.");
        return;
    }

    registeredAccounts.push({ email: email, password: password, phone: phone });
    localStorage.setItem("registeredAccounts", JSON.stringify(registeredAccounts));

    alert("Sign up successful! Redirecting to login page...");
    showLogin();
});