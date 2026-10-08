import { useState } from "react"
import "../styles/candidate_form.css"
import { handelSubmit } from "../services/api"

function Company_data(){

    // Company Detail
    const [companyName , setCompanName] = useState("")
    const [companyemail, setCompanyEmail] = useState("")
    const [companyPassword, setCompanyPassword] = useState("")

    const  companyDetail = {
        company_name : companyName,
        company_email : companyemail,
        company_password : companyPassword,
         
    }

    return (
        <div className="company-data-page data-form-page">
            <div className="form-page">
                <form action="" method="post" onSubmit={(e) => handelSubmit({e, data:companyDetail, endpoint:"company-signup"})}>
                    
                    <label htmlFor="company-name" className="company-name-label">Company Name</label>
                    <input type="text" name="company-name" className="company-name-input" value={companyName} onChange={(e) => setCompanName(e.target.value)}/>
            
                    <label htmlFor="company-email" className="company-email">Email</label>
                    <input type="text" name="company-Email" className="company-Email-input" value={companyemail} onChange={(e) => setCompanyEmail(e.target.value)}/>
                    
                    <label htmlFor="company-password" className="company-password-label">Password</label>
                    <input type="password" name="company-password" className="company-password-input" value={companyPassword} onChange={(e) => setCompanyPassword(e.target.value)}/>

                <button type="submit" className="Save">Submit</button>

                </form>

            </div>
        </div>
    )
}

export default Company_data