import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { userAvatars } from "../utilities/utilities";
import { setUser } from "./DataSlice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ state, navigate }, { dispatch }) => {
    try {
      console.log("state", state);
      const response = await axios.post("/api/auth/login", {
        username: state.username,
        password: state.password,
      });

      if (response.status === 200) {
        dispatch(logIn(response.data));
        dispatch(setUser(response.data.foundUser));
        toast.success("Login successfull!");

        navigate("/");
      }
    } catch (e) {
      if (e.response.status === 404) {
        dispatch(
          setAuthError(
            "User not found. Please enter correct username & password"
          )
        );
      } else if (e.response.status === 401) {
        dispatch(
          setAuthError(
            "The credentials you entered are invalid. Unauthorized access error"
          )
        );
      } else {
        dispatch(setAuthError(e.message));
      }

      console.error(e);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ state, navigate }, { dispatch }) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: state.firstName,
        lastName: state.lastName,
        username: state.username,
        password: state.password,
        avatarUrl: userAvatars[0],
      });

      if (response.status === 201) {
        dispatch(signedUp(response.data));
        dispatch(setUser(response.data.createdUser));

        toast.success("Signup successfull!");

        navigate("/");
      }
    } catch (e) {
      if (e.response.status === 422) {
        dispatch(
          setAuthError(
            "Username already exists. Please select another username"
          )
        );
      } else {
        dispatch(setAuthError(e.message));
      }

      console.error(e);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { dispatch }) => {
    dispatch(loggedOut());
    toast.success("Logged Out Successfully!");
    navigate("/login");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("LOGGED_IN"),
    status: "loading", //or "idle", "error"
    user:
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    error: "",
  },
  reducers: {
    logIn(state, action) {
      let user = action.payload;
      state.isAuthenticated = true;
      state.user = user.foundUser;
      state.error = "";
      localStorage.setItem("token", user.encodedToken);
      localStorage.setItem("LOGGED_IN", "1");
      localStorage.setItem("user", JSON.stringify(user.foundUser));
    },
    signedUp(state, action) {
      let user = action.payload;
      state.isAuthenticated = true;
      state.user = user.createdUser;
      state.error = "";
      localStorage.setItem("token", user.encodedToken);
      localStorage.setItem("LOGGED_IN", "1");
      localStorage.setItem("user", JSON.stringify(user.createdUser));
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.setItem("LOGGED_IN", "");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    userUpdated(state, action) {
      let user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  extraReducers: {
    [login.rejected]: (state) => {
      state.status = "error";
    },
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state) => {
      state.status = "idle";
    },
    [signUp.rejected]: (state) => {
      state.status = "error";
    },
    [signUp.pending]: (state) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state) => {
      state.status = "idle";
    },
  },
});

let { actions, reducer } = authSlice;
export const { logIn, loggedOut, signedUp, setAuthError, userUpdated } =
  actions;
export default reducer;
