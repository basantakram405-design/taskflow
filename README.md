# TaskFlow – Full Stack Task Manager

Full Stack app: **React (Vite)** frontend + **Node.js / Express** REST API + **MongoDB** database with **JWT authentication**.

## Features
- Register / Login with hashed passwords (bcrypt) and JWT
- Protected routes (each user sees only their own tasks)
- Full CRUD for tasks (create, list, toggle done, edit, delete)
- Input validation and centralized error handling
- Clean project structure (routes / models / middleware)

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcryptjs |

## Project Structure
```
taskflow/
├── backend/
│   └── src/ (app.js, server.js, config, models, middleware, routes)
└── frontend/
    └── src/ (App.jsx, api.js, pages)
```

## Run Locally

### 1. Backend
```bash
cd backend
cp .env.example .env     # fill MONGO_URI and JWT_SECRET
npm install
npm run dev
```
API runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```
App runs on `http://localhost:5173`.

## REST API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Login, returns token |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/tasks | Yes | List my tasks |
| POST | /api/tasks | Yes | Create task |
| PUT | /api/tasks/:id | Yes | Update task |
| DELETE | /api/tasks/:id | Yes | Delete task |

Send the token as: `Authorization: Bearer <token>`

## Deployment (Live)
1. **Database:** create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas), copy the connection string.
2. **Backend:** deploy `backend/` on [Render](https://render.com) (Web Service). Build: `npm install`, Start: `npm start`. Add env vars `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your frontend URL).
3. **Frontend:** deploy `frontend/` on [Vercel](https://vercel.com) or Netlify. Add env var `VITE_API_URL=https://<your-backend>.onrender.com/api`.

## Live Demo
- Frontend: https://taskflow-app-red-ten.vercel.app/
- API: https://taskflow-api-three-delta.vercel.app
## Author
https://github.com/basantakram405-design
