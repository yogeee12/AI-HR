import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSavedUser, validateSession } from "../services/api";
import "../styles/navbar.css"

function Navbar(){
    
    const navigate = useNavigate();
    const [user, setUser] = useState(() => getSavedUser());
    
    useEffect(() => {

        let active = true;

        async function checkSession(){

            const token = localStorage.getItem("access_token");

            if (!token){
                setUser(null);
                return;
            }

            const valid = await validateSession();

            if(!active) return ;

            if(valid === false){
                setUser(null)
            }else{
                setUser(getSavedUser());
            }
        }

        function updateUser(){
            setUser(getSavedUser());
        }

        checkSession();

        window.addEventListener("auth-changed", updateUser);
        window.addEventListener("storage", updateUser);

        return () => {
            active = false;
            window.removeEventListener("auth-changed", updateUser);
            window.removeEventListener("storage", updateUser);
        };
    },[]);

    useEffect(() => {
        function updateUser(){
            setUser(getSavedUser());
        }

        window.addEventListener("auth-changed", updateUser);
        window.addEventListener("storage", updateUser);
       
        return () => {
            window.removeEventListener("auth-changed", updateUser);
            window.removeEventListener("storage", updateUser);
        }
    },[])

    function handelProfileClick(){
        if (user?.role === "candidate"){
            navigate("/candidate-profile");
        }else if(user?.role === "company"){
            navigate("/company-profile");
        }else{
            navigate("/login-as")
        }
    }


    return(
        <div className="nav-bar">
            <div className="nav-bar-container">
                <div className="logo-name">
                    <h3>AI-HR</h3>
                </div>
                <div className="nav-pages-links">
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <a href="/" target="_blank" rel="noopener noreferrer">Companies</a>
                    <a href="/" target="_blank" rel="noopener noreferrer">About</a>
                </div>
                <div className="sign-in-up">
                    {user ? (
                        <>
                            <button onClick={handelProfileClick}>
                                👤
                            </button>
                        </>
                    ):(
                        <button onClick={() => navigate("/login-as")}>
                        Sign In
                        </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar