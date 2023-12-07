import { Link } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col">
        <Link to="/" className="flex gap-3 items-center">
          <h1 className="h3-bold md:h2-bold pt-2 sm:pt-6 hover:bg-blue-500">
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
      </div>
    </nav>
  );
}
