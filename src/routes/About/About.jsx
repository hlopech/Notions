import { useContext } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { Link } from "react-router-dom";
export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center gap-10 justify-center mt-60">
      <span className="text-7xl font-semibold text-white mb-10 ">About me</span>
      <div className="flex flex-col gap-4 text-white text-3xl">
        <span>
          Email: <span className="font-semibold">{user.email}</span>
        </span>
        <span>
          Date sign up:{" "}
          <span className="font-semibold">
            {new Date(user.date).toLocaleString()}
          </span>
        </span>
      </div>
      <Link
        to={`/notes/${user.id}`}
        className="inline-block mt-6 bg-purple-700 text-white text-5xl px-4 p-5  transition duration-300 hover:bg-gray-700"
      >
        Go to notes
      </Link>
    </div>
  );
}
