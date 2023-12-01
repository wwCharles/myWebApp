import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// swiper
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

//firebase
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../firebase";
import { useDeletePost, useGetPostbyId } from "../api-calls/PostApi";
import { useGetUserbyId } from "../api-calls/UserApi";

export default function Post() {
  SwiperCore.use([Navigation, Pagination]);
  const { currentUser } = useSelector((state) => state.user);
  const [currentPost, setCurrentPost] = useState("");
  const [creator, setCreator] = useState("");

  const post = useParams();
  const navigate = useNavigate();
  const getUserbyId = useGetUserbyId();
  const getPostbyId = useGetPostbyId();
  const deletePost = useDeletePost();

  const getPost = async () => {
    try {
      const data = await getPostbyId(post.id);
      if (data === false) {
        getPost();
        return;
      }

      setCurrentPost(data);

      const owner = await getUserbyId(data.userRef);

      setCreator(owner);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const storage = getStorage(app);
      for (let i = 0; i < currentPost.imageUrls.length; i++) {
        const name = currentPost.imageUrls[i];
        const deleteRef = ref(storage, `${name}`);
        await deleteObject(deleteRef);
      }

      const deleted = await deletePost(post.id);
      if (deleted) {
        navigate(`/profile/${currentUser._id}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-fullmax-w-5xl ">
      {currentPost.userRef === currentUser._id && (
        <div className="flex gap-4 items-center justify-start">
          <button
            onClick={handleDelete}
            className="flex text-lg md:text-xl h3-bold md:h2-bold hover:text-blue-500 mt-4 delete-post-button"
          >
            Delete Post
          </button>
        </div>
      )}

      <div className="flex flex-center flex-col gap-10">
        <div className="file_uploader-img a:w-[280px] b:w-[370px] c:w-[400px] w:[20px] sm:w-[640px] md:w-[680px] lg:w-[680px] xl:w-[1024px] ">
          {currentPost && (
            <>
              <Link
                to={`/profile/${creator._id}`}
                className="flex text-lg md:text-xl h3-bold md:h2-bold"
              >
                {creator.username}
              </Link>
              <Swiper
                autoHeight={true}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {currentPost.imageUrls.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <img src={imageUrl} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex  gap-12 items-center justify-start"></div>
              <div className="md:text-xl h3-bold md:h2-bold mt-2 ">
                {currentPost?.location && (
                  <>
                    <p>
                      <sub>・{card.location}</sub>
                    </p>
                  </>
                )}
                {currentPost?.caption && <p>"{currentPost.caption}"</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
