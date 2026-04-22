# 🏥 AI Healthcare Prediction System - Setup Guide

This guide provides complete instructions on how to set up and run the AI Healthcare Prediction System locally on your machine using VS Code.

---

## 📋 1. Prerequisites

Before starting, ensure you have the following installed:
*   **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
*   **Python** (v3.10 or higher) - [Download here](https://www.python.org/)
*   **VS Code** - [Download here](https://code.visualstudio.com/)
*   **Git** - [Download here](https://git-scm.com/)

---

## 🛠️ 2. Installation Steps

### Step 1: Clone the Repository
Open your terminal or VS Code and run:
```bash
git clone https://github.com/drhasnain751/AI-Health-Prediction.git
cd AI-Health-Prediction
```

### Step 2: Install All Dependencies
We have a master script that installs dependencies for both the **Frontend** and **Backend** at once:
```bash
npm run install:all
```

---

## 🗄️ 3. Database Setup (SQLite & Prisma)

The system uses SQLite, so you don't need to install any heavy database software.

1.  Navigate to the server folder:
    ```bash
    cd server
    ```
2.  Initialize the database and sync the schema:
    ```bash
    npx prisma db push
    ```
3.  Seed the database with test accounts (Admin, Doctor, Patient):
    ```bash
    npx prisma db seed
    ```
4.  Go back to the root:
    ```bash
    cd ..
    ```

---

## 🤖 4. AI Model Setup (Python)

To run the disease prediction engine, you need to install the Python requirements:

1.  Navigate to the ML folder:
    ```bash
    cd server/src/ml
    ```
2.  Install dependencies:
    ```bash
    pip install pandas scikit-learn numpy
    ```
3.  Train the model (Generates the `disease_model.pkl` file):
    ```bash
    python train.py
    ```
4.  Go back to the root:
    ```bash
    cd ../../../
    ```

---

## 🚀 5. Running the Application

You can start both the Frontend (Vite) and Backend (Node) with a single command from the root directory:

```bash
npm run dev
```

*   **Frontend**: [http://localhost:3000](http://localhost:3000)
*   **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 🔑 6. Test Credentials

Once the system is running, you can log in using these pre-seeded accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@healthai.com` | `password123` |
| **Doctor** | `doctor@healthai.com` | `password123` |
| **Patient** | `patient@healthai.com` | `password123` |

---

## 📂 7. Project Structure

*   `/client`: React + Vite + TypeScript (Frontend)
*   `/server`: Node.js + Express + Prisma (Backend)
*   `/server/src/ml`: Python Machine Learning scripts
*   `/public`: Production-ready static assets

---

## ⚠️ Troubleshooting

*   **Port 3000 or 5000 is busy**: Change the ports in `client/vite.config.ts` or `server/src/index.ts`.
*   **Python Command Not Found**: Try using `python3` instead of `python` in the terminal.
*   **Prisma Errors**: Delete the `server/prisma/dev.db` file and run `npx prisma db push` again.

---

**Developed with ❤️ for Modern Healthcare.**
