import {useState, useEffect} from "react";
import { getCandidate } from "../../services/api";

function CandidateProfile(){

    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        async function fetchCandidateData(){
            const data = await getCandidate();

            setCandidateData(data);
        }
        fetchCandidateData()
    })
    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateData?.candidate?.name}</h2>
                <p>{candidateData?.candidate?.summary}</p>
                <p>{candidateData?.candidate?.skills}</p>
            </div>
        </div>
    )
}

export default CandidateProfile