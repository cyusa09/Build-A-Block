async function start(event) {
    event.preventDefault();
    const btn = document.querySelector('.login');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError("Please fill in all fields.");
        return;
    }

    // Professional Loading State
    btn.disabled = true;
    btn.innerHTML = "Authenticating...";

    try {
        // Send to your Node.js server
        const response = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const result = await response.text();

        if (result.includes("Successful")) {
            // Smooth transition to dashboard
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = "platform.html";
            }, 500);
        } else {
            showError(result);
            btn.disabled = false;
            btn.innerHTML = "Sign In";
        }
    } catch (err) {
        showError("Connection to server failed.");
        btn.disabled = false;
        btn.innerHTML = "Sign In";
    }
}

function showError(msg) {
    const errorBox = document.createElement('div');
    errorBox.style.cssText = "background: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 15px; border-radius: 5px; text-align: center;";
    errorBox.innerText = msg;
    const container = document.querySelector('.sign-in-container');
    container.prepend(errorBox);
    setTimeout(() => errorBox.remove(), 3000);
}
// 1. Standard Sign-In Logic (Email/Password)
async function start(event) {
    event.preventDefault();
    const btn = document.querySelector('.login');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Authenticating...";

    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const result = await response.text();

        if (result.includes("Success")) {
            window.location.href = "platform.html";
        } else {
            alert(result);
            btn.disabled = false;
            btn.innerHTML = "Sign In";
        }
    } catch (err) {
        alert("Server connection failed.");
        btn.disabled = false;
        btn.innerHTML = "Sign In";
    }
}

// 2. Social Sign-In Logic (MUST BE OUTSIDE THE START FUNCTION)
function handleAuth(provider) {
    console.log("Auth started for:", provider);
    
    const loader = document.getElementById('auth-loader');
    if (loader) {
        loader.classList.add('active');
        const statusHeader = loader.querySelector('h2');
        if (statusHeader) statusHeader.innerText = `CONNECTING TO ${provider.toUpperCase()}...`;
    }

    setTimeout(() => {
        const urls = {
            apple: "https://appleid.apple.com/auth/authorize",
            google: "https://accounts.google.com/o/oauth2/auth",
            facebook: "https://www.facebook.com/v11.0/dialog/oauth"
        };

        if (urls[provider]) {
            window.location.href = urls[provider];
        } else {
            if (loader) loader.classList.remove('active');
        }
    }, 2000);
}