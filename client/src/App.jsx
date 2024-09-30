import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/v1/signup/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
