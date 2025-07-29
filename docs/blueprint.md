# **App Name**: LUNA Chat

## Core Features:

- Greeting Message: Displays LUNA's welcome message upon entering the page to greet the user in Spanish.
- User Input: Text input field where users can type their questions and a send button to submit them.
- Chat Display: Chat-style container to display the conversation, showing both user questions and LUNA's responses.
- API Interaction: Connects to the Gemini API, sends the user's question, and displays the AI's response in the chat container. It also includes a loading indicator while waiting for the response.
- Error Handling: Basic error handling for API connection issues or invalid responses.

## Style Guidelines:

- Use pastel blue (#A3BFFA) as the primary background color.
- Incorporate pastel purple (#B794F4) for interactive elements like buttons and user message bubbles.
- Maintain a clean look with white (#FFFFFF) for text and content containers.
- Add touches of pastel pink (#FBB6CE) for hover effects and highlights to draw attention to key actions.
- Accent color: Use a muted teal (#79D0C3) for the loading indicator and subtle UI enhancements.
- Ensure a responsive layout that adapts to different screen sizes, with a focus on mobile-friendliness.
- Use a clean and minimalist design to ensure readability and focus on the chat interface.
- Add a dark background with minimalistic design such as a grockAI

## Original User Request:
ou are a full-stack web development expert with a strong focus on modern UI/UX design. I need your help to create a fully functional web page that connects to a Google Gemini AI Studio API, where I will deploy an AI called LUNA.

About the AI:

LUNA is a chatbot-style AI similar to ChatGPT or Grok, powered by Gemini and fine-tuned with academic and administrative information relevant to the Universidad Nacional de Colombia.
The web page will communicate directly with the Gemini API: sending user questions and displaying responses on the screen.
Functional Requirements:

The page must be fully prepared to connect to the API (using fetch, axios, or another suitable method to send and receive JSON text).
It should include:
A text input field for the user to type questions.
A send button to submit the question.
A chat-style container to display the conversation (questions and responses).
A login/register button or link in the top-left corner.
The page should handle API requests and responses correctly, displaying a loading indicator while waiting for the AI's response.
Basic error handling should be implemented (e.g., for API connection issues or invalid responses).
Design and User Experience:

The design should be modern, minimalist, responsive, and visually appealing.
Color palette: Use pastel blue (#A3BFFA), pastel purple (#B794F4), white (#FFFFFF), and touches of pastel pink (#FBB6CE).
The layout must be accessible and user-friendly, especially on mobile devices.
The branding should focus on the AI LUNA, with its name prominently displayed in the header or as a logo.
Upon entering the page, LUNA should greet the user in Spanish with a warm, fun, and friendly message (e.g., "¡Hola! Soy LUNA, tu asistente virtual. ¿En qué puedo ayudarte hoy?").
Technical Details:

The page should be built using HTML, CSS, and JavaScript. If you prefer, you can use React for better component organization.
Ensure the code is well-structured, with clear sections or components (if using React).
Leave a placeholder for the Gemini API key (e.g., a variable or environment variable) to be inserted later.
For security, the API key should not be hardcoded in the frontend. Suggest a method to handle it securely (e.g., through environment variables or a backend proxy).
Additional Features:

Implement a loading spinner or indicator while the API processes the request.
Ensure the chat container scrolls to the latest message automatically.
Add basic SEO optimization with appropriate meta tags and semantic HTML.
The page should be responsive and work seamlessly on both desktop and mobile devices.
Important Notes:

You do not need to create the AI itself, only the functional web page that sends questions and displays responses correctly from the API.
The greeting message should appear automatically when the page loads, giving the user a warm welcome.
Ensure the design reflects the identity of LUNA, making it feel like a personal assistant.
Please generate the complete code in HTML, CSS, and JS (or React if preferred), so I have a solid foundation to connect the entire system correctly.

-
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Interactúa con LUNA, tu asistente virtual de la Universidad Nacional de Colombia">
  <title>LUNA - Asistente Virtual</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    body {
      background-color: #FFFFFF;
      color: #333;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background-color: #A3BFFA;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h1 {
      color: #FFFFFF;
      font-size: 1.5rem;
    }
    .login-btn {
      background-color: #B794F4;
      color: #FFFFFF;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
    }
    .login-btn:hover {
      background-color: #FBB6CE;
    }
    main {
      flex: 1;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }
    #chat-container {
      background-color: #F5F5F5;
      border-radius: 10px;
      padding: 1rem;
      height: 60vh;
      overflow-y: auto;
      margin-bottom: 1rem;
    }
    .message {
      margin: 0.5rem 0;
      padding: 0.8rem;
      border-radius: 5px;
      max-width: 80%;
    }
    .user-message {
      background-color: #B794F4;
      color: #FFFFFF;
      margin-left: auto;
    }
    .luna-message {
      background-color: #A3BFFA;
      color: #FFFFFF;
    }
    #input-container {
      display: flex;
      gap: 0.5rem;
    }
    #user-input {
      flex: 1;
      padding: 0.8rem;
      border: 2px solid #A3BFFA;
      border-radius: 5px;
      outline: none;
    }
    #send-btn {
      background-color: #B794F4;
      color: #FFFFFF;
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    #send-btn:hover {
      background-color: #FBB6CE;
    }
    #loading {
      display: none;
      text-align: left;
      color: #B794F4;
      font-style: italic;
    }
    @media (max-width: 600px) {
      main {
        padding: 1rem;
      }
      header h1 {
        font-size: 1.2rem;
      }
      #chat-container {
        height: 50vh;
      }
    }
  </style>
</head>
<body>
  <header>
    <a href="#" class="login-btn">Iniciar Sesión </a>
    <h1>LUNA - Tu asistente para la U </h1>
  </header>
  <main>
    <div id="chat-container">
      <div class="message luna-message">¡Hola! Soy Luna ¿En qué puedo ayudarte hoy?</div>
    </div>
    <div id="input-container">
      <input type="text" id="user-input" placeholder="Escribe tu pregunta aquí...">
      <button id="send-btn">Enviar</button>
    </div>
    <div id="loading">Cargando...</div>
  </main>
  <script>
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const loading = document.getElementById('loading');

    // Placeholder for Gemini API key (AIzaSyCAMkR74KuqQcN0HJyHFUgiwNAAiRM8O24)
    const API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Replace with actual key
    const API_URL = 'https://api.gemini.google.com/v1/chat'; // Adjust URL as per Gemini API docs

    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(isUser ? 'user-message' : 'luna-message');
      messageDiv.textContent = content;
      chatContainer.appendChild(messageDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to latest message
    }

    // Simulate API call (AIzaSyCAMkR74KuqQcN0HJyHFUgiwNAAiRM8O24)
    async function fetchLunaResponse(question) {
      // Mock response for demonstration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Respuesta de LUNA: Me preguntaste "${question}". ¡Estoy aquí para ayudarte!`);
        }, 1000);
      });

      // Uncomment and adjust for real API integration:
      /*
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: question,
          model: 'gemini-luna', // Adjust as per API requirements
        }),
      });
      const data = await response.json();
      return data.response; // Adjust based on actual API response structure
      */
    }

    // Handle sending a question
    sendBtn.addEventListener('click', async () => {
      const question = userInput.value.trim();
      if (!question) return;

      addMessage(question, true);
      userInput.value = '';
      loading.style.display = 'block';

      try {
        const response = await fetchLunaResponse(question);
        addMessage(response);
      } catch (error) {
        addMessage('¡Ups! Algo salió mal. Intenta de nuevo.', false);
        console.error('Error:', error);
      } finally {
        loading.style.display = 'none';
      }
    });

    // Allow sending with Enter key
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });
  </script>
</body>
</html>
  