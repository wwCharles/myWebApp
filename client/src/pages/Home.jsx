import { useCallback, useEffect, useState } from "react";
import { useGetAllPost } from "../api-calls/PostApi";
import PostItem from "../components/PostItem";
// import LeftSidebar from "../components/LeftSidebar";
// import Topbar from "../components/Topbar";
import WelcomeModal from "../components/WelcomeModal";
// import HorizontalAd from "../components/HorizontalAd";
import VerticalAd from "../components/VerticalAd";
// import SquareAd from "../components/SquareAd";
// import AdsComponent from "../components/SquareAd";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [lazy, setLazy] = useState(false);
  const [error, setError] = useState(false);
  const [ad, setAd] = useState(false);

  const getAllPost = useGetAllPost();

  const getData = async () => {
    setIsLoading(true);

    try {
      const data = await getAllPost(skip);

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

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading]);

  return (
    // <div className="w-full md:flex">
    //   <Topbar />
    //   <LeftSidebar />

    // <section className="flex flex-1 h-full">
    <div className="flex flex-1 w-full">
      {showModal && <WelcomeModal onClose={handleCloseModal} />}
      <div className="home-container" onScroll={handleScroll}>
        <div className="home-posts">
          <ul
            className={`flex flex-col flex-1 gap-9 w-full opacity-0 transition-opacity duration-1000 ${
              lazy && "opacity-100"
            } `}
          >
            {items?.map((item, index) => (
              <li key={index} className="flex justify-center w-full">
                <PostItem card={item} index={items} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-creators">
        <VerticalAd dataAdSlot="4018192515" />
      </div>
    </div>
    // </section>

    // <HorizontalAd dataAdSlot="2114654726" />
    // </div>
  );
};

export default Home;

/* Home */
// .home-container {
//   @apply flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar;
// }

// .home-posts {
//   @apply max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9;
// }

// .home-creators {
//   @apply hidden xl:flex flex-col w-72 2xl:w-465 px-6 py-10 gap-10  overflow-scroll custom-scrollbar;
// }
