import { useSelector } from "react-redux";
import { PostCard, PostSortingOptions } from "../../components";

export function Explore() {
  const { filteredPosts } = useSelector(state => state.data);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      <PostSortingOptions />
      {filteredPosts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
}
