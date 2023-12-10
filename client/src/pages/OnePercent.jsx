import { useCallback, useEffect, useState } from "react";
import { useGetOnePercent } from "../api-calls/PostApi";
// import { useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";

const OnePercent = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const [lazy, setLazy] = useState(false);
  const [error, setError] = useState(false);

  const OnePercent = useGetOnePercent();

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await OnePercent(skip);
      // console.log(data);
      if (data.success === false) {
        // Handle the error case
        // console.error("Error fetching data:", error);
        setError(true);
        return;
      }
      if (!data || data.length === 0) {
        // Handle the case where data is empty
        // console.error("End of data:", data);
        setIsEnd(true);
        return;
      }
      // Update the state with the fetched data
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      // Handle fetch errors
      // console.error("Error during fetch:", error);
      setError(true);
    } finally {
      // Ensure loading state is set to false regardless of success or failure
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(
    (e) => {
      const { offsetHeight, scrollTop, scrollHeight } = e.target;

      if (offsetHeight + scrollTop >= scrollHeight) {
        setSkip(items?.length);
      }
    },
    [items]
  );

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
            {isLoading && <p>...loading...</p>}
            {error && <p>Something went wrong!</p>}
            {!isLoading && isEnd && <p>end</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePercent;
