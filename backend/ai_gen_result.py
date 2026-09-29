import os

from dotenv import load_dotenv
from google import genai
import json

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

        COMPANY INFORMATION:
        {company}

        CANDIDATE INFORMATION:
        {candidate}

        Return ONLY valid JSON in this format:

        {{
            "eligibility": "ELIGIBLE or NOT_ELIGIBLE",
            "matched_project": "project name or null",
            "matched_role": "role name or null",
            "reason": "short explanation"
        }}
        """
        )

    str_data = response.text
    # data = json.loads(str_data)

    return str_data