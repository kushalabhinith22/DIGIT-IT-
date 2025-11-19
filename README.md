# DIGIT-IT
### A Role-Based Task Management System for Students & Teachers  
**Tech Stack:** React, Node.js, Express, MongoDB  

---

## 🚀 Overview  
The **EdTech Learning Task Manager** is a full-stack web application that enables seamless task management between **students** and **teachers** using **secure role-based access control**.

It supports:

- **Students** → Can manage only their own tasks  
- **Teachers** → Can view tasks of assigned students and modify only tasks they personally created  

---

## 🧩 Features  

### 🔐 Authentication & Authorization  
- Email + Password Signup/Login  
- Password hashing using **bcrypt**  
- JWT-based authentication with protected routes  
- User roles stored as **student** or **teacher**

---

## 👩‍🏫 Role-Based Permissions  

| Role     | Permissions |
|----------|-------------|
| **Student** | CRUD operations on their own tasks only |
| **Teacher** | View tasks of assigned students + CRUD only on tasks created by the teacher |

---

## 🗃 Database Schema (MongoDB + Mongoose)

### **Users Collection**
| Field        | Type      | Description |
|--------------|-----------|-------------|
| email        | String    | Unique email |
| passwordHash | String    | Hashed password |
| role         | String    | student / teacher |
| teacherId    | ObjectId  | Required for students |

### **Tasks Collection**
| Field       | Type      | Description |
|-------------|-----------|-------------|
| title       | String    | Task title |
| description | String    | Task details |
| dueDate     | Date      | Optional |
| progress    | String    | not-started / in-progress / completed |
| userId      | ObjectId  | Creator of the task |
| createdAt   | Date      | Timestamp |

---

## 🛠 Backend API (Node + Express)

### **Auth Routes**
| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | /auth/signup   | Register a new user   |
| POST   | /auth/login    | Login user & return JWT |

### **Task Routes**
| Method | Endpoint        | Description          |
|--------|------------------|----------------------|
| GET    | /tasks           | Get tasks based on role |
| POST   | /tasks           | Create a new task |
| PUT    | /tasks/:id       | Update task (owner only) |
| DELETE | /tasks/:id       | Delete task (owner only) |

---

## 🎨 Frontend (React)

### Required Pages  
- Signup Page  
- Login Page  
- Dashboard Page  

### UI Capabilities  
- View tasks based on user role  
- Add new tasks  
- Update task progress  
- Delete tasks  
- Filter tasks (not-started / in-progress / completed)  
- Show logged-in user’s role  
- Students can view their assigned teacher ID  
- JWT stored in **localStorage**  
- Logout functionality  

---

## 🛠 Installation & Setup Guide  

### ✔ Prerequisites  
Install:  
- Node.js  
- MongoDB  
- Git  
- VS Code  

---

## 📥 Clone Repository  
```bash
git clone https://github.com/your-username/edtech-task-manager.git
cd edtech-task-manager
🔧 Backend Setup (server)
bash
Copy code
cd server
npm install
Create .env file:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
Run server:

bash
Copy code
npm start
💻 Frontend Setup (client)
bash
Copy code
cd client
npm install
npm start
Front-end → http://localhost:3000
Back-end → http://localhost:5000

🔍 Role Logic Explanation
Student
Can view only tasks they created

Can update/delete only their own tasks

Teacher
Can view:

Tasks created by the teacher

Tasks of students whose teacherId = teacher._id

Sample Query Logic:

javascript
Copy code
if (role === "student") {
    // fetch only student tasks
}

if (role === "teacher") {
    // fetch tasks created by teacher
    // fetch tasks of assigned students
}
🎥 Video Walkthrough Requirements
Your video should demonstrate:

Login as student → restricted tasks

Login as teacher → teacher + student tasks

Create, update, delete tasks

Code walkthrough (middlewares, JWT authentication, role logic)

⭐ Optional Bonus Features (If Implemented)
Date filtering (overdue, this week, etc.)

Pagination for teacher tasks

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

No global state management (Redux missing)

🎯 Future Improvements
Analytics dashboard

Notification system

Teacher assigning tasks to specific students

Use HttpOnly cookies instead of localStorage
