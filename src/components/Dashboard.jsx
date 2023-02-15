import React, { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState();
  const auth = useAuth();
  const users = auth.users;
  const current = users.find((user) => user.email === auth.user.email);
  console.log(current);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Hi, {current.name}</h1>
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
