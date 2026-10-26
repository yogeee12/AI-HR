from bson import ObjectId
from database import interview_collections
from datetime import datetime

def question_update(interview_id, questions, answer, job):
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
  custom_questions = job["custom_question"]

  if len(custom_questions) > 0:
        for ques in custom_questions:
            if ques["type"] == "MCQ":
                custom_question = {
                    "question_id" : f"q{len(questions)+1}",
                    "type" : "MCQ",
                    "question" : ques["question"],
                    "option_1" : ques["options"][0],
                    "option_2" : ques["options"][1],
                    "option_3" : ques["options"][2],
                    "option_4" : ques["options"][3],
                }

                cutsom_answer = {
                    "question_id" : f"q{len(questions)+1}",
                    "correct_option_id" : ques["correct_option"],
                    "options" : {
                        "0" : ques["options"][0],
                        "1" : ques["options"][1],
                        "2" : ques["options"][2],
                        "3" : ques["options"][3],
                    },
                    "correct_option" : ques["options"][ques["correct_option"]]
                }

                updates = {
                    "$push" : {
                        "questions" : custom_question,
                        "correct_answer" : cutsom_answer
                    }
                }
                interview_collections.update_one(
                    interview_filter,
                    updates
                )

            # elif ques["type"] == "text":
            #     custom_question = {
            #                         "question_id" : f"q{len(questions)+1}",
            #                         "type": "text",
            #                         "question" : ques["question"],
            #                         }

            #     updates = {
            #         "$push" : {
            #             "question" : custom_question,
            #            }
            #     }
            #     interview_collections.update_one(
            #         interview_filter,
            #         updates
            #     )

  interview = interview_collections.find_one(interview_filter)

  if interview :
    return interview.get("questions",[])

  return []


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
        
        if question["type"] == "MCQ":
            
            score_board.append({
                question_id: {
                    "type" : question["type"],
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