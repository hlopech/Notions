import { z } from "zod";
import { User } from "..//../utils/validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../../utils/Requests";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = User.parse({
        email,
        password,
        date: Date.now(),
        id: crypto.randomUUID(),
      });

      if (password !== repeatedPassword) {
        setErrors({ password: { _errors: ["Passwords do not match"] } });
        return;
      }

      setErrors(null);
      const users = await getUsers();
      const isNewUser = users.some((user) => user.email === email);
      console.log(isNewUser);
      if (!isNewUser) {
        await addUser(user);
        navigate(`/login`);
      } else {
        setErrors({ user: { _errors: ["not new user"] } });
      }

      console.log(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-purple-700 flex flex-col justify-center h-400 p-12 items-center gap-12 border-4 border-purple-900">
        <span className="text-white text-6xl font-extrabold">Sign up</span>
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
          <input
            className="text-lg border-4 border-purple-900 text-white bg-gray-700 px-4 focus:outline-none focus:border-white w-full h-full"
            type="password"
            placeholder="Repeat password"
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
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
            onClick={handleSignUp}
          >
            Sign up
          </button>
          {errors?.user && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.user?._errors}
            </div>
          )}
        </div>
        <div>
          <span className="text-gray-300 text-xl">
            Have an account?Let's{" "}
            <Link to="/login" className="text-gray-300 font-semibold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
