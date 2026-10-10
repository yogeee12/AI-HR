import Navbar from "./Navbar"
import "../styles/home.css"

function Home(){

    return (
        <div className="home-page">
            <Navbar/>
            <div className="home-page-body">
                <div className="hero-section">
                    <h1>Find Your Dream Job Today</h1>
                    <p>Browse thousands of jobs listing from top companies around the world.<br/>Your next career move starts here</p>
                    <div className="home-page-search">
                    <form action="" method="post">
                        <input type="search" name="serach" placeholder="Job title, company, Location" className="search-bar"/>
                        <button type="submit">search</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default Home