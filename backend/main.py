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