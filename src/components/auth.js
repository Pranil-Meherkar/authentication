import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  const register = (user) => {
    setUsers([...users, user]);
  };

  const checkRegistered = (email) => {
    if (!users) return false;

    return users.some((user) => user.email === email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loggedIn,
        checkRegistered,
        register,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
