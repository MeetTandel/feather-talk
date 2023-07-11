import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostCard } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store/PostsSlice";
import { Oval } from "react-loader-spinner";

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
      {postLoading && (
        <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] self-center">
          <Oval
            height={"100%"}
            width={"100%"}
            color="#42A5F5"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#90CAF9"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
}
