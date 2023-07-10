import { Routes, Route } from "react-router";
import "./App.css";
import {
  Landing,
  Home,
  Explore,
  Profile,
  Bookmarks,
  Post,
  Login,
  Signup,
  Liked,
} from "./pages/index";
import { ProtectedRoute, PageWrapper } from "./components/index";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { setTheme } from "./store/DataSlice";

function App() {
  const {theme} = useSelector(state => state.data)
  
  if (!theme) {
    localStorage.setItem("theme", "light");
  } else if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  console.log("theme")
  
  return (
    <div className="text-slate-800 dark:text-white relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Explore />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userName"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Profile />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Bookmarks />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Liked />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Post />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
