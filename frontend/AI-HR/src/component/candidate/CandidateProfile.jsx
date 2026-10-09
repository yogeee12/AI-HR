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
    })
    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateProfile?.candidate?.name}</h2>
                <p>{candidateProfile?.candidate?.summary}</p>
                <p>{candidateProfile?.candidate?.skills}</p>
            </div>
        </div>
    )
}

export default CandidateProfile