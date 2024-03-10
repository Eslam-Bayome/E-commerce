import React, { useContext } from "react";
import { CreateAuth } from "./../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { token } = useContext(CreateAuth);

  if (!token) return <Navigate to={"/login"} />;

  return <>{children}</>;
}
