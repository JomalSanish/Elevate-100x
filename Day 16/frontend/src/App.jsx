import {Routes, Route, BrowserRouter} from "react-router";
import Landing from "./screens/Landing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
