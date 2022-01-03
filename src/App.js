import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./pages/Admin/Admin";
import Appearance from "./pages/Appearance/Appearance";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/SignUp/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            {/* <Route path="/admin">
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            </Route> */}
            <Route path="/admin/appearance" element={<Appearance />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
