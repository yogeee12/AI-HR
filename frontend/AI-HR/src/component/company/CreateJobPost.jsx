import { useState } from "react"
import { handelSubmit } from "../../services/api";
import "../../styles/creat_job_post.css"

function CreateJobPost({onClose}){

    const [jobTitle , setJobTitle] = useState("");
    const [description , setDescription] = useState("");
    const [requiredSkills , setRequiredSkills] = useState("");
    const [experience , setExperience] = useState("");
    const [location , setLocation] = useState("");
    
    const [questions, setQuestions] = useState([]);

    function addNewQuestion() {
        setQuestions(prev => [
            ...prev,
            {
                id: Date.now(),
                type: "Text",
                question: "",
                options: ["", "", "", ""],
                correct_option: 0
            }
        ]);
    }

    function updateQuestion(questionId, field, value) {
        setQuestions(prev =>
            prev.map(q =>
                q.id === questionId
                    ? { ...q, [field]: value }
                    : q
            )
        );
    }

    function updateOption(questionId, optionIndex, value) {
        setQuestions(prev =>
            prev.map(q =>
                q.id === questionId
                    ? {
                        ...q,
                        options: q.options.map((option, index) =>
                            index === optionIndex ? value : option
                        )
                    }
                    : q
            )
        );
    }

    function removeQuestion(questionId) {
        setQuestions(prev =>
            prev.filter(q => q.id !== questionId)
        );
    }

    const jobDetails = {
        job_title : jobTitle,
        description : description,
        required_skills : requiredSkills,
        min_experience : experience,
        location : location,
        custom_question : questions,
    }

    return(
        <div className="job-modal-overlay" onClick={onClose}>
            <div 
            className="job-model"
            onClick={(e) => e.stopPropagation()}>
                <div className="job-modal-header">
                    <div>
                        <h2>Post a job</h2>
                    </div>
                    <button 
                    type="button"
                    className="job-model_close"
                    onClick={onClose}
                    aria-label="Close form"
                    >
                        &times;
                        </button>
                </div>
                <form action="" onSubmit={async (e) => {

                    const result = await handelSubmit({e, data:jobDetails, endpoint:"job-details"})

                    if (result?.success){
                        onClose();
                    }
                    }}>

                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name="job-title" className="job-title-input" onChange={(e) => setJobTitle(e.target.value)}/>

                    <label htmlFor="job-description">Job Description</label>
                    <textarea name="job-description" className="job-description-input" onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor="job-required-skills">Required Skills</label>
                    <input type="text" name="job-required-skills" className="job-required-skills-input" onChange={(e) => setRequiredSkills(e.target.value)}/>

                    <label htmlFor="job-min-experience">Minimum Experience</label>
                    <input type="number" name="job-min-experience" className="job-min-experience-input" step="any" onChange={(e) => setExperience(e.target.value)}/>

                    <label htmlFor="job-location">Location</label>
                    <input type="text" name="job-location" className="job-location-input" onChange={(e) => setLocation(e.target.value)}/>

                    <div className="add-questions">

                        {questions.map((q, index) => (
                            <div className="user-question" key={q.id}>

                                <div className="question-heading">
                                    <h3>Question {index + 1}</h3>

                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(q.id)}
                                    >
                                        Remove
                                    </button>
                                </div> 

                                <label htmlFor={`question-${q.id}`}>
                                    Write Question
                                </label>

                                <textarea
                                    id={`question-${q.id}`}
                                    value={q.question}
                                    placeholder="Enter your question..."
                                    onChange={e =>
                                        updateQuestion(q.id, "question", e.target.value)
                                    }
                                    required
                                />

                                <label htmlFor={`type-${q.id}`}>
                                    Question Type
                                </label>

                                <select
                                    id={`type-${q.id}`}
                                    value={q.type}
                                    onChange={e =>
                                        updateQuestion(q.id, "type", e.target.value)
                                    }
                                >
                                    <option value="Text">Text</option>
                                    <option value="MCQ">MCQ</option>
                                </select>

                                {q.type === "MCQ" && (
                                    <div className="mcq-options">

                                        {q.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                <label>
                                                    Option {optionIndex + 1}
                                                </label>

                                                <input
                                                    type="text"
                                                    value={option}
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    onChange={e =>
                                                        updateOption(
                                                            q.id,
                                                            optionIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        ))}

                                        <label htmlFor={`correct-${q.id}`}>
                                            Correct Answer
                                        </label>

                                        <select
                                            id={`correct-${q.id}`}
                                            value={q.correct_option}
                                            onChange={e =>
                                                updateQuestion(
                                                    q.id,
                                                    "correct_option",
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {q.options.map((option, optionIndex) => (
                                                <option
                                                    key={optionIndex}
                                                    value={optionIndex}
                                                >
                                                    Option {optionIndex + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addNewQuestion}
                            className="add-question"
                        >
                            Add Question +
                        </button>

                   </div>

                    <div className="job-modal-actions">
                        <button
                            type="button"
                            className="job-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="job-submit-btn"
                        >
                            Publish Job
                        </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CreateJobPost