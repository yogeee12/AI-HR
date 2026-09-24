from fastapi import FastAPI
import requests

app = FastAPI()

response = requests.post(
    "http://localhost:5678/webhook-test/python-test"
     json={
        "candidate_name": "Rahul",
        "job_role": "Python Backend Developer",
        "experience": 2,
        "skills": ["Python", "FastAPI"]
    }
)