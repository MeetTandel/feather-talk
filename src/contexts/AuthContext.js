import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authInitialState, authReducer } from "../reducers/AuthReducer";
import axios from "axios";
import { useNavigate } from "react-router";
import { useData } from "./DataContext";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const AuthContext = createContext();
let method = "";

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const dispatch = useDispatch()
  const { dataDispatch, userAvatars } = useData();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      dataDispatch({ type: "SET_USER", payload: JSON.parse(user) });

      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      method === "login" ? performLogin() : performSignup();
      // setIsLoading(true);
    }
  }, [userDetails]);

  const performLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: authState.username,
        password: authState.password,
      });

      if (response.status === 200) {
        setLoggedIn(true);
        localStorage.setItem("token", response.data.encodedToken);
        localStorage.setItem("user", JSON.stringify(response.data.foundUser));
        dataDispatch({ type: "SET_USER", payload: response.data.foundUser });
        toast.success("Login successfull!");

        navigate("/");
      }
    } catch (e) {
      if (e.response.status === 404) {
        authDispatch({
          type: "SET_ERROR",
          payload: "User not found. Please enter correct username & password",
        });
      } else if (e.response.status === 401) {
        authDispatch({
          type: "SET_ERROR",
          payload:
            "The credentials you entered are invalid. Unauthorized access error",
        });
      } else {
        authDispatch({
          type: "SET_ERROR",
          payload: e.message,
        });
      }

      console.error(e);
    } finally {
      // setIsLoading(false);
    }
  };

  const performSignup = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: authState.firstName,
        lastName: authState.lastName,
        username: authState.username,
        password: authState.password,
        avatarUrl: userAvatars[0],
      });

      if (response.status === 201) {
        setLoggedIn(true);
        localStorage.setItem("token", response.data.encodedToken);
        localStorage.setItem("user", JSON.stringify(response.data.createdUser));
        dataDispatch({ type: "SET_USER", payload: response.data.createdUser });
        toast.success("Signup successfull!");

        navigate("/");
      }
    } catch (e) {
      if (e.response.status === 422) {
        authDispatch({
          type: "SET_ERROR",
          payload: "Username already exists. Please select another username",
        });
      } else {
        authDispatch({
          type: "SET_ERROR",
          payload: e.message,
        });
      }

      console.error(e);
    } finally {
      // setIsLoading(false);
    }
  };

  const loginValidation = () => {
    if (
      authState.username.trim().length <= 0 &&
      authState.password.trim().length <= 0
    ) {
      return authDispatch({
        type: "SET_ERROR",
        payload: "Username & Password cannot be empty",
      });
    } else if (authState.username.trim().length <= 0) {
      return authDispatch({
        type: "SET_ERROR",
        payload: "Username cannot be empty",
      });
    } else if (authState.password.trim().length <= 0) {
      return authDispatch({
        type: "SET_ERROR",
        payload: "Password cannot be empty",
      });
    }

    method = "login";
    setUserDetails({
      username: authState.username,
      password: authState.password,
    });
  };

  const signupValidation = () => {
    if (
      authState.username.trim().length <= 0 ||
      authState.password.trim().length <= 0 ||
      authState.firstName.trim().length <= 0 ||
      authState.lastName.trim().length <= 0
    ) {
      return authDispatch({
        type: "SET_ERROR",
        payload: "Please fill out all the fields",
      });
    }

    authDispatch({
      type: "SET_ERROR",
      payload: "",
    });

    method = "signup";
    setUserDetails({
      username: authState.username,
      password: authState.password,
      firstName: authState.firstName,
      lastName: authState.lastName,
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authDispatch({
      type: "LOG_OUT",
    });
    toast.success("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        authState,
        authDispatch,
        loginValidation,
        signupValidation,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
