import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataReducer, dataInitialState } from "../reducers/DataReducer";
import axios from "axios";
import { toast } from "react-hot-toast";

const DataContext = createContext();

const userAvatars = [
  "https://img.icons8.com/?size=512&id=ad9jgRQm5uhO&format=png",
  "https://img.icons8.com/?size=512&id=VB2vPL99QHto&format=png",
  "https://img.icons8.com/?size=512&id=IHss1550u7a6&format=png",
  "https://img.icons8.com/?size=512&id=M3NKqlTjSfkE&format=png",
  "https://img.icons8.com/?size=512&id=lBTRRdDll3Z3&format=png",
  "https://img.icons8.com/?size=512&id=UQKOOOZSVUAT&format=png",
  "https://img.icons8.com/?size=512&id=7x6o3SY5s4fG&format=png",
  "https://img.icons8.com/?size=512&id=P6I9sXaTnCR2&format=png",
];

export function DataProvider({ children }) {
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);
  const [usersLoading, setUsersLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      const users = response.data.users;

      if (response.status === 200) {
        dataDispatch({ type: "SET_ALL_USERS", payload: users });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const posts = response.data.posts;

      if (response.status === 200) {
        dataDispatch({ type: "SET_ALL_POSTS", payload: posts });
        const filteredPosts = applyFilters(posts);
        dataDispatch({
          type: "SET_FILTERED_POSTS",
          payload: filteredPosts,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPostsLoading(false);
    }
  };

  const setUserFeed = () => {
    const posts = [...dataState.filteredPosts];
    const currentUser = dataState.user;

    const userFeed = posts.filter((post) => {
      const isFollowing = currentUser.following.some(
        (user) => user.username === post.username
      );
      return isFollowing || post.username === currentUser.username;
    });

    dataDispatch({ type: "SET_USER_FEED", payload: userFeed });
  };

  const getUser = async (userName) => {
    try {
      const commentBy = dataState.users.find(
        ({ username }) => username === userName
      );

      const response = await axios.get(`/api/users/${commentBy._id}`);

      return response.data.user;
    } catch (e) {
      console.errore();
    }
  };

  const getUserPosts = async (userName) => {
    dataDispatch({ type: "SET_LOADING" });

    try {
      const response = await axios.get(`/api/posts/user/${userName}`);
      const posts = response.data.posts;

      if (response.status === 200) {
        posts.sort((a, b) => {
          const postADate = new Date(a.createdAt);
          const postBDate = new Date(b.createdAt);

          return postBDate.getTime() - postADate.getTime();
        });
        dataDispatch({ type: "SET_USER_POSTS", payload: posts });
      }
    } catch (e) {
      console.error(e);
    } finally {
      dataDispatch({ type: "SET_LOADING" });
    }
  };

  const followUserHandler = async (userId) => {
    dataDispatch({ type: "SET_LOADING" });

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
        dataDispatch({ type: "SET_USER", payload: user });
        toast.success("Followed user!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dataDispatch({ type: "SET_LOADING" });
    }
  };

  const unfollowUserHandler = async (userId) => {
    dataDispatch({ type: "SET_LOADING" });

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
        dataDispatch({ type: "SET_USER", payload: user });
        toast.success("Unfollowed user!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dataDispatch({ type: "SET_LOADING" });
    }
  };

  const handleEditProfile = async (newUserDetails) => {
    dataDispatch({ type: "SET_LOADING" });

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
        dataDispatch({ type: "SET_USER", payload: user });
        toast.success("Profile edited successfully!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dataDispatch({ type: "SET_LOADING" });
    }
  };

  const handleProfilePictureUpload = async (selectedImage) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append(":use_filename", true);
      formData.append("upload_preset", "uzfl2950");
      formData.append("folder", "SnapSquad/profile-images");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/ddfyxmlhe/image/upload",
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

  const suggestedUsers = dataState.users.filter(
    (suggestedUser) =>
      suggestedUser._id !== dataState.user._id &&
      !dataState.user.following.find((user) => user._id === suggestedUser._id)
  );

  const applyFilters = (posts) => {
    const filteredPosts = [...posts];
    const sortMethod = dataState.sortMethod;

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

  useEffect(() => {
    const filteredPosts = applyFilters(dataState.posts);
    dataDispatch({
      type: "SET_FILTERED_POSTS",
      payload: filteredPosts,
    });
  }, [dataState.sortMethod, dataState.posts]);

  useEffect(() => {
    if (dataState.user && dataState.posts.length <= 0) {
      setUsersLoading(true);
      setPostsLoading(true);
    }
    if (dataState.user) {
      fetchAllUsers();
      fetchAllPosts();
    }
  }, [dataState.user]);

  useEffect(() => {
    if (dataState.filteredPosts.length > 0) {
      setUserFeed();
    }
  }, [dataState.filteredPosts]);

  return (
    <DataContext.Provider
      value={{
        user: dataState.user,
        users: dataState.users,
        userPosts: dataState.userPosts,
        posts: dataState.posts,
        filteredPosts: dataState.filteredPosts,
        userFeed: dataState.userFeed,
        isLoading: dataState.isLoading,
        usersLoading,
        postsLoading,
        dataDispatch,
        suggestedUsers,
        getUser,
        getUserPosts,
        followUserHandler,
        unfollowUserHandler,
        userAvatars,
        handleEditProfile,
        handleProfilePictureUpload,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
