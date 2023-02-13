import "../App.css";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthProvider from "./auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
