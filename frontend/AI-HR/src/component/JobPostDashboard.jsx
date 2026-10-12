import { getAllJobs } from "../services/api";
import { useEffect, useState } from "react";

function JobPostDashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getAllJobs();

                if (Array.isArray(data)) {
                    setJobs(data);
                } else if (Array.isArray(data.jobs)) {
                    setJobs(data.jobs);
                } else {
                    console.error("Unexpected jobs response format:", data);
                    setJobs([]);
                }
            } catch (error) {
                console.error("Error while fetching jobs:", error);
                setError(error.message);
            }
        }

        fetchJobs();
    }, []);

    console.log(jobs)

    return (
        <div>
            <h1>Job Dashboard</h1>

            {error && <p>{error}</p>}

            {jobs.length === 0 && !error && (
                <p>No jobs available yet.</p>
            )}

            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.job_title}</h2>
                    <p>{job.company_name}</p>
                    <p>{job.description}</p>
                    <p>Required skills: {job.required_skills}</p>
                    <p>Minimum experience: {job.min_experience} years</p>
                    <p>Location: {job.location}</p>

                    <button
                        // onClick={() =>
                        //     console.log("Apply for job:", job._id)
                        // }
                    >
                        Apply for AI-HR Round
                    </button>
                </div>
            ))}
        </div>
    );
}

export default JobPostDashboard;
