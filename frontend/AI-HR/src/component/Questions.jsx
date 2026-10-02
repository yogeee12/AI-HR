import { useState, useEffect, cache } from "react";
import { getQuestions, handelSubmit } from "../services/api";

function Questions(){

    const [questions, setQuestions] = useState([]);
    const [answers , setAnswers] = useState({});

    const [loading, setLoading] = useState(true)

    function handleAnswer(questionId , optionIndex){
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }))
    }

    useEffect(() => {
        async function loadQuestions() {
            try{

                const data = await getQuestions();

                setQuestions(data)  
            }catch (error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        loadQuestions();
    },[])

    if(loading){
        return <p>Loading...</p>
    }


    return (
        <div className="question-bank-page">
            <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:answers, endpoint:"answers"})}>
                <div className="question-page">
                    <h2>Test</h2>
                <div className="questions-answer">
                    {questions.map((ques) => (
                        <div className="ques">
                            <h4>{ques.question}</h4>
                            <ul>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 0)}/>
                                    <label>{ques.option_1}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 1)}/>
                                    <label>{ques.option_2}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id}
                                    value={null} onChange={() => handleAnswer(ques.question_id, 2)}/>
                                    <label>{ques.option_3}</label>
                                </li>
                                <li>
                                    <input type="radio" name={ques.question_id} 
                                    value={null} onChange={() => handleAnswer(ques.question_id, 3)}/>
                                    <label>{ques.option_4}</label>
                                </li>
                            </ul>
                        </div>
                    ))
                    }
                </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    
}

export default Questions