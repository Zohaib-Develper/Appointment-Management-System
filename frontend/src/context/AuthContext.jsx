import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/auth/me");
        setAuthUser(data.user);
      } catch (err) {
        setAuthUser(null);
      }
    };
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
