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