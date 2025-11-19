DIGIT-IT

A Role-Based Task Management System for Students & Teachers
Tech Stack: React, Node.js, Express, MongoDB

🚀 Overview

The EdTech Learning Task Manager is a full-stack web application designed to manage learning tasks between students and teachers with secure role-based access control.

It supports:

Students → Can manage only their own tasks

Teachers → Can view tasks of assigned students and can modify tasks they personally created

🧩 Features
🔐 Authentication & Authorization

Email + Password Signup/Login

Password Hashing using bcrypt

JWT Authentication with protected routes

Role stored as student or teacher

👩‍🏫 Role-Based Permissions
Role	Permissions
Student	CRUD only on their own tasks
Teacher	View tasks of assigned students + CRUD only on tasks created by teacher
🗃 Database Schema (MongoDB + Mongoose)
Users Collection
Field	Type	Description
email	String	Unique email
passwordHash	String	Hashed password
role	String	student / teacher
teacherId	ObjectId	Required for students
Tasks Collection
Field	Type	Description
title	String	Task title
description	String	Task details
dueDate	Date	Optional due date
progress	String	not-started / in-progress / completed
userId	ObjectId	Creator of task
createdAt	Date	Timestamp
🛠 Backend API (Node + Express)
Auth Routes
Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Login user & return JWT
Task Routes
Method	Endpoint	Description
GET	/tasks	Get tasks based on role rules
POST	/tasks	Create new task
PUT	/tasks/:id	Update task (owner only)
DELETE	/tasks/:id	Delete task (owner only)
🎨 Frontend (React)
Required Pages

Signup Page

Login Page

Dashboard Page

UI Capabilities

View tasks based on role

Add new task

Update task progress

Delete task

Filter tasks (not-started/in-progress/completed)

Show user role

Students see teacher ID

Store JWT in localStorage

Logout button

🛠 Installation & Setup Guide
✔ Prerequisites

Install the following:

Node.js

MongoDB

Git

VS Code

📥 Clone Repository
git clone https://github.com/your-username/edtech-task-manager.git
cd edtech-task-manager

🔧 Backend Setup (server)
Install packages:
cd server
npm install

Create .env:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

Run server:
npm start

💻 Frontend Setup (client)
Install packages:
cd client
npm install

Run frontend:
npm start


Frontend → http://localhost:3000

Backend → http://localhost:5000

🔍 Role Logic Explanation
Student:

Can view only tasks they created

Can update/delete only their own tasks

Teacher:

Can view:

Tasks created by teacher

Tasks of students whose teacherId = teacher._id

Query Logic Example:
if (role === "student") {
    // fetch only student tasks
}

if (role === "teacher") {
    // fetch tasks created by teacher
    // fetch tasks of assigned students
}

🎥 Video Walkthrough Requirements

Your video should show:

Login as student → restricted tasks

Login as teacher → student + teacher tasks

CRUD (create, update, delete task)

Code walkthrough (middlewares, role logic, JWT)

⭐ Optional Bonus Features (If Implemented)

Date filtering (overdue, this week)

Pagination for teacher task list

Responsive UI (Tailwind / Bootstrap)

Deployment on Render

🤖 AI Assistance Disclosure

AI tools were used only for:

README formatting

Guidance and structure

All implementation and debugging were done by me.

🐞 Known Issues

UI not fully responsive

Pagination not added yet

No Redux or global state management

🎯 Future Improvements

Analytics dashboard

Notification system

Teacher assigns tasks to specific students

Use HttpOnly cookies instead of localStorage
