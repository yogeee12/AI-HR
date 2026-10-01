import { getAnalysis } from "../services/api";
import { useState, useEffect } from "react";

function AiGen(){
     const [result , setResult ] = useState([])
     const [loading, setLoading] = useState(true);

     useEffect(() => {

         async function loadGenData(){
            try {
                const data = await getAnalysis();                
                setResult(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadGenData();
     },[])

     if(loading){
         return <p>"Loading...."</p>
    }

     return (
        <div>
            <p>{result?.eligibility}</p>
            <p>{result?.matched_project}</p>
            <p>{result?.matched_role}</p>
            <p>{result?.reason}</p>
        </div>
     )
}

export default AiGen