import { Link, useNavigate } from "react-router-dom";
// import { useLogoutUser } from "../api-calls/UserApi";

export default function Topbar() {
  return (
    <section className="topbar">
      <div className="flex-between px-2">
        {/* <div className="flex justify-between"> */}

        <Link to="/" className="flex items-center">
          <h1 className="h3-bold md:h2-bold">juiced23</h1>
        </Link>
        <Link to="/one">
          <h1 className="h3-bold md:h2-bold">1%</h1>
        </Link>
        <Link to="/create-post">
          <h1 className="h3-bold md:h2-bold">create</h1>
        </Link>
      </div>
    </section>
  );
}
