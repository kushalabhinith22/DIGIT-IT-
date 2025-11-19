# DIGIT-IT-
EdTech Learning Task Manager

A Role-Based Learning Task Management System for Students & Teachers
Tech Stack: React, Node.js, Express, MongoDB

🚀 Overview

The EdTech Learning Task Manager is a full-stack application built to manage student learning tasks with strict role-based access control. It supports two roles:

Student → Can manage only their own tasks

Teacher → Can view tasks of assigned students + edit/delete only tasks they created

The project follows secure authentication, authorization, validation, error-handling, and best coding practices.

🧩 Features
🔐 Authentication & Authorization

Signup & Login with email + password

Passwords hashed using bcrypt

JWT-based authentication

Secure protected routes using middleware

Role stored as student or teacher

👩‍🏫 Role-Based Access
Role	Access
Student	CRUD only on own tasks
Teacher	View tasks of assigned students, CRUD on tasks created by the teacher
🗃 Database (MongoDB + Mongoose)

Users Collection

email

passwordHash

role: student / teacher

teacherId (mandatory for students)

Tasks Collection

title

description

dueDate

progress

userId (creator)

createdAt

🧾 Backend (Node + Express)

Input validation using Joi / express-validator

Centralized error handling

Clean folder structure (controllers, routes, middleware, models)

🖥 Frontend (React)

Login & Signup pages

Dashboard showing tasks based on role rules

Create, update, delete task

Progress dropdown update

Simple UI with optional Tailwind/Bootstrap

Token stored in localStorage

Logout functionality

Filter tasks by progress

📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/signup	Register user (requires teacherId for students)
POST	/auth/login	Login and receive JWT
Tasks
Method	Endpoint	Description
GET	/tasks	Get tasks by role rules
POST	/tasks	Create a new task
PUT	/tasks/:id	Update task (owner only)
DELETE	/tasks/:id	Delete task (owner only)
🛠 Installation & Setup
✔ Prerequisites

Install the following:

Node.js

MongoDB

Git

VS Code

📥 Clone the Repository
git clone https://github.com/your-username/edtech-task-manager.git
cd edtech-task-manager

📌 Backend Setup (/server)
Install dependencies:
cd server
npm install

Create .env file:
PORT=5000
MONGO_URI=your_mongodb_link
JWT_SECRET=your_jwt_secret

Start backend server:
npm start

🎨 Frontend Setup (/client)
Install dependencies:
cd client
npm install

Start React app:
npm start


Frontend → http://localhost:3000
Backend → http://localhost:5000

🧪 Role Logic Explanation
👩‍🎓 Student Access Rules

Can view only tasks where userId === student._id

Can update or delete only own tasks

👨‍🏫 Teacher Access Rules

Teacher can:

View tasks of assigned students

View tasks created by teacher

Modify only tasks where task.userId === teacher._id

🔍 Query Logic (Backend)

Example GET /tasks logic:

if (role === "student") {
   // Fetch only student’s own tasks
}

if (role === "teacher") {
   // Fetch tasks: created by teacher OR student assigned to teacher
}

🎥 Video Walkthrough Requirements

Your video must show:

Teacher login → viewing tasks of assigned students

Student login → seeing only own tasks

Creating, editing & deleting tasks

Code walkthrough of:

JWT middleware

Role checks

Student–Teacher association

➕ Bonus Features (If implemented)

Date filtering (due this week / overdue)

Pagination for teacher dashboard

Responsive UI using Tailwind/Bootstrap

Deployment on Render

🤖 AI Assistance Disclosure

AI tools (ChatGPT) were used to:

Create README

Structure backend folders

Guides for API and auth design

All logic, coding, debugging, and implementation were done manually by me.

🐞 Known Issues

UI not fully responsive yet

No pagination in teacher view

No global state management (Redux) used

📌 Future Improvements

Add teacher dashboard analytics

Add notifications for overdue tasks

Add ability for teacher to assign tasks to specific students

Replace localStorage with HttpOnly cookies for security
