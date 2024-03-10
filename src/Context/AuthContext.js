import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const CreateAuth = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("tkn"));
  const [newPass, setNewPass] = useState(false);

  function getUserId() {
    let token = localStorage.getItem("tkn");
    const data = jwtDecode(token);
    localStorage.setItem("ownerId", data.id);
  }

  return (
    <CreateAuth.Provider
      value={{ token, setToken, setNewPass, newPass, getUserId }}
    >
      {children}
    </CreateAuth.Provider>
  );
}
