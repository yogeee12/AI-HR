import { useState, useEffect } from "react";
import { getCandidates } from "../services/api";

function User(){

    const [user , setUser] = useState([])
    
    useEffect(() => {
        async function loadUser() {
            try {
                const data = await getCandidates();

                console.log("Candidates :" , data )
                setUser(data)
            } catch (error){
                console.log(error)
            }

        }
        loadUser();
    },[])

    return(
        <div>
            {
                user.map((item) => (
                    <div key={item.id}>
                    <h2>{item.candidate.name}</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default User;