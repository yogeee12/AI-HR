import { useState } from "react"
import { handelSubmit } from "../../services/api";
import "../../styles/creat_job_post.css"

function CreateJobPost({onClose}){

    const [jobTitle , setJobTitle] = useState("");
    const [description , setDescription] = useState("");
    const [requiredSkills , setRequiredSkills] = useState("");
    const [experience , setExperience] = useState("");
    const [location , setLocation] = useState("");

    const jobDetails = {
        job_title : jobTitle,
        description : description,
        required_skills : requiredSkills,
        min_experience : experience,
        location : location,
    }

    return(
        <div className="job-modal-overlay" onClick={onClose}>
            <div 
            className="job-model"
            onClick={(e) => e.stopPropagation()}>
                <div className="job-modal-header">
                    <div>
                        <h2>Post a job</h2>
                    </div>
                    <button 
                    type="button"
                    className="job-model_close"
                    onClick={onClose}
                    aria-label="Close form"
                    >
                        &times;
                        </button>
                </div>
                <form action="" onSubmit={(e) => handelSubmit({e, data:jobDetails, endpoint:"job-details"})}>
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name="job-title" className="job-title-input" onChange={(e) => setJobTitle(e.target.value)}/>

                    <label htmlFor="job-description">Job Description</label>
                    <textarea name="job-description" className="job-description-input" onChange={(e) => setDescription(e.target.value)}/>

                    <label htmlFor="job-required-skills">Required Skills</label>
                    <input type="text" name="job-required-skills" className="job-required-skills-input" onChange={(e) => setRequiredSkills(e.target.value)}/>

                    <label htmlFor="job-min-experience">Minimum Experience</label>
                    <input type="number" name="job-min-experience" className="job-min-experience-input" onChange={(e) => setExperience(e.target.value)}/>

                    <label htmlFor="job-location">Location</label>
                    <input type="text" name="job-location" className="job-location-input" onChange={(e) => setLocation(e.target.value)}/>

                    <div className="job-modal-actions">
                        <button
                            type="button"
                            className="job-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                         <button
                            type="submit"
                            className="job-submit-btn"
                        >
                            Publish Job
                        </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default CreateJobPost