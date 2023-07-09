import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostCard } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store/PostsSlice";

export function Post() {
  const { postId } = useParams();
  const { post, postLoading } = useSelector(state => state.posts);
  const { posts } = useSelector(state => state.data);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(postId));
  }, [posts]);

  return (
    <div className="flex flex-col gap-6">
      {post?._id === postId && <PostCard post={post} showComment={true} />}
      {postLoading && <h2>Loading...</h2>}
    </div>
  );
}
