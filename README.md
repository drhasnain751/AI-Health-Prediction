# 🏥 AI Healthcare Prediction System

A full-stack healthcare web application with AI-powered disease prediction. Built with **React**, **Node.js**, **Prisma/SQLite**, and a **Python Scikit-Learn Random Forest** ML model.

---

## 🚀 Quick Start (VS Code)

### 1. Install Prerequisites
- [Node.js 18+](https://nodejs.org)
- [Python 3.8+](https://python.org)

### 2. Install Python ML Dependencies
```bash
pip install scikit-learn joblib pandas numpy
```

### 3. Setup Backend
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### 4. Setup Frontend
```bash
cd client
npm install
```

### 5. Run the App (open 2 terminals in VS Code)

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Starts at: http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Starts at: http://localhost:3000
```

### 6. Open in Browser
```
http://localhost:3000
```

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@healthai.com` | `password123` |
| Doctor | `doctor@healthai.com` | `password123` |
| Patient | `patient@healthai.com` | `password123` |

---

## 🤖 How the AI Works

1. Patient selects symptoms from a list
2. React sends symptoms array to `POST /api/predict`
3. Backend spawns a Python subprocess running `predict.py`
4. Python loads the pre-trained `disease_model.pkl` (Random Forest)
5. Model predicts disease + confidence score
6. Result saved to SQLite database and returned to UI

---

## 📁 Project Structure

```
AI Healthcare Prediction System/
├── client/          ← React + TypeScript frontend (Vite)
└── server/          ← Node.js + Express backend
    ├── prisma/      ← Database schema + seed
    └── src/
        ├── ml/      ← Python prediction script + .pkl models
        ├── routes/  ← API routes
        └── controllers/
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, React Router v6 |
| Backend | Node.js, Express 5, TypeScript |
| Database | SQLite via Prisma ORM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| ML | Python, Scikit-Learn Random Forest, joblib |

---

## 📖 Full Documentation
See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for complete API reference, database schema, folder structure, and architecture diagrams.
