import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutUser } from "../api-calls/UserApi";

export default function LeftSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const logoutUser = useLogoutUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col">
        <Link to="/" className="flex gap-3 items-center">
          <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-blue-500">
            juiced
          </h1>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <h1 className="h3-bold md:h2-bold pt-4 sm:pt-8 hover:text-red ">
            {currentUser.username}
          </h1>
        </Link>
        <Link to={`/friends/${currentUser._id}`}>
          <h1 className="h3-bold md:h2-bold pt-4 sm:pt-8 hover:bg-red ">
            friends
          </h1>
        </Link>
        <Link to={`/create-post`}>
          <h1 className="h3-bold md:h2-bold pt-4 sm:pt-8 hover:bg-red ">
            create
          </h1>
        </Link>
      </div>
      <div className="">
        <button
          variant="ghost"
          className="shad-button pt-8"
          onClick={handleLogout}
        >
          <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:text-red ">
            burnout
          </h1>
        </button>
      </div>
    </nav>
  );
}
