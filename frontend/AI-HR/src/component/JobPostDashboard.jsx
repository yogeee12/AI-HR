import { getAllJobs, applyForAiHrRound } from "../services/api";
import { useEffect, useMemo, useState } from "react";
import "../styles/jobs_dashboard.css";
import { useNavigate } from "react-router-dom";

function JobPostDashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getAllJobs();

                if (Array.isArray(data)) {
                    setJobs(data);
                } else if (Array.isArray(data?.jobs)) {
                    setJobs(data.jobs);
                } else {
                    throw new Error("Unexpected jobs response format.");
                }
            } catch (error) {
                console.error("Error while fetching jobs:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return jobs;

        return jobs.filter((job) => {
            const searchableText = [
                job.job_title,
                job.company_name,
                job.description,
                job.required_skills,
                job.location,
            ]
                .filter(Boolean)
                .map((value) =>
                    Array.isArray(value) ? value.join(" ") : String(value)
                )
                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);
        });
    }, [jobs, search]);

    function getSkills(skills) {
        if (Array.isArray(skills)) return skills;
        if (typeof skills === "string") {
            return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
        }
        return [];
    }

    return (
        <div className="jobs-page">
            <div className="jobs-container">
                <section className="jobs-hero">
                    <div className="hero-icon">💼</div>
                    <div className="hero-content">
                        <span className="eyebrow">JOB OPPORTUNITIES</span>
                        <h1>Find Your Next Opportunity</h1>
                        <p>
                            Explore job openings, build your skills, and take
                            the next step in your career with AI-HR.
                        </p>
                    </div>
                    <div className="hero-decoration">✦</div>
                </section>

                <section className="jobs-search">
                    <div className="search-box">
                        <span>⌕</span>
                        <input
                            type="search"
                            placeholder="Search jobs, skills, or companies..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <div className="jobs-count">
                        Showing <strong>{filteredJobs.length}</strong>{" "}
                        {filteredJobs.length === 1 ? "job" : "jobs"}
                    </div>
                </section>

                {loading && (
                    <div className="jobs-message">
                        <div className="jobs-spinner" />
                        <p>Finding opportunities for you...</p>
                    </div>
                )}

                {error && (
                    <div className="jobs-message jobs-error">
                        <h3>Unable to load jobs</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && filteredJobs.length === 0 && (
                    <div className="jobs-message">
                        <div className="empty-jobs-icon">⌕</div>
                        <h3>{jobs.length ? "No matching jobs" : "No jobs yet"}</h3>
                        <p>
                            {jobs.length
                                ? "Try searching with another keyword."
                                : "Published job opportunities will appear here."}
                        </p>
                        {search && (
                            <button
                                className="clear-search"
                                onClick={() => setSearch("")}
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

                <section className="jobs-list">
                    {filteredJobs.map((job, index) => {
                        const skills = getSkills(job.required_skills);

                        return (
                            <article className="job-card" key={job._id}>
                                <div className={`job-icon job-icon-${index % 5}`}>
                                    {["</>", "✧", "▣", "☁", "✦"][index % 5]}
                                </div>

                                <div className="job-main">
                                    <div className="job-title-row">
                                        <h2>{job.job_title || "Untitled Position"}</h2>
                                        {job.is_demo && (
                                            <span className="demo-badge">Demo Job</span>
                                        )}
                                    </div>

                                    <div className="job-company">
                                        <span>▦ {job.company_name || "Company"}</span>
                                        <span>•</span>
                                        <span>⌖ {job.location || "Location not specified"}</span>
                                    </div>

                                    <p className="job-description">
                                        {job.description || "Explore this opportunity and its requirements."}
                                    </p>

                                    {skills.length > 0 && (
                                        <div className="job-skills">
                                            {skills.map((skill, skillIndex) => (
                                                <span key={`${skill}-${skillIndex}`}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="job-meta">
                                    <span>▣ {job.min_experience ?? 0}+ years</span>
                                    <span>⌖ {job.location || "Not specified"}</span>
                                </div>

                                <div className="job-actions">
                                    <button
                                        className="apply-button"
                                        onClick={async () => {
                                            try{
                                                const result = applyForAiHrRound(job._id)
                                                console.log("Application response :", result )
                                            }catch(error){
                                                console.error("Applied Failed : ", error.message );

                                                if(!localStorage.getItem("access_token")){
                                                    navigate("/login-as")
                                                }else{
                                                    alert(error.message);
                                                }
                                            }
                                        }}
                                    >
                                        Apply for AI-HR Round <span>→</span>
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <p className="jobs-footer">
                    Discover opportunities and take your next career step with AI-HR.
                </p>
            </div>
        </div>
    );
}

export default JobPostDashboard;