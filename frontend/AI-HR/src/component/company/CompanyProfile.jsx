
import { getMyProfile, logoutUser } from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobPost from "./CreateJobPost";
import CompanyJobDashboard from "./CompanyJobDashboard";
import "../../styles/company_profile.css";

function CompanyProfile() {
    const [companyProfile, setCompanyProfile] = useState(null);
    const [showJobModal, setShowJobModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getMyProfile();

                if (!data || data.detail) {
                    throw new Error(data?.detail || "Unable to load company profile");
                }

                setCompanyProfile(data);
            } catch (error) {
                console.error("Error fetching company data:", error);
                setError("Unable to load your company profile.");
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

    return (
        <main className="company-profile-page">
            <div className="company-profile-layout">

                <header className="company-profile-header">
                    <div>
                        <p className="company-profile-eyebrow">
                            COMPANY WORKSPACE
                        </p>
                        <h1>Company Profile</h1>
                        <p className="company-profile-subtitle">
                            Manage your company, publish jobs, and review candidates.
                        </p>
                    </div>

                    <button
                        className="company-logout-button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </header>

                {loading ? (
                    <div className="company-profile-message">
                        Loading company profile...
                    </div>
                ) : error ? (
                    <div className="company-profile-message company-profile-error">
                        {error}
                    </div>
                ) : (
                    <section className="company-info-card">
                        <div className="company-info-banner" />

                        <div className="company-info-content">
                            <div className="company-logo-placeholder">
                                {(companyProfile?.company_name || "C")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="company-info-details">
                                <span className="company-account-label">
                                    COMPANY ACCOUNT
                                </span>

                                <h2>
                                    {companyProfile?.company_name || "Your Company"}
                                </h2>

                                <p className="company-industry">
                                    {companyProfile?.industry || "Industry not specified"}
                                </p>

                                <p className="company-description">
                                    {companyProfile?.company_description ||
                                        "Add a description to introduce your company to potential candidates."}
                                </p>
                            </div>

                            <button
                                className="post-job-button"
                                onClick={() => setShowJobModal(true)}
                            >
                                <span>+</span> Post a Job
                            </button>
                        </div>
                    </section>
                )}

                {showJobModal && (
                    <CreateJobPost
                        onClose={() => setShowJobModal(false)}
                    />
                )}

                <section className="company-interview-area">
                    <div className="company-interview-intro">
                        <div>
                            <p className="company-profile-eyebrow">
                                RECRUITMENT
                            </p>
                            <h2>Interview Management</h2>
                            <p>
                                Review candidate applications and AI interview results.
                            </p>
                        </div>
                    </div>

                    <CompanyJobDashboard />
                </section>

            </div>
        </main>
    );
}

export default CompanyProfile;
