# Task Manager (MERN Full-Stack Application)

A full-stack Task Manager web application where each user has a secure, private
workspace to manage their daily tasks. Users can register and log in, then create,
edit, complete, delete, search, filter, and sort their tasks, and see live
statistics about their workload.

This is the **Major Project** for the InternsElite Full Stack Web Development &
MERN Stack training program.

## Features

- **Authentication** – register and log in with JWT; passwords hashed with bcrypt
- **Private data** – every user can only see and change their own tasks
- **Task CRUD** – create, read, update, and delete tasks
- **Task details** – title, description, priority (Low / Medium / High), due date
- **Mark complete** – toggle a task between completed and pending
- **Search** – find tasks by title or description
- **Filter** – All / Pending / Completed
- **Sort** – Newest, Oldest, Priority, or Due Date
- **Statistics dashboard** – live Total, Completed, Pending, and Overdue counts
- **Clear completed** – delete all finished tasks at once
- **Toast notifications** for every action and friendly error messages
- **Responsive design** for mobile and desktop

## Tech Stack

**Frontend**
- React (Vite)
- React Router (page navigation)
- Context API + hooks (state management)
- Axios (API calls)
- React Toastify (notifications)

**Backend**
- Node.js + Express.js (REST API)
- MongoDB + Mongoose (database)
- JSON Web Tokens (authentication)
- bcryptjs (password hashing)

**Database**
- MongoDB Atlas (cloud)

## Project Structure

```
MERN_Task_Manager/
├── server/                 # Backend (Node + Express + MongoDB)
│   ├── config/db.js        # Database connection
│   ├── models/             # User and Task schemas
│   ├── middleware/         # JWT auth + error handling
│   ├── controllers/        # Auth and task logic
│   ├── routes/             # API routes
│   └── server.js           # App entry point
└── client/                 # Frontend (React + Vite)
    └── src/
        ├── api.js          # Axios instance (adds the token to requests)
        ├── context/        # AuthContext (who is logged in)
        ├── components/     # Navbar, TaskForm, TaskItem, Stats, ProtectedRoute
        └── pages/          # Login, Register, Dashboard
```

## Setup Instructions (run locally)

### Prerequisites
- Node.js installed
- A free MongoDB Atlas account (for the database connection string)

### 1. Clone the repository
```bash
git clone https://github.com/dhruvvv0913/MERN_Task_Manager.git
cd MERN_Task_Manager
```

### 2. Backend setup
```bash
cd server
npm install
```
Create a file named `.env` inside `server/` with:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_secret
```
Then start the backend:
```bash
npm run dev
```
The API runs at `http://localhost:5000`.

### 3. Frontend setup
Open a second terminal:
```bash
cd client
npm install
```
Create a file named `.env` inside `client/` with:
```
VITE_API_URL=http://localhost:5000/api
```
Then start the frontend:
```bash
npm run dev
```
The app runs at `http://localhost:5173`.

## API Documentation

Base URL: `http://localhost:5000/api`

### Auth routes

| Method | Endpoint         | Body                          | Description                       |
|--------|------------------|-------------------------------|-----------------------------------|
| POST   | `/auth/register` | `{ name, email, password }`   | Create an account, returns a token |
| POST   | `/auth/login`    | `{ email, password }`         | Log in, returns a token            |

A successful response looks like:
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

### Task routes (protected)

All task routes require a header:
```
Authorization: Bearer <token>
```

| Method | Endpoint              | Body                                          | Description                     |
|--------|-----------------------|-----------------------------------------------|---------------------------------|
| GET    | `/tasks`              | –                                             | Get all of the user's tasks     |
| POST   | `/tasks`              | `{ title, description?, priority?, dueDate? }` | Create a new task               |
| GET    | `/tasks/:id`         | –                                             | Get one task by id              |
| PUT    | `/tasks/:id`         | any of the task fields                         | Update a task                   |
| PATCH  | `/tasks/:id/toggle`  | –                                             | Mark a task completed / pending |
| DELETE | `/tasks/:id`         | –                                             | Delete one task                 |
| DELETE | `/tasks/completed`   | –                                             | Delete all completed tasks      |

Only the owner of a task can view, update, or delete it. Requests for another
user's task return `403 Forbidden`.

## Live Demo

- **Frontend (app):** https://mern-task-manager-khaki.vercel.app
- **Backend API:** https://task-manager-api-v663.onrender.com

> Note: the backend is hosted on Render's free tier, which sleeps after periods of
> inactivity. The first request after it has been idle may take ~30-50 seconds to
> wake up; after that it responds normally.
