import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Topbar from "./Topbar";
import LeftSidebar from "./LeftSidebar";
import HorizontalAd from "./HorizontalAd";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return (
      <div className="w-full md:flex ">
        <Topbar />
        <LeftSidebar />

        <section className="flex flex-1 h-full ">
          <Outlet />
        </section>
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div className="w-full md:flex overflow-y-scroll no-scrollbar">
        <Topbar />
        <LeftSidebar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
        <HorizontalAd dataAdSlot="2114654726" />
      </div>
    );
  }
  // if (!currentUser) return <Navigate to="/oauth" />;
}
