import "../App.css";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthProvider from "./auth";
import RequireAuth from "./requireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
