import {Routes, Route, BrowserRouter} from "react-router";
import Landing from "./screens/Landing";
import AdminSignup from "./screens/AdminSignup";
import UserSignup from "./screens/UserSignup";
import AdminSignin from "./screens/AdminSignin";
import UserSignin from "./screens/UserSignin";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";
import AddQuestion from "./screens/AddQuestion";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/AdminSignup" element={<AdminSignup/>}/>
        <Route path="/UserSignup" element={<UserSignup/>}/>
        <Route path="/AdminSignin" element={<AdminSignin/>}/>
        <Route path="/UserSignin" element={<UserSignin/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
        <Route path="/AddQuestion" element={<AddQuestion/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
