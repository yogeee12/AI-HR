import { useState, useEffect } from "react"
import { getAllInterviewRounds } from "../../services/api"
import "../../styles/candidate_interview.css"
import InterviewReviewPopup from "./InterviewReviewPopup";

function CandidateInterviewDashboard(){
    const [allInterview, setAllInterview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInterview , setSelectedInterview] = useState(null)
    
    const storedUser = localStorage.getItem("current_user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const user_id = user?.id ? String(user.id) : "";
    const user_role = user?.role ? String(user.role) : "";

    useEffect(() => {
        async function fetchInetrview() {
            if (!user_id) {
                setError("Candidate account could not be identified.");
                setLoading(false);
                return;
            }

            try{
                const data = await getAllInterviewRounds(user_id, user_role);

                setAllInterview(Array.isArray(data) ? data : []);
            }catch(err){
                console.error("Error fetching interviews :", err);
                setError("Unable to load applied data. please try again")
            }finally{
                setLoading(false)
            }
        }
        fetchInetrview();
    }, [user_id,user_role])

    const appliedcount = allInterview.filter(
        (interview) => interview.status === "completed"
    ).length;

    const avgerageScore = appliedcount
        ? Math.round(
            allInterview
            .filter((interview) =>  interview.status?.toLowerCase() === "completed")
            .reduce((sum, interview) => sum + (Number(interview.total_score) || 0),0)
            / appliedcount
        )
        : 0;
    return (
        <main className="candidate-dashboard">
            <section className="candidate-dashboard-header">
                <div>
                    <h1>Interview Dashboard</h1>
                    <p className="company-subtitle">
                        Track your interview performance.
                    </p>
                    <div className="dashboard-header-icon">✦</div>
                </div>
            </section>
            <section className="candidate-stats">
                <article className="candidate-stat-card">
                    <span>Total Interview</span>
                    <strong>{allInterview.length}</strong>
                </article>

                <article className="candidate-stat-card">
                    <span>Completed Interview</span>
                    <strong>{appliedcount}</strong>
                </article>

                <article className="candidate-stat-card">
                    <span>Avg Score</span>
                    <strong>{avgerageScore}</strong>
                </article>
            </section>

            <section className="candidate-interview-section">
                <div className="candidate-table-heading">
                    <div>
                        <h2>Applied Interview</h2>
                        <p>Review your Interview result and status</p>
                    </div>
                    <span className="interview-count">
                        {allInterview.length} records
                    </span>
                </div>

                { loading ? (
                    <p className="dashboard-message">Loading...</p>
                ) : error ? (
                    <p className="dashboard-message dashboard-error">{error}</p>
                ) : allInterview.length === 0 ? (
                    <div className="dashboard-empty">
                        <div className="empty-icon">♧</div>
                        <h3>No interviews yet</h3>
                        <p>Interviews details will appear here when you apply for job</p>
                    </div>
                ):(
                    <div className="candidate-table-wrapper">
                        <table className="candidate-interview-table">
                            <thead>
                                <tr>
                                <th>Enterprise</th>
                                <th>Industry</th>
                                <th>Job Position</th>
                                <th>Status</th>
                                <th>Score</th>
                                <th>Result</th>
                                <th>Correct Answers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allInterview.map((interview => {
                                    const isCompleted = 
                                        interview.status?.toLowerCase() === "completed"

                                    return (

                                       <tr 
                                            key={interview.id}
                                            onClick={() => {
                                                if (isCompleted){
                                                    setSelectedInterview(interview)
                                                }
                                            }}
                                            className={isCompleted ? "clickable-interview-row" : ""}
                                            title={
                                                isCompleted
                                                    ? "Click to review interview"
                                                    : "Complete the interview to review results"
                                            }
                                       >
                                        <td>
                                            <div className="candidate-cell">
                                                <div className="candidate-avatar">
                                                    {(interview.company_name || "C")
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    }
                                                </div>
                                                <div>
                                                    <strong>
                                                        {interview.company_name || "Unknown candidate"}
                                                    </strong>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {interview.industry || "Unknown"}
                                        </td>
                                        <td>
                                            {interview.job_title || "Unknown"}
                                        </td>
                                        <td>
                                            <span
                                                className={`interview-status ${
                                                    interview.status || "applied"
                                                }`}
                                            >
                                                {interview.status || "Applied"}
                                            </span>
                                        </td>
                                        <td>
                                            <strong>
                                                {interview.status === "completed"
                                                    ? interview.total_score ?? 0
                                                    : "—"}
                                            </strong>
                                        </td>
                                        <td>
                                            <span className={`interview-status ${interview.result === "Pass" ? 'pass' : 'fail'}`}>
                                                { 
                                                    interview.status === "completed"
                                                    ? interview.result
                                                    : "—"
                                                }
                                            </span>
                                        </td>
                                        <td>
                                            {interview.status === "completed"
                                                ? interview.correct_answers_no ?? 0
                                                : "—"}
                                        </td>
                                    </tr>
                                    )
                                }))}
                            </tbody>
                        </table>
                    </div>                    
                )}
            </section>
            {selectedInterview && (
                <InterviewReviewPopup
                    interview={selectedInterview}
                    onClose={() => setSelectedInterview(null)}
                />
            )}
        </main>
    )
}

export default CandidateInterviewDashboard