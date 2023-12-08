import { useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
// import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
import OnePercent from "./OnePercent";
import WelcomeModal from "../components/WelcomeModal";

const Home = () => {
  const [items, setItems] = useState([]);
  // console.log(items);
  const [isLoading, setIsLoading] = useState(false);
  const [lazy, setLazy] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllPost = useGetAllPost();

  const getData = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await getAllPost(skip);
      // console.log(data, error, skip);

      if (error) {
        return;
      }
      if (data?.length === 0) {
        setIsEnd(true);
        return;
      }

      setItems([...items, ...data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight) {
      setSkip(items?.length);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      await getData();
    };
    fetchdata();
  }, [skip]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLazy(true);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading]);

  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      <Topbar />
      {showModal && <WelcomeModal onClose={handleCloseModal} />}

      <div className="flex flex-1 h-full ">
        <div className="home-container" onScroll={handleScroll}>
          <div className="home-posts">
            <ul
              // className="flex flex-col flex-1 gap-10 w-full"
              className={`flex flex-col flex-1 gap-10 w-full opacity-0 transition-opacity duration-1000 ${
                lazy && "opacity-100"
              } `}
            >
              {items?.map((item, index) => (
                <li key={index} className="flex justify-center w-full">
                  <PostItem card={item} index={index} />
                </li>
              ))}
            </ul>
            {isEnd && <p>end</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// function debounce(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }
