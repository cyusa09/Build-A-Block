function apple() {
    // Official Apple ID Authentication endpoint
    const appleAuthUrl = "https://appleid.apple.com/auth/authorize?" + 
        "client_id=com.buildablock.client" + 
        "&redirect_uri=https://buildablock.com/callback" + 
        "&response_type=code";
    
    window.open(appleAuthUrl, "_blank");
}

function google() {
    // Official Google OAuth 2.0 endpoint
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" + 
        "client_id=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com" + 
        "&redirect_uri=https://buildablock.com/callback" + 
        "&response_type=token" + 
        "&scope=email profile";
    
    window.open(googleAuthUrl, "_blank");
}

function facebook() {
    // Official Facebook OAuth 2.0 endpoint
    const facebookAuthUrl = "https://www.facebook.com/v10.0/dialog/oauth?" + 
        "client_id=YOUR_FACEBOOK_APP_ID" + 
        "&redirect_uri=https://buildablock.com/callback" + 
        "&response_type=token" + 
        "&scope=email public_profile";
    
    window.open(facebookAuthUrl, "_blank");
}


function start(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "" || passwordValue === "") {
    alert("Error: Please enter both email and password.");
    return;
  }
  if (!emailPattern.test(emailValue)) {
    alert("Error: Please enter a valid email address (e.g., name@example.com).");
    emailInput.focus();
    return;
  }
  if (passwordValue.length < 6) {
    alert("Error: Password must be at least 6 characters long.");
    return;
  }
  alert("Validation Successful! Checking database for: " + emailValue);

  alert("Sign In Completed!");
  window.location.href = "startingPage.html"; 
}