import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, fetchAllUsers, setPostsLoading, setUsersLoading } from "../../store/DataSlice";
import { getPostsLikedByUser } from "../../store/PostsSlice";
import { PostCard } from "../index";

export function UserFeed() {
  const { userFeed, posts, user, postsLoading } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getPostsLikedByUser(posts, user, dispatch);
  }, [posts]);

  useEffect(() => {
    if (user && posts.length <= 0) {
      dispatch(setUsersLoading(true));
      dispatch(setPostsLoading(true));
    }
    if (user) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
    }
  }, [user]);

  return (
    <div className="h-max flex flex-col gap-6">
      {postsLoading && (
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

      {userFeed.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
}
