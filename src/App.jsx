import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          // Check if the user is authorized first
          <Authorized>
            <NavBar />
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
