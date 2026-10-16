from bson import ObjectId
from database import interview_collections
from datetime import datetime
from data_extract import get_answers, get_questions

def question_update(interview_id, questions, answer):
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
      "total_questions" : total_question,
      "correct_answer" : answer
    }
  }
  
  interview_collections.update_one(
    interview_filter,
    updates
    )
  
  return True
  

def score_candidate(interview_id, candidate_answers, correct_answers):
    if not candidate_answers or not correct_answers:
        return False

    total_score = 0
    correct_count = 0
    score_board = []

    # Convert the submitted answers into a dictionary:
    # {"q1": 1, "q2": 3, ...}
    
    answers_by_question = {
        question_id: int(selected_option)
        for question_id , selected_option in candidate_answers.items()
    }

    for question in correct_answers:
        question_id = question["question_id"]

        # Skip questions the candidate didn't answer
        if question_id not in answers_by_question:
            continue

        selected_option = answers_by_question[question_id]

        # Your options are indexed from 0 to 3
        selected_index = selected_option - 1
        is_correct = (
            question["correct_option_id"] == selected_index
        )

        score = 10 if is_correct else 0

        if is_correct:
            correct_count += 1

        total_score += score

        score_board.append({
            question_id: {
                "correct_answer": question["correct_option"],
                "user_answer": question["options"][str(selected_index)],
                "answer": is_correct,
                "score": score
            }
        })

    interview_filter = {
        "_id": ObjectId(interview_id)
    }

    updates = {
        "$set": {
            "status" : "completed",
            "result":  "Pass" if total_score > 20 else "Fail",
            "score_board": score_board,
            "total_score": total_score,
            "correct_answers_no": correct_count,
            "completed_at": datetime.now()
        }
    }

    result = interview_collections.update_one(
        interview_filter,
        updates
    )

    if result.matched_count == 0:
        return False

    return True