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