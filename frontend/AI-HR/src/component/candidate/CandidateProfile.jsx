
import { useState, useEffect } from "react";
import { getMyProfile, logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/candidate_profile.css";

function CandidateProfile() {
    const [candidateProfile, setCandidateProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getMyProfile();

                if (!data || data.detail) {
                    throw new Error(data?.detail || "Unable to load profile.");
                }

                setCandidateProfile(data);
            } catch (err) {
                console.error("Profile error:", err);
                setError("We couldn't load your profile. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    function handleLogout() {
        logoutUser();
        navigate("/");
    }

    if (loading) {
        return (
            <main className="candidate-profile-page">
                <p className="profile-message">Loading your profile...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="candidate-profile-page">
                <p className="profile-message profile-error">{error}</p>
            </main>
        );
    }

    const skills = Array.isArray(candidateProfile?.skills)
        ? candidateProfile.skills
        : typeof candidateProfile?.skills === "string"
          ? candidateProfile.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
          : [];

    return (
        <main className="candidate-profile-page">
            <div className="candidate-profile-layout">
                <header className="candidate-profile-heading">
                    <div>
                        <p className="profile-eyebrow">YOUR ACCOUNT</p>
                        <h1>My Profile</h1>
                        <p>Manage your professional information.</p>
                    </div>

                    <button
                        className="profile-logout-button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </header>

                <section className="candidate-profile-card">
                    <div className="candidate-profile-banner" />

                    <div className="candidate-profile-main">
                        <div className="candidate-profile-avatar">
                            {(candidateProfile?.name || "C")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="candidate-profile-identity">
                            <h2>{candidateProfile?.name || "Candidate"}</h2>
                            <p>Candidate account</p>
                        </div>
                    </div>

                    <div className="candidate-profile-details">
                        <section className="profile-detail-section">
                            <h3>About me</h3>
                            <p className="profile-summary">
                                {candidateProfile?.summary ||
                                    "Add a professional summary to tell companies about yourself."}
                            </p>
                        </section>

                        <section className="profile-detail-section">
                            <h3>Skills</h3>

                            {skills.length > 0 ? (
                                <div className="profile-skills">
                                    {skills.map((skill, index) => (
                                        <span key={`${skill}-${index}`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="profile-muted">
                                    No skills added yet.
                                </p>
                            )}
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default CandidateProfile;
