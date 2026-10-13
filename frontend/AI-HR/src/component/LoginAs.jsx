import { useState } from "react"
import CandidateSignUp from "./candidate/CandidateSignUp";
import CompanySignUp from "./company/CompanySignUp";
import { loginUser } from "../services/api";
import "../styles/LoginAs.css"
import { useNavigate } from "react-router-dom";

function LoginAs(){

    const [loginAs, setLoginAs] = useState("User");
    const [showLogin , setShowLogin] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    return(
        <div className="login-page-container">
            {!showLogin &&
            <div className="login-page">
            <div className="login-select">
                <h2>Login As</h2>
                <div className="login-select-btn">
                <button type="button" 
                    onClick={() => 
                    {setLoginAs("User"); 
                    }}>User</button>
                <button type="button" 
                onClick={() => 
                {setLoginAs("Company"); 
                }}>Company</button>
                </div>
            </div>

            <form action="" method="post" onSubmit={ async (e) => {
                e.preventDefault();
                setError("");

                try{
                    const result = await loginUser({
                        email,
                        password,
                        role: loginAs === "User" ? "candidate" : "company",
                    })

                    if (result.success){
                        navigate("/")
                    }
                }catch(error){
                    setError(error.message || "Login failed. Please try again.");
                }
                
        }}>
                <label htmlFor="email" className="email-label">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="password" className="password-label">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                {error && <p className="login-error">{error}</p> }

                <p className="forgot-password"><a href="/forgot-password">Forgot your password?</a></p>
                <button type="submit">Login</button>
            </form>
            <div className="login-signup">
                <p>Don't have an account? <button type="button" onClick={() => setShowLogin(true)}>Sign Up</button></p>
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