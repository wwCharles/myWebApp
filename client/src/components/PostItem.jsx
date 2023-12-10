import { useEffect, useState } from "react";
// swiper
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
//firebase
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../firebase";
import {
  useDeletePost,
  useDislikePost,
  useFlagPost,
  useGetPostbyId,
  useLikePost,
} from "../api-calls/PostApi";
//icons
import { BsArrowUpSquare } from "react-icons/bs";
import { BsArrowDownSquare } from "react-icons/bs";
import { GrFlag } from "react-icons/gr";
import AdsComponent from "./AdsComponent";

export default function PostItem({ card, index }) {
  SwiperCore.use([Navigation, Pagination]);
  const [slideVisibility, setSlideVisibility] = useState(true);
  const [like, setLike] = useState();
  const [dislike, setDislike] = useState();
  const [poleposition, setPolePosition] = useState(false);

  const getPostbyId = useGetPostbyId();
  const likePost = useLikePost();
  const dislikePost = useDislikePost();
  const flagPost = useFlagPost();
  const deletePost = useDeletePost();

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedLikeStatus = debounce(async () => {
    try {
      const status = await likePost(card._id);
      if (status.success === false) {
        return;
      }
      if (status.likes >= 100) {
        setPolePosition(true);
      }
      setLike(status);
    } catch (error) {
      console.log(error);
    }
  }, 200);

  const debouncedDislikeStatus = debounce(async () => {
    try {
      const status = await dislikePost(card._id);
      if (status.success === false) {
        return;
      }
      setDislike(status);
    } catch (error) {
      console.log(error);
    }
  }, 200);

  const flagStatus = async (e) => {
    e.preventDefault();
    try {
      const status = await flagPost(card._id);
      if (status.success === false) {
        return;
      }

      const postToDelete = await getPostbyId(card._id);

      setSlideVisibility((prev) => !prev);

      if (postToDelete.redflag >= 10) {
        try {
          const storage = getStorage(app);
          for (let i = 0; i < postToDelete.imageUrls.length; i++) {
            const name = postToDelete.imageUrls[i];
            const deleteRef = ref(storage, `${name}`);
            await deleteObject(deleteRef);
          }

          deletePost(postToDelete._id);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // ...

  const handleImageLoad = () => {
    // Check if all images are loaded
    const allImagesLoaded = card.imageUrls.every((imageUrl) => {
      // if (imageUrl)
      // console.log(card.length);
      // Implement the logic to check if the image is loaded
      // You can use a ref to track the image load status
      // For simplicity, assuming all images are loaded here
      return true;
    });

    // // Update the state
    setAllImagesLoaded(allImagesLoaded);
  };

  return (
    <>
      {!slideVisibility ? (
        // Render different content when slideVisibility is true
        <div>
          <AdsComponent dataAdSlot="6097104098" />
        </div>
      ) : (
        <div
          className={`post-card ${allImagesLoaded ? "" : "opacity-0"}`}
          onLoad={handleImageLoad}
        >
          {/* <div className={`post-card ${slideVisibility ? "" : "hidden"}`}> */}
          {/* {slideVisibility && ( */}
          <>
            <Swiper
              autoHeight={true}
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              {card.imageUrls.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={imageUrl}
                    loading="eager"
                    className="animate-in slide-in-from-bottom-48"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex gap-12 items-center justify-start">
              <button
                onClick={debouncedLikeStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                {like ? (
                  <>
                    <BsArrowUpSquare color="green" />
                    <sub>
                      <small>{like.likes}</small>
                    </sub>
                  </>
                ) : (
                  <>
                    <BsArrowUpSquare />
                    <sub>
                      <small>{card.likes}</small>
                    </sub>
                  </>
                )}
              </button>
              <button
                onClick={debouncedDislikeStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                {dislike ? (
                  <>
                    <BsArrowDownSquare color="red" />
                    <sub>
                      <small>{dislike.dislikes}</small>
                    </sub>
                  </>
                ) : (
                  <>
                    <BsArrowDownSquare />
                    <sub>
                      <small>{card.dislikes}</small>
                    </sub>
                  </>
                )}
              </button>
              <button
                onClick={flagStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                <GrFlag color="red" />
              </button>

              {poleposition && (
                <p className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4 text-purple-500">
                  1%
                </p>
              )}
            </div>
            <div className="md:text-xl h3-bold md:h2-bold mt-2">
              {card.location && <sub>⌂__{card.location}</sub>}
              {card.caption && <p>"{card.caption}"</p>}
            </div>
            <hr className="border-gray-800" />
          </>
          <AdsComponent dataAdSlot="6097104098" />
        </div>
      )}
    </>
  );
}
