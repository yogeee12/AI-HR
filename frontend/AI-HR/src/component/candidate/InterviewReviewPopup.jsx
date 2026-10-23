import "../../styles/interview_review_popup.css"

function InterviewReviewPopup({ interview, onClose }) {
    const questions = interview.questions || []
    const scoreBoard = interview.score_board || []

    function getQuestionResult(questionId) {
        return scoreBoard.find(
            item => item[questionId] !== undefined
        )?.[questionId]
    }

    return (
        <div className="review-overlay" onClick={onClose}>
            <section
                className="review-modal"
                onClick={event => event.stopPropagation()}
            >
                <header className="review-header">
                    <div>
                        <h2>Interview Performance</h2>
                        <p>
                            {interview.company_name || "Company"} ·{" "}
                            {interview.job_title || "Interview"}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="review-close"
                        onClick={onClose}
                        aria-label="Close interview review"
                    >
                        ×
                    </button>
                </header>

                <div className="review-summary">
                    <div>
                        <span>Total Score</span>
                        <strong>{interview.total_score ?? 0}</strong>
                    </div>

                    <div>
                        <span>Correct Answers</span>
                        <strong>
                            {interview.correct_answers_no ?? 0}/
                            {interview.total_questions ?? questions.length}
                        </strong>
                    </div>

                    <div>
                        <span>Result</span>
                        <strong>{interview.result || "Pending"}</strong>
                    </div>
                </div>

                <div className="review-questions">
                    {questions.map((question, index) => {
                        const result = getQuestionResult(question.question_id)
                        const isCorrect = result?.answer === true

                        return (
                            <article
                                className="review-question-card"
                                key={question.question_id || index}
                            >
                                <h3>
                                    Q{index + 1}. {question.question}
                                </h3>

                                <p className="review-answer-label">
                                    Your answer
                                </p>
                                <p className="review-user-answer">
                                    {result?.user_answer || "No answer recorded"}
                                </p>

                                <p className="review-answer-label">
                                    Correct answer
                                </p>
                                <p className="review-correct-answer">
                                    {result?.correct_answer || "Not available"}
                                </p>

                                <footer className="review-question-footer">
                                    <span className={isCorrect ? "review-correct" : "review-incorrect"}>
                                        {isCorrect ? "Correct" : "Incorrect"}
                                    </span>

                                    <strong>
                                        {result?.score ?? 0}/10 marks
                                    </strong>
                                </footer>
                            </article>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default InterviewReviewPopup
