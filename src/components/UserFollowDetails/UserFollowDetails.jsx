import { UserCard } from "../UserCard/UserCard";

export function UserFollowDetails({ option, user, setShowFollowModal }) {
  const { followers, following } = user;

  return (
    <div className="flex flex-col gap-2 bg-white dark:bg-gray-600 w-max min-w-[20vw] max-w-[600px] p-4 shadow-lg rounded-lg">
      <h3>{option === "followers" ? "Followers" : "Following"}</h3>
      <hr></hr>

      {option === "followers" && (
        <div onClick={() => setShowFollowModal(false)}>
          {followers.map((user) => {
            return (
              <UserCard
                user={user}
                options="followDetails"
                hideDetails={false}
              />
            );
          })}
        </div>
      )}

      {option === "followers" && followers.length === 0 && (
        <p>Oops! no users found.</p>
      )}

      {option === "following" && (
        <div onClick={() => setShowFollowModal(false)}>
          {following.map((user) => {
            return (
              <UserCard
                user={user}
                options="followDetails"
                hideDetails={false}
              />
            );
          })}
        </div>
      )}

      {option === "following" && following.length === 0 && (
        <p>Oops! no users found.</p>
      )}
    </div>
  );
}
