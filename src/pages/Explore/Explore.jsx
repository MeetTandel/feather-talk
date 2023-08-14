import { useSelector } from "react-redux";
import { PostCard, PostSortingOptions } from "../../components";
import { useEffect, useState } from "react";

export function Explore() {
  const { filteredPosts } = useSelector(state => state.data);
  const [data, setData] = useState([])

  useEffect(() => {
    setData(filteredPosts)
  }, [filteredPosts])

  console.log("exp", data)
  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      <PostSortingOptions />
      {data.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
}
