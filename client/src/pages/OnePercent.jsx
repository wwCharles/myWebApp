import { useEffect, useState } from "react";
import { useGetOnePercent } from "../api-calls/PostApi";
// import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const OnePercent = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [skip, setSkip] = useState(0);
  // const [isEnd, setIsEnd] = useState(false);

  const OnePercent = useGetOnePercent();

  const getData = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await OnePercent(skip);

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
    }, 800);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading]);

  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      <Topbar />

      <div className="flex flex-1 h-full">
        <div className="home-container" onScroll={handleScroll}>
          <div className="home-posts">
            <ul
              className={`flex flex-col flex-1 gap-10 w-full opacity-0 transition-opacity duration-1000 ${
                lazy && "opacity-100"
              } `}
            >
              {items?.map((item, index) => (
                <li className="flex justify-center w-full" key={index}>
                  <PostItem card={item} index={index} />
                </li>
              ))}
            </ul>
            {/* {items.length === 0 && <p>no post has made the cut</p>} */}
            {isLoading && <p>...loading...</p>}
            {/* {error && <p>error, reload. </p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePercent;

// function debounce(func, delay) {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }
