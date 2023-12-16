import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../components/UserContextProvider";
export default function Layout() {
  const { user, loading } = useContext(UserContext);
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    userContext.onChange(null);
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-700 flex justify-between items-center p-4">
        <div className="text-white text-2xl pl-5">
          <span>Hello, {user.email}</span>
        </div>
        <nav className="flex gap-4 text-2xl text-white">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold "
                : "hover:text-black font-semibold"
            }
          >
            About
          </NavLink>
          <NavLink
            to={`/notes/${user.id}`}
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold "
                : "hover:text-black font-semibold"
            }
          >
            Notes
          </NavLink>
          <button
            to="/login"
            className="hover:text-black font-semibold bg-purple-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-700 py-4  text-center text-gray-300">
        <div className="flex justify-center">
          <Divider style={{ height: "4px" }} />
        </div>
        <div className=" flex text-1xl justify-center gap-4 mt-2">
          <span>Created by: Nikita Starovojtov</span>
          <span>BSU: {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
