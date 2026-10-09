const API = "http://127.0.0.1:8000";

// getCompany company data from backend
export async function getCompanies(){
    const res = await fetch(`${API}/companies`);

    if (!res.ok) {
        throw new Error("Failed to fetch company") 
    }

    return res.json();
}

// fetch candidtae data from backend
export async function getCandidate(){
    const res = await  fetch(`${API}/candidate`);

    if (!res.ok){
        throw new Error("Failed to feth user") 
    }

    return res.json()
}

// fetch questions from backend
export async function getQuestions(){
    const res = await fetch(`${API}/questions`)

    if(!res.ok){
        throw new Error("Failed to fetch data!");
        
    }
    return res.json()
}

// Handel form submission for every page
export async function handelSubmit({e, data, endpoint}){
    e.preventDefault();

    try{

        const response = await fetch(`${API}/${endpoint}`,{
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

export async function getMyProfile() {
    const token = localStorage.getItem("access_token");

    if (!token){
        throw new Error("Please log in first")
    }

    const response = await fetch(`${API}/my-profile`,{
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }

    })

    const data = await response.json();

    if (!response){
        throw new Error(data.detail || "Failed to fecth profile ") 
    }

    return data;
}