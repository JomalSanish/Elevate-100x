import {Routes, Route, BrowserRouter} from "react-router";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="signin" element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>    
      </Routes>
    </BrowserRouter>
  )
}

export default App
