import { useNavigate } from "react-router-dom"
import "../styles/navbar.css"

function Navbar(){

    const navigate = useNavigate();

    return(
        <div className="nav-bar">
            <div className="nav-bar-container">
                <div className="logo-name">
                    <h3>AI-HR</h3>
                </div>
                <div className="nav-pages-links">
                    <a href="http://" target="_blank" rel="noopener noreferrer">Home</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Jobs</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Companies</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">About</a>
                </div>
                <div className="sign-in-up">
                        <button onClick={() => navigate("/login-as")}>
                        Sign In
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar