# 🤖 Ai Archaoui

AI Chatbot application built with React and Groq API. Experience fast, free AI conversations with conversation history and mobile-responsive design.

## ✨ Features

- 💬 **Real-time AI Chat** - Powered by Groq API (Mixtral, Llama, Gemma models)
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 💾 **Save Conversations** - Store and load chat history
- 🔄 **Auto-scroll** - Automatically scrolls to new messages
- 🎨 **ChatGPT-like UI** - Clean and modern interface
- 📂 **Conversation History** - Save and manage multiple chats
- ⚡ **Fast & Free** - Uses Groq's free tier (30 requests/minute)

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Groq API** - AI model (Mixtral-8x7b, Llama-3.3-70b)
- **Axios** - HTTP requests
- **CSS3** - Styling with responsive design
- **LocalStorage** - Save chat history

## 🚀 Live Demo

Check out the live application: [Ai Archaoui](https://ai-archaoui.netlify.app)

## 📦 Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/youssef-elarchaoui/ai-archaoui.git

# Navigate to project directory
cd ai-archaoui

# Install dependencies
npm install

# Create .env file with your API key
echo "REACT_APP_GROQ_API_KEY=your_groq_api_key_here" > .env

# Start development server
npm start


🔑 Environment Variables
Create a .env file in the root directory:

env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
Get your free API key from Groq Console

📁 Project Structure
text
ai-archaoui/
├── public/
│   ├── _redirects          # Netlify redirects
│   └── index.html
├── src/
│   ├── assets/             # Images and icons
│   ├── App.jsx             # Main component
│   ├── App.css             # Styles
│   ├── groq.js             # Groq API integration
│   └── index.js            # Entry point
├── .env                    # Environment variables
├── package.json
└── README.md
🎯 Usage
Start a conversation - Type your message in the input field

Save chats - Click "Save Chat" to store current conversation

Load saved chats - Click "Saved" to view and load previous conversations

New chat - Click "New Chat" to start fresh

Mobile - Use the ☰ button to open/close the sidebar

🧠 Available AI Models
The app automatically tries these models in order:

llama-3.3-70b-versatile - Most powerful

llama-3.1-8b-instant - Fastest

gemma2-9b-it - Google's model, good for Arabic

📱 Responsive Design
Device	Breakpoint	Features
Desktop	>1024px	Full sidebar, large text
Tablet	768px-1024px	Adjusted spacing
Mobile	<768px	Collapsible sidebar, optimized fonts
🚢 Deployment
This project is configured for easy deployment on Netlify:

Push code to GitHub

Connect repository to Netlify

Set environment variable REACT_APP_GROQ_API_KEY

Deploy automatically on push

🔧 Troubleshooting
Build fails with ESLint errors
bash
# Add to package.json
"eslintConfig": {
  "extends": ["react-app"],
  "rules": {
    "no-unused-vars": "warn"
  }
}
API key not working
Verify the key starts with gsk_

Check Netlify environment variables

Ensure you have credits on Groq account

Chat not responding
Check console for errors (F12)

Verify internet connection

Wait 30 seconds if rate limited (30 requests/minute)

🤝 Contributing
Contributions are welcome! Feel free to:

Report bugs

Suggest features

Submit pull requests

📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgments
Groq for free AI API

React for the framework

OpenAI for inspiration

📧 Contact
GitHub: youssef el archaoui

Project Link: https://github.com/youssef-elarchaoui/ai-archaoui

Made with ❤️ by Youssef El Archaoui



