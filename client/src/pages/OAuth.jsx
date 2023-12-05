import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useEffect, useState } from "react";

export default function OAuth() {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [randomNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [sectionLoaded, setSectionLoaded] = useState(false);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      // console.log(data);

      if (typeof data === "object" && data != null) {
        dispatch(signInSuccess(data));
        navigate("/", { replace: true });
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  useEffect(() => {
    const sectionTimeout = setTimeout(() => {
      setSectionLoaded(true);
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(sectionTimeout);
  }, []);
  return (
    <div className="flex overflow-y-scroll no-scrollbar">
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <div
          className={`sm:w-420 flex-center flex-col animate-pulse duration-10000 ${
            sectionLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button onClick={handleGoogleClick}>
            <h1
              className={`h3-bold md:h2-bold pt-5 sm:pt-12  ${
                loading ? "text-blue-500" : "text-red"
              }`}
            >
              {loading ? (
                <>
                  juiced23 <br /> <sub>click to enter</sub>
                </>
              ) : (
                <>
                  google <br /> <sub>click to signin</sub>
                </>
              )}
            </h1>
          </button>
        </div>
      </section>
      <img
        loading="lazy"
        src={`/images/${randomNumber}.webp`}
        className={`xl:block h-screen w-2/3 object-cover bg-no-repeat opacity-0 transition-opacity duration-1000 ${
          sectionLoaded && "opacity-100"
        } `}
        alt="Cool Car"
      />
    </div>
  );
}
