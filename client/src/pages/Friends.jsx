import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserbyId } from "../api-calls/UserApi";
import { useSelector } from "react-redux";

export default function Friends() {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const getUserbyId = useGetUserbyId();
  const [friendsProfile, setFriendsProfile] = useState(null);
  const [error, setError] = useState(null);

  const showFriends = async () => {
    try {
      const profile = await getUserbyId(id);

      const friendsPromises = profile.friends.map((friendId) =>
        getUserbyId(friendId)
      );
      const friends = await Promise.all(friendsPromises);

      setFriendsProfile(friends);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    showFriends();
  }, [id]);

  return (
    <div className="flex flex-1 ">
      <div className="flex flex-col py-10 ">
        <div className="home-posts">
          {friendsProfile?.length && (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {friendsProfile.map((friend) => (
                <li className="flex justify-center w-full" key={friend._id}>
                  <Link
                    className="xl:text-left h3-bold md:h1-semibold w-full animate-in slide-in-from-bottom-48"
                    to={`/profile/${friend._id}`}
                  >
                    {friend.username} <hr />
                    {currentUser &&
                      friend.friends.includes(currentUser._id) && (
                        <p className="small-regular md:body-medium text-light-4">
                          {friend.email}
                        </p>
                      )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p>error, reload. </p>}
      </div>
    </div>
  );
}
