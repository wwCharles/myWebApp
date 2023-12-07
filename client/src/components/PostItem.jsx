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

export default function PostItem({ card }) {
  SwiperCore.use([Navigation, Pagination]);
  const [like, setLike] = useState();
  const [dislike, setDislike] = useState();
  const [flagStat, setFlagStat] = useState(false);
  const [poleposition, setPolePosition] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const getPostbyId = useGetPostbyId();
  const likePost = useLikePost();
  const dislikePost = useDislikePost();
  const flagPost = useFlagPost();
  const deletePost = useDeletePost();

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const likeStatus = async (e) => {
    e.preventDefault();
    try {
      const status = await likePost(card._id);
      console.log(status.likes);
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
  };
  const dislikeStatus = async (e) => {
    e.preventDefault();
    try {
      const status = await dislikePost(card._id);
      console.log(status.dislikes);
      if (status.success === false) {
        return;
      }
      setDislike(status);
    } catch (error) {
      console.log(error);
    }
  };

  const flagStatus = async (e) => {
    e.preventDefault();
    try {
      const status = await flagPost(card._id);
      if (status.success === false) {
        return;
      }
      setFlagStat(status);

      const postToDelete = await getPostbyId(card._id);

      if (postToDelete.redflag >= 50) {
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

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl ">
      <div className="flex flex-center flex-col gap-10 ">
        <div className="file_uploader-img a:w-[280px] b:w-[370px] c:w-[400px] w:[20px] sm:w-[640px] md:w-[680px] lg:w-[680px] xl:w-[1024px]">
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
                  onLoad={handleImageLoad}
                  className="animate-in slide-in-from-bottom-48"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <>
            <div className="flex gap-12 items-center justify-start">
              <button
                onClick={likeStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                {like ? (
                  <>
                    🤍
                    <sub>
                      <small>{like.likes}</small>
                    </sub>
                  </>
                ) : (
                  <>
                    🤍
                    <sub>
                      <small>{card.likes}</small>
                    </sub>
                  </>
                )}
              </button>
              <button
                onClick={dislikeStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                {dislike ? (
                  <>
                    ♡
                    <sub>
                      <small>{dislike.dislikes}</small>
                    </sub>
                  </>
                ) : (
                  <>
                    ♡
                    <sub>
                      <small>{card.dislike}</small>
                    </sub>
                  </>
                )}
              </button>
              <button
                onClick={flagStatus}
                className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4"
              >
                {flagStat ? "🚩" : "🏳️"}
              </button>

              {poleposition && (
                <p className="flex text-lg md:text-xl h3-bold md:h2-bold mt-4 text-purple-500">
                  1%
                </p>
              )}
            </div>

            <div className="md:text-xl h3-bold md:h2-bold mt-2 ">
              {card.location ? (
                <p>
                  <sub>・{card.location}</sub>
                </p>
              ) : (
                ""
              )}
              {card.caption && <p>"{card.caption}"</p>}
            </div>
            <hr className="border-dark-4" />
          </>
        </div>
      </div>
    </div>
  );
}
