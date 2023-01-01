import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  console.log("callled")
  console.log(user)
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
