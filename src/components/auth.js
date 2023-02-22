import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export default function AuthProvider(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const getData = async () => {
    const data = await axios
      .get("http://localhost:8080/users")
      .then(console.log("data recieved"))
      .catch("Error");

    setUsers([...data.data]);
    console.log(users, data.data, "data getData");
  };

  const getUserData = () => {
    setUser(localStorage.getItem("user"));
  };

  useEffect(() => {
    getData();
  }, []);

  const login = (user) => {
    const currentUser = users.find((item) => user.email === item.email);
    if (!currentUser) {
      return false;
    }

    if (!(currentUser.password === user.password)) {
      return false;
    }

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    let name = users.find((item) => user.email === item.email).name;
    localStorage.setItem("userName", name);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem("user", "{}");
    setUser({});
  };

  const register = async (user) => {
    console.log(users, "users on register");

    await axios
      .post("http://localhost:8080/users", user)
      .then(() => {
        console.log("Data sent");
        getData();
      })
      .catch("error");
  };

  const checkRegistered = (email) => {
    console.log(users);
    if (!users) return false;
    return users.some((user) => user.email === email);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        loggedIn,
        setLoggedIn,
        getData,
        getUserData,
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
