import { setAuthError } from "../store/AuthSlice";

export const userAvatars = [
  "https://img.icons8.com/?size=512&id=ad9jgRQm5uhO&format=png",
  "https://img.icons8.com/?size=512&id=VB2vPL99QHto&format=png",
  "https://img.icons8.com/?size=512&id=IHss1550u7a6&format=png",
  "https://img.icons8.com/?size=512&id=M3NKqlTjSfkE&format=png",
  "https://img.icons8.com/?size=512&id=lBTRRdDll3Z3&format=png",
  "https://img.icons8.com/?size=512&id=UQKOOOZSVUAT&format=png",
  "https://img.icons8.com/?size=512&id=7x6o3SY5s4fG&format=png",
  "https://img.icons8.com/?size=512&id=P6I9sXaTnCR2&format=png",
];

export const loginValidation = (state, dispatch) => {
  if (state.username.trim().length <= 0 && state.password.trim().length <= 0) {
    dispatch(setAuthError("Username & Password cannot be empty"));
    return false;
  } else if (state.username.trim().length <= 0) {
    dispatch(setAuthError("Username cannot be empty"));
    return false;
  } else if (state.password.trim().length <= 0) {
    dispatch(setAuthError("Password cannot be empty"));
    return false;
  } else {
    dispatch(setAuthError(""));
    return true;
  }
};

export const signupValidation = (state, dispatch) => {
  if (
    state.username.trim().length <= 0 ||
    state.password.trim().length <= 0 ||
    state.firstname.trim().length <= 0 ||
    state.lastname.trim().length <= 0
  ) {
    dispatch(setAuthError("Please fill out all the fields"));
  }

  dispatch(setAuthError(""));
  return true
};
