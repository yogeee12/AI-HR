const API = "http://127.0.0.1:8000";

export async function getCompanies(){
    const res = await fetch(`${API}/companies`);

    if (!res.ok) {
        throw new Error("Failed to fetch company") 
    }

    return res.json();
}

export async function getCandidates(){
    const res = await  fetch(`${API}/candidate`);

    if (!res.ok){
        throw new Error("Failed to feth user") 
    }

    return res.json()
}

export async function getQuestions(){
    const res = await fetch(`${API}/questions`)

    if(!res.ok){
        throw new Error("Failed to fetch data!");
        
    }
    return res.json()
}

export async function handelSubmit({e, data, endpoint}){
    e.preventDefault();

    try{

        const response = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method : "POST",
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        return result;
    }catch (error){
        console.error("API Error :",error)
    }
}