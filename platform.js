async function askAI(mode) {
    const outputId = mode === 'farming' ? 'farm-chat' : 'vision-output';
    const outputArea = document.getElementById(outputId);
    
    outputArea.innerHTML = "Processing intelligence...";

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: mode === 'farming' ? "Analyze my soil" : "Generate site vision", 
                mode: mode 
            })
        });

        const data = await response.json();
        outputArea.innerHTML = data.reply;
    } catch (err) {
        outputArea.innerHTML = "Connection error. Is the server running?";
    }
}

// Add this to your home-landing script or a new <script> tag
function startSignIn(event) {
    event.preventDefault(); // Stop the immediate jump
    
    const loader = document.getElementById('auth-loader');
    loader.classList.add('active');

    // Simulate the server checking your credentials
    setTimeout(() => {
        window.location.href = "sign-in.html"; // Redirect after 2 seconds
    }, 2000);
}