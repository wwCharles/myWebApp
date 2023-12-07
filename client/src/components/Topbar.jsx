import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUser } from "../api-calls/UserApi";

export default function Topbar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="topbar">
      <div className="flex-between px-2">
        <Link to="/" className="flex items-center">
          <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:bg-blue-500 ">
            juiced23
          </h1>
        </Link>
        <Link to={`/create-post`}>
          <h1 className="h3-bold md:h2-bold pt-4 sm:pt-8 hover:text-blue-500 ">
            create
          </h1>
        </Link>
        <Link to={`/one`}>
          <h1 className="h3-bold md:h2-bold pt-4 sm:pt-8 hover:text-blue-500 ">
            1%
          </h1>
        </Link>
        {/* {currentUser && (
          <>
            <Link to={`/friends/${currentUser._id}`}>
              <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-blue-500">
                friends
              </h1>
            </Link>
            <Link to={`/create-post`}>
              <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-blue-500 ">
                create
              </h1>
            </Link>
            <button
              onClick={() => {
                navigate(`/profile/${currentUser._id}`);
              }}
              className="flex-center gap-3"
            >
              <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-red">
                {currentUser.username}
              </h1>
            </button>
            <Link
              to={`/profile/${currentUser._id}`}
              className="flex-center gap-3"
            >
              <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-red">
                {currentUser.username}
              </h1>
            </Link>
            <button
              variant="ghost"
              className="shad-button_ghost"
              onClick={handleLogout}
            >
              <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:bg-red">
                logout
              </h1>
            </button>
          </>
        )} */}
      </div>
    </section>
  );
}
