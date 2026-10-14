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
export async function startInterview(interviewId){
    
    const token = localStorage.getItem("access_token");

    if(!token){
        throw new Error("Please log in first")
    }

    const res = await fetch(`${API}/start-interview/${interviewId}`,{
        method  : "GET",
        headers:{
            Authorization : `Bearer ${token}`,
        },
    })

    const result = await res.json()

    if(!res.ok){
        throw new Error(
            result.detail || "Failed to start interview"
        );
    }

    return result.questions
}

// fetch all jobs from collection
export async function getAllJobs(){

    const res = await fetch(`${API}/job_dashboard`)

    if(!res.ok){
        throw new Error(`Failed to fetch data: ${res.status} `)
    }

    
    return await res.json()
}

// Handel form submission for every page
export async function handelSubmit({e, data, endpoint}){
    e.preventDefault();

    try{
        const token = localStorage.getItem("access_token")
        const response = await fetch(`${API}/${endpoint}`,{
            method : "POST",
            headers : {
                "content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        });
        const result = await response.json();
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

    // if (!response){
    //     throw new Error(data.detail || "Failed to fecth profile ") 
    // }
    return data;
}

export async function loginUser({email, password, role}){

   const res = await fetch(`${API}/login-as`,{
    method:"POST",
    headers:{
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({ email, password, role}),
   });

   const result = await res.json();

   if (!res.ok || !result.success){
    throw new Error(
        result.message || result.detail || "Login failed"
    );

    }
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("current_user", JSON.stringify(result.user));

    window.dispatchEvent(new Event("auth-changed"));

    return result;
}


export function getSavedUser() {
    try {
        const user = localStorage.getItem("current_user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

export function logoutUser(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-changed"));
}

export async function applyForAiHrRound(jobId){

    const token = localStorage.getItem("access_token");

    if(!token){
        throw new Error("Please sign in before applying")
    }

    const res = await fetch(`${API}/apply-job`,{
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            job_id : jobId,
        }),
    });

    const result = await res.json();

    if(!res.ok){
        throw new Error(
            result.detail || result.message || "Failed to apply"
        );
   }

   console.log(result)

    return result;
}

export async function validateSession() {
   
    const token = localStorage.getItem("access_token");

    if(!token){
        logoutUser();
        return null
    }

    try{
        const res = await fetch(`${API}/my-profile`, {
            headers:{
                Authorization : `Bearer ${token}`
            },
        });

        if (!res.ok){
            logoutUser();
            return null;
        }

        return await res.json();
    }catch(error){
        console.error("Could not validate session",error);
        return null
    }
}