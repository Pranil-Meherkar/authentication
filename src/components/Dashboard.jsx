import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userName, setUserName] = useState();
  const auth = useAuth();
  const user = auth.user;

  useEffect(() => {
    auth.getData();
    console.log(auth.users, user, "dashboard users");
    setUserName(localStorage.getItem("userName"));
  }, []);

  console.log(userName);

  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Hi, {userName}</h1>
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
