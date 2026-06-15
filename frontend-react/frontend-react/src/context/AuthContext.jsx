import {
  createContext,
  useContext,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(

    JSON.parse(
      localStorage.getItem("user")
    ) || null
  );

  // LOGIN

  const login = async (
    email,
    password
  ) => {

    const response = await axios.post(

      "http://localhost:8080/auth/login",

      {
        email,
        password,
      }
    );

    setUser(response.data);

    localStorage.setItem(

      "user",

      JSON.stringify(response.data)
    );

    return response.data;
  };

  // SIGNUP

  const signup = async (
    data
  ) => {

    const response = await axios.post(

      "http://localhost:8080/auth/signup",

      data
    );

    return response.data;
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);
  };

  return (

    <AuthContext.Provider

      value={{

        user,
        login,
        signup,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);