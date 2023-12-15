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

      if (data.success === false) {
        setError(true);
        return;
      }

      if (!data || data.length === 0) {
        setIsEnd(true);
        return;
      }

      // Check the load status of each image in the data array
      const updatedData = await Promise.all(
        data.map(async (item) => {
          const imageLoadPromises = item.imageUrls.map((imageUrl) => {
            const img = new Image();

            return new Promise((resolve, reject) => {
              img.onload = () => resolve(true);
              img.onerror = () => reject(false);
              img.src = imageUrl;
            });
          });

          // Wait for all promises to resolve (all images loaded) or reject (at least one image failed to load)
          try {
            await Promise.all(imageLoadPromises);
            return { ...item, allImagesLoaded: true };
          } catch (error) {
            // Handle the case where at least one image failed to load
            return { ...item, allImagesLoaded: false };
          }
        })
      );

      // Update the state with the fetched data
      setItems((prevItems) => {
        const uniqueItems = new Set([...prevItems, ...updatedData]);
        return [...uniqueItems];
      });

      setAd(true);
    } catch (error) {
      setError(true);
    } finally {
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
      <Topbar />
      <LeftSidebar />
      <div className="flex flex-1 w-full -mt-4">
        <div className="home-container" onScroll={handleScroll}>
          <div className="home-posts">
            <ul
              className={`flex flex-col flex-1 gap-2 w-full opacity-0 transition-opacity duration-1000 ${
                lazy && "opacity-100"
              } `}
            >
              {items?.map((item, index) => (
                <li className="flex justify-center w-full" key={index}>
                  <PostItem card={item} index={index} />
                </li>
              ))}
            </ul>
            {/* {isLoading && <p>...loading...</p>} */}
            {/* {error && <p>Something went wrong!</p>}
            {!isLoading && isEnd && <p>end</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePercent;
