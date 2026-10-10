# Project Structure and File Snapshot

This document reflects the current state of the `AI-HR` project as of 2026-10-10 and embeds the contents of readable, non-sensitive text files as a point-in-time snapshot.

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
- Shared frontend API logic in `frontend/AI-HR/src/services/api.js`
- Home-page, navbar, and job-post UX in `frontend/AI-HR/src/component/Home.jsx`, `Navbar.jsx`, and `CreateJobPost.jsx`
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
|           |-- README.md
|           |-- index.html
|           |-- package.json
|           |-- .gitignore
|           |-- eslint.config.js
|           |-- index.html
|           |-- package-lock.json
|           |-- package.json
|           |-- README.md
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
    "user_name": "novatechlabs",
    "name": "NovaTech Labs",
    "email": "company01@test.com",
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
  }
]
```

### `backend/test_data/company_data.json`

```json
[]
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

.candidate-profile-setup form::before {
    content: "Build your candidate profile";
    display: block;
    margin-bottom: 8px;
    color: #172554;
    font-size: 27px;
    font-weight: 700;
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
def analyze_candidate(company, candidate):
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=f"""
        You are an experienced HR and technical interviewer.

        Analyze whether the candidate is suitable for the company's available
        job/project based on the information provided.

        {RESP}
        
        COMPANY INFORMATION:
        {company}

        CANDIDATE INFORMATION:
        {candidate}

        """
        )

    str_data = response.text
    str_data = str_data.replace("```json", "").replace("```", "").strip()
    data = json.loads(str_data)

    return {
        "data": data,
        "get_questions": get_questions(data),
        "get_answers": get_answers(data)
    }
```

### `backend/data_extract.py`

```python
import json


def get_questions(data):

    questions = data["questions"]
    result = []
    for ques in questions:
        option = ques["options"]
        result.append({
            "question_id": ques["question_id"],
            "question": ques["question"],
            "option_1": option[0],
            "option_2": option[1],
            "option_3": option[2],
            "option_4": option[3]
        },)

    return result


def get_answers(data):
    questions = data["questions"]
    result = []
    for ques in questions:
        result.append({
            "question_id": ques["question_id"],
            "question": ques["question"],
            "correct_option": ques["correct_option"]
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
interview_collections = db["inetrview"]
accounts_collections = db["accounts"]
```

### `backend/main.py`

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ai_gen_result import analyze_candidate
from database import candidates_collections, companies_collections, accounts_collections
from jose import jwt , JWTError
from auth import SECRET_KEY, ALGORITHM, create_access_token

app = FastAPI()

security = HTTPBearer()

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

# get candidate sign up detail and save in db
@app.post("/candidate-signup")
def receive_candidate(candidate : dict):
    result = accounts_collections.insert_one(candidate)
    
    return {
        "success" : True,
        "message" : "Candidate recevied",
        "candidate_id" : str(result.inserted_id)
    }
    
# get company sign up detail ans save in db 
@app.post("/company-signup")
def receive_company_detail(companyDetail : dict):
    print(companyDetail)
    
    result = accounts_collections.insert_one(companyDetail)
    return {
        "success" : True,
        "message" : "Company Detail Received",
        "company_id" : str(result.inserted_id)
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
    
# Get answer from frontend
@app.post("/answers")
def get_answers(answers: dict):
    return answers

# send questions to frontend
@app.get("/questions")
def analyze():
    
    company = companies_collections.find_one({"company.company_name" : "NovaTech Labs"})
    candidate = candidates_collections.find_one({"candidate.name" : "Rahul Sharma"})
    
    result = analyze_candidate(company=company, candidate=candidate)
    questions = result["get_questions"]
    print(result["get_answers"])
    return questions

# send all companies data to react
@app.get("/companies")
def all_companies():
    
    company = companies_collections.find_one({"company.company_name" : "NovaTech Labs"})
    company["_id"] = str(company["_id"])
    return company

# send candidate data to react
@app.get("/candidate")
def get_candidate():
    
    candidate = candidates_collections.find_one({"candidate.name" : "Rahul Sharma"})
    candidate["_id"] = str(candidate["_id"])
        
    return candidate


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

    token = create_access_token(
        account_id=str(user["_id"]),
        role=user["role"]
    )

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
user_answers = {'q1': 0, 'q2': 1, 'q3': 2, 'q4': 0, 'q5': 1}

correct_answers = [
  {
    'question_id': 'q1',
    'question': 'In Python, which of the following methods is used to safely retrieve a value from a dictionary without raising a KeyError if the key does not exist?',
    'correct_option': 0
  },
  {
    'question_id': 'q2',
    'question': 'In FastAPI, how do you define a path parameter in a route decorator?',
    'correct_option': 1
  },
  {
    'question_id': 'q3',
    'question': 'Which SQL clause is used to filter the results of a GROUP BY query based on a specified condition?',
    'correct_option': 2
  },
  {
    'question_id': 'q4',
    'question': 'Which HTTP method is typically used to update an existing resource completely or replace it in a RESTful API?',
    'correct_option': 3
  },
  {
    'question_id': 'q5',
    'question': 'Which library does FastAPI natively use for data validation and settings management via Python type hints?',
    'correct_option': 0
  }
]


def score_candidate(user_answers, correct_answers):
    total_questions = len(correct_answers)
    score_board = []
    for i in correct_answers:
        for key, value in user_answers.items():
            if i["question_id"] == key:
                score_board.append({
                    i["question_id"]: {
                        "question": i["question"],
                        "correct_answer": i["correct_option"],
                        "user_answer": value,
                        "answer": (i["correct_option"] == value),
                        "score": (10 if i["correct_option"] == value else 0)
                    },
                })

    return {
        "company_id": None,
        "candidate_id": None,
        "score_board": score_board,
        "total_questions": total_questions
    }


r = score_candidate(user_answers, correct_answers)


def inertview_collection(score):
    pass
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
import { BrowserRouter , Routes , Route } from "react-router-dom"

function App(){

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/"
        element={<Home/>}/>
        
        <Route path="/login-as" element={<LoginAs />}/>

        <Route path="/candidate-profile"
        element={<CandidateProfile/>}/>

        <Route path="/company-profile"
        element={<CompanyProfile/>}/>

        <Route path="/company-profile-setup"
        element={<CompanyProfileSetUp/>}/>

        <Route path="/candidate-profile-setup"
        element={<CandidateProfileSetUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### `frontend/AI-HR/src/component/Home.jsx`

```jsx
import Navbar from "./Navbar"
import "../styles/home.css"

function Home(){

    return (
        <div className="home-page">
            <Navbar/>
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
            </div>
        </div>
    )    
}

export default Home
```

### `frontend/AI-HR/src/component/JobPostDashboard.jsx`

```jsx
function JobPostDashboard(){
    return(
        <></>
    )
}

export default JobPostDashboard
```

### `frontend/AI-HR/src/component/Navbar.jsx`

```jsx
import { useNavigate } from "react-router-dom"
import "../styles/navbar.css"

function Navbar(){

    const navigate = useNavigate();

    return(
        <div className="nav-bar">
            <div className="nav-bar-container">
                <div className="logo-name">
                    <h3>AI-HR</h3>
                </div>
                <div className="nav-pages-links">
                    <a href="http://" target="_blank" rel="noopener noreferrer">Home</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Jobs</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Companies</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">About</a>
                </div>
                <div className="sign-in-up">
                        <button onClick={() => navigate("/login-as")}>
                        Sign In
                        </button>
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
                <form action="" onSubmit={(e) => handelSubmit({e, data:jobDetails, endpoint:"job-details"})}>
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
```

### `frontend/AI-HR/src/component/LoginAs.jsx`

```jsx
import { useState } from "react"
import CandidateSignUp from "./candidate/CandidateSignUp";
import CompanySignUp from "./company/CompanySignUp";
import { handelSubmit } from "../services/api";
import "../styles/LoginAs.css"
import { useNavigate } from "react-router-dom";

function LoginAs(){

    const [loginAs, setLoginAs] = useState("User");
    const [showLogin , setShowLogin] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const loginData = {
        email : email,
        password : password,
        role : loginAs === "User" ? "candidate" : "company",
    }

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
                const result = await handelSubmit({e, data:loginData, endpoint:"login-as"});
                
                if (result.success){
                    
                    localStorage.setItem("access_token", result.access_token)
                    localStorage.setItem("user", JSON.stringify(result.user))
                    
                    if (result.user.role === "candidate"){
                        navigate("/candidate-profile")
                    }
                    if (result.user.role === "company"){
                        navigate("/company-profile")
                    }
                }else{
                    console.log(result.message)
                }
        }}>
                <label htmlFor="email" className="email-label">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className="password-label">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    navigate("/")
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
import { getMyProfile } from "../../services/api";

function CandidateProfile(){

    const [candidateProfile, setCandidateProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const data = await getMyProfile();

            setCandidateProfile(data);
        }
        fetchProfile()
    },[])
    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateProfile?.name}</h2>
                <p>{candidateProfile?.summary}</p>
                <p>{candidateProfile?.skills}</p>
            </div>
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
                            navigate("/")
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
import { useEffect, useState } from "react"
import { getMyProfile } from "../../services/api"

function CompanyProfile(){
    const [companyProfile, setCompanyProfile] = useState(null);
    
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
    
    return (
        <div className="company-profile-page">
            <div className="company-profile">
                <h2>{companyProfile?.company_name}</h2>
                <p>Industry: {companyProfile?.industry}</p>
                <p>{companyProfile?.company_description}</p>
            </div>
        </div>
    )
}

export default CompanyProfile
```

### `frontend/AI-HR/src/services/api.js`

```js
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
                    navigate("/")
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

.login-page input:focus,
.login-content input:focus,
.login-content select:focus,
.login-content textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.13);
}

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
```

### `frontend/AI-HR/src/styles/candidate_form.css`

```css
.data-form-page {
    width: 100%;
    height: auto;
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
    box-sizing: border-box;
    text-align: left;
}

.data-form-page .form-page label{
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: black;
}

.data-form-page .form-page form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

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

