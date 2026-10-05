import { getCompanies } from "../../services/api"
import { useEffect, useState } from "react"

function CompanyProfile(){
    const [companyData, setCompanyData] = useState(null);
    
    useEffect(() =>{
        async function fetchCompanyData() {
            try{
                const data = await getCompanies();

                setCompanyData(data);
            }catch (error){
                console.log("Error fetching company data:", error);
            }
        }
        fetchCompanyData();
    },)
    
    console.log("Company Data:", companyData);
    return (
        <div className="company-profile-page">
            <div className="company-profile">
                <h2>{companyData?.company?.company_name}</h2>
                <p>Industry: {companyData?.company?.industry}</p>
                <p>{companyData?.company?.company_description}</p>
            </div>
        </div>
    )
}

export default CompanyProfile