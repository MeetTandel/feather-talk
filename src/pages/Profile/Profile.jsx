import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  EditProfile,
  GenericModal,
  PostCard,
  UserFollowDetails,
} from "../../components";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { followUserHandler, getUserPosts, unfollowUserHandler } from "../../store/DataSlice";

export function Profile() {
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [userOption, setUserOption] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [followButtonLoading, setFollowButtonLoading] = useState(false);
  const { userName } = useParams();
  const dispatch = useDispatch()
  const {
    user,
    users,
    posts,
    userPosts,
    isLoading,
  } = useSelector(state => state.data);

  useEffect(() => {
    setPageLoading(true);
    dispatch(getUserPosts(userName));
  }, [userName]);

  useEffect(() => {
    dispatch(getUserPosts(userName));
  }, [posts]);

  const userFound = users.find(({ username }) => username === userName);

  const currentUser = userFound?.username === user.username;

  const currentlyFollowing =
    !currentUser && user?.following.find((user) => user._id === userFound?._id);

  const {
    firstName,
    lastName,
    username,
    avatarUrl,
    bio,
    website,
    followers,
    following,
  } = userFound ?? {
    firstName: "",
    lastName: "",
    username: "",
    avatarUrl: "",
    bio: "",
    website: "",
    followers: [],
    following: [],
  };

  useEffect(() => {
    if (!isLoading) {
      setFollowButtonLoading(false);
      setPageLoading(false);
    }
  }, [isLoading]);

  const handleFollowClick = () => {
    if (!currentlyFollowing) {
      setFollowButtonLoading(true);
      dispatch(followUserHandler(userFound?._id));
    } else {
      setFollowButtonLoading(true);
      dispatch(unfollowUserHandler(userFound?._id));
    }
  };

  const handleFollowModal = (e) => {
    const selectedOption = e.target.dataset.follow;

    if (selectedOption === "followers") {
      setShowFollowModal(!showFollowModal);
      setUserOption("followers");
    } else if (selectedOption === "following") {
      setShowFollowModal(!showFollowModal);
      setUserOption("following");
    }
  };

  return (
    <>
      {pageLoading && (
        <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] self-center mt-10">
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
      {!pageLoading && (
        <>
          <h2>{`${firstName} ${lastName}'s profile`}</h2>
          <div className="mt-4 overflow-y-auto ">
            <header className="relative flex justify-center max-h-[20rem] md:max-h-[25rem]">
              <img
                src={avatarUrl}
                alt={`${username}'s profile`}
                className="rounded-md object-cover bg-gray-300 w-[100%]"
              />
            </header>
            <main className="flex flex-col items-center w-full">
              <div className="flex flex-col w-full relative">
                <div className="shrink-0 flex justify-between gap-2 mx-[1rem] sm:mx-[2rem] flex-wrap">
                  <div className="flex flex-col gap-3 shrink-0 w-fit h-fit -mt-12 sm:-mt-20">
                    <div className="relative">
                      <img
                        src={avatarUrl}
                        alt={`${username}'s profile`}
                        className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] rounded-full object-cover outline outline-4 outline-gray-200 dark:outline-gray-800 bg-gray-300 shadow-lg"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-medium">{`${firstName} ${lastName}`}</h3>
                      <p>{`@${username}`}</p>
                    </div>
                  </div>

                  <div>
                    {currentUser ? (
                      <button
                        onClick={() => setShowEditProfile(!showEditProfile)}
                        className="bg-blue-400 text-white p-2 px-4 mt-2 rounded-lg shadow-md hover:bg-blue-500"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleFollowClick}
                        className="bg-blue-400 text-white p-2 px-4 mt-2 rounded-lg shadow-md hover:bg-blue-500 min-w-[6rem] flex justify-center items-center"
                      >
                        {!followButtonLoading &&
                          (!currentlyFollowing ? "Follow" : "Unfollow")}
                        {followButtonLoading && (
                          <div className="w-[1.6rem] h-[1.5rem]">
                            <Oval
                              height={"100%"}
                              width={"100%"}
                              color="white"
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="lightgray"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="realtive w-full text-center md:text-left py-2 px-8">
                  <p className="my-1">{bio}</p>
                  <a
                    href={website}
                    target="blank"
                    className="text-blue-600 hover:underline"
                  >
                    {website}
                  </a>
                  <div
                    onClick={handleFollowModal}
                    className="flex gap-4 my-1 justify-center md:justify-start text-slate-400 text-lg"
                  >
                    <small className="cursor-pointer hover:underline">
                      <strong>{userPosts?.length}</strong> Posts
                    </small>
                    <small
                      data-follow="followers"
                      className="cursor-pointer hover:underline"
                    >
                      <strong>{followers.length}</strong> Followers
                    </small>
                    <small
                      data-follow="following"
                      className="cursor-pointer hover:underline"
                    >
                      <strong>{following.length}</strong> Following
                    </small>
                  </div>
                </div>
              </div>
            </main>

            <hr className="h-0.5 w-full bg-slate-300"></hr>

            <div className="flex flex-col gap-[1.5rem] mt-4">
              {userPosts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </div>

            {showFollowModal && (
              <GenericModal setShowModal={setShowFollowModal} content="follow">
                <UserFollowDetails
                  option={userOption}
                  user={userFound}
                  setShowFollowModal={setShowFollowModal}
                />
              </GenericModal>
            )}

            {showEditProfile && (
              <EditProfile
                user={userFound}
                setShowEditProfile={setShowEditProfile}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
