import { useState } from "react"
import "../styles/candidate_form.css"

function Company_data(){

    // Company Detail
    const [companyName , setCompanName] = useState("")
    const [companyDescription, setCompanyDescription] = useState("")
    const [industry, setIndustry] = useState("")

    // Jon field
    const [jobField, setJobField] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    let addJobField = 1;

    // Project
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    let addProject = 1;

    const handelSubmit = (e) => {
        e.preventDefault();

        const  companyDetail = {
            company_name : companyName,
            company_description : companyDescription,
            industry : industry,
            number_of_jobs : addJobField,
            job_field : jobField,
            jobDescription : jobDescription,           
            number_of_projects : addProject,
            project_name : projectName,
            project_description : projectDescription  
        }

        console.log(companyDetail)
    }

    return (
        <div className="company-data-page data-form-page">
            <div className="form-page">
                <form action="" method="post" onSubmit={handelSubmit}>
                    {/* Company detail */}
                    <label htmlFor="company-name" className="company-name-label">Company Name</label>
                    <input type="text" name="company-name" className="company-name-input" value={companyName} onChange={(e) => setCompanName(e.target.value)}/>
                    <label htmlFor="company-desc" className="company-desc-label">Description</label>
                    <textarea name="company-desc" className="company-desc-input" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}/>
                    <label htmlFor="company-industry" className="company-industry-label">Industry</label>
                    <select name="industry" className="industry-name" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                        <option value="it">IT</option>
                        <option value="tech">Tech</option>
                        <option value="marketing">Marketing</option>
                    </select>

                    {/* Jobs */}
                    <p className="jobs">Jobs</p>
                    <label htmlFor="company-job-field" className="company-job-field-label">Job Field</label>
                    <input type="text" name="company-job-field" className="company-job-field-input" value={jobField} onChange={(e) => setJobField(e.target.value)}/>
                    <label htmlFor="company-job-field-desc" className="company-job-desc-label">Job Description</label>
                    <textarea name="company-job-field-desc" className="company-job-desc-input" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                    <button type="button" onClick={() => addJobField+1}>+ Add job</button>

                    {/* Projects */}
                    <p className="projects">Projects</p>
                    <label htmlFor="project-name" className="project-name-label">Project Name</label>
                    <input type="text" name="project-name" className="project-name-input" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                    <label htmlFor="project-desc" className="project-desc-label">Project Description</label>
                    <textarea name="project-desc" className="project-desc-input" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
                    <button type="button" onClick={() => addProject+1}>+ Add Project</button>

                <button type="submit" className="Save">Save</button>

                </form>

            </div>
        </div>
    )
}

export default Company_data