import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserbyId } from "../api-calls/UserApi";

export default function Friends() {
  const { id } = useParams();
  const getUserbyId = useGetUserbyId();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [friendsProfile, setFriendsProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const showFriends = async () => {
    setIsLoading(true);
    try {
      const profile = await getUserbyId(id);
      setCurrentProfile(profile);

      const friendsPromises = profile.friends.map((friendId) =>
        getUserbyId(friendId)
      );
      const friends = await Promise.all(friendsPromises);

      setFriendsProfile(friends);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
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
                    {friend.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* {isLoading && <p>loading...</p>} */}
        {error && <p>error, reload. </p>}
      </div>
    </div>
  );
}
