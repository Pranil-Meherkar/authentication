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

  const getUserData = async () => {
    const data = await axios
      .get("http://localhost:8080/user")
      .then(console.log("data recieved"))
      .catch("Error");

    setUser(data.data[0]);
  };

  useEffect(() => {
    getData();
    getUserData();
  }, []);

  const login = async (user) => {
    if (!users.find((item) => user.email === item.email)) {
      return false;
    }

    setUser(user);
    setLoggedIn(true);
    await axios
      .post("http://localhost:8080/user", user)
      .then(() => {
        localStorage.setItem("currentUser", user);
        console.log("login sent");
      })
      .catch("Error");
  };

  const logout = async () => {
    setUser({});
    await axios
      .delete("http://localhost:8080/user/1")
      .then(() => {
        console.log("logout sent");
        setLoggedIn(false);
      })
      .catch("Error");
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
        user,
        users,
        loggedIn,
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
