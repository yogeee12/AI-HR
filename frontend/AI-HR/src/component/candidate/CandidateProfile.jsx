import {useState, useEffect} from "react";
import { getMyProfile, logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CandidateProfile(){

    const [candidateProfile, setCandidateProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const data = await getMyProfile();

            setCandidateProfile(data);
        }
        fetchProfile()
    },[])

    const navigate = useNavigate();

    function handelLogout(){
        logoutUser();
        navigate("/");
    }

    return(
        <div className="candidate-profile-page">
            <div className="candidate-profile">
                <h2>{candidateProfile?.name}</h2>
                <p>{candidateProfile?.summary}</p>
                <p>{candidateProfile?.skills}</p>
            </div>
            <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default CandidateProfile