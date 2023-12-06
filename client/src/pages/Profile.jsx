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
  const [lazy, setLazy] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hide, setHide] = useState(true);

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
    if (!hasMoreData) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const startIndex = items.length;
      const batchSize = 8;
      const allUserPost = await getAllUserPost({
        startIndex,
        limit: batchSize,
        id,
      });
      if (allUserPost.length === 0) {
        setHasMoreData(false);
        return;
      }

      // const sortedPosts = allUserPost.sort((a, b) => {
      //   const dateA = new Date(a.createdAt);
      //   const dateB = new Date(b.createdAt);

      //   return dateB - dateA;
      // });

      // setItems(sortedPosts);
      setItems((prevItems) => [...new Set([...prevItems, ...allUserPost])]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setItems([]); // Reset items
      setHide(true);

      try {
        await getData();
        await showProfile();
      } catch (error) {
        // Handle errors if necessary
        // console.error(error);
      } finally {
        setHide(false);
      }
    };

    fetchData(); // Call the async function
  }, [id, currentUser]);

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedGetData = debounce(getData, 700);

  const handleScroll = () => {
    const scrollContainer = document.querySelector(".home-container");
    // const currentScrollY = scrollContainer.scrollTop;

    // setScrollDirection(currentScrollY > scrollY ? "down" : "up");
    // setScrollY(currentScrollY);

    const scrollTriggerPosition =
      scrollContainer.offsetHeight / 2 + scrollContainer.offsetTop;

    if (
      scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollTriggerPosition &&
      !isLoading &&
      hasMoreData
    ) {
      debouncedGetData();
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".home-container");
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  // useEffect(() => {
  //   showProfile();
  //   getData();
  // }, [id, currentUser]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLazy(true);
    }, 800);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-1 ">
      <div className="home-container ">
        <div className="home-posts">
          {!hide && (
            <div
              className={`h3-bold md:h2-bold text-left w-full opacity-0 transition-opacity duration-1000 ${
                lazy && "opacity-100"
              }`}
            >
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
                {items.map((item, index) => (
                  <li className="flex justify-center w-full" key={index}>
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
