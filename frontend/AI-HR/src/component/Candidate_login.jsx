import { useState } from "react"
import "../styles/candidate_form.css"

function CandidateLogin(){

    const [candidatename, setCandidatename] = useState('');
    const [summary, setSummary] = useState("");
    const [candidateEmail, setCandidateEmail] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [expeirence, setExpeirence] = useState(0);
    const [experineceDescription, setExpeirenceDescription] = useState("");
    const [skills, setSkills] = useState("");


    const handelSubmit = (e) => {
        e.preventDefault();
        
        const candidate = {
            name : candidatename,
            email : candidateEmail,
            summary : summary,
            job_role : jobRole,
            expeirence_years : expeirence,
            expeirence_description : experineceDescription,
            skills : skills 
        }

        console.log(candidate)
    
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

                    <label htmlFor="candidate-expeirence" className="candidate-expeirence-label">Expeirence</label>
                        <input type="number" name="candidate-expeirence-desc" className="candidate-expeirence-desc-input" 
                        placeholder="Expeirence" value={expeirence} 
                        onChange={(e) => setExpeirence(Number(e.target.value))}/>

                    <label htmlFor="candidate-expeirence-desc" className="candidate-expeirence-desc-label">Expeirence Description</label>
                        <textarea name="candidate-expeirence-desc" className="candidate-expeirence-desc-input" 
                        placeholder="Description" value={experineceDescription} 
                        onChange={(e) => setExpeirenceDescription(e.target.value)}/>

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