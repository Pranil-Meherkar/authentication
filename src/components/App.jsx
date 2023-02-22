import "../App.css";
import Login from "./Login";
// import Register from "./Register";
// import Dashboard from "./Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react";
import { useAuth } from "./auth";
const Register = lazy(() => import("./Register"));
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  const auth = useAuth();
  useEffect(() => {
    auth.setLoggedIn(
      Object.keys(JSON.parse(localStorage.getItem("user"))).length === 0
        ? false
        : true
    );
    console.log("Login", auth.loggedIn);
  }, [localStorage.getItem("user")]);
  return (
    <Routes>
      <Route
        path="/login"
        element={auth.loggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={
          <Suspense fallback="loading...">
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          auth.loggedIn ? (
            <Suspense fallback="loading...">
              <Dashboard />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
