import { useSelector } from "react-redux";
import { PostCard } from "../../components";

export function Liked() {
  const { likedPosts } = useSelector(state => state.posts);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0 mt-4">
      {likedPosts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
      {likedPosts.length === 0 && <h2 className="mt-4">Nothing in liked posts!</h2>}
    </div>
  );
}
