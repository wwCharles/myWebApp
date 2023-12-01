import { useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllPost = useGetAllPost();

  const newUser = () => {
    const createdAt = Date.parse(currentUser.createdAt);
    const dateToday = Date.now();
    if (dateToday - createdAt <= 60000) {
      alert(
        "Juiced23: A hub for everyhing ice, to showcase builds and share stories.\nCommunity-driven flag any inappropriate post.\nReach out for functionality requests, bugs, or to join our team info@juiced23.com.\nYour data? We don't care.\nAds keep us rolling—be cool.\n*Don't make this site ig/tiktok keep it real*"
      );
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
      const limit = 9;

      const allPost = await getAllPost({ startIndex, limit });

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

  const debouncedGetData = debounce(getData, 300);

  const handleScroll = () => {
    const scrollContainer = document.querySelector(".home-container");
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

  useEffect(() => {
    getData();
    newUser();
  }, []);

  return (
    <div className="flex flex-1 ">
      <div className="home-container">
        <div className="home-posts">
          <div>
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {items.map((item, index) => (
                <li className="flex justify-center w-full" key={index}>
                  <PostItem card={item} />
                </li>
              ))}
            </ul>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error, reload. </p>}
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
