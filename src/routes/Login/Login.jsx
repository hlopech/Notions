import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../../utils/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const user = User.parse({
        email,
        password,
        date: Date.now(),
        id: crypto.randomUUID(),
      });
      setErrors(null);
      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      fetch(`http://localhost:5002/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            userContext.onChange(user);
            navigate(`/about`);
          } else {
            console.log("error");
            setErrors({
              noUser: {
                _errors: ["user not found, please , check login and password"],
              },
            });
          }
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-purple-700 flex flex-col justify-center h-400 p-12 items-center gap-12 border-4 border-purple-900">
        <span className="text-white text-6xl font-extrabold">Log in</span>
        <div className="flex flex-col justify-center h-16 w-80">
          <input
            className="bg-gray-700 px-4 text-lg border-4 border-purple-900 text-white focus:outline-none focus:border-white w-full h-full"
            type="text"
            placeholder="Login"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors?.email && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.email?._errors}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center h-16 w-80">
          <input
            className="text-lg border-4 border-purple-900 text-white bg-gray-700 px-4 focus:outline-none focus:border-white w-full h-full"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors?.password && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.password?._errors}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center h-16 w-80">
          <button
            className="border-none bg-purple-900 text-4xl text-white px-4 py-2 hover:bg-gray-700"
            onClick={handleLogin}
          >
            Log in
          </button>
          {errors?.noUser && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.noUser?._errors}
            </div>
          )}
        </div>
        <div>
          <span className="text-gray-300  text-xl">
            haven't an account? Let's{" "}
            <Link to="/" className="text-gray-300 font-semibold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
