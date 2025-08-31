import {Routes, Route, BrowserRouter} from "react-router";
import Landing from "./screens/Landing";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import IndividualBlog from "./screens/IndividualBlog";
import CreateBlog from "./screens/CreateBlog"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/blog" element={<IndividualBlog/>}/>
        <Route path="/createBlog" element={<CreateBlog/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
