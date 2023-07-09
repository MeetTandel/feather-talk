import { BiEditAlt as EditIcon, BiCamera as MediaIcon } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleCreatePost, handleEditPost, handleMediaUpload } from "../../store/PostsSlice";

export function CreateNewPost({ postId, edit = false }) {
  const { user, posts } = useSelector(state => state.data)
  const [selectedPost, setSelectedPost] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaUploadLoading, setMediaUploadLoading] = useState(false);
  const postContentRef = useRef("");
  const dispatch = useDispatch()
  let postFound = null;

  useEffect(() => {
    if (edit) {
      postFound = posts.find(({ _id }) => _id === postId);
      setSelectedPost(postFound);
    }
  }, []);

  useEffect(() => {
    setMediaUrl(selectedPost?.mediaURL);
  }, [selectedPost]);

  const handlePostClick = (e) => {
    const editOrPost = e.target.innerText;

    if (editOrPost === "Post") {
      if (postContentRef?.current?.value?.length <= 0) {
        setErrorState(true);
      } else {
        dispatch(handleCreatePost(postContentRef?.current?.value, mediaUrl));
        postContentRef.current.value = "";
        setMediaUrl("");
      }
    } else {
      if (postContentRef?.current?.value?.length <= 0) {
        setErrorState(true);
      } else {
        dispatch(handleEditPost(
          selectedPost?._id,
          postContentRef?.current?.value,
          mediaUrl
        ));
      }
    }
  };

  const handleMediaClick = async (e) => {
    if (e.target.files[0]) {
      setMediaUploadLoading(true);
      setMediaUrl(URL.createObjectURL(e.target.files[0]));
      const response = await handleMediaUpload(e.target.files[0]);

      if (response) {
        setMediaUrl(response);
        setMediaUploadLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex items-center gap-1 p-3">
        <EditIcon />
        <h2 className="font-normal">
          {edit ? "Edit Post" : "Create New Post"}
        </h2>
      </div>

      <hr></hr>

      <div className="flex flex-row gap-2 h-max p-2">
        <div className="h-[100%] w-max flex justify-center shrink-0">
          <img
            src={user.avatarUrl}
            alt={`${user.username}'s Profile Image`}
            className="h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem] mt-1 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 grow">
          <textarea
            ref={postContentRef}
            defaultValue={edit ? selectedPost?.content : ""}
            onChange={() => setErrorState(false)}
            placeholder="Have something to share? Why not post it here!"
            className="resize-none outline-none p-1 placeholder:font-light min-h-[100px] sm:min-h-[150px]"
          />

          {(mediaUrl || mediaUploadLoading) && <hr></hr>}

          {mediaUrl && (
            <img
              src={mediaUrl}
              alt="post"
              className={`w-max max-h-[150px] rounded-md ${
                mediaUploadLoading ? "blur" : ""
              }`}
            />
          )}

          {mediaUploadLoading && (
            <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] ">
              <ProgressBar
                height={"100%"}
                width={"100%"}
                ariaLabel="progress-bar-loading"
                borderColor="#42A5F5"
                barColor="#90CAF9"
              />
            </div>
          )}
        </div>
      </div>

      <hr></hr>

      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-1 cursor-pointer bg-blue-100 text-slate-400 px-4 py-1 rounded-2xl hover:bg-blue-200 hover:text-slate-800 hover:shadow-md">
            <input
              type="file"
              onChange={(e) => handleMediaClick(e)}
              className="hidden"
            />
            <MediaIcon />
            Media
          </label>
          <div className="cursor-pointer text-xl">😀</div>
        </div>

        <button
          disabled={mediaUploadLoading}
          onClick={handlePostClick}
          className={`bg-blue-100 text-slate-400 px-4 py-1 rounded-2xl hover:bg-blue-200 hover:text-slate-800 hover:shadow-md ${
            mediaUploadLoading && "cursor-not-allowed"
          }`}
        >
          {edit ? "Edit Post" : "Post"}
        </button>
      </div>

      {errorState && (
        <div className="flex px-4 pb-4 text-red-500">
          * Please write something to post!
        </div>
      )}

      {mediaUrl && selectedPost.mediaURL !== mediaUrl && (
        <div className="flex px-4 pb-4 text-green-500">
          {mediaUploadLoading
            ? "* Uploading..."
            : "* Media uploaded successfully!"}
        </div>
      )}
    </div>
  );
}
