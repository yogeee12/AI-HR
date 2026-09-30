import { useEffect, useState } from "react";
import { getCompanies } from "../services/api";

function Companies() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadCompanies() {
            try {
                const data = await getCompanies();

                console.log("Companies:", data);

                setCompanies(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadCompanies();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Companies</h1>

            {companies.map((item) => (
                <div key={item._id}>

                    <h2>
                        {item.company.company_name}
                    </h2>

                    <p>
                        {item.company.company_description}
                    </p>

                    <p>
                        Industry: {item.company.industry}
                    </p>

                </div>
            ))}
        </div>
    );
}

export default Companies;