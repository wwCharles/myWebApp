import React from "react";
import PostForm from "../components/PostForm";
import SquareAd from "../components/SquareAd";
import HorizontalAd from "../components/HorizontalAd";

export default function CreatePost() {
  return (
    <div className="w-full md:flex ">
      <SquareAd dataAdSlot="6097104098" />
      <section className="flex flex-1 h-full">
        <div className="flex flex-1 ">
          <div className="common-container ">
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Create Post
              </h2>
            </div>

            <PostForm action="Create" />
          </div>
        </div>
      </section>
      <HorizontalAd dataAdSlot="2114654726" />
    </div>
  );
}
{
  /* <div className="w-full md:flex ">
  <Topbar />
  <LeftSidebar />

  <section className="flex flex-1 h-full ">
    <Outlet />
  </section>
</div>; */
}
