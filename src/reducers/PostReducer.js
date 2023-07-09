export const postInitialState = {
  post: null,
  likedPosts: [],
  savedPosts: [],
  postLoading: false,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, post: action.payload };
    case "SET_LIKED":
      return { ...state, likedPosts: action.payload };
    case "SET_BOOKMARKS":
      return { ...state, savedPosts: action.payload };
    case "SET_LOADING": {
      return { ...state, postLoading: action.payload };
    }
    default:
      return { ...state };
  }
};
