user_answers = {'q1': 0, 'q2': 1, 'q3': 2, 'q4': 0, 'q5': 1}

correct_answers = [
  {
    'question_id': 'q1', 
    'question': 'In Python, which of the following methods is used to safely retrieve a value from a dictionary without raising a KeyError if the key does not exist?', 
    'correct_option': 0
  }, 
  {
    'question_id': 'q2', 
    'question': 'In FastAPI, how do you define a path parameter in a route decorator?', 
    'correct_option': 1
  }, 
  {
    'question_id': 'q3', 
    'question': 'Which SQL clause is used to filter the results of a GROUP BY query based on a specified condition?', 
    'correct_option': 2
  }, 
  {
    'question_id': 'q4', 
    'question': 'Which HTTP method is typically used to update an existing resource completely or replace it in a RESTful API?', 
    'correct_option': 3
  }, 
  {
    'question_id': 'q5', 
    'question': 'Which library does FastAPI natively use for data validation and settings management via Python type hints?', 
    'correct_option': 0
  }
]

def score_candidate(user_answers, correct_answers):
    total_questions = len(correct_answers)
    score_board = []
    for i in correct_answers:
        for key, value in user_answers.items():
            if i["question_id"] == key:
                score_board.append({
                    i["question_id"] : {
                        "question" : i["question"],
                        "correct_answer":i["correct_option"],
                        "user_answer":value,
                        "answer" : (i["correct_option"] == value),
                        "score" : (10 if i["correct_option"] == value else 0)
                        },})
                            
    return {
        "company_id" : None,
        "candidate_id" : None,
        "score_board" : score_board,
        "total_questions" : total_questions
        }
    
r = score_candidate(user_answers, correct_answers)

def inertview_collection(score):
    pass