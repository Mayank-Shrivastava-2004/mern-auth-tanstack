# 🚀 MERN Authentication with TanStack Query

This project demonstrates a secure **Authentication & Authorization** flow using the MERN stack and **TanStack Query** for efficient server-state management.

---

## ✨ Key Features

- **User Registration** — Secure signup with hashed passwords (bcrypt)
- **Email Verification** — Token-based verification flow to ensure valid users
- **JWT Authorization** — Session management using JSON Web Tokens
- **Protected Routes** — Access to `/profile` is restricted to authenticated users only
- **TanStack Query** — Professional data fetching with automatic caching and loading states

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, TanStack Query, Tailwind CSS, React Router v6 |
| **Backend** | Node.js, Express.js, MongoDB, JWT, Bcrypt |

---

## 📁 Folder Structure

```
mern-auth-tanstack/
├── backend/
│   ├── config/db.js
│   ├── controllers/authController.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── routes/authRoutes.js
│   ├── routes/userRoutes.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/api.js
        ├── hooks/useUserProfile.js
        ├── components/ProtectedRoute.jsx
        └── pages/ (Login · Signup · Profile)
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Mayank-Shrivastava-2004/mern-auth-tanstack.git
cd mern-auth-tanstack
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_secret_key_here
```

---

## 🔗 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/register` | ✗ | Register new user |
| GET | `/api/verify/:token` | ✗ | Verify email |
| POST | `/api/login` | ✗ | Login, returns JWT |
| GET | `/api/profile` | ✓ Bearer | Get logged-in user details |

---

## 🧪 Authentication Flow

```
Register → (auto-verified) → Login → JWT stored in localStorage → /profile (protected)
```
