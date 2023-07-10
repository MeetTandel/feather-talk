import {
  BiHome as HomeIcon,
  BiRocket as ExploreIcon,
  BiBookmark as BookmarkIcon,
  BiLike as LikeIcon,
  BiUserCircle as UserIcon,
  BiEditAlt as EditIcon,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserCard } from "../UserCard/UserCard";

export function SideNavigation({ setShowPostModal }) {
  const {user} = useSelector(state => state.data)

  return (
    <div className="flex flex-col h-full justify-between gap-4 pb-[4rem] md:pb-[0rem]">
      <div
        data-nav="side-nav"
        className=" grow flex flex-col gap-4 p-4 md:items-center lg:items-start"
      >
        <NavLink
          to="/"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 lg:pr-6 w-max rounded-full text-xl font-medium hover:bg-blue-100 hover:shadow-md";

            return isActive ? `${classes} text-blue-500 font-bold` : classes;
          }}
        >
          <HomeIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Home</p>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 lg:pr-6 w-max rounded-full text-xl font-medium hover:bg-blue-100 hover:shadow-md";

            return isActive ? `${classes} text-blue-500 font-bold` : classes;
          }}
        >
          <ExploreIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Explore</p>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 lg:pr-6 w-max rounded-full text-xl font-medium hover:bg-blue-100 hover:shadow-md";

            return isActive ? `${classes} text-blue-500 font-bold` : classes;
          }}
        >
          <BookmarkIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Bookmarks</p>
        </NavLink>
        <NavLink
          to="/liked"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 lg:pr-6 w-max rounded-full text-xl font-medium hover:bg-blue-100 hover:shadow-md";

            return isActive ? `${classes} text-blue-500 font-bold` : classes;
          }}
        >
          <LikeIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Liked</p>
        </NavLink>
        <NavLink
          to={`/profile/${user?.username}`}
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 lg:pr-6 w-max rounded-full text-xl font-medium hover:bg-blue-100 hover:shadow-md";

            return isActive ? `${classes} text-blue-500 font-bold` : classes;
          }}
        >
          <UserIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Profile</p>
        </NavLink>

        <button
          onClick={() => setShowPostModal((prev) => !prev)}
          className="flex items-center justify-center gap-2 p-2 pr-4 md:pr-2 lg:pr-4 w-[80%] md:w-max lg:w-[80%] rounded-full text-xl font-medium text-white bg-blue-400 shadow-md hover:bg-blue-100 hover:text-slate-800 hover:outline hover:outline-blue-400"
        >
          <EditIcon className="text-[2rem] lg:text-xl" />
          <p className="md:hidden lg:block">Post</p>
        </button>
      </div>

      <UserCard user={user} options="profile" hideDetails={true} />
    </div>
  );
}
