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