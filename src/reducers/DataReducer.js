export const dataInitialState = {
  user: null,
  users: [],
  userPosts: [],
  posts: [],
  filteredPosts: [],
  userFeed: [],
  sortMethod: "latest",
  isLoading: false,
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USER_POSTS":
      return { ...state, userPosts: action.payload };
    case "SET_ALL_USERS":
      return { ...state, users: action.payload };
    case "SET_ALL_POSTS":
      return { ...state, posts: action.payload };
    case "SET_FILTERED_POSTS":
      return { ...state, filteredPosts: action.payload };
    case "SET_USER_FEED":
      return { ...state, userFeed: action.payload };
    case "SET_SORT_METHOD":
      return { ...state, sortMethod: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: !state.isLoading };
    default:
      return { ...state };
  }
};
