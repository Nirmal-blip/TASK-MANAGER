# 🚀 Task Manager Application (Full Stack)

A production-ready **Task Management Application** built using **React, Node.js, Express, and MongoDB**.  
This app allows users to securely manage their tasks with authentication, CRUD operations, filtering, and pagination.

---

## 🌐 Live Demo

Frontend: https://task-manager-iota-three-72.vercel.app/ 
Backend: https://task-manager-3k8t.onrender.com/

---

## 📂 GitHub Repository

https://github.com/nirmal-blip/task-manager

---

## 🧠 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- HTTP-only cookie storage
- Secure password hashing using bcrypt

### 📋 Task Management
- Create Task
- Read Tasks
- Update Task
- Delete Task

### 🔍 Advanced Functionalities
- Pagination
- Search tasks by title
- Filter tasks by status (pending/completed)

### 🛡️ Security
- Protected routes (backend + frontend)
- User-specific task access
- Secure cookies
- Environment variable protection

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment
- Frontend → Vercel
- Backend → Render / Railway
- Database → MongoDB Atlas

---

## 📁 Project Structure
Task-Manager
│
├── client (React Frontend)
│ ├── src
│ ├── pages
│ ├── components
│ └── services
│
├── server (Express Backend)
│ ├── controllers
│ ├── routes
│ ├── models
│ ├── middleware
│ └── config
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/nirmal-blip/task-manager.git
cd task-manager


## Server Setup
cd server
npm install
## Run Backend
npm run dev

## .env of backend
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development

## client setup

cd client
npm install

## .env of client
VITE_BACKEND_URL=http://localhost:5000

## Run client
npm run dev

```

### 🎯 Functional Flow

Register → Login → Dashboard → Create Task → Update/Delete → Logout


### 🔐 Security Implementation

JWT stored in HTTP-only cookies

Password hashing using bcrypt

Protected routes using middleware

User-specific data access

Environment variables for secrets