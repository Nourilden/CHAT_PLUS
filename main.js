let name1;
let email;
let pass;

// Function to handle login submission
function submitLogin() {
  name1 = document.getElementById("login-name").value;
  email = document.getElementById("login-email").value;
  pass = document.getElementById("login-password").value;

  if (name1 && email && pass) {
    // Hide login container and show chat container
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";

    // Greet the user
    appendMessage("bot", `Welcome ${name1}! How can I assist you today?`);
  } else {
    alert("Please fill in all fields.");
  }
}

// Add event listener for pressing "Enter" in the input box
document
  .getElementById("user-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    appendMessage("user", userInput); // Append user message
    generateBotResponse(userInput); // Generate and append bot response
    document.getElementById("user-input").value = ""; // Clear input field
  }
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender}-message`;

  const messageText = document.createElement("span");
  messageText.innerText = message;
  messageElement.appendChild(messageText);

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function generateBotResponse(userInput) {
  let botResponse = "I'm not sure how to respond to that.";

  if (isPythonCode(userInput)) {
    botResponse = executePythonCode(userInput);
  } else if (isEquation(userInput)) {
    botResponse = solveEquation(userInput);
  } else {
    if (userInput.toLowerCase().includes("hello")) {
      botResponse = `Hello ${name1}! How can I assist you today?`;
    } else if (userInput.toLowerCase().includes("how are you")) {
      botResponse = "I'm just a bot, but I'm here to help!";
    } else if (userInput.toLowerCase().includes("what is my email")) {
      botResponse = `Your email is ${email}`;
    } else if (userInput.toLowerCase().includes("what is my password")) {
      botResponse = `Your password is ${pass}`;
    } else if (userInput.toLowerCase().includes("what is my name")) {
      botResponse = `Your name is ${name1}`;
    } else if (userInput.toLowerCase().includes("your name")) {
      botResponse = "I'm your friendly chatbot!";
    } else if (userInput.toLowerCase().includes("bye")) {
      botResponse = "Goodbye! Have a great day!";
    } else if (userInput.toLowerCase().includes("issue")) {
      botResponse = "Please describe your issue, and I'll do my best to help.";
    } else if (userInput.toLowerCase().includes("weather")) {
      botResponse =
        "I'm not connected to the internet, so I can't check the weather right now.";
    } else if (userInput.toLowerCase().includes("joke")) {
      botResponse = "Why don't programmers like nature? It has too many bugs!";
    } else if (userInput.toLowerCase().includes("time")) {
      botResponse = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (userInput.toLowerCase().includes("day")) {
      botResponse = `Today is ${new Date().toLocaleDateString()}.`;
    } else {
      botResponse = handleIssue(userInput);
    }
  }

  appendMessage("bot", botResponse); // Append bot response
}

function isEquation(input) {
  const equationPattern = /^[0-9+\-*/().\s]+$/;
  return equationPattern.test(input);
}

function solveEquation(equation) {
  try {
    const result = eval(equation);
    return `The result is ${result}`;
  } catch (error) {
    return "There was an error solving the equation. Please check your input.";
  }
}

function handleIssue(userInput) {
  let solution =
    "I couldn't quite understand the issue. Could you please provide more details?";

  if (userInput.toLowerCase().includes("password")) {
    solution =
      "If you're having trouble with your password, try resetting it using the 'Forgot Password' option.";
  } else if (userInput.toLowerCase().includes("login")) {
    solution =
      "If you can't log in, make sure your username and password are correct. If you're still having trouble, try clearing your browser's cache.";
  } else if (userInput.toLowerCase().includes("internet")) {
    solution =
      "If you're having internet connectivity issues, try restarting your router or checking your connection settings.";
  } else if (userInput.toLowerCase().includes("error")) {
    solution =
      "If you're seeing an error message, try restarting the application or checking for updates.";
  }

  return solution;
}

function isPythonCode(input) {
  return (
    input.includes("def ") ||
    input.includes("import ") ||
    input.includes("print(")
  );
}

function executePythonCode(code) {
  try {
    const output = eval(`(function() { ${code} })()`);
    return `Code executed successfully. Output: ${output}`;
  } catch (error) {
    return `There was an error executing the Python code: ${error.message}`;
  }
}
