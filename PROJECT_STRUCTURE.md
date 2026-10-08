# Project Structure and File Snapshot

This document describes the `AI-HR` project and embeds the contents of readable, non-sensitive text files as a point-in-time snapshot.

## Scope and sensitive data

- Backend source files are included except `.env` and `temp.txt`; secret values and candidate/data-bearing contents are not embedded.
- The frontend section is intentionally limited to `frontend/AI-HR/src/component/` (including its candidate and company subfolders), `services/`, `styles/`, `App.jsx`, `App.css`, and `index.css`. Other frontend files and folders are excluded.
- Confidential values are omitted or redacted, not encrypted into this Markdown. Encryption is only meaningful when its key is kept separately and securely.

## Directory and file tree

```text
AI-HR/
|-- backend/
|   |-- .env [secret values omitted]
|   |-- .gitignore
|   |-- ai_gen_result.py
|   |-- data_extract.py
|   |-- database.py
|   |-- main.py
|   |-- prompt.py
|   |-- requirements.txt
|   |-- scoring.py
|   `-- temp.txt [sensitive data omitted]
|-- frontend/
|   `-- AI-HR/
|       `-- src/
|           |-- component/
|           |   |-- candidate/
|           |   |   |-- CandidateProfile.jsx
|           |   |   |-- CandidateProfileSetUp.jsx
|           |   |   `-- CandidateSignUp.jsx
|           |   |-- company/
|           |   |   |-- CompanyProfile.jsx
|           |   |   |-- CompanyProfileSetUp.jsx
|           |   |   `-- CompanySignUp.jsx
|           |   |-- Companies.jsx
|           |   |-- LoginAs.jsx
|           |   |-- Questions.jsx
|           |   `-- User.jsx
|           |-- services/
|           |   `-- api.js
|           |-- styles/
|           |   |-- candidate_form.css
|           |   `-- LoginAs.css
|           |-- App.css
|           |-- App.jsx
|           `-- index.css
`-- PROJECT_STRUCTURE.md [this document; contents not repeated]
```

## Text file contents

### `backend/.gitignore`

```text
.env
/__pycache__
```

### `backend/ai_gen_result.py`

````text
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
        "data" : data,
        "get_questions" : get_questions(data),
        "get_answers" : get_answers(data)
    }
````

### `backend/data_extract.py`

```text
import json

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
        result.append({
            "question_id" : ques["question_id"],
            "question" : ques["question"],
            "correct_option" : ques["correct_option"]
        },)

    return result
```

### `backend/database.py`

```text
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

```text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_gen_result import analyze_candidate
from database import candidates_collections, companies_collections, accounts_collections

app = FastAPI()

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
        "message" : "Candidate recevied",
        "candidate" : candidate,
        "candidate_id" : str(result.inserted_id)
    }
    
# get company sign up detail ans save in db 
@app.post("/company-signup")
def receive_company_detail(companyDetail : dict):
    print(companyDetail)
    
    result = accounts_collections.insert_one(companyDetail)
    return {
        "message" : "Company Detail Received",
        "Company" : companyDetail,
        "company_id" : str(result.inserted_id)
    }
    

# get candidate profile detail and save in db
@app.post("/candidate-profile-setup")
def receive_candidate_profile(candidateProfile : dict):
    print(candidateProfile)
    
    result = candidates_collections.insert_one(candidateProfile)
    
    return {
        "message" : "Candidate Profile Received",
        "Candidate Profile" : candidateProfile,
        "candidate_id" : str(result.inserted_id)
    } 
    
# get company profile detail and save in db
@app.post("/company-profile-setup")
def receive_company_profile(companyProfile : dict):
    print(companyProfile)
    
    result = companies_collections.insert_one(companyProfile)
    
    return {
        "message" : "Company Profile Received",
        "Company Profile" : companyProfile,
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
    
    # companies = list(companies_collections.find())
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
def login_data(login_data : dict):
    
    user = accounts_collections.find_one({"email" : login_data["email"]})
    
    if user:
        user["_id"] = str(user["_id"])
        if user["role"] != login_data["role"]:
            return {
                "success" : False,
                "message" : f"User is not registered as a {login_data['role']}"
            }
            
        if user["password"] == login_data["password"]:
            return {
                "success" : True,
                "message" : "Login Successful",
                "user" : {
                    "user_name" : user["user_name"],
                    "name" : user["name"],
                    "role" : user["role"],
                    "email" : user["email"]
                }
            }
        else: 
            return {
                "success" : False,
                "message" : "Invalid Password"
            }
            
    else:
        return {
            "success" : False,
            "message" : "User Not Found"
        }
```

### `backend/prompt.py`

```text
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

### `backend/requirements.txt`

```text
annotated-doc==0.0.5
annotated-types==0.8.0
anyio==4.15.1
certifi==2026.7.22
cffi==2.1.1
charset-normalizer==3.5.1
click==8.5.0
cryptography==50.0.1
distro==1.9.0
dnspython==2.8.0
fastapi==0.141.1
google-auth==2.58.1
google-genai==2.25.0
h11==0.16.0
httpcore==1.0.9
httpx==0.28.1
idna==3.20
pyasn1==0.6.4
pyasn1_modules==0.4.2
pycparser==3.0
pydantic==2.13.5
pydantic_core==2.46.5
pymongo==4.18.2
python-dotenv==1.2.3
requests==2.34.2
sniffio==1.3.1
starlette==1.7.0
tenacity==9.1.4
typing-inspection==0.4.4
typing_extensions==4.16.0
urllib3==2.8.0
uvicorn==0.54.0
websockets==16.1.1

```

### `backend/scoring.py`

```text
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
                    i["question_id"] : {
                        "question" : i["question"],
                        "correct_answer":i["correct_option"],
                        "user_answer":value,
                        "answer" : (i["correct_option"] == value),
                        "score" : (10 if i["correct_option"] == value else 0)
                        },})
                            
    return {
        "company_id" : None,
        "candidate_id" : None,
        "score_board" : score_board,
        "total_questions" : total_questions
        }
    
r = score_candidate(user_answers, correct_answers)

def inertview_collection(score):
    pass
```

### `frontend/AI-HR/src/component/candidate/CandidateProfile.jsx`

```text
import {useState, useEffect} from "react";
import { getCandidate } from "../../services/api";

function CandidateProfile(){

    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        async function fetchCandidateData(){
            const data = await getCandidate();

            setCandidateData(data);
        }
        fetchCandidateData()
    })
    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateData?.candidate?.name}</h2>
                <p>{candidateData?.candidate?.summary}</p>
                <p>{candidateData?.candidate?.skills}</p>
            </div>
        </div>
    )
}

export default CandidateProfile
```

### `frontend/AI-HR/src/component/candidate/CandidateProfileSetUp.jsx`

```text
import { handelSubmit } from "../../services/api";
import { useState } from "react";

function CandidateProfileSetUp() {

    const [candidateName, setCandidateName] = useState("");
    const [phone, setPhone] = useState("");
    const [summary, setSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");

    const candidateProfile = {
        name: candidateName,
        phone: phone,
        summary: summary,
        skills: skills,
        experience: experience,
        education: education
    };

    return(
        <div className="candidate-profile-setup">
            <form action="" method="post" handleSubmit={(e) => handelSubmit({e, data:candidateProfile, endpoint:"candidate-profile-setup"})}>
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

```text
import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api";

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
    
    return(
        <div className="candidate-form-page data-form-page">
            <div className="form-page">
                <h2>Candidate Sign Up</h2>
                <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:candidate, endpoint:"candidate-signup"})}>
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

### `frontend/AI-HR/src/component/company/CompanyProfile.jsx`

```text
import { getCompanies } from "../../services/api"
import { useEffect, useState } from "react"

function CompanyProfile(){
    const [companyData, setCompanyData] = useState(null);
    
    useEffect(() =>{
        async function fetchCompanyData() {
            try{
                const data = await getCompanies();

                setCompanyData(data);
            }catch (error){
                console.log("Error fetching company data:", error);
            }
        }
        fetchCompanyData();
    },)
    
    console.log("Company Data:", companyData);
    return (
        <div className="company-profile-page">
            <div className="company-profile">
                <h2>{companyData?.company?.company_name}</h2>
                <p>Industry: {companyData?.company?.industry}</p>
                <p>{companyData?.company?.company_description}</p>
            </div>
        </div>
    )
}

export default CompanyProfile
```

### `frontend/AI-HR/src/component/company/CompanyProfileSetUp.jsx`

```text
import { useState } from "react";
import { handelSubmit } from "../../services/api";

function CompanyProfileSetUp() {
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [industry, setIndustry] = useState("");

    const companyDetail = {
        company_name: companyName,
        company_description: companyDescription,
        industry: industry,
    };

    return (
        <div className="company-profile-setup-page">
            <div className="company-profile-setup-form">
                <form
                    action=""
                    method="post" onSubmit={(e) => handelSubmit({ e, data: companyDetail, endpoint: "company-profile-setup" })}
                >
                    <label htmlFor="company-name" className="company-name-label">   Company Name</label>
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
                </form>
            </div>
        </div>
    )

}

export default CompanyProfileSetUp

```

### `frontend/AI-HR/src/component/company/CompanySignUp.jsx`

```text
import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api"

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

    return (
        <div className="company-data-page data-form-page">
            <div className="form-page">
                <h2>Company Sign Up</h2>
                <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:companyDetail, endpoint:"company-signup"})}>
                    
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

### `frontend/AI-HR/src/component/LoginAs.jsx`

```text
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

```text
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

### `frontend/AI-HR/src/services/api.js`

```text
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
export async function getQuestions(){
    const res = await fetch(`${API}/questions`)

    if(!res.ok){
        throw new Error("Failed to fetch data!");
        
    }
    return res.json()
}

// Handel form submission for every page
export async function handelSubmit({e, data, endpoint}){
    e.preventDefault();

    try{

        const response = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method : "POST",
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        return result;
    }catch (error){
        console.error("API Error :",error)
    }
}
```

### `frontend/AI-HR/src/styles/candidate_form.css`

```text
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

### `frontend/AI-HR/src/styles/LoginAs.css`

```text
.login-page{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-page .login-select{
    justify-content: center;
    align-items: center;
    width: 400px;
    height: auto;
    border: 2px solid black;
}

.login-select h2{
    width: 100%;
    margin: 10px;
    padding: 5px 2px;
}

.login-select .login-select-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 10px;
}

.login-select .login-select-btn button{
    width: 150px;
}



```

### `frontend/AI-HR/src/App.css`

```text
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

### `frontend/AI-HR/src/App.jsx`

```text
import CandidateProfile from "./component/candidate/CandidateProfile"
import CompanyProfile from "./component/company/CompanyProfile"
import LoginAs from "./component/LoginAs"
import { BrowserRouter , Routes , Route } from "react-router-dom"

function App(){

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginAs />}/>

        <Route path="/candidate-profile"
        element={<CandidateProfile/>}/>

        <Route path="/company-profile"
        element={<CompanyProfile/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### `frontend/AI-HR/src/index.css`

```text
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}

```

