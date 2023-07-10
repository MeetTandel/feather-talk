import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setAllPosts } from "./DataSlice";

const token = localStorage.getItem("token") ?? null;

export const getPostsLikedByUser = (posts, user, dispatch) => {
  const postsLikedByUser = posts.reduce((acc, currPost) => {
    const postLiked = currPost.likes.likedBy.find(
      ({ username }) => username === user.username
    );
    acc = postLiked ? [...acc, currPost] : [...acc];
    return acc;
  }, []);
  dispatch(setLiked(postsLikedByUser));
};

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (postId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      const post = response.data.post;

      if (response.status === 200) {
        dispatch(setPosts(post));
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`/api/posts/like/${postId}`, "", {
        headers: { authorization: token },
      });
      const updatedPosts = response.data.posts;

      if (response.status === 201) {
        dispatch(setAllPosts(updatedPosts));
        toast.success("Post added to Liked posts!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (postId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`/api/posts/dislike/${postId}`, "", {
        headers: { authorization: token },
      });
      const updatedPosts = response.data.posts;

      if (response.status === 201) {
        dispatch(setAllPosts(updatedPosts));
        toast.error("Post removed from Liked posts!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "posts/getBookmarks",
  async (_, { getState, dispatch }) => {
    const { posts } = getState().data;
    dispatch(setLoading(true));
    try {
      const response = await axios.get("/api/users/bookmark", {
        headers: { authorization: token },
      });
      const bookmarks = response.data.bookmarks;
      const bookMarkedPosts = posts.filter(({ _id }) =>
        bookmarks.includes(_id)
      );

      if (response.status === 200) {
        dispatch(setBookmarks(bookMarkedPosts));
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addBookmark = createAsyncThunk(
  "posts/addBookmark",
  async (postId, { getState, dispatch }) => {
    const { posts } = getState().data;
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`/api/users/bookmark/${postId}`, "", {
        headers: { authorization: token },
      });
      const bookmarks = response.data.bookmarks;
      const bookMarkedPosts = posts.filter(({ _id }) =>
        bookmarks.includes(_id)
      );

      if (response.status === 200) {
        dispatch(setBookmarks(bookMarkedPosts));
        toast.success("Post added to Bookmarks!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "posts/removeBookmark",
  async (postId, { getState, dispatch }) => {
    const { posts } = getState().data;
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        "",
        {
          headers: { authorization: token },
        }
      );
      const bookmarks = response.data.bookmarks;
      const bookMarkedPosts = posts.filter(({ _id }) =>
        bookmarks.includes(_id)
      );

      if (response.status === 200) {
        dispatch(setBookmarks(bookMarkedPosts));

        toast.error("Post removed from Bookmarks!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const handleCreatePost = createAsyncThunk(
  "posts/createPost",
  async ({text, mediaUrl}, { dispatch }) => {
    dispatch(setLoading(true));

    const post = {
      content: text,
      mediaURL: mediaUrl,
    };

    try {
      const response = await axios.post(
        "/api/posts/",
        { postData: post },
        {
          headers: { authorization: token },
        }
      );

      const updatedPosts = response.data.posts;

      console.log("updated", updatedPosts)
      if (response.status === 201) {
        dispatch(setAllPosts(updatedPosts));
        toast.success("New post created!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const handleDeletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });

      const updatedPosts = response.data.posts;

      if (response.status === 201) {
        dispatch(setAllPosts(updatedPosts));
        toast.success("Post deleted successfully!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const handleEditPost = createAsyncThunk(
  "posts/editPost",
  async ({id, text, media}, { dispatch }) => {
    dispatch(setLoading(true));

    const post = {
      content: text,
      mediaURL: media,
    };

    try {
      const response = await axios.post(
        `/api/posts/edit/${id}`,
        { postData: post },
        {
          headers: { authorization: token },
        }
      );

      const updatedPosts = response.data.posts;

      if (response.status === 201) {
        dispatch(setAllPosts(updatedPosts));
        toast.success("Post edited successfully!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const handleMediaUpload = async (selectedImage) => {
  try {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append(":use_filename", true);
    formData.append("upload_preset", "y0rmqfwq");
    formData.append("folder", "FeatherTalk/post-images");

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

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    post: null,
    likedPosts: [],
    savedPosts: [],
    postLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.postLoading = action.payload;
    },
    setPosts(state, action) {
      state.post = action.payload;
    },
    setLiked(state, action) {
      state.likedPosts = action.payload;
    },
    setBookmarks(state, action) {
      state.savedPosts = action.payload;
    },
  },
  extraReducers: {},
});

let { actions, reducer } = postsSlice;
export const { setLoading, setPosts, setLiked, setBookmarks } = actions;
export default reducer;
