import {useState, useEffect} from "react";
import { getMyProfile } from "../../services/api";

function CandidateProfile(){

    const [candidateProfile, setCandidateProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const data = await getMyProfile();

            setCandidateProfile(data);
        }
        fetchProfile()
    },[])
    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateProfile?.name}</h2>
                <p>{candidateProfile?.summary}</p>
                <p>{candidateProfile?.skills}</p>
            </div>
        </div>
    )
}

export default CandidateProfile