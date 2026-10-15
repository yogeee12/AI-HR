from bson import ObjectId
from database import interview_collections
from datetime import datetime
from data_extract import get_answers, get_questions

def question_update(interview_id, questions):
  if not interview_id:
    return False
  
  total_question = len(questions)
  
  interview_filter = {
    "_id" : ObjectId(interview_id)
  }
  
  updates = {
    "$set" : {
      "questions" : questions,
      "started_at" : datetime.now(),
      "total_questions" : total_question
    }
  }
  
  interview_collections.update_one(
    interview_filter,
    updates
    )
  
  return True
  
def score_candidate(interview_id , candidate_answers, correct_answers):
    if not candidate_answers and not correct_answers: 
      return False
    total_socre = 0 
    correct_answer = 0
    score_board = []
    for i in correct_answers:
        for key, value in candidate_answers.items():
          value-=1
          if i["question_id"] == key:
            score_board.append({
                i["question_id"] : {
                "question" : i["question"],
                "correct_answer":i["correct_option"],
                "user_answer": i["options"][value],
                "answer" : (i["correct_option"] == value),
                "score" : (10 if i["correct_option"] == value else 0)
                },})
            
    for ques in score_board:
      for i in ques:
        total_score += i["score"]      
        correct_answer += [1 if i["answer"] else 0]
      
    interview_filter = {
        "_id" : ObjectId(interview_id)
      }
    
    upadtes = {
      "$set" : {
        "result" : "completed",
        "score_board" : score_board,
        "total_score" : total_socre,
        "correct_answers" : correct_answer,
        "completed_at" : datetime.now()
      }
    } 
    
    interview_collections.update_one(
      interview_filter,
      upadtes
    )
    
    return True