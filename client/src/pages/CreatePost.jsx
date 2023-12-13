import React from "react";
import PostForm from "../components/PostForm";
import SquareAd from "../components/SquareAd";

export default function CreatePost() {
  return (
    <div className="flex flex-1 ">
      <SquareAd dataAdSlot="6097104098" />
      <div className="common-container ">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
}
