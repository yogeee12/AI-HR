import { useState } from "react"
import "../styles/candidate_form.css"
import { handelSubmit } from "../services/api";

function CandidateSignUp(){

    const [candidatename, setCandidatename] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');

    const candidate = {
        name : candidatename,
        email : candidateEmail,
        password : candidatePassword,
    }
    
    return(
        <div className="candidate-form-page data-form-page">
            <div className="form-page">
                <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:candidate, endpoint:"candidate-signup"})}>
                    <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                        <input type="text" name="candidate-name" className="candidate-name-input" 
                        placeholder="Full Name" value={candidatename} 
                        onChange={(e) => setCandidatename(e.target.value)}/>

                    <label htmlFor="candidate-email" className="candidate-email-label">Email</label>
                        <input type="email" name="candidate-email" className="candidate-email-input" 
                        placeholder="Email" value={candidateEmail} 
                        onChange={(e) => setCandidateEmail(e.target.value)}/>

                    <label htmlFor="candidate-password" className="candidate-password-label">Password</label>
                        <input type="password" name="candidate-password" className="candidate-password-input" 
                        placeholder="Password" value={candidatePassword} 
                        onChange={(e) => setCandidatePassword(e.target.value)}/>

                    <button type="submit">Find</button>
                </form>
            </div>
        </div>
    )
}

export default CandidateSignUp