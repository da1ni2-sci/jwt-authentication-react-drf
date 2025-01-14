import { createContext, useContext, useEffect, useState } from "react";

import { check_auth, login, register } from "../endpoint/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  const login_user = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      setIsAuthenticated(true);
      nav("/");
    } else {
      alert("error logging in");
    }
  };

  const register_user = async (username, email, password, password2) => {
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const success = await register(username, email, password);
      if (success) {
        alert("successfully registered user");
        setIsAuthenticated(true);
        nav("/");
      } else {
        alert("error registering user");
      }
    }
  };

  const get_authenticated = async () => {
    try {
      setIsLoading(true);
      const authenticated = await check_auth();
      setIsAuthenticated(authenticated);
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get_authenticated();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login_user, register_user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
