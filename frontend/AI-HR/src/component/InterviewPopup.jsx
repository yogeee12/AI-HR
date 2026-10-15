import { useState } from "react";
import { handelSubmit, startInterview } from "../services/api";
import "../styles/interview_popup.css"

function InterviewPopup({job, interviewId, onClose}){
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userAnswers, setUserAnswers] = useState({})
    const [questions, setQuestions] = useState(null); 

    async function handelStartInterview(){
        try{
            setLoading(true);
            setError("");

            const data = await startInterview(interviewId)
            
            setQuestions(data);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false)
        }
    }


    const payload = {
        interview_id : interviewId,
        answers : userAnswers,

    }
        console.log("Answer to send :", payload)
    

    return(
        <div className="interview-overlay">
            <div className="interview-popup">
                <button
                className="popup-close"
                onClick={onClose}
                type="button">
                    x
                </button>
                {!questions ? (
                    <>
                    <p className="popup-label">AI-HR Interview</p>

                    <h2>{job.company_name || "Company"}</h2>
                    <h2>{job.job_title}</h2>

                    <p>{job.description}</p>
                    <p>
                        <strong>Location:</strong>{" "}
                        {job.location || "Not specified"}
                    </p>
                    <p>
                        <strong>Experience:</strong>{" "}
                        {Array.isArray(job.required_skills)
                            ? job.required_skills.join(",")
                            : job.required_skills || "Not specified"
                        }
                    </p>
                    <button className = "start-interview-button"
                    onClick={handelStartInterview}
                    disabled={loading}
                    type="button">
                        {
                            loading 
                            ? "Preparing Interview..."
                            : "Start Interview"
                        }
                    </button>
                    </>
                ):(
                    
                    <>
                    <form action="" onSubmit={ async (e) => {
                        const result = await handelSubmit({e, data:payload, endpoint:"answers"})

                        if(result?.success){
                            onClose()      
                        }
                    }}>
                        <p className="popup-label">YOUR INTERVIEW</p>
                        <h2>Interview Questions</h2>

                        {questions.map((question, index) => (
                            <div
                                className="interview-question"
                                key={question.question_id || index}
                            >
                                <h3>
                                    {index + 1}. {question.question}
                                </h3>

                                {[1, 2, 3, 4].map((optionNumber) => {
                                    const optionValue = `option_${optionNumber}`;

                                    return (
                                        <label
                                            className="interview-option"
                                            key={optionNumber}
                                        >
                                            <input 
                                            type="radio"
                                            name={`question_${question.question_id || index}`}
                                            value={optionNumber}
                                            checked={
                                                userAnswers[question.question_id] === optionNumber
                                            }
                                            onChange={() => 
                                                setUserAnswers((previousAnswers) => ({
                                                    ...previousAnswers,
                                                    [question.question_id] : optionNumber,
                                                }))
                                            }
                                             />
                                             <span>
                                                {optionNumber}. {question[optionValue]}
                                             </span>
                                        </label>
                                    )
                                })}
                            </div>
                        ))}
                    <button type="submit">Submit</button>

                    </form>
                    </>

                )}
                {error && (
                    <p className="interview-error">{error}</p>
                )}

            </div>
        </div>
    )
}

export default InterviewPopup