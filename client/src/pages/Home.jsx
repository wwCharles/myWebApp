import { useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const getAllPost = useGetAllPost();

  const newUser = () => {
    const createdAt = Date.parse(currentUser.createdAt);
    const dateToday = Date.now();
    if (dateToday - createdAt <= 60000) {
      alert(
        "Juiced23: A hub for car lovers to showcase builds and share stories. Community-driven flag any inappropriate posts. Reach out for functionality requests, bugs, or to join our team. Your data? We don't care. Ads keep us rolling—be cool. *Don't make this site insta/tiktok keep it real*"
      );
    }
  };

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allPost = await getAllPost();

      setItems((prevItems) => [...prevItems, ...allPost]);
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
    getData();
    newUser();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 300);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [isLoading]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div>
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {items.map((item) => (
                <li className="flex justify-center w-full" key={item._id}>
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

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
