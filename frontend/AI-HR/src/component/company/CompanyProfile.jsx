import { getMyProfile } from "../../services/api"
import { useEffect, useState } from "react"

function CompanyProfile(){
    const [companyProfile, setCompanyProfile] = useState(null);
    
    useEffect(() =>{
        async function fetchProfile() {
            try{
                const data = await getMyProfile();

                setCompanyProfile(data);
            }catch (error){
                console.log("Error fetching company data:", error);
            }
        }
        fetchProfile();
    },[])
    
    // console.log("Company Data:", companyProfile);
    return (
        <div className="company-profile-page">
            <div className="company-profile">
                <h2>{companyProfile?.company_name}</h2>
                <p>Industry: {companyProfile?.industry}</p>
                <p>{companyProfile?.company_description}</p>
            </div>
        </div>
    )
}

export default CompanyProfile