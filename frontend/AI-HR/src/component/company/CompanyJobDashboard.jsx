import { useState, useEffect } from "react"
import { getAllInterviewRounds } from "../../services/api"

function CompanyJobDashboard(){
    const [allInterviews , setAllInterviews] = useState([]);

    const storedUser = localStorage.getItem("current_user")
    const user = storedUser ? JSON.parse(storedUser) : null;
    const user_id = String(user.id) 

    useEffect(() => {

        if (!user || !user.id) {
            console.error("No valid user ID found");
            return;
        }
        async function fetchInterview(){
            try{
                const data = await getAllInterviewRounds(user_id);

                setAllInterviews(data);
            }catch(err){
                console.error("Error", err);
            }
        }
        fetchInterview();
    },[]);

    return(
        <div className="interview-dashboard-page">
            <div className="interview-dashboard-container">
                 {/* 2. Map through the array instead of printing it directly */}
                {allInterviews && allInterviews.length > 0 ? (
                    allInterviews.map((interview, index) => (
                        <div key={interview._id || index} className="interview-card">
                            <p>{interview.result}</p>
                        </div>
                    ))
                ) : (
                    <p>No interviews found.</p>
                )}
            </div>
        </div>
    )
}

export default CompanyJobDashboard