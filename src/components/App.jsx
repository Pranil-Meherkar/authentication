import "../App.css";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthProvider, { useAuth } from "./auth";

function App() {
  const auth = useAuth();
  console.log(auth.loggedIn);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={auth.loggedIn ? <Dashboard /> : <Login />}
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
