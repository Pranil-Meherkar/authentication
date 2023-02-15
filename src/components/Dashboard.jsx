import React from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1>Hi, {auth.user.email}</h1>
      <button
        className="logout-button"
        onClick={() => {
          auth.logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
