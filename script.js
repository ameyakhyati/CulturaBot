// Configuration
const rasaUrl = 'https://your-rasa-server.com/webhooks/rest/webhook'; // Replace with your Rasa URL

const chatbox = document.getElementById('chatbox'); 

// Function to send messages to the chatbot
function sendMessage(message) {
  const request = new XMLHttpRequest();
  request.open('POST', rasaUrl);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.response);
      // Process the chatbot's response 
      displayMessage(response); 
    } else {
      console.error('Error sending message to Rasa');
    }
  };
  request.onerror = function() {
    console.error('Network error');
  };
  const data = JSON.stringify({ message: message });
  request.send(data);
}

// Function to display messages in the chatbox
function displayMessage(response) {
  response.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text; // Assuming 'text' is the Rasa response text
    chatbox.appendChild(messageElement);
  });
}

// Example user input (using a simple button for demonstration)
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', () => {
  const userMessage = document.getElementById('userMessage').value;
  sendMessage(userMessage);
  // Clear the input field
  document.getElementById('userMessage').value = '';
});

const chatBubble = document.querySelector('.chat-bubble'); 

function showChatBubble() {
  chatBubble.style.opacity = 1;
}

function hideChatBubble() {
  chatBubble.style.opacity = 0;
}

// Trigger on events like button click
chatBubble.addEventListener('click', showChatBubble);

const userInput = document.getElementById("userInput");
        
        userInput.addEventListener("focus", function() {
            this.placeholder = " "; // Clear placeholder on focus
          });