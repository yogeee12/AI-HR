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
    account_id = account_id["account_id"]
    role = account["role"]
    
    if role == "candidate":
        profile = candidates_collections.find_one({"account_id" : account_id})
    else:
        profile = companies_collections.find_one({"account_id" : account_id})
        
    if not profile:
        raise HTTPException(
            status_code = 404,
            detail = "Profofie Not found . Please complete profile setup"
        )
    
    profile["_id"] = str(profile["_id"])
    
    return profile