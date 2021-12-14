import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Appearance from "./pages/Appearance/Appearance";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/SignUp/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/appearance" element={<Appearance />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
