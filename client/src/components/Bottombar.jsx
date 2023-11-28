import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Bottombar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="bottom-bar">
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
    </section>
  );
}
