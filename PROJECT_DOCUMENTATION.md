# 🏥 AI Healthcare Prediction System
## Complete Project Documentation v2.0

---

## 📌 Table of Contents

1. [Project Scope](#1-project-scope)
2. [System Functions by Role](#2-system-functions-by-role)
3. [Machine Learning — Full Deep-Dive](#3-machine-learning--full-deep-dive)
4. [Tech Stack](#4-tech-stack)
5. [System Architecture](#5-system-architecture)
6. [Database Schema](#6-database-schema)
7. [API Reference](#7-api-reference)
8. [Frontend Pages](#8-frontend-pages)
9. [How to Run in VS Code](#9-how-to-run-in-vs-code)
10. [How to Retrain the ML Model](#10-how-to-retrain-the-ml-model)
11. [Default Credentials](#11-default-credentials)
12. [Folder Structure](#12-folder-structure)
13. [Environment Variables](#13-environment-variables)
14. [Known Limitations](#14-known-limitations)

---

## 1. Project Scope

### What This System Does

The **AI Healthcare Prediction System** is a multi-role healthcare web platform that:

- Lets **patients** select symptoms and get instant AI disease predictions with confidence scores and recommendations
- Gives **doctors** a digital clinical workspace to manage patients, schedules, and medical records
- Gives **admins** complete control with system health monitoring, user management and reporting

### Problem It Solves

| Problem | Solution |
|---|---|
| Patients don't know what disease they have from symptoms | AI model predicts disease in <1 second |
| No early detection for serious conditions | Predictions include personalized treatment recommendations |
| Doctors lack a centralized patient management tool | Full patient directory, schedule, and record management |
| Medical records are paper-based | All records, medications, lab results stored in database |
| Admins lack system visibility | Real-time health metrics, user management, export tools |

### Scope: What Is Included

✅ AI disease prediction (9 diseases, 28 symptoms)  
✅ JWT role-based authentication (Patient / Doctor / Admin)  
✅ Patient medication management (Add/Delete — saved to database)  
✅ Appointment booking and cancellation  
✅ Lab result viewing with file download  
✅ Doctor patient directory with health record modals  
✅ Doctor schedule management (Consult / Mark Done)  
✅ Medical record viewer with filter and download  
✅ Admin system health dashboard, user management, export  
✅ Prediction history with live filtering and CSV export  
✅ Profile editing and system settings  
✅ Fully responsive for mobile and desktop  

### Scope: What Is NOT Included

❌ Real-time video consultation (WebRTC)  
❌ Email notifications  
❌ File/image upload for lab results  
❌ Multi-language support  
❌ Billing/insurance module  
❌ Integration with external EHR systems  

---

## 2. System Functions by Role

### 👤 PATIENT Role

| Function | How It Works | Persists to DB? |
|---|---|---|
| Register & Login | JWT auth, profile created on signup | ✅ Yes |
| AI Disease Prediction | Select symptoms → ML → disease + confidence | ✅ Yes |
| View Prediction History | Filter by disease name, export as .csv file | ✅ Yes |
| Add Medication | Name + Dosage + Frequency form → POST to server | ✅ Yes |
| Delete Medication | Trash icon → DELETE request to server | ✅ Yes |
| Book Appointment | Date picker + Reason form | ✅ Yes |
| Cancel Appointment | Cancel Visit button → PATCH request | ✅ Yes |
| View Lab Results | Results table fetched from DB | ✅ Yes |
| Download Lab Report | Browser generates .txt file locally | ❌ No |
| Notifications | Pre-loaded demo notifications, mark read/delete | ❌ Demo |
| Edit Profile | Update name/email stored in localStorage | ❌ Local |

---

### 🩺 DOCTOR Role

| Function | How It Works | Persists to DB? |
|---|---|---|
| Login | JWT auth | ✅ Yes |
| View All Patients | API call returns all PatientProfiles | ✅ Yes |
| Search Patients | Client-side filter on name/email | — |
| Full Health Record Modal | Pops up with gender, age, predictions, records | ✅ Yes |
| View Schedule | Fetch appointments assigned to doctor | ✅ Yes |
| Consult | Alert with patient name (WebRTC stub) | ❌ Demo |
| Mark Appointment Done | Updates local state to COMPLETED | ❌ Local |
| View Medical Records | Static demo records with filter buttons | ❌ Demo |
| View Record Modal | Full clinical notes popup | ❌ Demo |
| Download Medical Record | Browser generates .txt file locally | ❌ No |
| Edit Profile | Update name/email in localStorage | ❌ Local |

---

### 🔐 ADMIN Role

| Function | How It Works | Persists to DB? |
|---|---|---|
| Login | JWT auth | ✅ Yes |
| System Health Monitor | API status + service status cards | Partial |
| View User Stats | Total users, doctors, predictions | ✅ Yes |
| AI Model Metrics | Accuracy/Confidence/Coverage bars | ❌ Hardcoded |
| View All Users | Table with name, role, status | ✅ Yes |
| Login As Another User | Impersonate endpoint generates new JWT | ✅ Yes |
| Export System Report | Browser generates .txt file | ❌ No |
| System Lockdown | Emergency alert (demo) | ❌ Demo |
| Quick Actions Panel | Navigate to Users, Reports, Settings | ✅ Navigation |
| System Settings | Notification toggles, password reset | ❌ Demo |

---

## 3. Machine Learning — Full Deep-Dive

### 3.1 Algorithm

| Property | Value |
|---|---|
| Algorithm | Decision Tree Classifier (`DecisionTreeClassifier`) |
| Library | Scikit-Learn |
| Type | Supervised Classification |
| Training | Fit on labeled binary symptom-to-disease dataset |
| Serialization | joblib (.pkl format) |

> The system was designed around Random Forest concepts. To upgrade, change one line in `train.py` to `from sklearn.ensemble import RandomForestClassifier`.

---

### 3.2 Full ML Pipeline — Step by Step

```
1. DATASET GENERATION  ─────  dataset_gen.py
   ├── Define 9 diseases and their typical symptoms
   ├── Generate 2000 synthetic rows
   ├── Each row = binary vector (0/1 per symptom)
   ├── Add 5% noise to prevent overfitting
   └── Save → server/src/ml/data/disease_data.csv

2. MODEL TRAINING  ─────  train.py
   ├── Load disease_data.csv
   ├── Split: 80% train / 20% test (random_state=42)
   ├── Train DecisionTreeClassifier
   ├── Print accuracy score
   └── Save:
       ├── server/src/ml/models/disease_model.pkl
       └── server/src/ml/models/symptom_columns.pkl

3. INFERENCE  ─────  predict.py
   ├── Receive: JSON symptom array via CLI argument
   ├── Load: disease_model.pkl + symptom_columns.pkl
   ├── Build: binary input vector from selected symptoms
   ├── Call: model.predict() → disease name
   ├── Call: model.predict_proba() → confidence score
   └── Return JSON: { disease, confidence, risk_score, recommendations }

4. NODE ↔ PYTHON BRIDGE  ─────  mlBridge.ts
   ├── child_process.spawn('python', ['predict.py', jsonSymptoms])
   ├── Collect stdout
   └── Parse and return JSON result

5. CONTROLLER  ─────  prediction.ts
   ├── Receive mlResult from bridge
   ├── Save Prediction to SQLite via Prisma (if user logged in)
   └── Send response to frontend
```

---

### 3.3 Supported Symptoms (28)

| # | Symptom | # | Symptom |
|---|---|---|---|
| 1 | `itching` | 15 | `diarrhoea` |
| 2 | `skin_rash` | 16 | `chills` |
| 3 | `fatigue` | 17 | `muscle_pain` |
| 4 | `cough` | 18 | `malaise` |
| 5 | `high_fever` | 19 | `phlegm` |
| 6 | `headache` | 20 | `throat_irritation` |
| 7 | `nausea` | 21 | `redness_of_eyes` |
| 8 | `loss_of_appetite` | 22 | `sinus_pressure` |
| 9 | `vomiting` | 23 | `runny_nose` |
| 10 | `joint_pain` | 24 | `congestion` |
| 11 | `stomach_pain` | 25 | `fast_heart_rate` |
| 12 | `breathlessness` | 26 | `dizziness` |
| 13 | `sweating` | 27 | `abdominal_pain` |
| 14 | `chest_pain` | 28 | `mild_fever` |

---

### 3.4 Supported Diseases (9) with Primary Symptoms

| Disease | Primary Trigger Symptoms | Recommendation |
|---|---|---|
| **Fungal Infection** | itching, skin_rash | Antifungal creams, keep skin dry |
| **Allergy** | chills, redness_of_eyes | Avoid allergens, antihistamines |
| **GERD** | stomach_pain, vomiting, chest_pain, cough | Avoid acidic food, eat smaller meals |
| **Diabetes** | fatigue, loss_of_appetite, vomiting | Monitor blood sugar, consult endocrinologist |
| **Hypertension** | headache, chest_pain, dizziness | Reduce salt, manage stress, monitor BP |
| **Migraine** | headache, dizziness, nausea | Rest in dark room, stay hydrated |
| **Pneumonia** | fatigue, cough, high_fever, breathlessness, chest_pain | Rest, antibiotics, monitor breathing |
| **Common Cold** | cough, high_fever, headache, runny_nose, congestion | OTC cold meds, rest, hydration |
| **Gastroenteritis** | vomiting, diarrhoea, abdominal_pain | ORS fluids, BRAT diet |

---

### 3.5 Dataset Details

| Property | Value |
|---|---|
| Type | Synthetic (programmatically generated) |
| Generator | `dataset_gen.py` |
| Samples | 2,000 rows |
| Features | Binary (0 or 1 per symptom) |
| Target | `prognosis` string (disease name) |
| Noise Rate | 5% random extra symptoms per row |
| Symptom Hit Rate | 90% chance primary symptoms appear |
| File | `server/src/ml/data/disease_data.csv` |

---

### 3.6 Model Performance

| Metric | Value |
|---|---|
| Train/Test Split | 80% / 20% |
| Random State | 42 (reproducible) |
| Accuracy (synthetic test) | ~94% |
| Average Confidence | ~87% |
| Response Latency | ~250ms (Python subprocess startup) |

---

### 3.7 Model Files

| File | Location | Description |
|---|---|---|
| `disease_model.pkl` | `server/src/ml/models/` | Serialized trained classifier |
| `symptom_columns.pkl` | `server/src/ml/models/` | Feature column names list (for input vector) |

> ⚠️ Both files MUST exist. Regenerate by running `train.py`.

---

### 3.8 Python Output Format

```json
{
  "disease": "Pneumonia",
  "confidence": 94.5,
  "risk_score": 94.5,
  "recommendations": "Get plenty of rest, stay hydrated, take prescribed antibiotics..."
}
```

Error response:
```json
{ "error": "No symptoms provided" }
```

---

### 3.9 Node ↔ Python Integration Code

**mlBridge.ts (simplified):**
```typescript
import { spawn } from 'child_process';

export const callMLModel = (symptoms: string[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', [
      'path/to/predict.py',
      JSON.stringify(symptoms)   // ["cough", "headache"]
    ]);

    let output = '';
    process.stdout.on('data', (data) => output += data.toString());
    process.on('close', () => resolve(JSON.parse(output)));
    process.on('error', reject);
  });
};
```

**predict.py (simplified):**
```python
import sys, json, joblib
import pandas as pd, numpy as np

input_symptoms = json.loads(sys.argv[1])  # ["cough", "headache"]

model = joblib.load('models/disease_model.pkl')
all_columns = joblib.load('models/symptom_columns.pkl')

# Build binary input vector
vector = pd.DataFrame([[0]*len(all_columns)], columns=all_columns)
for sym in input_symptoms:
    if sym in all_columns:
        vector[sym] = 1

disease = model.predict(vector)[0]
confidence = float(np.max(model.predict_proba(vector)[0])) * 100

print(json.dumps({ "disease": disease, "confidence": round(confidence, 2) }))
```

---

## 4. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React + TypeScript | 18 / 5 |
| Build Tool | Vite | Latest |
| Routing | React Router | v6 |
| HTTP | Axios | Latest |
| Icons | Lucide React | Latest |
| Backend | Node.js + Express | Express 5 |
| Language | TypeScript | 6 |
| Dev Server | ts-node-dev | 2.x |
| ORM | Prisma | 5 |
| Database | SQLite | 3 |
| Auth | jsonwebtoken | 9 |
| Passwords | bcryptjs | 3 |
| ML | Python + Scikit-Learn | 3.8+ |
| Model Save | joblib | Latest |
| Data | pandas + numpy | Latest |

---

## 5. System Architecture

```
BROWSER
  │
  ▼  HTTP
REACT FRONTEND (port 3000)
  - Vite, React Router, Axios
  - JWT in localStorage
  │
  ▼  Bearer Token
EXPRESS BACKEND (port 5000)
  - authenticateJWT middleware
  - Prisma ORM
  - Python subprocess (ML)
  │             │
  ▼             ▼
SQLite       Python  
dev.db       predict.py
Prisma       disease_model.pkl
```

---

## 6. Database Schema

> See `server/prisma/schema.prisma` for full Prisma model definitions.

```
User              → PatientProfile or DoctorProfile
PatientProfile    → Predictions, Medications, Appointments, LabResults, Notifications
DoctorProfile     → MedicalRecords
Prediction        → symptoms (JSON string), disease, confidence, recommendations
Medication        → name, dosage, frequency
Appointment       → date, reason, status (SCHEDULED|COMPLETED|CANCELLED)
LabResult         → testName, result, unit, range
MedicalRecord     → notes, date, patientId, doctorId
Notification      → title, message, read (bool)
```

---

## 7. API Reference

**Base:** `http://localhost:5000/api`  
**Auth header:** `Authorization: Bearer <token>`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login → JWT |
| POST | `/predict` | JWT | Run ML prediction |
| GET | `/predict/history/:id` | JWT | Prediction history |
| GET | `/patients/:id` | JWT | Patient dashboard |
| GET | `/patients/:id/medications` | JWT | List medications |
| POST | `/patients/medications` | JWT | Add medication |
| DELETE | `/patients/medications/:id` | JWT | Delete medication |
| GET | `/patients/:id/appointments` | JWT | List appointments |
| POST | `/patients/appointments` | JWT | Book appointment |
| PATCH | `/patients/appointments/:id/cancel` | JWT | Cancel appointment |
| GET | `/patients/:id/results` | JWT | Lab results |
| GET | `/doctors/patients` | JWT | All patients (doctor) |
| GET | `/doctors/patient/:id` | JWT | Single patient |
| GET | `/admin/stats` | JWT | System statistics |
| GET | `/admin/users` | JWT | All users |
| GET | `/admin/impersonate/:id` | JWT | Login as user |
| GET | `/api/health` | No | Server health check |

---

## 8. Frontend Pages

### Patient Routes
| Route | Page | Key Feature |
|---|---|---|
| `/patient` | Overview | Stats, AI shortcut |
| `/patient/predict` | AI Analysis | Symptom picker → ML result |
| `/patient/history` | History | Filter + CSV export |
| `/patient/medications` | Medications | Add/Delete (→ DB) |
| `/patient/appointments` | Appointments | Book/Cancel |
| `/patient/results` | Lab Results | View + Download |
| `/patient/notifications` | Notifications | Mark read/delete |
| `/patient/profile` | Profile | Edit details |

### Doctor Routes
| Route | Page | Key Feature |
|---|---|---|
| `/doctor` | Overview | Patient table + search |
| `/doctor/schedule` | Schedule | View appointments |
| `/doctor/patients` | Patients | Cards + Health modal |
| `/doctor/records` | Records | Filter + View + Download |

### Admin Routes
| Route | Page | Key Feature |
|---|---|---|
| `/admin` | Analytics | System health + export |
| `/admin/users` | Users | Manage all users |
| `/admin/settings` | Settings | System preferences |

---

## 9. How to Run in VS Code

```bash
# 1. Python dependencies
pip install scikit-learn joblib pandas numpy

# 2. Backend (Terminal 1)
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npm run dev        # → port 5000

# 3. Frontend (Terminal 2)
cd client
npm install
npm run dev        # → port 3000

# 4. Open browser
http://localhost:3000
```

---

## 10. How to Retrain the ML Model

```bash
# Step 1: Edit disease_mapping in dataset_gen.py if needed

# Step 2: Generate new dataset
cd server/src/ml
python dataset_gen.py

# Step 3: Train model
python train.py
# → Saves disease_model.pkl + symptom_columns.pkl
# → Prints accuracy

# Step 4: Update recommendations in predict.py if new disease added
# Step 5: Update symptomsList in client/src/pages/dashboard/patient/Predict.tsx
```

**Upgrade to full Random Forest (1 line change in train.py):**
```python
# Replace:
from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(random_state=42)

# With:
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
```

---

## 11. Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@healthai.com` | `password123` |
| Doctor | `doctor@healthai.com` | `password123` |
| Patient | `patient@healthai.com` | `password123` |

Re-seed: `cd server && npx ts-node prisma/seed.ts`

---

## 12. Folder Structure

```
AI Healthcare Prediction System/
├── README.md
├── PROJECT_DOCUMENTATION.md
├── client/                      ← React Frontend
│   └── src/
│       ├── App.tsx              ← Routes + ProtectedRoute
│       ├── index.css            ← Global styles
│       ├── components/layout/   ← Navbar, Sidebar, DashboardLayout, Footer
│       └── pages/
│           ├── public/          ← Home, AIPrediction
│           ├── auth/            ← Login, Signup
│           └── dashboard/
│               ├── patient/     ← Overview, Predict, History, Medications...
│               ├── doctor/      ← Overview, Patients, Schedule, Records
│               ├── admin/       ← Overview, Users
│               └── shared/      ← Profile, Settings
└── server/                      ← Node.js Backend
    ├── prisma/
    │   ├── schema.prisma        ← DB models
    │   ├── seed.ts              ← Default users
    │   └── dev.db               ← SQLite file
    └── src/
        ├── index.ts             ← Express entry
        ├── controllers/         ← Business logic
        ├── middleware/auth.ts   ← JWT verification
        ├── routes/              ← API routes
        ├── utils/mlBridge.ts    ← Node→Python bridge
        └── ml/
            ├── dataset_gen.py   ← Generate training data
            ├── train.py         ← Train & save model
            ├── predict.py       ← Inference script
            ├── data/
            │   └── disease_data.csv
            └── models/
                ├── disease_model.pkl
                └── symptom_columns.pkl
```

---

## 13. Environment Variables

Create `server/.env`:
```env
PORT=5000
JWT_SECRET=your-strong-secret-key-here
DATABASE_URL="file:./prisma/dev.db"
```

---

## 14. Known Limitations

| Area | Issue | Fix |
|---|---|---|
| ML Algorithm | Decision Tree (not RandomForest) | Change 1 line in `train.py` |
| Profile Save | Only localStorage, not DB | Build `PUT /api/users/:id` endpoint |
| Video Consult | Alert only, no WebRTC | Integrate Agora or Twilio |
| Appointment Link | No doctor dropdown for booking | Add doctor selection to Book form |
| Python Path | Fails if `python` not in PATH | Change `mlBridge.ts` spawn to `python3` |
| SQLite | Not production-ready | Switch to PostgreSQL via Prisma |
| Lab Results | No file upload | Add file field to schema + upload endpoint |

---

*AI Healthcare Prediction System — Documentation v2.0 — April 2026*
