import { useEffect, useState } from "react";
import {
  BiUserCircle as UserIcon,
  BiEditAlt as EditIcon,
  BiCamera as MediaIcon,
} from "react-icons/bi";
import { AvatarOptions } from "../AvatarOptions/AvatarOptions";
import { ProgressBar } from "react-loader-spinner";
import { handleEditProfile, handleProfilePictureUpload } from "../../store/DataSlice";
import { useDispatch } from "react-redux";

export function EditProfile({ user, setShowEditProfile }) {
  const [mediaUploadLoading, setMediaUploadLoading] = useState(false);
  const [showImageOption, setShowImageOption] = useState(false);
  const [showAvatarOption, setShowAvatarOption] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(user?.avatarUrl);
  const [newUserDetails, setnewUserDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    website: user.website,
  });
  const { firstName, lastName, username, bio, website } = newUserDetails;
  const dispatch = useDispatch()

  const handleClick = (e) => {
    const buttonClicked = e.target.innerText;

    if (buttonClicked === "Save") {
      dispatch(handleEditProfile(newUserDetails));
      setShowEditProfile(false);
    } else {
      setShowEditProfile(false);
    }
  };

  const handleMediaClick = async (e) => {
    if (e.target.files[0]) {
      setMediaUploadLoading(true);
      setShowImageOption(!showImageOption);
      setMediaUrl(URL.createObjectURL(e.target.files[0]));

      const response = await handleProfilePictureUpload(e.target.files[0]);

      if (response) {
        setMediaUrl(response);
        setMediaUploadLoading(false);
      }
    }
  };

  useEffect(() => {
    setnewUserDetails({ ...newUserDetails, avatarUrl: mediaUrl });
  }, [mediaUrl]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto flex items-center justify-center bg-slate-800 bg-opacity-50 z-20">
      <div className="relative flex flex-col gap-2 w-[70%] max-w-[500px] bg-white dark:bg-gray-700 shadow-lg p-4 rounded-lg">
        <div className="flex gap-2 items-center">
          <EditIcon size={24} />
          <h1 className="font-medium">Edit Profile</h1>
        </div>

        <div className="relative self-center">
          <div className="w-[10rem] sm:w-[14rem] md:w-[18rem] shrink-0 overflow-hidden p-4">
            <img
              src={mediaUrl}
              alt={`${username}'s profile`}
              className={`h-[8rem] sm:h-[12rem] md:h-[16rem] w-[100%] shrink-0 object-cover rounded-full shadow-md shadow-slate-600 dark:shadow-slate-800 ${
                mediaUploadLoading ? "blur" : ""
              }`}
            />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 cursor-pointer bg-slate-200 dark:bg-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 w-max p-2 rounded-full shadow-md">
              <MediaIcon
                onClick={() => setShowImageOption(!showImageOption)}
                className="w-[1.2rem] h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem]"
              />
            </div>
          </div>

          {mediaUploadLoading && (
            <div className="absolute top-[35%] left-[35%] sm:top-[40%] sm:left-[40%] w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] ">
              <ProgressBar
                height={"100%"}
                width={"100%"}
                ariaLabel="progress-bar-loading"
                borderColor="#42A5F5"
                barColor="#90CAF9"
              />
            </div>
          )}

          {showImageOption && (
            <div className="absolute -bottom-[4.5rem] -right-[1rem] sm:right-[1rem] md:right-[3rem] w-max bg-slate-200 dark:bg-slate-500 rounded-lg shadow-lg overflow-hidden">
              <label className="flex gap-1 items-center cursor-pointer hover:bg-slate-300 p-2">
                <input
                  type="file"
                  onChange={(e) => handleMediaClick(e)}
                  className="hidden"
                />
                <MediaIcon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                Upload profile picture
              </label>

              <hr className="border-gray-400"></hr>

              <div
                onClick={() => {
                  setShowAvatarOption(!showAvatarOption);
                  setShowImageOption(!showImageOption);
                }}
                className="flex gap-1 items-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 p-2"
              >
                <UserIcon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                <p>Change avatar</p>
              </div>
            </div>
          )}
        </div>

        <h3 className="font-medium">Username: @{username}</h3>

        <label className="flex flex-col">
          <small>First Name</small>
          <input
            type="text"
            defaultValue={firstName}
            onChange={(e) =>
              setnewUserDetails({
                ...newUserDetails,
                firstName: e.target.value,
              })
            }
            className="max-w-[100%] dark:bg-gray-700 border border-slate-400 px-2 py-1 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          <small>Last Name</small>
          <input
            type="text"
            defaultValue={lastName}
            onChange={(e) =>
              setnewUserDetails({ ...newUserDetails, lastName: e.target.value })
            }
            className="max-w-[100%] dark:bg-gray-700 border border-slate-400 px-2 py-1 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          <small>Bio</small>
          <input
            type="text"
            defaultValue={bio}
            onChange={(e) =>
              setnewUserDetails({ ...newUserDetails, bio: e.target.value })
            }
            className="max-w-[100%] dark:bg-gray-700 border border-slate-400 px-2 py-1 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          <small>Website</small>
          <input
            type="text"
            defaultValue={website}
            onChange={(e) =>
              setnewUserDetails({ ...newUserDetails, website: e.target.value })
            }
            className="max-w-[100%] dark:bg-gray-700 border border-slate-400 px-2 py-1 rounded-md"
          />
        </label>

        <div onClick={handleClick} className="flex flex-wrap gap-3 mt-6">
          <button
            disabled={mediaUploadLoading}
            className={`bg-blue-400 text-white px-4 py-1 rounded-md hover:bg-blue-500 ${
              mediaUploadLoading && "cursor-not-allowed"
            }`}
          >
            Save
          </button>
          <button className="bg-gray-400 text-white  px-4 py-1 rounded-md hover:bg-gray-500">
            Cancel
          </button>
        </div>

        {showAvatarOption && (
          <AvatarOptions
            setShowAvatarOption={setShowAvatarOption}
            setMediaUrl={setMediaUrl}
          />
        )}
      </div>
    </div>
  );
}
