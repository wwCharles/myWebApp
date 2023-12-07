import { useEffect, useState } from "react";
import { useGetOnePercent } from "../api-calls/PostApi";
// import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const OnePercent = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const OnePercent = useGetOnePercent();

  const getData = async () => {
    if (!hasMoreData || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const batchSize = 10;
      const startIndex = (currentPage - 1) * batchSize;

      const allPost = await OnePercent({ startIndex, limit: batchSize });

      if (allPost === null) {
        setHasMoreData(false);
        return;
      }

      setItems((prevItems) => {
        const uniqueIds = new Set(prevItems.map((item) => item._id));
        const newItems = allPost.filter((post) => !uniqueIds.has(post._id));
        if (newItems.length === 0) {
          console.log(true);
          return;
        }
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
    const scrollContainer = document.querySelector(".home-posts");
    const scrollTriggerPosition =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    if (
      scrollContainer.scrollTop >= scrollTriggerPosition &&
      !isLoading &&
      hasMoreData
    ) {
      getData();
      console.log(1);
    }

    const currentScrollY = scrollContainer.scrollTop;

    setScrollDirection(currentScrollY > scrollY ? "down" : "up");
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".home-posts");
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

  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      {scrollDirection === "up" && <Topbar />}

      <div className="flex flex-1 h-full">
        <div className="home-container">
          <div className="home-posts">
            <div>
              <ul
                className={`flex flex-col flex-1 gap-10 w-full opacity-0 transition-opacity duration-1000 ${
                  lazy && "opacity-100"
                } `}
              >
                {items.map((item, index) => (
                  <li className="flex justify-center w-full" key={index}>
                    <PostItem card={item} />
                  </li>
                ))}
              </ul>
              {items.length === 0 && <p>no post has made the cut</p>}
              {/* {isLoading && <p>...loading...</p>} */}
              {error && <p>error, reload. </p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePercent;

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
