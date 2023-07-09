import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function CommentCard({ comment }) {
  const { users } = useSelector(state => state.data);
  const [commentUser, setCommentUser] = useState(null);

  useEffect(() => {
    const commentBy = users.find(
      ({ username }) => username === comment.username
    );

    setCommentUser(commentBy);
  }, [users]);

  return (
    <div className="cursor-pointer flex flex-col gap-2 min-h-[80px} rounded-xl overflow-hidden px-3 py-3 bg-white hover:bg-slate-100">
      <div className="flex gap-2 w-full">
        <div className="h-[100%] w-max  flex justify-center">
          <img
            src={commentUser?.avatarUrl}
            alt={`${commentUser?.username}'s Profile Image`}
            className="h-[3rem] w-[3rem] rounded-full object-cover"
          />
        </div>
        <div className="grow h-[100%] flex flex-col justify-center">
          <h3 className="-mb-1">{`${commentUser?.firstName} ${commentUser?.lastName}`}</h3>
          <p className="-mt-1 text-slate-500">{`@${commentUser?.username}`}</p>
        </div>
      </div>
      <p className="w-full">{comment?.text}</p>
    </div>
  );
}
