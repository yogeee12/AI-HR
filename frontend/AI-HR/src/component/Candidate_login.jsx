// import { useState } from "react"
import "../styles/candidate_form.css"

function CandidateLogin(){

//     const [candidatename, setCandidatename] = useState('');
//     const [candidateEmail, setCandidateEmail] = useState('');
//     const [jobRole, setJobRole] = useState('');
//     const [expeirence, setExpeirence] = useState(0);
//     const [skills, setSkills] = useState([]);
    
    return(
        <div className="candidate-form-page">
            <div className="form-page">
                <form action="" method="post">
                    <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                        <input type="text" name="candidate-name" className="candidate-name-input" placeholder="Full Name" />
                    <label htmlFor="candidate-email" className="candidate-email-label">Email</label>
                        <input type="email" name="candidate-email" className="candidate-email-input" placeholder="Emial"/>
                    <label htmlFor="candidate-role" className="candidate-role-label">Job Role</label>
                        <input type="text" name="candidate-role" className="candidate-role-input" placeholder="Job Role"/>
                    <label htmlFor="candidate-expeirence" className="candidate-expeirence-label">Expe</label>
                        <input type="number" name="candidate-expeirence" className="candidate-expeirence-input" placeholder="Expeirence"/>
                    <label htmlFor="candidate-skills" className="candidate-skills-label">Skills</label>
                        <input type="text" name="candidate-skills" className="candidate-skills-input" placeholder="Skills"/>
                </form>
            </div>
        </div>
    )
}

export default CandidateLogin