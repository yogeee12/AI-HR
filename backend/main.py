from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_gen_result import analyze_candidate
from database import candidates_collections, companies_collections

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

# get candidate detail and save in db
@app.post("/candidate")
def receive_candidate(candidate : dict):
    print(candidate)
    
    result = candidates_collections.insert_one(candidate)
    
    return {
        "message" : "Candidate recevied",
        "candidate" : candidate,
        "candidate_id" : str(result.inserted_id)
    }
    
# get company detail ans save in db 
@app.post("/company-details")
def receive_company_detail(companyDetail : dict):
    print(companyDetail)
    
    result = companies_collections.insert_one(companyDetail)
    return {
        "message" : "Company Detail Received",
        "Company" : companyDetail,
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
    
    companies = list(companies_collections.find())

    for company in companies:
        company["_id"] = str(company["_id"])

    return companies

# send candidate data to react
@app.get("/candidate")
def get_candidate():
    
    user = list(candidates_collections.find())
    
    for candidate in user:
        candidate["_id"] = str(candidate["_id"])
        
    return user
