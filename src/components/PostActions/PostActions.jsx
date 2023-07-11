import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleDeletePost } from "../../store/PostsSlice";
import { GenericModal, CreateNewPost } from "../index";

export function PostActions({ postId, setShowPostActions }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  const handleClick = (e) => {
    const selectedAction = e.target.innerText;

    switch (selectedAction) {
      case "Edit": {
        setShowModal(!showModal);
        return;
      }
      case "Delete": {
        dispatch(handleDeletePost(postId));
        return;
      }
      default:
        return;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute right-4 top-12 text-right rounded-md overflow-hidden bg-slate-100 dark:bg-gray-700 shadow-slate-600 shadow-md min-w-[100px]"
    >
      <p className="cursor-pointer p-2 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-400 dark:hover:text-white">
        <strong>Edit</strong>
      </p>
      <hr className="border-slate-400"></hr>
      <p className="cursor-pointer p-2 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-400 dark:hover:text-white">
        <strong>Delete</strong>
      </p>
      {showModal && (
        <GenericModal setShowModal={setShowModal}>
          <CreateNewPost postId={postId} edit={true} />
        </GenericModal>
      )}
    </div>
  );
}
