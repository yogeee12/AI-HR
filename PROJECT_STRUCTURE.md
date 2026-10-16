# Project Structure and File Snapshot

This document reflects the current state of the `AI-HR` project as of 2026-10-16 and embeds the contents of readable, non-sensitive text files as a point-in-time snapshot.

## Scope and sensitive data

- Backend source files are included except `.env` and `temp.txt`; secret values and data-bearing contents are redacted or omitted.
- Frontend content is limited to the app source under `frontend/AI-HR/src`, plus `index.html`, `package.json`, `README.md`, and the relevant CSS/JS entry files.
- Demo/test fixture data stored under `backend/test_data/` is included as a non-sensitive sample set; `company_data.json` is currently empty and is kept as a placeholder.
- Dependencies in `venv/` and `node_modules/` are excluded from this snapshot.

## Current project overview

The repository is a small FastAPI + MongoDB backend paired with a React + Vite frontend. The backend handles account, profile, and AI-driven candidate evaluation flows, while the frontend manages sign-up, login, profile setup, and interview/question screens.

Key items currently present in the repo:
- Backend auth and token handling in `backend/auth.py` and `backend/main.py`
- Mongo integration in `backend/database.py`
- AI candidate analysis pipeline in `backend/ai_gen_result.py`, `backend/prompt.py`, and `backend/data_extract.py`
- Frontend routing and page composition in `frontend/AI-HR/src/App.jsx`
- New shared layout wrapper in `frontend/AI-HR/src/layouts/MainLayout.jsx`
- Shared frontend API logic in `frontend/AI-HR/src/services/api.js`
- Home-page, navbar, jobs dashboard, and job-post UX in `frontend/AI-HR/src/component/Home.jsx`, `Navbar.jsx`, `JobPostDashboard.jsx`, and `CreateJobPost.jsx`
- UI styling and profile setup flows in `frontend/AI-HR/src/styles/` and `src/component/`
- Demo data and sample account fixtures under `backend/test_data/`

## Directory and file tree

```text
C:\Users\Om\Desktop\AI-HR\
|-- .git/
|-- AI-HR/
|   |-- PROJECT_STRUCTURE.md [this document]
|   |-- backend/
|   |   |-- .env [secret values omitted]
|   |   |-- .gitignore
|   |   |-- __pycache__/
|   |   |-- ai_gen_result.py
|   |   |-- auth.py
|   |   |-- data_extract.py
|   |   |-- database.py
|   |   |-- main.py
|   |   |-- prompt.py
|   |   |-- requirements.txt
|   |   |-- scoring.py
|   |   |-- temp.txt [sensitive content omitted]
|   |   |-- test_data/
|   |   |   |-- ac_login.json
|   |   |   |-- candidate_data.json
|   |   |   `-- company_data.json
|   |   |-- test_jwt.py
|   |   `-- ...
|   `-- frontend/
|       `-- AI-HR/
|           |-- .gitignore
|           |-- README.md
|           |-- eslint.config.js
|           |-- index.html
|           |-- package-lock.json
|           |-- package.json
|           |-- vite.config.js
|           |-- public/
|           |   |-- favicon.svg
|           |   `-- icons.svg
|           `-- src/
|               |-- App.css
|               |-- App.jsx
|               |-- index.css
|               |-- main.jsx
|               |-- assets/
|               |   |-- hero.png
|               |   |-- react.svg
|               |   `-- vite.svg
|               |-- component/
|               |   |-- Home.jsx
|               |   |-- JobPostDashboard.jsx
|               |   |-- LoginAs.jsx
|               |   |-- Navbar.jsx
|               |   |-- Questions.jsx
|               |   |-- candidate/
|               |   |   |-- CandidateProfile.jsx
|               |   |   |-- CandidateProfileSetUp.jsx
|               |   |   `-- CandidateSignUp.jsx
|               |   `-- company/
|               |       |-- CompanyProfile.jsx
|               |       |-- CompanyProfileSetUp.jsx
|               |       |-- CompanySignUp.jsx
|               |       `-- CreateJobPost.jsx
|               |-- layouts/
|               |   `-- MainLayout.jsx
|               |-- services/
|               |   `-- api.js
|               `-- styles/
|                   |-- LoginAs.css
|                   |-- candidate_form.css
|                   |-- creat_job_post.css
|                   |-- home.css
|                   |-- navbar.css
|                   `-- profile_setup.css
|-- venv/ [excluded from snapshot]
`-- frontend/AI-HR/node_modules/ [excluded from snapshot]
```

## Text file contents

### `backend/.gitignore`

```text
.env
/__pycache__
test.py
```

### `frontend/AI-HR/README.md`

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

### `backend/test_data/ac_login.json`

```json

[
  {
    "user_name": "rahulsh12",
    "name": "Rahul Sharma",
    "email": "rahul01@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "priyaverma",
    "name": "Priya Verma",
    "email": "priya02@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "arjunpatel",
    "name": "Arjun Patel",
    "email": "arjun03@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "snehagupta",
    "name": "Sneha Gupta",
    "email": "sneha04@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "amansingh",
    "name": "Aman Singh",
    "email": "aman05@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "nehajoshi",
    "name": "Neha Joshi",
    "email": "neha06@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "rohanmehta",
    "name": "Rohan Mehta",
    "email": "rohan07@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "ananyarao",
    "name": "Ananya Rao",
    "email": "ananya08@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "vikramyadav",
    "name": "Vikram Yadav",
    "email": "vikram09@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "poojanair",
    "name": "Pooja Nair",
    "email": "pooja10@test.com",
    "password": "Test@12345",
    "role": "candidate"
  },
  {
    "user_name": "novatechlabs",
    "name": "NovaTech Labs",
    "email": "company01@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "bluepeak",
    "name": "BluePeak Software",
    "email": "company02@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "datasphereai",
    "name": "DataSphere AI",
    "email": "company03@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "cloudnest",
    "name": "CloudNest Systems",
    "email": "company04@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "bytecraft",
    "name": "ByteCraft Solutions",
    "email": "company05@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "greengrid",
    "name": "GreenGrid Tech",
    "email": "company06@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "finedge",
    "name": "FinEdge Analytics",
    "email": "company07@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "pixelwave",
    "name": "PixelWave Studio",
    "email": "company08@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "securestack",
    "name": "SecureStack Labs",
    "email": "company09@test.com",
    "password": "Test@12345",
    "role": "company"
  },
  {
    "user_name": "orbitworks",
    "name": "OrbitWorks",
    "email": "company10@test.com",
    "password": "Test@12345",
    "role": "company"
  }
]
```

### `backend/test_data/candidate_data.json`

```json

[
  {
    "account_id": null,
    "user_name": "rahulsh12",
    "name": "Rahul Sharma",
    "email": "rahul01@test.com",
    "headline": "Backend developer interested in API development",
    "bio": "Entry-level backend developer interested in building scalable APIs and database-driven applications.",
    "skills": ["Python", "FastAPI", "PostgreSQL", "REST API", "Git"],
    "experience_years": 1,
    "education": "BCA",
    "target_role": "Python Backend Developer",
    "location": "Indore, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "priyaverma",
    "name": "Priya Verma",
    "email": "priya02@test.com",
    "headline": "Frontend developer focused on user experience",
    "bio": "Frontend developer who enjoys building responsive and accessible web interfaces.",
    "skills": ["React", "JavaScript", "HTML", "CSS", "Git"],
    "experience_years": 2,
    "education": "B.Tech Computer Science",
    "target_role": "Frontend Developer",
    "location": "Bhopal, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "arjunpatel",
    "name": "Arjun Patel",
    "email": "arjun03@test.com",
    "headline": "Aspiring data analyst",
    "bio": "Interested in data cleaning, exploratory analysis, reporting, and business insights.",
    "skills": ["Python", "Pandas", "NumPy", "SQL", "Matplotlib"],
    "experience_years": 0,
    "education": "B.Sc Statistics",
    "target_role": "Data Analyst",
    "location": "Indore, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "snehagupta",
    "name": "Sneha Gupta",
    "email": "sneha04@test.com",
    "headline": "Machine learning enthusiast",
    "bio": "Interested in predictive modelling, feature engineering, and practical ML applications.",
    "skills": ["Python", "Scikit-learn", "SQL", "Pandas", "Machine Learning"],
    "experience_years": 1,
    "education": "B.Tech Information Technology",
    "target_role": "ML Engineer",
    "location": "Pune, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "amansingh",
    "name": "Aman Singh",
    "email": "aman05@test.com",
    "headline": "Java backend developer",
    "bio": "Builds server-side applications and works with relational databases and REST services.",
    "skills": ["Java", "Spring Boot", "MySQL", "REST API", "Docker"],
    "experience_years": 3,
    "education": "B.Tech Computer Science",
    "target_role": "Java Developer",
    "location": "Bengaluru, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "nehajoshi",
    "name": "Neha Joshi",
    "email": "neha06@test.com",
    "headline": "React frontend developer",
    "bio": "Focused on component-based UI development, responsive layouts, and frontend integration.",
    "skills": ["React", "JavaScript", "CSS", "HTML", "REST API"],
    "experience_years": 2,
    "education": "BCA",
    "target_role": "Frontend Developer",
    "location": "Mumbai, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "rohanmehta",
    "name": "Rohan Mehta",
    "email": "rohan07@test.com",
    "headline": "Python and Django developer",
    "bio": "Interested in backend development, authentication, and reliable web applications.",
    "skills": ["Python", "Django", "REST API", "PostgreSQL", "Git"],
    "experience_years": 1,
    "education": "B.Tech Information Technology",
    "target_role": "Python Developer",
    "location": "Ahmedabad, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "ananyarao",
    "name": "Ananya Rao",
    "email": "ananya08@test.com",
    "headline": "Data analyst interested in business intelligence",
    "bio": "Enjoys transforming raw data into understandable reports and dashboards.",
    "skills": ["SQL", "Excel", "Power BI", "Python", "Data Visualization"],
    "experience_years": 0,
    "education": "B.Com",
    "target_role": "Data Analyst",
    "location": "Hyderabad, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "vikramyadav",
    "name": "Vikram Yadav",
    "email": "vikram09@test.com",
    "headline": "DevOps engineer focused on cloud infrastructure",
    "bio": "Interested in infrastructure automation, containerization, monitoring, and deployment.",
    "skills": ["Linux", "Docker", "AWS", "CI/CD", "Git"],
    "experience_years": 4,
    "education": "B.Tech Computer Science",
    "target_role": "DevOps Engineer",
    "location": "Gurugram, India",
    "resume_url": null,
    "profile_completed": true
  },
  {
    "account_id": null,
    "user_name": "poojanair",
    "name": "Pooja Nair",
    "email": "pooja10@test.com",
    "headline": "AI engineer interested in language models",
    "bio": "Explores natural language processing and practical AI-powered applications.",
    "skills": ["Python", "NLP", "Transformers", "PyTorch", "Machine Learning"],
    "experience_years": 2,
    "education": "M.Sc Computer Science",
    "target_role": "AI Engineer",
    "location": "Chennai, India",
    "resume_url": null,
    "profile_completed": true
  }
]
```

### `backend/test_data/company_data.json`

```json

```

### `frontend/AI-HR/src/styles/profile_setup.css`

```css

/* ===== Shared Profile Setup Page ===== */

.candidate-profile-setup,
.company-profile-setup-page {
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
}

/* ===== Form Cards ===== */

.candidate-profile-setup form,
.company-profile-setup-form {
    width: 100%;
    max-width: 620px;
    box-sizing: border-box;
    padding: 36px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e5eaf2;
    border-radius: 16px;
    box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
}

/* ===== Page Headings ===== */

.candidate-profile-setup form::before {
    content: "Build your candidate profile";
    display: block;
    margin-bottom: 8px;
    color: #172554;
    font-size: 27px;
    font-weight: 700;
}

.company-profile-setup-form::before {
    content: "Set up your company profile";
    display: block;
    margin-bottom: 8px;
    color: #172554;
    font-size: 27px;
    font-weight: 700;
}

/* ===== Labels ===== */

.candidate-profile-setup label,
.company-profile-setup-form label {
    margin: 18px 0 8px;
    color: #334155;
    font-size: 14px;
    font-weight: 600;
}

/* ===== Inputs and Textareas ===== */

.candidate-profile-setup input,
.candidate-profile-setup textarea,
.company-profile-setup-form input,
.company-profile-setup-form textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background: #ffffff;
    color: #0f172a;
    font-family: inherit;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.candidate-profile-setup input,
.company-profile-setup-form input {
    min-height: 46px;
}

.candidate-profile-setup textarea,
.company-profile-setup-form textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
}

/* Placeholder text */

.candidate-profile-setup input::placeholder,
.candidate-profile-setup textarea::placeholder,
.company-profile-setup-form input::placeholder,
.company-profile-setup-form textarea::placeholder {
    color: #94a3b8;
}

/* Focus effect */

.candidate-profile-setup input:focus,
.candidate-profile-setup textarea:focus,
.company-profile-setup-form input:focus,
.company-profile-setup-form textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* ===== Submit Buttons ===== */

.candidate-profile-setup button,
.company-profile-setup-form button {
    width: 100%;
    min-height: 48px;
    margin-top: 28px;
    padding: 12px 18px;
    border: none;
    border-radius: 9px;
    background: #2563eb;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.candidate-profile-setup button:hover,
.company-profile-setup-form button:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
}

.candidate-profile-setup button:active,
.company-profile-setup-form button:active {
    transform: translateY(0);
}

/* ===== Mobile Layout ===== */

@media (max-width: 600px) {
    .candidate-profile-setup,
    .company-profile-setup-page {
        padding: 24px 14px;
        align-items: flex-start;
    }

    .candidate-profile-setup form,
    .company-profile-setup-form {
        padding: 24px 20px;
        border-radius: 12px;
    }

    .candidate-profile-setup form::before,
    .company-profile-setup-form::before {
        font-size: 23px;
    }
}
```

### `backend/auth.py`

```python
from jose import jwt
from datetime import datetime, timedelta, timezone
import os

# JWT settings
SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "dev-only-change-this-secret-key"
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create a token for a logged-in account
def create_access_token(account_id: str, role: str):

    # Calculate the expiration time
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Information stored inside the token
    payload = {
        "sub": account_id,
        "role": role,
        "exp": expire
    }

    # Sign the token
    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token
```

### `backend/ai_gen_result.py`

```python
import os

from dotenv import load_dotenv
from google import genai
import json
from prompt import RESP
from data_extract import get_questions, get_answers

load_dotenv()
def analyze_candidate(company, candidate, job):
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    models = os.getenv("MODELS").split(",")
    for mod in models:
        try:
            response = client.models.generate_content(
                model = mod,
                contents=f"""
                You are an experienced HR and technical interviewer.

                Analyze whether the candidate is suitable for the company's available
                job/project based on the information provided.

                
                COMPANY INFORMATION:
                {company}
                
                JOB INFORMATION:
                {job}

                CANDIDATE INFORMATION:
                {candidate}

                {RESP}
                """
                )
            if response and response.text:
                str_data = response.text
                str_data = str_data.replace("```json", "").replace("```", "").strip()
                data = json.loads(str_data)
                        
                return {
                    "data" : data,
                    "get_questions" : get_questions(data),
                    "get_answers" : get_answers(data)
                }
                
        except Exception as e:
            print("ERROR : ", e)
            continue
        
    print("CRITICAL: All configured Gemini models failed.")
    return {
        "data": {},
        "get_questions": [],
        "get_answers": []
    }
```

### `backend/data_extract.py`

```python
def get_questions(data):

    questions = data["questions"]
    result = []
    for ques in questions:
        option = ques["options"] 
        result.append({
            "question_id" : ques["question_id"],
            "question" : ques["question"],
            "option_1" : option[0],
            "option_2" : option[1],
            "option_3" : option[2],
            "option_4" : option[3]
        },)

    return result

def get_answers(data):
    questions = data["questions"]
    result = []
    for ques in questions:
        option = ques["options"]
        result.append({
            "question_id" : ques["question_id"],
            "correct_option_id" : ques["correct_option"],
            "options" : {
                "0" : option[0],
                "1" : option[1],
                "2" : option[2],
                "3" : option[3]
            },
            "correct_option" : option[int(ques["correct_option"])]
        },)

    return result
```

### `backend/database.py`

```python
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client.get_default_database()

companies_collections = db["companies"]
candidates_collections = db["candidates"]
interview_collections = db["interview"]
accounts_collections = db["accounts"]
job_collection = db["job_details"]
```

### `backend/main.py`

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from ai_gen_result import analyze_candidate
from database import candidates_collections, companies_collections, accounts_collections, job_collection, interview_collections
from jose import jwt , JWTError
from auth import SECRET_KEY, ALGORITHM, create_access_token
from datetime import datetime
from scoring import question_update, score_candidate

app = FastAPI()

security = HTTPBearer()

# check user token and get urrent account token
def get_current_account(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        account_id = payload.get("sub")
        role = payload.get("role")

        if not account_id or role not in ["candidate", "company"]:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return {
            "account_id": account_id,
            "role": role
        }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():

    return {"message" : "AI HR API is running"}

# Company APIs
# get company sign up detail ans save in db 
@app.post("/company-signup")
def receive_company_detail(companyDetail : dict):    
    result = accounts_collections.insert_one(companyDetail)
    return {
        "success" : True,
        "message" : "Company Detail Received",
        "company_id" : str(result.inserted_id)
    }
    
# get company profile detail and save in db
@app.post("/company-profile-setup")
def receive_company_profile(companyProfile : dict):
    if not companyProfile.get("account_id"):
        raise HTTPException(
            status_code=400,
            detail="account_id is required"
        )
    
    result = companies_collections.insert_one(companyProfile)
    
    return {
        "success" : True,
        "message" : "Company Profile Received",
        "company_id" : str(result.inserted_id)
    }
    
# Candidate APIs
# get candidate sign up detail and save in db
@app.post("/candidate-signup")
def receive_candidate(candidate : dict):
    result = accounts_collections.insert_one(candidate)
    
    return {
        "success" : True,
        "message" : "Candidate recevied",
        "candidate_id" : str(result.inserted_id)
    }
    
# get candidate profile detail and save in db
@app.post("/candidate-profile-setup")
def receive_candidate_profile(candidateProfile : dict):
    if not candidateProfile.get("account_id"):
        raise HTTPException(
            status_code=400,
            detail="account_id is reqiured"
        )
    
    result = candidates_collections.insert_one(candidateProfile)
    
    return {
        "success" : True,
        "message" : "Candidate Profile Received",
        "candidate_id" : str(result.inserted_id)
    } 
        
# Question Answer APIs
# Get answer from frontend
@app.post("/answers")
def get_answers(answers: dict):
    
    interview_id = ObjectId(answers["interview_id"])
    candidate_answers = answers["answers"]
    
    interview_answers = interview_collections.find_one({
        "_id" : interview_id
    })
    
    correct_answer = interview_answers["correct_answer"]
    score_candidate(
        interview_id=interview_id,
        candidate_answers=candidate_answers,
        correct_answers=correct_answer,
        )
    
    print(answers)
    return{
        "success" : True,
        "answers" : answers
    }
    
# send questions to frontend
@app.get("/start-interview/{interview_id}")
def start_interview(
    interview_id : str,
    current_account : dict= Depends(get_current_account)
):
    
    if current_account["role"] != "candidate":
        raise HTTPException(
            status_code=403,
            detail="Only candidate can apply!"
        )
        
    if not ObjectId.is_valid(interview_id):
        raise HTTPException(
            status_code=400,
            detail="invalid interview ID"
        )
        
    interview = interview_collections.find_one({
        "_id" : ObjectId(interview_id),
        "candidate_id" : current_account["account_id"]
    }) 
    
    if not interview:
        raise HTTPException(
            status_code=404,
            detail = "Interview not found"
        )
        
    company = companies_collections.find_one({
        "account_id" : interview["company_id"],
    })

    candidate =  candidates_collections.find_one({
        "account_id" : current_account["account_id"]  
    }) 
    
    job = job_collection.find_one({
        "_id" : ObjectId(interview["job_id"])
    })
    
    if not company or not candidate or not job:
        raise HTTPException(
            status_code=404,
            detail="company, candidate or job details not found"
        )
    result = analyze_candidate(company=company, candidate=candidate, job=job)
    questions = result["get_questions"]
    correct_answers = result["get_answers"]
    
    question_update(
        interview_id=interview_id, 
        questions=questions,
        answer=correct_answers
        )
    
    
    return {
        "success" : True,
        "questions" : questions 
    }

# Job APIs
@app.post("/job-details")
def get_job_details(
    jobDetails: dict,
    account: dict = Depends(get_current_account)):
    
    if account["role"] != "company":
        raise HTTPException(
            status_code = 403,
            detail = "Only companies can post jobs"
        )
        
    company = companies_collections.find_one({
        "account_id" : account["account_id"]
    })
    
    if not company:
        raise HTTPException(
            status_code = 404,
            detail="Compnay Profile Not found!"
        )
        
    jobDetails["company_id"] = account["account_id"]
    jobDetails["company_name"] = company["company_name"]
    
    jobDetails["posted_by"] = company.get("username","")
    
    result = job_collection.insert_one(jobDetails)
    
    return {
        "success" : True,
        "result" : str(result.inserted_id)
    }
    
@app.get("/job_dashboard")
def get_all_jobs():
    
    all_jobs = list(job_collection.find())
    
    for job in all_jobs:
        job["_id"] = str(job["_id"])     
        
    return all_jobs

@app.post("/apply-job")
def get_job_round_data(
    job_data : dict,
    current_account : dict = Depends(get_current_account)):
    
    if current_account["role"] != "candidate":
        raise HTTPException(
            status_code=403,
            detail="Only candidate can apply for jobs"
        )
        
    job_id = job_data.get("job_id")
    
    if not job_id:
        raise HTTPException(
            status_code=400,
            detail = "Job ID is required"    
        )
        
        
    # Check whether it is a valid MongoDB ObjectId
    if not ObjectId.is_valid(job_id):
        raise HTTPException(
            status_code=403,
            detail="Invalid job ID"
        )
    job_detail = job_collection.find_one({"_id" : ObjectId(job_id)})
    
    if not job_detail:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
    )
    
    job_detail["_id"] = str(job_detail["_id"])
    
    existing_interview = interview_collections.find_one({
        "candidate_id" : current_account["account_id"],
        "job_id" : job_detail["_id"]
    })
    
    if existing_interview:
        raise HTTPException(
            status_code = 409,
            detail = "You have already applied for job",
        )
    interview_data = {
        "candidate_id" : current_account["account_id"],
        "company_id" : job_detail["company_id"],
        "job_id" : job_detail["_id"],
        
        "status" : "applied",
        "result" : None,
        
        "created_at" : datetime.now(),
        "started_at" : None,
        "completed_at" : None,
        
        "questions" : [], 
        "correct_answer" : [],
        "total_questions" : 0,
        
        "score_board" : [],
        "correct_answers_no" : 0,
        "total_score" : 0
    }
    
    saved_interview = interview_collections.insert_one(interview_data)
    
    return {
        "success" : True,
        "messege" : "Job found Successfully",
        "interview_id" : str(saved_interview.inserted_id),
        "job" : job_detail,
        "candidate_id" : current_account["account_id"]
    }

# Login and Profile APIs
@app.post("/login-as")
def login_data(login_data: dict):

    user = accounts_collections.find_one({
        "email": login_data["email"]
    })

    if not user:
        return {
            "success": False,
            "message": "User Not Found"
        }

    if user["role"] != login_data["role"]:
        return {
            "success": False,
            "message": f"User is not registered as a {login_data['role']}"
        }

    if user["password"] != login_data["password"]:
        return {
            "success": False,
            "message": "Invalid Password"
        }

    # Create JWT after successful login verification
    token = create_access_token(
        account_id=str(user["_id"]),
        role=user["role"]
    )

    # Return safe user information (never return the password)
    return {
        "success": True,
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "user_name": user.get("user_name"),
            "name": user.get("name"),
            "role": user["role"],
            "email": user["email"]
        }
    }

@app.get("/my-profile")
def get_my_profile(account: dict = Depends(get_current_account)):
    account_id = account["account_id"]
    role = account["role"]
    
    if role == "candidate":
        profile = candidates_collections.find_one({"account_id" : account_id})
    else:
        profile = companies_collections.find_one({"account_id" : account_id})
        
    if not profile:
        raise HTTPException(
            status_code = 404,
            detail = "Profile Not found . Please complete profile setup"
        )
    
    profile["_id"] = str(profile["_id"])
    
    return profile
```

### `backend/prompt.py`

```python
RESP = """"You are an AI technical screening interviewer.

Your task is to generate a short technical screening test for a candidate.

Based on the company project, required role, required skills, and candidate information, generate EXACTLY 5 multiple-choice questions.

RULES:

1. Generate exactly 5 questions.
2. Each question must have exactly 4 options.
3. Each question must have exactly 1 correct option.
4. Questions must be relevant to the matched job role and required skills.
5. Questions should test basic practical understanding suitable for an initial screening round.
6. Do not generate extremely difficult questions.
7. Do not repeat questions.
8. Do not include explanations.
9. Do not include information outside the JSON.
10. Return ONLY valid JSON.
11. The correct answer must be represented by its option index:
   0 = first option
   1 = second option
   2 = third option
   3 = fourth option.

Return exactly this structure:

{
  "questions": [
    {
      "question_id": "q1",
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_option": A
    },
    {
      "question_id": "q2",
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_option": B
    },
    {
      "question_id": "q3",
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_option": C
    },
    {
      "question_id": "q4",
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_option": D
    },
    {
      "question_id": "q5",
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_option": A
    }
  ]
}
"""
```

### `backend/scoring.py`

```python
from bson import ObjectId
from database import interview_collections
from datetime import datetime
from data_extract import get_answers, get_questions

def question_update(interview_id, questions, answer):
  if not interview_id:
    return False
  
  total_question = len(questions)
  
  interview_filter = {
    "_id" : ObjectId(interview_id)
  }
  
  updates = {
    "$set" : {
      "questions" : questions,
      "started_at" : datetime.now(),
      "total_questions" : total_question,
      "correct_answer" : answer
    }
  }
  
  interview_collections.update_one(
    interview_filter,
    updates
    )
  
  return True
  

def score_candidate(interview_id, candidate_answers, correct_answers):
    if not candidate_answers or not correct_answers:
        return False

    total_score = 0
    correct_count = 0
    score_board = []

    # Convert the submitted answers into a dictionary:
    # {"q1": 1, "q2": 3, ...}
    
    answers_by_question = {
        question_id: int(selected_option)
        for question_id , selected_option in candidate_answers.items()
    }

    for question in correct_answers:
        question_id = question["question_id"]

        # Skip questions the candidate didn't answer
        if question_id not in answers_by_question:
            continue

        selected_option = answers_by_question[question_id]

        # Your options are indexed from 0 to 3
        selected_index = selected_option - 1
        is_correct = (
            question["correct_option_id"] == selected_index
        )

        score = 10 if is_correct else 0

        if is_correct:
            correct_count += 1

        total_score += score

        score_board.append({
            question_id: {
                "correct_answer": question["correct_option"],
                "user_answer": question["options"][str(selected_index)],
                "answer": is_correct,
                "score": score
            }
        })

    interview_filter = {
        "_id": ObjectId(interview_id)
    }

    updates = {
        "$set": {
            "status" : "completed",
            "result":  "Pass" if total_score > 20 else "Fail",
            "score_board": score_board,
            "total_score": total_score,
            "correct_answers_no": correct_count,
            "completed_at": datetime.now()
        }
    }

    result = interview_collections.update_one(
        interview_filter,
        updates
    )

    if result.matched_count == 0:
        return False

    return True
```

### `backend/test_jwt.py`

```python
from auth import create_access_token

token = create_access_token(
    account_id="test_account_123",
    role="candidate"
)

print("Generated JWT:")
print(token)
```

### `frontend/AI-HR/package.json`

```json
{
  "name": "ai-hr",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "vite": "^8.3.0"
  }
}
```

### `frontend/AI-HR/.gitignore`

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### `frontend/AI-HR/eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

### `frontend/AI-HR/vite.config.js`

```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### `frontend/AI-HR/src/App.jsx`

```jsx
import CandidateProfile from "./component/candidate/CandidateProfile"
import CandidateProfileSetUp from "./component/candidate/candidateProfileSetUp"
import CompanyProfile from "./component/company/CompanyProfile"
import CompanyProfileSetUp from "./component/company/CompanyProfileSetUp"
import Home from "./component/Home"
import LoginAs from "./component/LoginAs"
import MainLayout from "./layouts/MainLayout"
import JobPostDashboard from "./component/JobPostDashboard"
import { BrowserRouter , Routes , Route } from "react-router-dom"

function App(){

  // const [activePage , setActivePage] = useState("home")

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout/>}>

        <Route path="/" element={<Home/>}/>

        <Route path="/jobs"
        element={<JobPostDashboard/>}/>
        
        <Route path="/login-as" element={<LoginAs />}/>

        <Route path="/candidate-profile"
        element={<CandidateProfile/>}/>

        <Route path="/company-profile"
        element={<CompanyProfile/>}/>

        <Route path="/company-profile-setup"
        element={<CompanyProfileSetUp/>}/>

        <Route path="/candidate-profile-setup"
        element={<CandidateProfileSetUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### `frontend/AI-HR/src/layouts/MainLayout.jsx`

```jsx
import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

function MainLayout(){
    return (
        <>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        </>
    )
} 

export default MainLayout
```

### `frontend/AI-HR/src/component/Home.jsx`

```jsx
import "../styles/home.css"
import JobPostDashboard from "./JobPostDashboard"

function Home(){

    return (
        <div className="home-page">
            <div className="home-page-body">
                <div className="hero-section">
                    <h1>Find Your Dream Job Today</h1>
                    <p>Browse thousands of jobs listing from top companies around the world.<br/>Your next career move starts here</p>
                    <div className="home-page-search">
                    <form action="" method="post">
                        <input type="search" name="serach" placeholder="Job title, company, Location" className="search-bar"/>
                        <button type="submit">search</button>
                    </form>
                    </div>
                </div>
                <div>
                    <JobPostDashboard />
                </div>
            </div>
        </div>
    )    
}

export default Home
```

### `frontend/AI-HR/src/component/JobPostDashboard.jsx`

```jsx
import { getAllJobs, applyForAiHrRound } from "../services/api";
import { useEffect, useMemo, useState } from "react";
import "../styles/jobs_dashboard.css";
import { useNavigate } from "react-router-dom";
import InterviewPopup from "./InterviewPopup";

function JobPostDashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [interviewId, setInterviewId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getAllJobs();

                if (Array.isArray(data)) {
                    setJobs(data);
                } else if (Array.isArray(data?.jobs)) {
                    setJobs(data.jobs);
                } else {
                    throw new Error("Unexpected jobs response format.");
                }
            } catch (error) {
                console.error("Error while fetching jobs:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return jobs;

        return jobs.filter((job) => {
            const searchableText = [
                job.job_title,
                job.company_name,
                job.description,
                job.required_skills,
                job.location,
            ]
                .filter(Boolean)
                .map((value) =>
                    Array.isArray(value) ? value.join(" ") : String(value)
                )
                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);
        });
    }, [jobs, search]);

    function getSkills(skills) {
        if (Array.isArray(skills)) return skills;
        if (typeof skills === "string") {
            return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
        }
        return [];
    }

    return (
        <div className="jobs-page">
            <div className="jobs-container">
                <section className="jobs-hero">
                    <div className="hero-icon">💼</div>
                    <div className="hero-content">
                        <span className="eyebrow">JOB OPPORTUNITIES</span>
                        <h1>Find Your Next Opportunity</h1>
                        <p>
                            Explore job openings, build your skills, and take
                            the next step in your career with AI-HR.
                        </p>
                    </div>
                    <div className="hero-decoration">✦</div>
                </section>

                <section className="jobs-search">
                    <div className="search-box">
                        <span>⌕</span>
                        <input
                            type="search"
                            placeholder="Search jobs, skills, or companies..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <div className="jobs-count">
                        Showing <strong>{filteredJobs.length}</strong>{" "}
                        {filteredJobs.length === 1 ? "job" : "jobs"}
                    </div>
                </section>

                {loading && (
                    <div className="jobs-message">
                        <div className="jobs-spinner" />
                        <p>Finding opportunities for you...</p>
                    </div>
                )}

                {error && (
                    <div className="jobs-message jobs-error">
                        <h3>Unable to load jobs</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && filteredJobs.length === 0 && (
                    <div className="jobs-message">
                        <div className="empty-jobs-icon">⌕</div>
                        <h3>{jobs.length ? "No matching jobs" : "No jobs yet"}</h3>
                        <p>
                            {jobs.length
                                ? "Try searching with another keyword."
                                : "Published job opportunities will appear here."}
                        </p>
                        {search && (
                            <button
                                className="clear-search"
                                onClick={() => setSearch("")}
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

                <section className="jobs-list">
                    {filteredJobs.map((job, index) => {
                        const skills = getSkills(job.required_skills);

                        return (
                            <article className="job-card" key={job._id}>
                                <div className={`job-icon job-icon-${index % 5}`}>
                                    {["</>", "✧", "▣", "☁", "✦"][index % 5]}
                                </div>

                                <div className="job-main">
                                    <div className="job-title-row">
                                        <h2>{job.job_title || "Untitled Position"}</h2>
                                        {job.is_demo && (
                                            <span className="demo-badge">Demo Job</span>
                                        )}
                                    </div>

                                    <div className="job-company">
                                        <span>▦ {job.company_name || "Company"}</span>
                                        <span>•</span>
                                        <span>⌖ {job.location || "Location not specified"}</span>
                                    </div>

                                    <p className="job-description">
                                        {job.description || "Explore this opportunity and its requirements."}
                                    </p>

                                    {skills.length > 0 && (
                                        <div className="job-skills">
                                            {skills.map((skill, skillIndex) => (
                                                <span key={`${skill}-${skillIndex}`}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="job-meta">
                                    <span>▣ {job.min_experience ?? 0}+ years</span>
                                    <span>⌖ {job.location || "Not specified"}</span>
                                </div>

                                <div className="job-actions">
                                    <button
                                        className="apply-button"
                                        onClick={async () => {
                                            try{
                                                const result = await applyForAiHrRound(job._id)
                                                setSelectedJob(result.job);
                                                setInterviewId(result.interview_id);

                                            }catch(error){
                                                console.error("Applied Failed : ", error.message );

                                                if(!localStorage.getItem("access_token")){
                                                    navigate("/login-as")
                                                }else{
                                                    alert(error.message);
                                                }
                                            }
                                        }}
                                    >
                                        Apply for AI-HR Round <span>→</span>
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </section>
                {selectedJob && interviewId && (
                    <InterviewPopup
                        job={selectedJob}
                        interviewId={interviewId}
                        onClose={() => {
                            setSelectedJob(null);
                            setInterviewId(null);
                        }}
                    />
                )}
                <p className="jobs-footer">
                    Discover opportunities and take your next career step with AI-HR.
                </p>
            </div>
        </div>
    );
}

export default JobPostDashboard;
```

### `frontend/AI-HR/src/component/Navbar.jsx`

```jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSavedUser, validateSession } from "../services/api";
import "../styles/navbar.css"

function Navbar(){
    
    const navigate = useNavigate();
    const [user, setUser] = useState(() => getSavedUser());
    
    useEffect(() => {

        let active = true;

        async function checkSession(){

            const token = localStorage.getItem("access_token");

            if (!token){
                setUser(null);
                return;
            }

            const valid = await validateSession();

            if(!active) return ;

            if(valid === false){
                setUser(null)
            }else{
                setUser(getSavedUser());
            }
        }

        function updateUser(){
            setUser(getSavedUser());
        }

        checkSession();

        window.addEventListener("auth-changed", updateUser);
        window.addEventListener("storage", updateUser);

        return () => {
            active = false;
            window.removeEventListener("auth-changed", updateUser);
            window.removeEventListener("storage", updateUser);
        };
    },[]);

    useEffect(() => {
        function updateUser(){
            setUser(getSavedUser());
        }

        window.addEventListener("auth-changed", updateUser);
        window.addEventListener("storage", updateUser);
       
        return () => {
            window.removeEventListener("auth-changed", updateUser);
            window.removeEventListener("storage", updateUser);
        }
    },[])

    function handelProfileClick(){
        if (user?.role === "candidate"){
            navigate("/candidate-profile");
        }else if(user?.role === "company"){
            navigate("/company-profile");
        }else{
            navigate("/login-as")
        }
    }


    return(
        <div className="nav-bar">
            <div className="nav-bar-container">
                <div className="logo-name">
                    <h3>AI-HR</h3>
                </div>
                <div className="nav-pages-links">
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <a href="/" target="_blank" rel="noopener noreferrer">Companies</a>
                    <a href="/" target="_blank" rel="noopener noreferrer">About</a>
                </div>
                <div className="sign-in-up">
                    {user ? (
                        <>
                            <button onClick={handelProfileClick}>
                                👤
                            </button>
                        </>
                    ):(
                        <button onClick={() => navigate("/login-as")}>
                        Sign In
                        </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

### `frontend/AI-HR/src/component/company/CreateJobPost.jsx`

```jsx
import { useState } from "react"
import { handelSubmit } from "../../services/api";
import "../../styles/creat_job_post.css"

function CreateJobPost({onClose}){

    const [jobTitle , setJobTitle] = useState("");
    const [description , setDescription] = useState("");
    const [requiredSkills , setRequiredSkills] = useState("");
    const [experience , setExperience] = useState("");
    const [location , setLocation] = useState("");

    const jobDetails = {
        job_title : jobTitle,
        description : description,
        required_skills : requiredSkills,
        min_experience : experience,
        location : location,
    }

    return(
        <div className="job-modal-overlay" onClick={onClose}>
            <div 
            className="job-model"
            onClick={(e) => e.stopPropagation()}>
                <div className="job-modal-header">
                    <div>
                        <h2>Post a job</h2>
                    </div>
                    <button 
                    type="button"
                    className="job-model_close"
                    onClick={onClose}
                    aria-label="Close form"
                    >
                        &times;
                        </button>
                </div>
                <form action="" onSubmit={async (e) => {

                    const result = await handelSubmit({e, data:jobDetails, endpoint:"job-details"})

                    if (result?.success){
                        onClose();
                    }
                    }}>

                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name="job-title" className="job-title-input" onChange={(e) => setJobTitle(e.target.value)}/>

                    <label htmlFor="job-description">Job Description</label>
                    <textarea name="job-description" className="job-description-input" onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor="job-required-skills">Required Skills</label>
                    <input type="text" name="job-required-skills" className="job-required-skills-input" onChange={(e) => setRequiredSkills(e.target.value)}/>

                    <label htmlFor="job-min-experience">Minimum Experience</label>
                    <input type="number" name="job-min-experience" className="job-min-experience-input" onChange={(e) => setExperience(e.target.value)}/>

                    <label htmlFor="job-location">Location</label>
                    <input type="text" name="job-location" className="job-location-input" onChange={(e) => setLocation(e.target.value)}/>

                    <div className="job-modal-actions">
                        <button
                            type="button"
                            className="job-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                         <button
                            type="submit"
                            className="job-submit-btn"
                        >
                            Publish Job
                        </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CreateJobPost
```

### `frontend/AI-HR/src/styles/home.css`

```css

/* Home page */
.home-page {
    min-height: 100vh;
    width: 100%;
    background-color: #f8fafc;
    font-family: Arial, Helvetica, sans-serif;
}

/* Hero section */
.hero-section {
    width: 100%;
    min-height: 317px;
    box-sizing: border-box;
    padding: 43px 20px 44px;
    background: linear-gradient(115deg, #2451d8 0%, #1d4ed8 100%);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Main heading */
.hero-section h1 {
    margin: 0 0 17px;
    font-size: clamp(32px, 4vw, 56px);
    line-height: 1.15;
    font-weight: 800;
    letter-spacing: -1.8px;
    color: #ffffff;
}

/* Hero description */
.hero-section p {
    margin: 0;
    max-width: 680px;
    color: #e4ebff;
    font-size: 18px;
    line-height: 1.45;
    font-weight: 400;
}

/* Search container */
.home-page-search {
    width: 100%;
    max-width: 535px;
    margin-top: 36px;
}

/* Search form */
.home-page-search form {
    width: 100%;
    min-height: 62px;
    padding: 7px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Search input */
.home-page-search .search-bar {
    flex: 1;
    min-width: 0;
    height: 46px;
    padding: 0 15px;
    border: none;
    outline: none;
    background: transparent;
    color: #1f2937;
    font-size: 14px;
}

.home-page-search .search-bar::placeholder {
    color: #858b95;
}

/* Search button */
.home-page-search button {
    height: 46px;
    min-width: 122px;
    padding: 0 22px;
    border: none;
    border-radius: 6px;
    background-color: #2864e8;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.home-page-search button:hover {
    background-color: #174bc4;
}

/* Tablet */
@media (max-width: 650px) {
    .hero-section {
        min-height: 300px;
        padding: 42px 18px;
    }

    .hero-section h1 {
        letter-spacing: -1px;
    }

    .hero-section p {
        font-size: 16px;
    }

    .home-page-search {
        max-width: 500px;
        margin-top: 30px;
    }
}

/* Mobile */
@media (max-width: 420px) {
    .hero-section {
        min-height: 280px;
        padding: 38px 16px;
    }

    .hero-section h1 {
        font-size: 32px;
    }

    .hero-section p {
        font-size: 14px;
    }

    .hero-section p br {
        display: none;
    }

    .home-page-search {
        margin-top: 26px;
    }

    .home-page-search form {
        gap: 4px;
        padding: 5px;
    }

    .home-page-search .search-bar {
        padding: 0 8px;
        font-size: 12px;
    }

    .home-page-search button {
        min-width: 78px;
        padding: 0 12px;
        font-size: 12px;
    }
}
```

### `frontend/AI-HR/src/styles/navbar.css`

```css

/* Navbar */
.nav-bar {
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
}

.nav-bar-container {
    width: 100%;
    max-width: 1128px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
}

/* Logo */
.logo-name {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.logo-name h3 {
    margin: 0;
    color: #172033;
    font-size: 23px;
    font-weight: 750;
    letter-spacing: -0.6px;
}

/* Navigation links */
.nav-pages-links {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav-pages-links a {
    color: #555d6b;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    transition: color 0.2s ease;
}

.nav-pages-links a:hover {
    color: #2563eb;
}

/* Sign-in/profile area */
.sign-in-up {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 38px;
    border-radius: 6px;
    background-color: #f3f4f6;
    cursor: pointer;
    font-size: 19px;
    flex-shrink: 0;
    border-radius: 5px;
}
.sign-in-up button{
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 12px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    cursor: pointer;
}

.sign-in-up:hover {
    background-color: #e5e7eb;
}

/* Tablet and mobile */
@media (max-width: 650px) {
    .nav-bar-container {
        padding: 0 16px;
    }

    .logo-name h3 {
        font-size: 20px;
    }

    .nav-pages-links {
        gap: 14px;
    }

    .nav-pages-links a {
        font-size: 12px;
    }

    .sign-in-up {
        width: 34px;
        height: 34px;
    }
}

@media (max-width: 420px) {
    .nav-pages-links {
        gap: 9px;
    }

    .nav-pages-links a {
        font-size: 11px;
    }

    .logo-name h3 {
        font-size: 17px;
    }
}
```

### `frontend/AI-HR/src/styles/creat_job_post.css`

```css

/* Background overlay */
.job-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
    box-sizing: border-box;

    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(3px);
}

/* Popup container */
.job-model {
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;

    padding: 30px;
    box-sizing: border-box;

    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

    animation: job-modal-appear 0.2s ease-out;
}

/* Popup header */
.job-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 22px;
}

.job-modal-header h2 {
    margin: 0;
    color: #172033;
    font-size: 26px;
    font-weight: 750;
}

/* Close button */
.job-model_close {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;

    border: none;
    border-radius: 7px;
    background: #f3f4f6;
    color: #4b5563;

    font-size: 27px;
    line-height: 1;
    cursor: pointer;
    transition: background 0.2s ease;
}

.job-model_close:hover {
    background: #e5e7eb;
    color: #111827;
}

/* Form layout */
.job-model form {
    display: flex;
    flex-direction: column;
    gap: 9px;
}

/* Labels */
.job-model form label {
    margin-top: 8px;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
}

/* Text inputs and textarea */
.job-model form input,
.job-model form textarea {
    width: 100%;
    padding: 12px 14px;
    box-sizing: border-box;

    border: 1px solid #d1d5db;
    border-radius: 7px;
    outline: none;

    background: #ffffff;
    color: #111827;
    font-family: inherit;
    font-size: 14px;

    transition: border-color 0.2s ease,
                box-shadow 0.2s ease;
}

/* Input height */
.job-model form input {
    height: 44px;
}

/* Description field */
.job-model form textarea {
    min-height: 100px;
    resize: vertical;
}

/* Focus effect */
.job-model form input:focus,
.job-model form textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* Placeholder */
.job-model form input::placeholder,
.job-model form textarea::placeholder {
    color: #9ca3af;
}

/* Bottom action buttons */
.job-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid #e5e7eb;
}

.job-modal-actions button {
    min-height: 42px;
    padding: 0 20px;

    border-radius: 7px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    transition: background 0.2s ease,
                border-color 0.2s ease;
}

/* Cancel */
.job-cancel-btn {
    border: 1px solid #d1d5db;
    background: #ffffff;
    color: #374151;
}

.job-cancel-btn:hover {
    background: #f3f4f6;
}

/* Publish */
.job-submit-btn {
    border: 1px solid #2563eb;
    background: #2563eb;
    color: #ffffff;
}

.job-submit-btn:hover {
    border-color: #1d4ed8;
    background: #1d4ed8;
}

/* Popup animation */
@keyframes job-modal-appear {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Mobile responsiveness */
@media (max-width: 500px) {
    .job-model {
        padding: 22px 18px;
        max-height: 92vh;
    }

    .job-modal-header h2 {
        font-size: 23px;
    }

    .job-modal-actions {
        gap: 8px;
    }

    .job-modal-actions button {
        flex: 1;
        padding: 0 10px;
    }
}
```

### `frontend/AI-HR/src/component/LoginAs.jsx`

```jsx
import { useState } from "react"
import CandidateSignUp from "./candidate/CandidateSignUp";
import CompanySignUp from "./company/CompanySignUp";
import { loginUser } from "../services/api";
import "../styles/LoginAs.css"
import { useNavigate } from "react-router-dom";

function LoginAs(){

    const [loginAs, setLoginAs] = useState("User");
    const [showLogin , setShowLogin] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    return(
        <div className="login-page-container">
            {!showLogin &&
            <div className="login-page">
            <div className="login-select">
                <h2>Login As</h2>
                <div className="login-select-btn">
                <button type="button" 
                    onClick={() => 
                    {setLoginAs("User"); 
                    }}>User</button>
                <button type="button" 
                onClick={() => 
                {setLoginAs("Company"); 
                }}>Company</button>
                </div>
            </div>

            <form action="" method="post" onSubmit={ async (e) => {
                e.preventDefault();
                setError("");

                try{
                    const result = await loginUser({
                        email,
                        password,
                        role: loginAs === "User" ? "candidate" : "company",
                    })

                    if (result.success){
                        navigate("/")
                    }
                }catch(error){
                    setError(error.message || "Login failed. Please try again.");
                }
                
        }}>
                <label htmlFor="email" className="email-label">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="password" className="password-label">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                {error && <p className="login-error">{error}</p> }

                <p className="forgot-password"><a href="/forgot-password">Forgot your password?</a></p>
                <button type="submit">Login</button>
            </form>
            <div className="login-signup">
                <p>Don't have an account? <button type="button" onClick={() => setShowLogin(true)}>Sign Up</button></p>
            </div>
            </div>
            }
            {showLogin &&
            <div className="login-content">
                    {loginAs === "User" ? <CandidateSignUp/> : <CompanySignUp />}
            </div>
            }
        </div>
    )
}

export default LoginAs
```

### `frontend/AI-HR/src/component/Questions.jsx`

```jsx
import { useState, useEffect } from "react";
import { getQuestions, handelSubmit } from "../services/api";

function Questions(){

    const [questions, setQuestions] = useState([]);
    const [answers , setAnswers] = useState({});
    const [loading, setLoading] = useState(true)

    function handleAnswer(questionId , optionIndex){
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }))
    }

    useEffect(() => {
        async function loadQuestions() {
            try{
                const data = await getQuestions();

                setQuestions(data)  
            }catch (error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        loadQuestions();
    },[])

    if(loading){
        return <p>Loading...</p>
    }


    return (
        <div className="question-bank-page">
            <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:answers, endpoint:"answers"})}>
                <div className="question-page">
                    <h2>Test</h2>
                <div className="questions-answer">
                    {questions.map((ques) => (
                        <div className="ques">
                            <h4>{ques.question}</h4>
                            <ul>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 0)}/>
                                    <label>{ques.option_1}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 1)}/>
                                    <label>{ques.option_2}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id}
                                    value={null} onChange={() => handleAnswer(ques.question_id, 2)}/>
                                    <label>{ques.option_3}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 3)}/>
                                    <label>{ques.option_4}</label>
                                </li>
                            </ul>
                        </div>
                    ))
                    }
                </div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
    
}

export default Questions
```

### `frontend/AI-HR/src/component/candidate/CandidateProfileSetUp.jsx`

```jsx
import { handelSubmit } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile_setup.css"

function CandidateProfileSetUp() {

    const [candidateName, setCandidateName] = useState("");
    const [phone, setPhone] = useState("");
    const [summary, setSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");

    const accountId = sessionStorage.getItem("pendingAccountId");

    const candidateProfile = {
        account_id : accountId,
        name: candidateName,
        phone: phone,
        summary: summary,
        skills: skills,
        experience: experience,
        education: education
    };

    const navigate = useNavigate();

    return(
        <div className="candidate-profile-setup">
            <form action="" method="post" onSubmit={async (e) => {
                const result = await handelSubmit({e, data:candidateProfile, endpoint:"candidate-profile-setup"})

                if (result.success ){
                    navigate("/login-as")
                }

                }}>
                <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                <input type="text" name="candidate-name" className="candidate-name-input" 
                placeholder="Full Name" value={candidateName} 
                onChange={(e) => setCandidateName(e.target.value)}/>

                <label htmlFor="candidate-phone" className="candidate-phone-label">Phone no</label>
                <input type="text" name="candidate-phone" className="candidate-phone-input" 
                placeholder="Phone Number" value={phone} 
                onChange={(e) => setPhone(e.target.value)}/>

                <label htmlFor="candidate-summary" className="candidate-summary-label">Summary</label>
                <textarea name="candidate-summary" className="candidate-summary-input" 
                placeholder="Summary" value={summary} 
                onChange={(e) => setSummary(e.target.value)}/>

                <label htmlFor="candidate-skills" className="candidate-skills-label">Skills</label>
                <input type="text" name="candidate-skills" className="candidate-skills-input" 
                placeholder="Skills" value={skills} 
                onChange={(e) => setSkills(e.target.value)}/>   

                <label htmlFor="candidate-experience" className="candidate-experience-label">Experience</label>
                <input type="text" name="candidate-experience" className="candidate-experience-input" 
                placeholder="Experience" value={experience} 
                onChange={(e) => setExperience(e.target.value)}/>

                <label htmlFor="candidate-education" className="candidate-education-label">Education</label>
                <input type="text" name="candidate-education" className="candidate-education-input" 
                placeholder="Education" value={education} 
                onChange={(e) => setEducation(e.target.value)}/>

                <button type="submit" className="candidate-profile-submit">Submit</button>

            </form>
        </div>
    )
}

export default CandidateProfileSetUp
```

### `frontend/AI-HR/src/component/candidate/CandidateSignUp.jsx`

```jsx
import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CandidateSignUp(){
    const [candidatename, setCandidatename] = useState('');
    const [candidateUserName, setCandidateUserName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');

    const candidate = {
        user_name : candidateUserName,
        name : candidatename,
        email : candidateEmail,
        password : candidatePassword,
        role : "candidate",
    }

    const navigate = useNavigate();

    return(
        <div className="candidate-form-page data-form-page">
            <div className="form-page">
                <h2>Candidate Sign Up</h2>
                <form action="" method="post" onSubmit={ async (e) => {
                    const result = await handelSubmit({e, data:candidate, endpoint:"candidate-signup"})

                    if(result.success && result?.candidate_id){
                        sessionStorage.setItem(
                            "pendingAccountId",
                            result.candidate_id
                        )
                        navigate("/candidate-profile-setup")
                    }
                }}>
                    <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                        <input type="text" name="candidate-name" className="candidate-name-input" 
                        placeholder="Full Name" value={candidatename} 
                        onChange={(e) => setCandidatename(e.target.value)}/>

                    <label htmlFor="candidate-username" className="candidate-username-label">Username</label>
                        <input type="text" name="candidate-username" className="candidate-username-input" 
                        placeholder="Username" value={candidateUserName} 
                        onChange={(e) => setCandidateUserName(e.target.value)}/>

                    <label htmlFor="candidate-email" className="candidate-email-label">Email</label>
                        <input type="email" name="candidate-email" className="candidate-email-input" 
                        placeholder="Email" value={candidateEmail} 
                        onChange={(e) => setCandidateEmail(e.target.value)}/>

                    <label htmlFor="candidate-password" className="candidate-password-label">Password</label>
                        <input type="password" name="candidate-password" className="candidate-password-input" 
                        placeholder="Password" value={candidatePassword} 
                        onChange={(e) => setCandidatePassword(e.target.value)}/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CandidateSignUp
```

### `frontend/AI-HR/src/component/candidate/CandidateProfile.jsx`

```jsx
import {useState, useEffect} from "react";
import { getMyProfile, logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CandidateProfile(){

    const [candidateProfile, setCandidateProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const data = await getMyProfile();

            setCandidateProfile(data);
        }
        fetchProfile()
    },[])

    const navigate = useNavigate();

    function handelLogout(){
        logoutUser();
        navigate("/");
    }

    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateProfile?.name}</h2>
                <p>{candidateProfile?.summary}</p>
                <p>{candidateProfile?.skills}</p>
            </div>
            <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default CandidateProfile
```

### `frontend/AI-HR/src/component/company/CompanyProfileSetUp.jsx`

```jsx
import { useState } from "react";
import { handelSubmit } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/profile_setup.css"

function CompanyProfileSetUp() {
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [industry, setIndustry] = useState("");

    const accountId = sessionStorage.getItem("pendingAccountId")

    const companyDetail = {
        account_id : accountId, 
        company_name: companyName,
        company_description: companyDescription,
        industry: industry,
    };

    const navigate = useNavigate();
    return (
        <div className="company-profile-setup-page">
            <div className="company-profile-setup-form">
                <form
                    action=""
                    method="post" onSubmit={async (e) => {
                        const result = await handelSubmit({ e, data: companyDetail, endpoint: "company-profile-setup" });

                        if(result.success){
                            navigate("/login-as")
                        }
                }}
                >
                    <label htmlFor="company-name" className="company-name-label">Company Name</label>
                    <input
                        type="text"
                        name="company-name"
                        className="company-name-input"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label htmlFor="company-description" className="company-description-label">Company Description</label>
                    <textarea
                        name="company-description" 
                        className="company-description-input"
                        placeholder="Company Description"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                    />
                    
                    <label htmlFor="industry" className="industry-label">Industry</label>
                    <input 
                        type="text"
                        name="industry"
                        className="industry-input"
                        placeholder="Industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CompanyProfileSetUp
```

### `frontend/AI-HR/src/component/company/CompanySignUp.jsx`

```jsx
import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api"
import { useNavigate } from "react-router-dom"

function CompanySignUp(){

    // Company Detail
    const [companyUserName, setCompanyUserName] = useState("")
    const [companyName , setCompanName] = useState("")
    const [companyemail, setCompanyEmail] = useState("")
    const [companyPassword, setCompanyPassword] = useState("")

    const  companyDetail = {
        user_name : companyUserName,
        name : companyName,
        email : companyemail,
        password : companyPassword,
        role : "company",
    }
    const navigate = useNavigate();

    return (
        <div className="company-data-page data-form-page">
            <div className="form-page">
                <h2>Company Sign Up</h2>
                <form action="" method="post" onSubmit={ async (e) => {
                    const result = await handelSubmit({e, data:companyDetail, endpoint:"company-signup"})

                    if(result.success && result.company_id){
                        sessionStorage.setItem(
                            "pendingAccountId",
                            result.company_id
                        )

                        navigate("/company-profile-setup")
                    }
                    }}>
                    
                    <label htmlFor="company-username" className="company-name-label">Company Username</label>
                    <input type="text" name="company-username" className="company-username-input" value={companyUserName} 
                    onChange={(e) => setCompanyUserName(e.target.value)}/>

                    <label htmlFor="company-name" className="company-name-label">Company Name</label>
                    <input type="text" name="company-name" className="company-name-input" value={companyName} 
                    onChange={(e) => setCompanName(e.target.value)}/>
            
                    <label htmlFor="company-email" className="company-email">Email</label>
                    <input type="text" name="company-Email" className="company-Email-input" value={companyemail} 
                    onChange={(e) => setCompanyEmail(e.target.value)}/>
                    
                    <label htmlFor="company-password" className="company-password-label">Password</label>
                    <input type="password" name="company-password" className="company-password-input" value={companyPassword} 
                    onChange={(e) => setCompanyPassword(e.target.value)}/>

                <button type="submit" className="Save">Submit</button>

                </form>

            </div>
        </div>
    )
}

export default CompanySignUp
```

### `frontend/AI-HR/src/component/company/CompanyProfile.jsx`

```jsx
import { getMyProfile, logoutUser } from "../../services/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import CreateJobPost from "./CreateJobPost";

function CompanyProfile(){
    const [companyProfile, setCompanyProfile] = useState(null);
    const [showJobModal , setShowJobModal] = useState(false);

    useEffect(() =>{
        async function fetchProfile() {
            try{
                const data = await getMyProfile();

                setCompanyProfile(data);
            }catch (error){
                console.log("Error fetching company data:", error);
            }
        }
        fetchProfile();
    },[])
    
    const navigate = useNavigate();

        function handelLogout(){
            logoutUser();
            navigate("/");
        }
    // console.log("Company Data:", companyProfile);
    return (
        <div className="company-profile-page">
            <div className="company-profile">
                <h2>{companyProfile?.company_name}</h2>
                <p>Industry: {companyProfile?.industry}</p>
                <p>{companyProfile?.company_description}</p>
            </div>
            <div className="create-job-post">
                <button onClick={() => setShowJobModal(true)}>+ Post a Job</button>
            </div>
            {showJobModal &&
                <CreateJobPost onClose={() => setShowJobModal(false)}/>
            }
            <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default CompanyProfile
```

### `frontend/AI-HR/src/services/api.js`

```js
const API = "http://127.0.0.1:8000";

// getCompany company data from backend
export async function getCompanies(){
    const res = await fetch(`${API}/companies`);

    if (!res.ok) {
        throw new Error("Failed to fetch company") 
    }

    return res.json();
}

// fetch candidtae data from backend
export async function getCandidate(){
    const res = await  fetch(`${API}/candidate`);

    if (!res.ok){
        throw new Error("Failed to feth user") 
    }

    return res.json()
}

// fetch questions from backend
export async function startInterview(interviewId){
    
    const token = localStorage.getItem("access_token");

    if(!token){
        throw new Error("Please log in first")
    }

    const res = await fetch(`${API}/start-interview/${interviewId}`,{
        method  : "GET",
        headers:{
            Authorization : `Bearer ${token}`,
        },
    })

    const result = await res.json()

    if(!res.ok){
        throw new Error(
            result.detail || "Failed to start interview"
        );
    }

    return result.questions
}

// fetch all jobs from collection
export async function getAllJobs(){

    const res = await fetch(`${API}/job_dashboard`)

    if(!res.ok){
        throw new Error(`Failed to fetch data: ${res.status} `)
    }

    
    return await res.json()
}

// Handel form submission for every page
export async function handelSubmit({e, data, endpoint}){
    e.preventDefault();

    try{
        const token = localStorage.getItem("access_token")
        const response = await fetch(`${API}/${endpoint}`,{
            method : "POST",
            headers : {
                "content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }catch (error){
        console.error("API Error :",error)
    }
}

export async function getMyProfile() {
    const token = localStorage.getItem("access_token");

    if (!token){
        throw new Error("Please log in first")
    }

    const response = await fetch(`${API}/my-profile`,{
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    const data = await response.json();

    // if (!response){
    //     throw new Error(data.detail || "Failed to fecth profile ") 
    // }
    return data;
}

export async function loginUser({email, password, role}){

   const res = await fetch(`${API}/login-as`,{
    method:"POST",
    headers:{
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({ email, password, role}),
   });

   const result = await res.json();

   if (!res.ok || !result.success){
    throw new Error(
        result.message || result.detail || "Login failed"
    );

    }
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("current_user", JSON.stringify(result.user));

    window.dispatchEvent(new Event("auth-changed"));

    return result;
}


export function getSavedUser() {
    try {
        const user = localStorage.getItem("current_user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

export function logoutUser(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-changed"));
}

export async function applyForAiHrRound(jobId){

    const token = localStorage.getItem("access_token");

    if(!token){
        throw new Error("Please sign in before applying")
    }

    const res = await fetch(`${API}/apply-job`,{
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            job_id : jobId,
        }),
    });

    const result = await res.json();

    if(!res.ok){
        throw new Error(
            result.detail || result.message || "Failed to apply"
        );
   }

   console.log(result)

    return result;
}

export async function validateSession() {
   
    const token = localStorage.getItem("access_token");

    if(!token){
        logoutUser();
        return null
    }

    try{
        const res = await fetch(`${API}/my-profile`, {
            headers:{
                Authorization : `Bearer ${token}`
            },
        });

        if (!res.ok){
            logoutUser();
            return null;
        }

        return await res.json();
    }catch(error){
        console.error("Could not validate session",error);
        return null
    }
}
```

### `frontend/AI-HR/src/component/candidate/CandidateProfileSetUp.jsx`

```jsx
import { handelSubmit } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile_setup.css"

function CandidateProfileSetUp() {

    const [candidateName, setCandidateName] = useState("");
    const [phone, setPhone] = useState("");
    const [summary, setSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");

    const accountId = sessionStorage.getItem("pendingAccountId");

    const candidateProfile = {
        account_id : accountId,
        name: candidateName,
        phone: phone,
        summary: summary,
        skills: skills,
        experience: experience,
        education: education
    };

    const navigate = useNavigate();

    return(
        <div className="candidate-profile-setup">
            <form action="" method="post" onSubmit={async (e) => {
                const result = await handelSubmit({e, data:candidateProfile, endpoint:"candidate-profile-setup"})

                if (result.success ){
                    navigate("/login-as")
                }

                }}>
                <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                <input type="text" name="candidate-name" className="candidate-name-input" 
                placeholder="Full Name" value={candidateName} 
                onChange={(e) => setCandidateName(e.target.value)}/>

                <label htmlFor="candidate-phone" className="candidate-phone-label">Phone no</label>
                <input type="text" name="candidate-phone" className="candidate-phone-input" 
                placeholder="Phone Number" value={phone} 
                onChange={(e) => setPhone(e.target.value)}/>

                <label htmlFor="candidate-summary" className="candidate-summary-label">Summary</label>
                <textarea name="candidate-summary" className="candidate-summary-input" 
                placeholder="Summary" value={summary} 
                onChange={(e) => setSummary(e.target.value)}/>

                <label htmlFor="candidate-skills" className="candidate-skills-label">Skills</label>
                <input type="text" name="candidate-skills" className="candidate-skills-input" 
                placeholder="Skills" value={skills} 
                onChange={(e) => setSkills(e.target.value)}/>   

                <label htmlFor="candidate-experience" className="candidate-experience-label">Experience</label>
                <input type="text" name="candidate-experience" className="candidate-experience-input" 
                placeholder="Experience" value={experience} 
                onChange={(e) => setExperience(e.target.value)}/>

                <label htmlFor="candidate-education" className="candidate-education-label">Education</label>
                <input type="text" name="candidate-education" className="candidate-education-input" 
                placeholder="Education" value={education} 
                onChange={(e) => setEducation(e.target.value)}/>

                <button type="submit" className="candidate-profile-submit">Submit</button>

            </form>
        </div>
    )
}

export default CandidateProfileSetUp
```

### `frontend/AI-HR/src/styles/LoginAs.css`

```css

/* ===== Global page layout ===== */

.login-page-container {
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(59, 130, 246, 0.16),
            transparent 35%
        ),
        #0b1120;
    color: #172033;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
}

/* ===== Login card ===== */

.login-page {
    width: 100%;
    max-width: 440px;
    box-sizing: border-box;
    padding: 38px;
    background: #ffffff;
    border: 1px solid #e5eaf2;
    border-radius: 20px;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
    animation: cardEnter 0.35s ease-out;
}

.login-page h2 {
    margin: 0 0 10px;
    color: #111827;
    font-size: 28px;
    font-weight: 750;
    letter-spacing: -0.8px;
    text-align: center;
}

/* ===== Candidate / company selector ===== */

.login-select {
    margin-bottom: 28px;
}

.login-select h2::after {
    content: "Welcome back. Sign in to continue.";
    display: block;
    margin-top: 12px;
    color: #64748b;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0;
}

.login-select-btn {
    display: flex;
    gap: 6px;
    padding: 5px;
    margin-top: 24px;
    background: #f1f5f9;
    border-radius: 11px;
}

.login-select-btn button {
    flex: 1;
    padding: 11px 12px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
}

.login-select-btn button:hover {
    color: #1d4ed8;
    background: #e8efff;
}

/* ===== Form elements ===== */

.login-page form,
.login-content form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.login-page label,
.login-content label {
    margin-top: 8px;
    color: #334155;
    font-size: 13px;
    font-weight: 650;
    text-align: left;
}

.login-page input,
.login-content input,
.login-content select,
.login-content textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid #dbe2ea;
    border-radius: 9px;
    outline: none;
    background: #ffffff;
    color: #172033;
    font-family: inherit;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.login-page input::placeholder,
.login-content input::placeholder,
.login-content textarea::placeholder {
    color: #9aa5b5;
}

.login-page input:focus,
.login-content input:focus,
.login-content select:focus,
.login-content textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.13);
}

/* ===== Main buttons ===== */

.login-page form button[type="submit"],
.login-content form button[type="submit"],
.login-content form button[type="button"] {
    width: 100%;
    margin-top: 14px;
    padding: 13px 16px;
    border: none;
    border-radius: 9px;
    background: #2563eb;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
}

.login-page form button[type="submit"]:hover,
.login-content form button[type="submit"]:hover,
.login-content form button[type="button"]:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
}

/* ===== Forgot password ===== */

.forgot-password {
    margin: 2px 0 4px;
    text-align: right;
    font-size: 12px;
}

.forgot-password a {
    color: #2563eb;
    text-decoration: none;
}

.forgot-password a:hover {
    text-decoration: underline;
}

/* ===== Signup link ===== */

.login-signup {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid #edf0f5;
    text-align: center;
}

.login-signup p {
    margin: 0;
    color: #64748b;
    font-size: 13px;
}

.login-signup button {
    padding: 4px 5px;
    border: none;
    background: transparent;
    color: #2563eb;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}

.login-signup button:hover {
    text-decoration: underline;
}

/* ===== Signup card ===== */

.login-content {
    width: 100%;
    max-width: 480px;
    box-sizing: border-box;
    padding: 38px;
    border: 1px solid #e5eaf2;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
    animation: cardEnter 0.35s ease-out;
}

.login-content h1,
.login-content h2,
.login-content h3 {
    margin-top: 0;
    color: #111827;
    letter-spacing: -0.5px;
}

.login-content p {
    color: #64748b;
    line-height: 1.6;
}

.login-content textarea {
    min-height: 100px;
    resize: vertical;
}

/* ===== Animation ===== */

@keyframes cardEnter {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== Mobile responsive ===== */

@media (max-width: 520px) {
    .login-page-container {
        padding: 20px 14px;
    }

    .login-page,
    .login-content {
        padding: 26px 22px;
        border-radius: 15px;
    }

    .login-page h2 {
        font-size: 25px;
    }
}

.login-error {
    color: #dc2626;
    font-size: 14px;
    margin-top: 10px;
}
```

### `frontend/AI-HR/src/styles/candidate_form.css`

```css
.data-form-page {
    width: 100%;
    height: auto;
    /* justify-self: center; */
    display: flex;
    justify-content: center;
    align-content: center;
}

.data-form-page .form-page {
    width: 500px;
    height: 100%;
    padding: 20px;
    border: 2px solid black;
    border-radius: 20px;
    box-sizing: border-box; /* Prevents padding from breaking the 300px width */
    text-align: left;
}

.data-form-page .form-page label{
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: black;
}

/* ADD THIS RULE BELOW TO FIX THE STACKING */
.data-form-page .form-page form {
    display: flex;
    flex-direction: column;
    gap: 12px; /* Adds clean spacing between each row */
}

/* Optional: Makes inputs look clean and span full width */
.data-form-page .form-page input {
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
}
```

### `frontend/AI-HR/src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## Notes

- JWT-based login was added via `backend/auth.py` and is used in `backend/main.py`.
- The frontend app now includes route-based signup and profile setup flows for both candidate and company users, plus a home page, navbar navigation, and job-posting modal flow.
- The repository still uses MongoDB-backed persistence and a Gemini-based candidate-analysis flow, but the document intentionally omits secret keys and generated payloads.

