
import { useState, useEffect } from "react";
import { getAllInterviewRounds } from "../../services/api";
import "../../styles/company_job_dashboard.css";

function CompanyJobDashboard() {
    const [allInterviews, setAllInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const storedUser = localStorage.getItem("current_user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const user_id = user?.id ? String(user.id) : "";

    useEffect(() => {
        async function fetchInterview() {
            if (!user_id) {
                setError("Company account could not be identified.");
                setLoading(false);
                return;
            }

            try {
                const data = await getAllInterviewRounds(user_id);
                setAllInterviews(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching interviews:", err);
                setError("Unable to load interviews. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchInterview();
    }, [user_id]);

    const completedCount = allInterviews.filter(
        (interview) => interview.status === "completed"
    ).length;

    const averageScore = completedCount
        ? Math.round(
              allInterviews
                  .filter((interview) => interview.status === "completed")
                  .reduce((sum, interview) => sum + (Number(interview.total_score) || 0), 0)
                  / completedCount
          )
        : 0;

    return (
        <main className="company-dashboard">
            <section className="company-dashboard-header">
                <div>
                    <p className="company-eyebrow">HIRING MANAGEMENT</p>
                    <h1>Interview Dashboard</h1>
                    <p className="company-subtitle">
                        Track candidates and review AI interview performance.
                    </p>
                </div>

                <div className="dashboard-header-icon">✦</div>
            </section>

            <section className="company-stats">
                <article className="company-stat-card">
                    <span>Total interviews</span>
                    <strong>{allInterviews.length}</strong>
                    <small>Applications received</small>
                </article>

                <article className="company-stat-card">
                    <span>Completed interviews</span>
                    <strong>{completedCount}</strong>
                    <small>Ready for review</small>
                </article>

                <article className="company-stat-card">
                    <span>Average score</span>
                    <strong>{averageScore}</strong>
                    <small>Completed interviews only</small>
                </article>
            </section>

            <section className="company-interviews-section">
                <div className="company-table-heading">
                    <div>
                        <h2>Candidate interviews</h2>
                        <p>Review candidate details and interview results.</p>
                    </div>
                    <span className="interview-count">
                        {allInterviews.length} records
                    </span>
                </div>

                {loading ? (
                    <p className="dashboard-message">Loading interviews...</p>
                ) : error ? (
                    <p className="dashboard-message dashboard-error">{error}</p>
                ) : allInterviews.length === 0 ? (
                    <div className="dashboard-empty">
                        <div className="empty-icon">♧</div>
                        <h3>No interviews yet</h3>
                        <p>
                            Candidate applications will appear here when they
                            apply for your jobs.
                        </p>
                    </div>
                ) : (
                    <div className="company-table-wrapper">
                        <table className="company-interview-table">
                            <thead>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Job position</th>
                                    <th>Status</th>
                                    <th>Score</th>
                                    <th>Correct answers</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allInterviews.map((interview) => (
                                    <tr key={interview._id}>
                                        <td>
                                            <div className="candidate-cell">
                                                <div className="candidate-avatar">
                                                    {(interview.candidate_name || "C")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <strong>
                                                        {interview.candidate_name || "Unknown candidate"}
                                                    </strong>
                                                    <span>
                                                        {interview.candidate_email || "No email"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{interview.for_post || "Unknown job"}</td>

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
                                            {interview.status === "completed"
                                                ? interview.correct_answers_no ?? 0
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default CompanyJobDashboard;
