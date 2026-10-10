import { handelSubmit } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile_setup.css"

function CandidateProfileSetUp() {

    const [candidateName, setCandidateName] = useState("");
    const [phone, setPhone] = useState("");
    const [summary, setSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");

    const accountId = sessionStorage.getItem("pendingAccountId");

    const candidateProfile = {
        account_id : accountId,
        name: candidateName,
        phone: phone,
        summary: summary,
        skills: skills,
        experience: experience,
        education: education
    };

    const navigate = useNavigate();

    return(
        <div className="candidate-profile-setup">
            <form action="" method="post" onSubmit={async (e) => {
                const result = await handelSubmit({e, data:candidateProfile, endpoint:"candidate-profile-setup"})

                if (result.success ){
                    navigate("/login-as")
                }

                }}>
                <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                <input type="text" name="candidate-name" className="candidate-name-input" 
                placeholder="Full Name" value={candidateName} 
                onChange={(e) => setCandidateName(e.target.value)}/>

                <label htmlFor="candidate-phone" className="candidate-phone-label">Phone no</label>
                <input type="text" name="candidate-phone" className="candidate-phone-input" 
                placeholder="Phone Number" value={phone} 
                onChange={(e) => setPhone(e.target.value)}/>

                <label htmlFor="candidate-summary" className="candidate-summary-label">Summary</label>
                <textarea name="candidate-summary" className="candidate-summary-input" 
                placeholder="Summary" value={summary} 
                onChange={(e) => setSummary(e.target.value)}/>

                <label htmlFor="candidate-skills" className="candidate-skills-label">Skills</label>
                <input type="text" name="candidate-skills" className="candidate-skills-input" 
                placeholder="Skills" value={skills} 
                onChange={(e) => setSkills(e.target.value)}/>   

                <label htmlFor="candidate-experience" className="candidate-experience-label">Experience</label>
                <input type="text" name="candidate-experience" className="candidate-experience-input" 
                placeholder="Experience" value={experience} 
                onChange={(e) => setExperience(e.target.value)}/>

                <label htmlFor="candidate-education" className="candidate-education-label">Education</label>
                <input type="text" name="candidate-education" className="candidate-education-input" 
                placeholder="Education" value={education} 
                onChange={(e) => setEducation(e.target.value)}/>

                <button type="submit" className="candidate-profile-submit">Submit</button>

            </form>
        </div>
    )
}

export default CandidateProfileSetUp