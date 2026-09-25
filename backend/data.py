company = {

    "company_name": "NovaTech Labs",

    "company_description":
        "A software company that builds data and automation platforms",

    "industry": "IT",

    "job_fields": [

        {
            "job_title": "Python Developer",

            "job_description":
                "Develop backend applications and APIs using Python.",

            "active_employees": 3
        },

        {
            "job_title": "Java Developer",

            "job_description":
                "Develop and maintain Java backend applications.",

            "active_employees": 4
        },

        {
            "job_title": "Social Media Management",

            "job_description":
                "Manage social media content and campaigns.",

            "active_employees": 1
        },

        {
            "job_title": "Accountant",

            "job_description":
                "Manage financial records and accounting operations.",

            "active_employees": 2
        }
    ],

    "projects": [

        {
            "project_title": "FinSight",

            "project_description":
                "A financial data analysis platform that collects "
                "market data and provides analytics through APIs and dashboards.",

            "role_required": "Python Backend Developer",

            "skills_required": [
                "Python",
                "FastAPI",
                "PostgreSQL",
                "REST API"
            ],

            "min_experience": 1,

            "current_status": "Live"
        },

        {
            "project_title": "AgroVision",

            "project_description":
                "An agriculture platform that analyzes crop and "
                "field data to help farmers make better decisions.",

            "role_required": "Python ML Developer",

            "skills_required": [
                "Python",
                "Pandas",
                "NumPy",
                "Machine Learning"
            ],

            "min_experience": 2,

            "current_status": "Under Development"
        }
    ]
}


candidate = {

    "name": "Rahul Sharma",

    "summary":
        "Python developer interested in backend development.",

    "experience_years": 2,

    "skills": [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Git"
    ],

    "experience": [

        {
            "company": "ABC Technologies",

            "role": "Python Developer",

            "duration_years": 2,

            "description":
                "Developed REST APIs using Python and FastAPI."
        }
    ],

    "education": {

        "degree": "BCA",

        "field": "Computer Applications"
    }
}

responsibility = """
YOUR RESPONSIBILITY

    You are conducting a technical pre-screening interview.

    First, compare the candidate's information with the available project requirements.

    Determine which project and role best matches the candidate.

    Consider:

    - Applied role
    - Required role
    - Candidate experience
    - Required skills
    - Candidate skills
    - Relevance of the candidate's skills to the project


    ELIGIBILITY

    If the candidate does not meet the basic requirements for any available project, return:

    NOT_ELIGIBLE

    If the candidate meets the basic requirements for a project, return:

    ELIGIBLE


    INTERVIEW QUESTIONS

    If the candidate is ELIGIBLE:

    Generate EXACTLY 5 multiple-choice technical questions.

    The questions must be relevant to:

    - The matched project
    - The matched role
    - The required skills
    - The candidate's stated experience

    Keep the questions at an appropriate difficulty level for the candidate.

    Start with relatively easy technical questions and gradually increase the difficulty.

    Each question must have EXACTLY 4 options.

    Only ONE option must be correct.

    The other three options must be incorrect but believable.

    Do not create ambiguous questions.

    Do not create questions where multiple options could reasonably be considered correct.

    Do not provide explanations to the candidate.

    Do not reveal the correct answer in the question or options.


    OUTPUT FORMAT

    Return ONLY valid JSON.

    If the candidate is eligible, return:

    {
    "eligibility": "ELIGIBLE",
    "matched_project": "project name",
    "matched_role": "role name",
    "questions": [
        {
        "question_number": 1,
        "question": "Question text",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correct_option": "A"
        },
        {
        "question_number": 2,
        "question": "Question text",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correct_option": "B"
        },
        {
        "question_number": 3,
        "question": "Question text",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correct_option": "C"
        },
        {
        "question_number": 4,
        "question": "Question text",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correct_option": "D"
        },
        {
        "question_number": 5,
        "question": "Question text",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correct_option": "A"
        }
    ]
    }

    If the candidate is NOT eligible, return:

    {
    "eligibility": "NOT_ELIGIBLE",
    "matched_project": null,
    "matched_role": null,
    "questions": []
    }


    IMPORTANT RULES

    1. Generate exactly 5 questions.
    2. Every question must have exactly 4 options.
    3. Only one option can be correct.
    4. The correct answer must be represented only by A, B, C, or D.
    5. Do not reveal the correct answer anywhere except the "correct_option" field.
    6. Do not ask open-ended questions.
    7. Do not ask the candidate to write explanations.
    8. Do not make assumptions about skills or experience that the candidate has not provided.
    9. Return ONLY valid JSON. Do not use Markdown or ```json code fences.
"""