import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import dataReducer from "./DataSlice"
import postsReducer from "./PostsSlice"

const store = configureStore({
  reducer: {
    data: dataReducer,
    posts: postsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ immutableCheck: false }),
  ],
});

export default store;
