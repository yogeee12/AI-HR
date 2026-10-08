import CandidateProfile from "./component/candidate/CandidateProfile"
import CompanyProfile from "./component/company/CompanyProfile"
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

      </Routes>
    </BrowserRouter>
  )
}

export default App