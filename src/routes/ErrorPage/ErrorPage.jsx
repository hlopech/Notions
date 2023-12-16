import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const userExists = localStorage.getItem("userId");
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center w-4/5 md:w-2/5 flex flex-col gap-8">
        <span className="text-white text-6xl md:text-8xl font-serif">404</span>
        <span className="font-serif text-white text-4xl md:text-5xl">
          Page not found
        </span>
        <div className="flex items-center justify-center gap-4 text-gray-500">
          <span className="text-3xl md:text-4xl">Go to page</span>
          {userExists ? (
            <Link
              className="text-white text-3xl md:text-4xl hover:text-red-500"
              to="/about"
            >
              About
            </Link>
          ) : (
            <Link
              className="text-white text-3xl md:text-4xl hover:text-red-500"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
