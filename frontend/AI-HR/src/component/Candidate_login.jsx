import { useState } from "react"
import "../styles/candidate_form.css"

function CandidateLogin(){

    const [candidatename, setCandidatename] = useState('');
    const [summary, setSummary] = useState("");
    const [candidateEmail, setCandidateEmail] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [experience, setexperience] = useState(0);
    const [experineceDescription, setexperienceDescription] = useState("");
    const [skills, setSkills] = useState("");


    const handelSubmit = async (e) => {
        e.preventDefault();
        
        const candidate = {
            name : candidatename,
            email : candidateEmail,
            summary : summary,
            job_role : jobRole,
            experience_years : experience,
            experience_description : experineceDescription,
            skills : skills 
        }

        const response = await fetch("http://127.0.0.1:8000/candidate",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(candidate)
        });
        
        const data = await response.json();
        console.log(data)
    }
    
    return(
        <div className="candidate-form-page data-form-page">
            <div className="form-page">
                <form action="" method="post" onSubmit={handelSubmit}>
                    <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                        <input type="text" name="candidate-name" className="candidate-name-input" 
                        placeholder="Full Name" value={candidatename} 
                        onChange={(e) => setCandidatename(e.target.value)}/>

                    <label htmlFor="candidate-summary" className="candidate-summary-label">Summary</label>
                        <textarea name="candidate-summary" className="candidate-summary-input" 
                        placeholder="Summary" value={summary} 
                        onChange={(e) => setSummary(e.target.value)}/>

                    <label htmlFor="candidate-email" className="candidate-email-label">Email</label>
                        <input type="email" name="candidate-email" className="candidate-email-input" 
                        placeholder="Email" value={candidateEmail} 
                        onChange={(e) => setCandidateEmail(e.target.value)}/>

                    <label htmlFor="candidate-role" className="candidate-role-label">Job Role</label>
                        <input type="text" name="candidate-role" className="candidate-role-input" 
                        placeholder="Job Role" value={jobRole} 
                        onChange={(e) => setJobRole(e.target.value)}/>

                    <label htmlFor="candidate-experience" className="candidate-experience-label">experience</label>
                        <input type="number" name="candidate-experience-desc" className="candidate-experience-desc-input" 
                        placeholder="experience" value={experience} 
                        onChange={(e) => setexperience(Number(e.target.value))}/>

                    <label htmlFor="candidate-experience-desc" className="candidate-experience-desc-label">experience Description</label>
                        <textarea name="candidate-experience-desc" className="candidate-experience-desc-input" 
                        placeholder="Description" value={experineceDescription} 
                        onChange={(e) => setexperienceDescription(e.target.value)}/>

                    <label htmlFor="candidate-skills" className="candidate-skills-label">Skills</label>
                        <input type="text" name="candidate-skills" className="candidate-skills-input" 
                        placeholder="Skills" value={skills} 
                        onChange={(e) => setSkills(e.target.value)}/>

                    <button type="submit">Find</button>
                </form>
            </div>
        </div>
    )
}

export default CandidateLogin