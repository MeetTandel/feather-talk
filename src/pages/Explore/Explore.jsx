import { useDispatch, useSelector } from "react-redux";
import { PostCard, PostSortingOptions } from "../../components";
import { useEffect, useState } from "react";
import { getPostsLikedByUser } from "../../store/PostsSlice";
import { fetchAllPosts, fetchAllUsers, setPostsLoading, setUsersLoading } from "../../store/DataSlice";
import { Oval } from "react-loader-spinner";

export function Explore() {
  const { posts, user, postsLoading, filteredPosts } = useSelector(
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
    if (user && filteredPosts.length === 0) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
    }
  }, [user, posts]);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      <PostSortingOptions />
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
      {filteredPosts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </div>
  );
}
