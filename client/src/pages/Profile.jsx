import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useDeleteAccount,
  useGetFriendStatus,
  useGetUserbyId,
  useUpdateUser,
} from "../api-calls/UserApi";
import { useGetAllUserPost } from "../api-calls/PostApi";
import PostItem from "../components/PostItem";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [currentProfile, setCurrentProfile] = useState("");
  const [formData, setFormData] = useState({});

  const [friendStat, setFriendStat] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const updateUser = useUpdateUser();
  const getFriendStat = useGetFriendStatus();
  const getUserbyId = useGetUserbyId();
  const getAllUserPost = useGetAllUserPost();

  const showProfile = async () => {
    try {
      setShowEmail(false);
      const profile = await getUserbyId(id);
      const profile1 = await getUserbyId(currentUser._id);

      setCurrentProfile(profile);

      const areFriends = profile1.friends.includes(profile._id);
      const emailVisible = profile.friends.includes(profile1._id);

      setFriendStat(areFriends);

      if (areFriends && emailVisible) {
        setShowEmail(true);
      }
    } catch (error) {
      console.error("Error fetching profile", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(formData, currentProfile._id);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteUser = async () => {
  //   try {
  //     const deleteUser = await deleteAccount(id);
  //     if (deleteUser === true) {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleFriend = async () => {
    try {
      const value = await getFriendStat(currentProfile._id);
      setFriendStat(value);
      showProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allUserPost = await getAllUserPost(id);

      const sortedPosts = allUserPost.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });

      setItems(sortedPosts);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    showProfile();
    getData();
  }, [id]);

  return (
    <div className="flex flex-1 ">
      <div className="home-container ">
        <div className="home-posts">
          {!isLoading && (
            <div className="h3-bold md:h2-bold text-left w-full">
              {currentUser._id === id ? (
                <div className="gap-10">
                  <input
                    type="text"
                    placeholder={currentProfile.username}
                    id="username"
                    className="shad-input h3-bold md:h2-bold w-auto"
                    maxLength={64}
                    onChange={handleChange}
                  />
                  <button
                    className="flex h3-bold md:h2-bold  hover:text-blue-500"
                    onClick={handleUpdateUser}
                  >
                    Update
                  </button>
                  {/* <button
                  className="flex h3-bold md:h2-bold text-dark-4  hover:text-red"
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </button> */}
                </div>
              ) : (
                <>
                  <h1 className="xl:text-left h3-bold md:h1-semibold w-full">
                    {currentProfile.username}
                  </h1>

                  <button
                    className="flex h3-bold md:h2-bold  hover:text-blue-500"
                    onClick={handleFriend}
                  >
                    <sub className="mt-3">
                      {friendStat ? "unFriend" : "Friend"}
                    </sub>
                  </button>
                </>
              )}
              {showEmail && (
                <p className="small-regular md:body-medium text-light-4 mt-6">
                  {currentProfile.email}
                </p>
              )}
              <ul className="flex flex-col flex-1 gap-10 mt-5 w-full">
                {items.map((item) => (
                  <li className="flex justify-center w-full" key={item._id}>
                    <PostItem card={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            {isLoading && <p>loading...</p>}
            {error && <p>error, reload. </p>}
          </div>
        </div>
      </div>
    </div>
  );
}
