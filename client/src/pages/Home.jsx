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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const batchSize = 10;
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

  newUser();

  const getData = async () => {
    if (!hasMoreData) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const startIndex = items.length;

      const allPost = await getAllPost({ startIndex, limit: batchSize });

      if (allPost.length === 0) {
        setHasMoreData(false);
        return;
      }

      setItems((prevItems) => {
        const uniqueIds = new Set(prevItems.map((item) => item._id));
        const newItems = allPost.filter((post) => !uniqueIds.has(post._id));
        return [...prevItems, ...newItems];
      });
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
