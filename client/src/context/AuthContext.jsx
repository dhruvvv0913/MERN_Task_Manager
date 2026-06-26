import { createContext, useContext, useState } from "react";
import api from "../api";

// This context lets any component know who is logged in
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Read any saved user from localStorage so a refresh keeps you logged in
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save the token and user after a successful login or register
  function saveAuth(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function register(name, email, password) {
    const res = await api.post("/auth/register", { name, email, password });
    saveAuth(res.data);
  }

  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    saveAuth(res.data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A small helper so components can do:  const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
