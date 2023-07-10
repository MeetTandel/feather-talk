import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const token = localStorage.getItem("token") ?? null;

const applyFilters = (data, posts) => {
  const filteredPosts = [...posts];
  const sortMethod = data.sortMethod;

  if (sortMethod === "latest") {
    filteredPosts.sort((a, b) => {
      const postADate = new Date(a.createdAt);
      const postBDate = new Date(b.createdAt);

      return postBDate.getTime() - postADate.getTime();
    });
  } else if (sortMethod === "trending") {
    filteredPosts.sort((a, b) => b?.likes?.likeCount - a?.likes?.likeCount);
  }

  return filteredPosts;
};

export const fetchAllUsers = createAsyncThunk(
  "data/fetchUsers",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("/api/users");
      const users = response.data.users;

      if (response.status === 200) {
        dispatch(setAllUsers(users));
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setUsersLoading(false));
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "data/fetchPosts",
  async (_, { getState, dispatch }) => {
    const data = getState().data;
    try {
      const response = await axios.get("/api/posts");
      const posts = response.data.posts;

      if (response.status === 200) {
        dispatch(setAllPosts(posts));
        const filteredPosts = applyFilters(data, posts);
        dispatch(setFilteredPosts(filteredPosts));
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setPostsLoading(false));
    }
  }
);

export const setUserFeed = (data, dispatch) => {
  const posts = [...data.filteredPosts];
  const currentUser = data.user;

  const userFeed = posts.filter((post) => {
    const isFollowing = currentUser.following.some(
      (user) => user.username === post.username
    );
    return isFollowing || post.username === currentUser.username;
  });

  dispatch(setUserFeedData(userFeed));
};

export const getUser = createAsyncThunk(
  "data/getUser",
  async (userName, { getState }) => {
    const data = getState().data;
    try {
      const commentBy = data.users.find(
        ({ username }) => username === userName
      );

      const response = await axios.get(`/api/users/${commentBy._id}`);

      return response.data.user;
    } catch (e) {
      console.errore();
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "data/getUserPosts",
  async (userName, { dispatch }) => {
    dispatch(setDataLoading(true));

    try {
      const response = await axios.get(`/api/posts/user/${userName}`);
      const posts = response.data.posts;

      if (response.status === 200) {
        posts.sort((a, b) => {
          const postADate = new Date(a.createdAt);
          const postBDate = new Date(b.createdAt);

          return postBDate.getTime() - postADate.getTime();
        });
        dispatch(setUserPosts(posts));
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

export const followUserHandler = createAsyncThunk(
  "data/followUser",
  async (userId, { dispatch }) => {
    dispatch(setDataLoading(true));

    try {
      const response = await axios.post(
        `/api/users/follow/${userId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      const user = response.data.user;

      if (response.status === 200) {
        dispatch(setUser(user));
        toast.success("Followed user!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

export const unfollowUserHandler = createAsyncThunk(
  "data/unfollowUser",
  async (userId, { dispatch }) => {
    dispatch(setDataLoading(true));

    try {
      const response = await axios.post(
        `/api/users/unfollow/${userId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      const user = response.data.user;

      if (response.status === 200) {
        dispatch(setUser(user));
        toast.success("Unfollowed user!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

export const handleEditProfile = createAsyncThunk(
  "data/editProfile",
  async (newUserDetails, { dispatch }) => {
    dispatch(setDataLoading(true));

    try {
      const response = await axios.post(
        `/api/users/edit`,
        {
          userData: newUserDetails,
        },
        {
          headers: { authorization: token },
        }
      );
      const user = response.data.user;

      if (response.status === 201) {
        dispatch(setUser(user));
        toast.success("Profile edited successfully!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

export const handleProfilePictureUpload = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append(":use_filename", true);
    formData.append("upload_preset", "y0rmqfwq");
    formData.append("folder", "FeatherTalk/profile-images");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/djxpf0jzi/image/upload",
      {
        method: "post",
        body: formData,
      }
    ).then((res) => res.json());

    const mediaUrl = data.url;

    return mediaUrl;
  } catch (e) {
    console.error(e);
  }
};

const dataSlice = createSlice({
  name: "data",
  initialState: {
    user:
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    users: [],
    userPosts: [],
    posts: [],
    filteredPosts: [],
    userFeed: [],
    theme:
      localStorage.getItem("theme") === null
        ? "light"
        : localStorage.getItem("theme"),
    sortMethod: "latest",
    isLoading: false,
    userLoading: false,
    postsLoading: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserPosts(state, action) {
      state.userPosts = action.payload;
    },
    setAllUsers(state, action) {
      state.users = action.payload;
    },
    setAllPosts(state, action) {
      state.posts = action.payload;
    },
    setFilteredPosts(state, action) {
      state.filteredPosts = action.payload;
    },
    setUserFeedData(state, action) {
      state.userFeed = action.payload;
    },
    setSortMethod(state, action) {
      state.sortMethod = action.payload;
    },
    setDataLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUsersLoading(state, action) {
      state.userLoading = action.payload;
    },
    setPostsLoading(state, action) {
      state.postsLoading = action.payload;
    },
    setTheme(state, action) {
      if (state.theme === "light") {
        localStorage.theme = "dark";
        localStorage.setItem("theme", "dark");
        state.theme = "dark";
      } else {
        localStorage.theme = "light";
        localStorage.setItem("theme", "light");
        state.theme = "light";
      }
    },
  },
  extraReducers: {},
});

let { actions, reducer } = dataSlice;
export const {
  setUser,
  setUserPosts,
  setAllUsers,
  setAllPosts,
  setFilteredPosts,
  setUserFeedData,
  setSortMethod,
  setDataLoading,
  setUsersLoading,
  setPostsLoading,
  setTheme,
} = actions;
export default reducer;
