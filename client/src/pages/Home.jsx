import { useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
// import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
import OnePercent from "./OnePercent";

const Home = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  console.log("currentPage", currentPage);

  const getAllPost = useGetAllPost();

  const getData = async () => {
    if (!hasMoreData || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const batchSize = 10;
      const startIndex = (currentPage - 1) * batchSize;

      const allPost = await getAllPost({ startIndex, limit: batchSize });
      // console.log(allPost);

      if (allPost === null) {
        setHasMoreData(false);
        return;
      }

      setItems((prevItems) => {
        const uniqueIds = new Set(prevItems.map((item) => item._id));
        const newItems = allPost.filter((post) => !uniqueIds.has(post._id));
        return [...prevItems, ...newItems];
      });

      setCurrentPage((prevPage) => prevPage + 1); // Increment the current page
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollContainer = document.querySelector(".home-container");
    const scrollTriggerPosition =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    if (
      scrollContainer.scrollTop >= scrollTriggerPosition &&
      !isLoading &&
      hasMoreData
    ) {
      getData();
    }

    const currentScrollY = scrollContainer.scrollTop;

    setScrollDirection(currentScrollY > scrollY ? "down" : "up");
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".home-container");
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, scrollY]);

  useEffect(() => {
    const fetchdata = async () => {
      await getData();
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLazy(true);
    }, 800);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading]);
  // const [showOnePercent, setShowOnePercent] = useState(false);
  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      {scrollDirection === "up" && <Topbar />}

      <div className="flex flex-1 h-full ">
        <div className="home-container">
          <div className="home-posts">
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {items?.map((item, index) => (
                <li key={index} className="flex justify-center w-full">
                  <PostItem card={item} index={index} />
                </li>
              ))}
            </ul>

            {isLoading && <p>...loading...</p>}
            {error && <p>error, reload. </p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
