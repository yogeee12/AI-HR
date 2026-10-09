import { useState } from "react"
import "../../styles/candidate_form.css"
import { handelSubmit } from "../../services/api"
import { useNavigate } from "react-router-dom"

function CompanySignUp(){

    // Company Detail
    const [companyUserName, setCompanyUserName] = useState("")
    const [companyName , setCompanName] = useState("")
    const [companyemail, setCompanyEmail] = useState("")
    const [companyPassword, setCompanyPassword] = useState("")

    const  companyDetail = {
        user_name : companyUserName,
        name : companyName,
        email : companyemail,
        password : companyPassword,
        role : "company",
    }
    const navigate = useNavigate();

    return (
        <div className="company-data-page data-form-page">
            <div className="form-page">
                <h2>Company Sign Up</h2>
                <form action="" method="post" onSubmit={ async (e) => {
                    const result = await handelSubmit({e, data:companyDetail, endpoint:"company-signup"})

                    if(result.success){
                        navigate("/company-profile-setup")
                    }
                    }}>
                    
                    <label htmlFor="company-username" className="company-name-label">Company Username</label>
                    <input type="text" name="company-username" className="company-username-input" value={companyUserName} 
                    onChange={(e) => setCompanyUserName(e.target.value)}/>

                    <label htmlFor="company-name" className="company-name-label">Company Name</label>
                    <input type="text" name="company-name" className="company-name-input" value={companyName} 
                    onChange={(e) => setCompanName(e.target.value)}/>
            
                    <label htmlFor="company-email" className="company-email">Email</label>
                    <input type="text" name="company-Email" className="company-Email-input" value={companyemail} 
                    onChange={(e) => setCompanyEmail(e.target.value)}/>
                    
                    <label htmlFor="company-password" className="company-password-label">Password</label>
                    <input type="password" name="company-password" className="company-password-input" value={companyPassword} 
                    onChange={(e) => setCompanyPassword(e.target.value)}/>

                <button type="submit" className="Save">Submit</button>

                </form>

            </div>
        </div>
    )
}

export default CompanySignUp