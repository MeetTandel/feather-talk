import { MdOutlineClose as CloseIcon } from "react-icons/md";
import { userAvatars } from "../../utilities/utilities";

export function AvatarOptions({ setShowAvatarOption, setMediaUrl }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-slate-800 bg-opacity-50">
      <div className="flex flex-col gap-1 p-2 w-[80%] max-w-[400px] mx-auto bg-white dark:bg-gray-700 shadow-lg  rounded-lg">
        <div className="flex items-center gap-2 justify-between">
          <h2>Choose Avatar</h2>

          <div
            onClick={() => setShowAvatarOption(false)}
            className="cursor-pointer border border-slate-800 dark:border-white rounded-full hover:shadow-lg"
          >
            <CloseIcon size={20} />
          </div>
        </div>

        <hr></hr>

        <div className="flex gap-4 flex-wrap justify-evenly p-2">
          {userAvatars.map((img, i) => {
            return (
              <img
                onClick={() => {
                  setMediaUrl(img);
                  setShowAvatarOption(false);
                }}
                src={img}
                alt="user avatar"
                key={i}
                className="cursor-pointer grow min-w-[50px] max-w-[20%] rounded-full shadow-md shadow-slate-400 dark:shadow-slate-800  hover:shadow-lg hover:shadow-slate-400 hover:scale-110"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
