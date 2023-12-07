import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// swiper
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
//firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
//
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../api-calls/PostApi";

export default function PostForm() {
  SwiperCore.use([Navigation, Pagination]);
  // const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [prog, setProg] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [text, settext] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const createPost = useCreatePost();

  //
  const [formData, setFormData] = useState({
    imageUrls: [],
    location: "",
    caption: "",
  });

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    // Limit to 4 images
    const limitedImages = selectedImages.slice(0, 4);
    setImages(limitedImages);
    // Create URLs for preview
    const imageUrls = limitedImages.map((image) => URL.createObjectURL(image));
    setPreviewImages(imageUrls);
    //
    if (imageUrls) {
      settext(true);
    }
  };
  const selectImages = (e) => {
    fileInputRef.current.click();
  };
  //
  const initUpload = async () => {
    try {
      if (images.length > 0 && images.length + formData.imageUrls.length < 5) {
        setUpLoading(true);

        const promises = [];

        const options = {
          maxSizeMB: 2,
          // maxWidthOrHeight: 1920,
          maxWidthOrHeight: 1280,
        };

        for (let i = 0; i < images.length; i++) {
          const compressedImage = await imageCompression(images[i], options);
          promises.push(storeImage(compressedImage));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUpLoading(false);
          })
          .catch((err) => {
            setImageUploadError(true);
            setUpLoading(false);
          });
      } else {
        setImageUploadError(true);
        setUpLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const storeImage = async (file) => {
    try {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "_" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProg(Math.floor(progress));
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  //
  const handleSubmit = async () => {
    try {
      if (formData.imageUrls.length < 1 || imageUploadError === true) {
        return setError("No image! or Image too large!");
      }
      setLoading(true);
      setError(false);
      const createdPost = await createPost(formData);
      if (createdPost === undefined) {
        setLoading(true);
        setError("Post not created refresh page");
      }
      setLoading(false);
      // navigate(`/post/${createdPost._id}`);
      navigate(`/`);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };
  //
  useEffect(() => {
    if (
      formData.imageUrls.length >= 1 &&
      formData.imageUrls.length <= 4 &&
      formData.imageUrls.length === images.length
    ) {
      handleSubmit();
    }
  }, [formData]);

  return (
    <form className="flex flex-col gap-9 w-fullmax-w-5xl ">
      <div className="flex flex-center flex-col">
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          className="bg-white cursor-pointer "
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <div className="flex flex-1 justify-center file_uploader-img a:w-[280px] b:w-[370px] c:w-[400px] w:[20px] sm:w-[640px] md:w-[680px] lg:w-[680px] xl:w-[1024px] ">
          <Swiper
            autoHeight={true}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {previewImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img src={imageUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <button
        type="button"
        className="flex  text-lg md:text-xl h3-bold md:h2-bold hover:text-blue-500 mt-4"
        onClick={selectImages}
        disabled={loading || uploading}
      >
        {!text ? (
          <p>
            Select images<sub>max4</sub>
          </p>
        ) : (
          <p>
            Change images<sub>max4</sub>
          </p>
        )}
      </button>

      <textarea
        type="textarea"
        placeholder="caption"
        id="caption"
        className="h3-bold md:h2-bold bg-dark-1 max-h-[200px] min-h-[100px]"
        maxLength={200}
        onChange={handleChange}
        disabled={loading || uploading}
      />
      <input
        type="text"
        placeholder="location (optional)"
        id="location"
        className="h3-bold md:h2-bold bg-dark-1"
        maxLength={26}
        onChange={handleChange}
        disabled={loading || uploading}
      />

      <div className="flex gap-4 items-center justify-start">
        <button
          type="button"
          disabled={loading || uploading}
          className={
            images.length < 1
              ? "hidden"
              : "flex text-lg md:text-xl h3-bold md:h2-bold hover:text-blue-500 mt-4"
          }
          onClick={initUpload}
        >
          {uploading ? `${prog === null ? 0 : prog}` : "Post"}
        </button>
      </div>
    </form>
  );
}
