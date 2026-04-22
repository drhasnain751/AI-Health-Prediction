# 🏥 AI Healthcare Prediction System

A professional MERN-stack platform integrated with Machine Learning to provide predictive healthcare analytics. This system allows patients to predict diseases based on symptoms, doctors to manage patient records, and admins to monitor system-wide AI performance.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ai-health-prediction-system-omega.vercel.app)

## ✨ Key Features

*   **🤖 AI Disease Prediction**: Real-time risk assessment using Random Forest ML models.
*   **👨‍⚕️ Doctor Dashboard**: Manage patient records, appointments, and medical history.
*   **📊 Admin Command Center**: Monitor AI model accuracy, system health, and user growth.
*   **🔒 Secure Auth**: Role-based access control (RBAC) with JWT encryption.
*   **🌓 Dark/Light Mode**: Fully responsive, premium UI design.

## 🚀 Quick Start (Local)

1.  **Clone**: `git clone https://github.com/drhasnain751/AI-Health-Prediction.git`
2.  **Install**: `npm run install:all`
3.  **Setup Database**: `cd server && npx prisma db push && npx prisma db seed`
4.  **Train AI**: `cd server/src/ml && python train.py`
5.  **Run**: `npm run dev` (from root)

## 📚 Detailed Instructions

For a full step-by-step setup guide with screenshots and requirements, please refer to:
👉 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

## 🛠️ Technology Stack

*   **Frontend**: React, Vite, TypeScript, Lucide Icons, CSS3.
*   **Backend**: Node.js, Express, Prisma ORM.
*   **Database**: SQLite (Local) / PostgreSQL (Production).
*   **AI/ML**: Python, Scikit-Learn, Pandas.
*   **Deployment**: Vercel.

---

**Built by [Dr. Hasnain](https://github.com/drhasnain751)**
