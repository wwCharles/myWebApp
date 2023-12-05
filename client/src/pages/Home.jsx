import { useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const getAllPost = useGetAllPost();

  const newUser = () => {
    if (currentUser) {
      const createdAt = Date.parse(currentUser.createdAt);
      const dateToday = Date.now();
      if (dateToday - createdAt <= 10000) {
        alert(
          "Juiced23 a hub to showcase builds and share stories.\nCommunity-driven flag any inappropriate post.\nReach out for functionality requests, bugs, or to join our team info@juiced23.com.\nYour data? We don't care.\nAds keep us rolling—be cool."
        );
      }
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
      const batchSize = 40;

      const allPost = await getAllPost({ startIndex, limit: batchSize });

      if (allPost.length === 0) {
        setHasMoreData(false);
        return;
      }
      setItems((prevItems) => [...new Set([...prevItems, ...allPost])]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedGetData = debounce(getData, 700);

  const handleScroll = () => {
    const scrollContainer = document.querySelector(".home-container");
    const currentScrollY = scrollContainer.scrollTop;

    setScrollDirection(currentScrollY > scrollY ? "down" : "up");
    setScrollY(currentScrollY);

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
  }, [isLoading, scrollY]);

  useEffect(() => {
    const fetchdata = async () => {
      getData();
      newUser();
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
              {isLoading && <p>loading...</p>}
              {error && <p>error, reload. </p>}
            </div>
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
