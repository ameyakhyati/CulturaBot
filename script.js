// Get the chatbox, input, and send button elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Get the chat container where messages will be rendered
const chatContainer = document.querySelector(".chat-container");

// Set up the Rasa bot connection
const rasaUrl = 'http://localhost:5002/api'; // Replace with your Rasa bot URL

// Function to send a message to the Rasa bot
async function sendMessage() {
  const userInputValue = userInput.value.trim();
  if (userInputValue !== '') {
    // Render user message
    renderUserMessage(userInputValue);

    // Clear the user's input field
    userInput.value = '';

    // Send the user's message to the Rasa bot
    const response = await fetch(`${rasaUrl}/conversations/default/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInputValue })
    });

    // Get the response from the Rasa bot
    const botResponse = await response.json();

    // Render bot response
    renderBotMessage(botResponse.response);
  }
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
  chatContainer.querySelector("#chatbox").appendChild(userMessageDiv);
  scrollToBottomSmoothly();
}

// Function to render bot messages
function renderBotMessage(message) {
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
  chatContainer.querySelector("#chatbox").appendChild(botMessageDiv);
  scrollToBottomSmoothly();
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
renderBotMessage("Hello, how may I help you?");