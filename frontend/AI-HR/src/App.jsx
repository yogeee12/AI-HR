import CandidateProfile from "./component/candidate/CandidateProfile"
import CandidateProfileSetUp from "./component/candidate/candidateProfileSetUp"
import CompanyProfile from "./component/company/CompanyProfile"
import CompanyProfileSetUp from "./component/company/CompanyProfileSetUp"
import LoginAs from "./component/LoginAs"
import { BrowserRouter , Routes , Route } from "react-router-dom"

function App(){

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginAs />}/>

        <Route path="/candidate-profile"
        element={<CandidateProfile/>}/>

        <Route path="/company-profile"
        element={<CompanyProfile/>}/>

        <Route path="/company-profile-setup"
        element={<CompanyProfileSetUp/>}/>

        <Route path="/candidate-profile-setup"
        element={<CandidateProfileSetUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App