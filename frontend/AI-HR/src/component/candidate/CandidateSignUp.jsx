import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api";

function CandidateSignUp(){
    const [candidatename, setCandidatename] = useState('');
    const [candidateUserName, setCandidateUserName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');

    const candidate = {
        user_name : candidateUserName,
        name : candidatename,
        email : candidateEmail,
        password : candidatePassword,
        role : "candidate",
    }
    
    return(
        <div className="candidate-form-page data-form-page">
            <div className="form-page">
                <h2>Candidate Sign Up</h2>
                <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:candidate, endpoint:"candidate-signup"})}>
                    <label htmlFor="candidate-name" className="candidate-name-label">Name</label>
                        <input type="text" name="candidate-name" className="candidate-name-input" 
                        placeholder="Full Name" value={candidatename} 
                        onChange={(e) => setCandidatename(e.target.value)}/>

                    <label htmlFor="candidate-username" className="candidate-username-label">Username</label>
                        <input type="text" name="candidate-username" className="candidate-username-input" 
                        placeholder="Username" value={candidateUserName} 
                        onChange={(e) => setCandidateUserName(e.target.value)}/>

                    <label htmlFor="candidate-email" className="candidate-email-label">Email</label>
                        <input type="email" name="candidate-email" className="candidate-email-input" 
                        placeholder="Email" value={candidateEmail} 
                        onChange={(e) => setCandidateEmail(e.target.value)}/>

                    <label htmlFor="candidate-password" className="candidate-password-label">Password</label>
                        <input type="password" name="candidate-password" className="candidate-password-input" 
                        placeholder="Password" value={candidatePassword} 
                        onChange={(e) => setCandidatePassword(e.target.value)}/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CandidateSignUp