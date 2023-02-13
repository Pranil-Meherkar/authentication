import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const login = (user) => setUser(user);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
