import { useState } from "react";
import { handelSubmit } from "../../services/api";

function CompanyProfileSetUp() {
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [industry, setIndustry] = useState("");

    const companyDetail = {
        company_name: companyName,
        company_description: companyDescription,
        industry: industry,
    };

    return (
        <div className="company-profile-setup-page">
            <div className="company-profile-setup-form">
                <form
                    action=""
                    method="post" onSubmit={(e) => handelSubmit({ e, data: companyDetail, endpoint: "company-profile-setup" })}
                >
                    <label htmlFor="company-name" className="company-name-label">   Company Name</label>
                    <input
                        type="text"
                        name="company-name"
                        className="company-name-input"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label htmlFor="company-description" className="company-description-label">Company Description</label>
                    <textarea
                        name="company-description" 
                        className="company-description-input"
                        placeholder="Company Description"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                    />
                    
                    <label htmlFor="industry" className="industry-label">Industry</label>
                    <input 
                        type="text"
                        name="industry"
                        className="industry-input"
                        placeholder="Industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )

}

export default CompanyProfileSetUp
