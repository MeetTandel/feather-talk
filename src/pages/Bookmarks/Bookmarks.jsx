import { useEffect } from "react";
import { PostCard } from "../../components";
import { getBookmarks } from "../../store/PostsSlice";
import { useDispatch, useSelector } from "react-redux";

export function Bookmarks() {
  const { savedPosts } = useSelector((state) => state.posts);
  const { posts } = useSelector(state => state.data);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookmarks());
  }, [posts]);

  return (
    <div className="flex flex-col gap-6">
      {savedPosts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
      {savedPosts.length === 0 && <h2>Nothing in bookmarks!</h2>}
    </div>
  );
}
