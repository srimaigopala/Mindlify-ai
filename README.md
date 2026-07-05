# 🧠 Mindlify AI

Mindlify AI is an AI-powered note-taking application built using the MERN Stack and Google's Gemini AI. It allows users to create, manage, and summarize notes using AI.

## ✨ Features

- User Authentication (JWT)
- Create, View, Edit & Delete Notes
- AI-Powered Note Summarization
- Secure Password Encryption
- Responsive UI

## 🛠️ Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Google Gemini AI

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/srimaigopala/Mindlify-ai.git

# Install frontend
cd client
npm install
npm run dev

# Install backend
cd ../server
npm install
npm run dev
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

## 📌 AI Workflow

```
User → Backend → Gemini AI → AI Summary
```

## 👩‍💻 Author

**Srimai Gopala**

GitHub: https://github.com/srimaigopala
