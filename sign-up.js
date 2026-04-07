document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the 405 error/refresh

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm-password').value;
  const errorDisplay = document.getElementById('errorMessage');

  // Clear previous errors
  errorDisplay.textContent = "";

  // 1. Username length check
  if (username.length < 3) {
    errorDisplay.textContent = "Username must be at least 3 characters.";
    return;
  }

  // 2. Strong Password check (At least 8 chars)
  if (password.length < 8) {
    errorDisplay.textContent = "Password must be at least 8 characters.";
    return;
  }
  // 2. Strong Password check (At least 8 chars, 1 letter, 1 number)
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

if (!passwordPattern.test(password)) {
  errorDisplay.textContent = "Password must be at least 8 characters and include both a letter and a number.";
  return;
}

  // 3. Confirm Password match
  if (password !== confirm) {
    errorDisplay.textContent = "Passwords do not match.";
    return;
  }

  // SUCCESS: Redirect or Send to Server
  console.log("Validation passed for:", email);
  alert("Account Created Successfully!");
  window.location.href = "startingPage.html"; // Redirect to login
});