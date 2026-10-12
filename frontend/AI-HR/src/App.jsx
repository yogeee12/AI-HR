import CandidateProfile from "./component/candidate/CandidateProfile"
import CandidateProfileSetUp from "./component/candidate/candidateProfileSetUp"
import CompanyProfile from "./component/company/CompanyProfile"
import CompanyProfileSetUp from "./component/company/CompanyProfileSetUp"
import Home from "./component/Home"
import LoginAs from "./component/LoginAs"
import MainLayout from "./layouts/MainLayout"
import JobPostDashboard from "./component/JobPostDashboard"
import { BrowserRouter , Routes , Route } from "react-router-dom"

function App(){

  // const [activePage , setActivePage] = useState("home")

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout/>}>

        <Route path="/" element={<Home/>}/>

        <Route path="/jobs"
        element={<JobPostDashboard/>}/>
        
        <Route path="/login-as" element={<LoginAs />}/>

        <Route path="/candidate-profile"
        element={<CandidateProfile/>}/>

        <Route path="/company-profile"
        element={<CompanyProfile/>}/>

        <Route path="/company-profile-setup"
        element={<CompanyProfileSetUp/>}/>

        <Route path="/candidate-profile-setup"
        element={<CandidateProfileSetUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App