import React from "react";
import Post from "../components/Post";

export default function PostPage() {
  return (
    <div className="flex flex-1 ">
      <div className="common-container overflow-y-scroll no-scrollbar">
        <Post />
      </div>
    </div>
  );
}
