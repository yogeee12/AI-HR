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