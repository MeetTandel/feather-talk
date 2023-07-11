import { SlOptions as OptionsIcon } from "react-icons/sl";
import {
  BiComment as CommentIcon,
  BiBookmark as BookMarkIcon,
} from "react-icons/bi";
import {
  AiOutlineHeart as LikeIcon,
  AiFillHeart as LikeSolidIcon,
} from "react-icons/ai";
import { BsBookmarkFill as BookMarkSolidIcon } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CommentCard } from "../CommentCard/CommentCard";
import { useState } from "react";
import { PostActions } from "../PostActions/PostActions";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, dislikePost, likePost, removeBookmark } from "../../store/PostsSlice";

export function PostCard({ post, showComment }) {
  const { user, users } = useSelector(state => state.data);
  const {
    postLoading,
    likedPosts,
    savedPosts,
  } = useSelector(state => state.posts);
  const [showPostActions, setShowPostActions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postedBy = users.find(({ username }) => username === post.username);
  const postedByCurrentUser = user.username === post.username;
  const postDate = new Date(post.createdAt);
  const postLiked = likedPosts.some(({ _id }) => _id === post._id);
  const postBookmarked = savedPosts.some(({ _id }) => _id === post._id);

  const handlePostLike = () => {
    if (!postLoading) {
      if (!postLiked) {
        dispatch(likePost(post._id));
      } else {
        dispatch(dislikePost(post._id));
      }
    }
  };

  const handlePostBookmark = () => {
    if (!postLoading) {
      if (!postBookmarked) {
        dispatch(addBookmark(post._id));
      } else {
        dispatch(removeBookmark(post._id));
      }
    }
  };

  return (
    <div className="relative h-max flex flex-col gap-4 bg-white dark:bg-gray-600 p-2 shadow-md border dark:border-none rounded-xl overflow-hidden">
      <section>
        <div className="flex items-center gap-2 overflow-hidden justify-between">
          <div className="h-[100%] grow flex items-center gap-2">
            <div
              onClick={() => navigate(`/profile/${postedBy.username}`)}
              className="w-max cursor-pointer"
            >
              <img
                src={postedBy?.avatarUrl}
                alt={`${postedBy?.username}'s Profile Image`}
                className="h-[4rem] w-[4rem] rounded-full object-cover"
              />
            </div>
            <div className="grow h-[100%] flex flex-col justify-center">
              <h3 className="-mb-1">{`${postedBy?.firstName} ${postedBy?.lastName}`}</h3>
              <p className="-mt-1 text-slate-500 dark:text-slate-300">{`@${postedBy.username}`}</p>
              <small className="-mt-1 text-slate-500 dark:text-slate-300">{`${postDate.getUTCMonth()}-${postDate.getUTCDate()}-${postDate.getUTCFullYear()}, ${postDate.getUTCHours()}:${postDate.getUTCMinutes()}${
                postDate.getUTCHours() >= 12 ? "pm" : "am"
              } `}</small>
            </div>
          </div>

          {postedByCurrentUser && (
            <div
              className="cursor-pointer p-2 rounded-full hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-slate-500 dark:hover:text-blue-200"
              onClick={() => setShowPostActions(!showPostActions)}
            >
              <OptionsIcon size={18} />
            </div>
          )}
          {showPostActions && (
            <PostActions
              postId={post?._id}
              setShowPostActions={setShowPostActions}
            />
          )}
        </div>
      </section>

      <Link to={`/post/${post?._id}`}>
        <section className="flex flex-col gap-2">
          <p>{post?.content}</p>
          {post?.mediaURL && (
            <img
              src={post.mediaURL}
              alt="Post Image"
              className="rounded-lg max-h-[500px] object-contain bg-slate-200"
            />
          )}
        </section>
      </Link>

      <section className="p-2 flex gap-4">
        <div className="flex gap-1">
          {postLiked ? (
            <LikeSolidIcon
              onClick={handlePostLike}
              size={24}
              className="cursor-pointer fill-red-600"
            />
          ) : (
            <LikeIcon
              onClick={handlePostLike}
              size={24}
              className="cursor-pointer hover:fill-red-600"
            />
          )}

          <p>{post?.likes?.likeCount}</p>
        </div>

        <div className="flex gap-1">
          <CommentIcon
            onClick={() => navigate(`/post/${post?._id}`)}
            size={24}
            className="cursor-pointer hover:fill-blue-400"
          />
          <p>{post?.comments?.length}</p>
        </div>

        <div className="flex gap-1">
          {postBookmarked ? (
            <BookMarkSolidIcon
              onClick={handlePostBookmark}
              size={22}
              className="cursor-pointer fill-blue-400"
            />
          ) : (
            <BookMarkIcon
              onClick={handlePostBookmark}
              size={24}
              className="cursor-pointer hover:fill-blue-400"
            />
          )}
        </div>
      </section>

      {showComment &&
        post?.comments?.length > 0 &&
        post?.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <hr></hr>
              <CommentCard comment={comment} />
            </div>
          );
        })}
    </div>
  );
}
