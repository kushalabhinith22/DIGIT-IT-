# 🎓 DIGIT - IT Task Manager – Full Stack Assignment

A complete student-teacher task management system built using **Node.js**, **Express**, **MongoDB Atlas**, and **React (Vite)**.  
This project implements authentication, student–teacher relationships, role-based permissions, and task management UI.

---

# 📚 Table of Contents
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Setup Instructions](#setup-instructions)  
- [Role Functionality & Permissions](#role-functionality--permissions)  
- [Video Demo Checklist](#video-demo-checklist)  
- [Known Issues](#known-issues)  
- [Suggestions for Improvement](#suggestions-for-improvement)  
- [AI Assistance Disclosure](#ai-assistance-disclosure)

---

# 📘 Project Overview
The EdTech Task Manager is a platform where:

- **Teachers** can monitor students assigned to them and view all tasks created by those students.  
- **Students** can create and manage their own tasks.  
- The system ensures **proper role-based access**, secure authentication, and clear separation of responsibilities.

This is a compact, functional full-stack project designed per the provided assignment requirements.

---

# ✨ Features

### 👨‍🏫 Teacher Features
- Signup/login with role = teacher  
- Teacher ID is shown upon login  
- Can view:  
  - Own tasks  
  - Tasks created by assigned students  
- Cannot edit/delete student tasks (read-only)

### 🧑‍🎓 Student Features
- Signup/login using a valid **teacher ID**  
- Can create, update, and delete **only their tasks**  
- Cannot view teacher tasks  
- Cannot view tasks of other students

### 🔐 Authentication
- JWT-based login  
- Token persisted in local storage  
- Protected routes on both server & client

### 🗂 Task Management
- Title, description, status  
- CRUD operations  
- Filter tasks by status

---

# 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Axios
- React Router

### **Backend**
- Node.js  
- Express  
- Mongoose (MongoDB Atlas)  
- JWT  
- Bcrypt  

---

# 📁 Folder Structure

\`\`\`
edtech-task-manager/
│
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── pages/   # Login, Signup, Dashboard
│   │   ├── components/
│   │   ├── contexts/AuthContext.jsx
│   │   └── api.js
│   └── package.json
│
├── server/          # Node.js + Express backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/db.js
│   └── server.js
│
├── README.md
└── package.json
\`\`\`

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the repository
\`\`\`
git clone https://github.com/kushalabhinith22/DIGIT-IT-/tree/master
\`\`\`

## 2️⃣ Setup backend (server)
\`\`\`
cd server
npm install
\`\`\`

Create `.env`:
\`\`\`
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
PORT=4000
\`\`\`

Start server:
\`\`\`
npm run dev
\`\`\`

Server runs at:
\`\`\`
http://localhost:4000
\`\`\`

---

## 3️⃣ Setup frontend (client)
\`\`\`
cd ../client
npm install
npm run dev
\`\`\`

Runs at:
\`\`\`
http://localhost:5173
\`\`\`

---

# 🔐 Role Functionality & Permissions

## 👨‍🏫 Teacher
| Action | Allowed |
|--------|---------|
| See own tasks | ✅ |
| See tasks of assigned students | ✅ |
| Edit/delete student tasks | ❌ |
| Edit/delete own tasks | ✅ |
| Create tasks | ✅ |

## 🧑‍🎓 Student
| Action | Allowed |
|--------|---------|
| See own tasks | ✅ |
| Create tasks | ✅ |
| Edit/delete own tasks | ✅ |
| See teacher tasks | ❌ |
| See other students’ tasks | ❌ |

This logic matches the requirements outlined in the assignment PDF.

---

# 🎥 Video Demo Checklist

Your demo video should show:

- Starting backend  
- Starting frontend  
- Teacher signup → teacherId shown  
- Student signup using teacherId  
- Student creates tasks  
- Teacher logs in → sees student tasks  
- Teacher cannot edit/delete student tasks  
- Filters working  
- Summary message  

---

# 🐞 Known Issues
- No pagination for long task lists  
- UI is minimal  
- No dark mode  
- No password reset functionality  

---

# 🚀 Suggestions for Improvement
- Add assignment creation by teachers  
- Add task submission & grading  
- Add pagination and search  
- Add role-based dashboard UI  
- Add push notifications or email alerts  

---

# 🤖 AI Assistance Disclosure
Parts of this project such as structuring, debugging, explanations, and documentation were assisted by AI tools.  
All code has been reviewed and understood before submission.

---

