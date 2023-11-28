import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Topbar from "./Topbar";
import LeftSidebar from "./LeftSidebar";
import Bottombar from "./Bottombar";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return (
      <div className="w-full md:flex overflow-y-scroll no-scrollbar">
        <Topbar />
        <LeftSidebar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>

        <Bottombar />
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/oauth" />;
}
