import json

def get_questions(data):

    questions = data["questions"]
    result = []
    for ques in questions:
        option = ques["options"] 
        result.append({
            "question_id" : ques["question_id"],
            "question" : ques["question"],
            "option_1" : option[0],
            "option_2" : option[1],
            "option_3" : option[2],
            "option_4" : option[3]
        },)

    return result

def get_answers(data):
    questions = data["questions"]
    result = []
    for ques in questions:
        result.append({
            "question_id" : ques["question_id"],
            "question" : ques["question"],
            "correct_option" : ques["correct_option"]
        },)

    return result