from bson import ObjectId
from database import interview_collections
from datetime import datetime


def question_update(interview_id, questions, answer, job):
    if not interview_id:
        return False

    interview_filter = {
        "_id": ObjectId(interview_id)
    }

    all_questions = list(questions or [])
    all_answers = list(answer or [])
    custom_questions = (job or {}).get("custom_question") or []

    if custom_questions:
        for index, ques in enumerate(custom_questions, start=1):
            if ques.get("type") == "MCQ":
                question_id = f"q{len(all_questions) + index}"
                custom_question = {
                    "question_id": question_id,
                    "type": "MCQ",
                    "question": ques["question"],
                    "option_1": ques["options"][0],
                    "option_2": ques["options"][1],
                    "option_3": ques["options"][2],
                    "option_4": ques["options"][3],
                }

                custom_answer = {
                    "question_id": question_id,
                    "correct_option_id": ques["correct_option"],
                    "options": {
                        "0": ques["options"][0],
                        "1": ques["options"][1],
                        "2": ques["options"][2],
                        "3": ques["options"][3],
                    },
                    "correct_option": ques["options"][ques["correct_option"]],
                }

                all_questions.append(custom_question)
                all_answers.append(custom_answer)

    updates = {
        "$set": {
            "questions": all_questions,
            "started_at": datetime.now(),
            "total_questions": len(all_questions),
            "correct_answer": all_answers,
        }
    }

    interview_collections.update_one(interview_filter, updates)

    interview = interview_collections.find_one(interview_filter)

    if interview:
        return interview.get("questions", [])

    return []


def score_candidate(interview_id, candidate_answers, correct_answers):
    if not interview_id or not candidate_answers or not correct_answers:
        return False

    if not isinstance(candidate_answers, dict):
        return False

    total_score = 0
    correct_count = 0
    score_board = []

    answers_by_question = {}
    for question_id, selected_option in candidate_answers.items():
        try:
            answers_by_question[str(question_id)] = int(selected_option)
        except (TypeError, ValueError):
            continue

    for question in correct_answers:
        if not isinstance(question, dict):
            continue

        question_id = str(question.get("question_id"))
        if question_id not in answers_by_question:
            continue

        selected_option = answers_by_question[question_id]
        selected_index = int(selected_option)
        is_correct = question.get("correct_option_id") == selected_index

        score = 10 if is_correct else 0

        if is_correct:
            correct_count += 1

        total_score += score

        if question.get("type") == "MCQ":
            options = question.get("options") or {}
            if isinstance(options, dict):
                user_answer = options.get(str(selected_index), options.get(selected_index))
            elif isinstance(options, list):
                user_answer = options[selected_index] if 0 <= selected_index < len(options) else None
            else:
                user_answer = None

            score_board.append({
                question_id: {
                    "type": question.get("type"),
                    "correct_answer": question.get("correct_option"),
                    "user_answer": user_answer,
                    "answer": is_correct,
                    "score": score,
                }
            })

    interview_filter = {
        "_id": ObjectId(interview_id)
    }

    updates = {
        "$set": {
            "status": "completed",
            "result": "Pass" if total_score > 20 else "Fail",
            "score_board": score_board,
            "total_score": total_score,
            "correct_answers_no": correct_count,
            "completed_at": datetime.now(),
        }
    }

    result = interview_collections.update_one(interview_filter, updates)

    if result.matched_count == 0:
        return False

    return True