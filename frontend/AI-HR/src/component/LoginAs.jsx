import { useState } from "react"
import CandidateSignUp from "./candidate/CandidateSignUp";
import CompanySignUp from "./Companies/CompanySignUp";
import "../styles/LoginAs.css"
function LoginAs(){

    const [loginAs, setLoginAs] = useState("User");
    const [showLogin , setShowLogin] = useState(false)

    return(
        <div className="login-page">
            {!showLogin &&
            <div className="login-select">
                <h2>Login As</h2>
                <div className="login-select-btn">
                <button type="button" 
                    onClick={() => 
                    {setLoginAs("User"); 
                    setShowLogin(true);}}>User</button>
                <button type="button" 
                onClick={() => 
                {setLoginAs("Company"); 
                setShowLogin(true);}}>Company</button>
                </div>
            </div>
            }
            {showLogin &&
            <div className="login-content">
                    {loginAs === "User" ? <CandidateSignUp/> : <CompanySignUp />}
            </div>
            }
        </div>
    )
}

export default LoginAs
