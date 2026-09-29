from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_gen_result import analyze_candidate

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

@app.post("/candidate")
def receive_candidate(candidate : dict):
    print(candidate)
    
    return {
        "message" : "Candidate recevied",
        "candidate" : candidate
    }
    
@app.post("/company-details")
def receive_company_detail(companyDetail : dict):
    print(companyDetail)
    
    return {
        "message" : "Company Detail Received",
        "Company" : companyDetail
    }
    
@app.post("/analyze")
def analyze(data : dict):
    
    company = data["company"]
    candidate = data["candidate"]
    
    result = analyze_candidate(company=company, candidate=candidate)
    
    return result 