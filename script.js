// Get the chatbox, input, and send button elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Get the pay and leave buttons
const payBtn = document.getElementById('payBtn');
const leaveBtn = document.getElementById('leave');

// Hide the buttons initially
payBtn.style.display = 'none';
leaveBtn.style.display = 'none';

// User booking details
let userDetails = {
    name: '',
    museum: '',
    date: '',
    visitors: 0,
    email: '',
    phone: ''
};

// Function to show the buttons
function showPaymentButtons() {
    payBtn.style.display = 'block';
    leaveBtn.style.display = 'block';
}

// Function to send a message to the bot
async function sendMessage() {
    const userInputValue = userInput.value.trim();
    if (userInputValue !== '') {
        // Render user message
        renderUserMessage(userInputValue);
        userInput.value = ''; // Clear the user's input field

        // Handle user input
        handleUserInput(userInputValue);
    }
}

// Function to handle user input
function handleUserInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Greetings
    if (["hello", "hi", "hey"].includes(lowerInput)) {
        renderBotMessage("Hello, please enter your email ID to proceed.");
    } else if (validateEmail(input)) {
        userDetails.email = input; // Store the valid email
        renderBotMessage("OTP has been sent to your email ID, please enter it for verification.");
    } else if (input === "otp") { // Simulating OTP entry for simplicity
        renderBotMessage("Authentication completed! Please enter your name and phone number.");
    } else if (userDetails.name === '' && userDetails.phone === '') {
        const parts = input.split(',').map(part => part.trim());
        if (parts.length === 2) {
            userDetails.name = parts[0];
            userDetails.phone = parts[1];
            renderBotMessage(`Great! Here’s your information:\nName: ${userDetails.name}\nEmail: ${userDetails.email}\nPhone: ${userDetails.phone}\nNow, please provide the name of the museum, date of visit, and number of visitors.`);
        } else {
            renderBotMessage("Could you please provide your name and phone number?");
        }
    } else if (userDetails.museum === '' && userDetails.date === '' && userDetails.visitors === 0) {
        const parts = input.split(',').map(part => part.trim());
        if (parts.length === 3) {
            userDetails.museum = parts[0];
            userDetails.date = parts[1];
            userDetails.visitors = parseInt(parts[2], 10);
            renderBotMessage(`Great! You've chosen to visit ${userDetails.museum} on ${userDetails.date} for ${userDetails.visitors} visitors.\nIs all the given information correct?`);
        } else {
            renderBotMessage("Please provide the museum name, date of visit, and number of visitors ");
        }
    } else if (input.toLowerCase() === 'no') {
        renderBotMessage("Which data do you want to update? (name, museum, date, visitors, phone)");
    } else if (input.toLowerCase() === 'yes') {
        renderBotMessage("Great! Would you like to pay?");
        showPaymentButtons(); // Show payment buttons when user confirms
    } else if (lowerInput.includes("is there any good museum around")) {
        // Logic for suggesting museums based on the place
        renderBotMessage("Here are the top museums near you...");
    } else {
        renderBotMessage("I'm sorry, could you rephrase that?");
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to render user messages
function renderUserMessage(message) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.innerHTML = `
        <div class="sender-label">
            <p>User</p>
        </div>
        <div class="message-text">
            <p>${message}</p>
        </div>
    `;
    chatbox.appendChild(userMessageDiv);
    scrollToBottomSmoothly();
}

// Function to render bot messages with a delay
function renderBotMessage(message) {
    // Add a delay before rendering the bot message
    setTimeout(() => {
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("bot-message");
        botMessageDiv.innerHTML = `
            <div class="sender-label">
                <p>Bot</p>
            </div>
            <div class="message-text">
                <p>${message}</p>
            </div>
        `;
        chatbox.appendChild(botMessageDiv);
        scrollToBottomSmoothly();
    }, 2000); // 2-second delay
}

// Function to scroll to the bottom of the chatbox smoothly
function scrollToBottomSmoothly() {
    chatbox.scrollTop = chatbox.scrollHeight;
    chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: 'smooth' });
}

// Add an event listener to the send button
sendBtn.addEventListener('click', sendMessage);

// Add an event listener to the enter key press
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize the chat conversation with a bot message
renderBotMessage("Hello, how can I help you?");
