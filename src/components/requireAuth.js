import React, { useEffect } from "react";
import { useAuth } from "./auth";
import { Navigate, useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const auth = useAuth();

  useEffect(() => {
    auth.getUserData();
  }, []);

  if (!auth.user || Object.keys(auth.user).length === 0) {
    console.log(auth.user, "require auth");
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
