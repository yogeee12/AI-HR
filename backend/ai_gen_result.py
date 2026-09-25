import os

from dotenv import load_dotenv
from google import genai
from data import company, candidate, responsibility
import json

load_dotenv()
def ai_result():
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=f"""
        You are an experienced HR and technical interviewer for NovaTech Labs.

        COMPANY INFORMATION : {company}

        CANDIDATE INFORMATION : {candidate}
        
        {responsibility}
        """
        )

    str_data = response.text
    data = json.loads(str_data)

    return data