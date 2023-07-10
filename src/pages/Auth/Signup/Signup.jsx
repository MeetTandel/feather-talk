import { useEffect, useRef, useState } from "react";
import {
  BiUser as UserIcon,
  BiLockAlt as LockIcon,
  BiCaretRight as RightArrowIcon,
} from "react-icons/bi";
import { FaEye as EyeIcon, FaEyeSlash as EyeOffIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { setAuthError, signUp } from "../../../store/AuthSlice";
import { signupValidation } from "../../../utilities/utilities";

export function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUsername("");
    setPassword("");
    dispatch(setAuthError(""));
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    // authDispatch({
    //   type: "SET_LOCATION",
    //   payload: location?.state?.from?.pathname,
    // });

    if (
      signupValidation({ firstname, lastname, username, password }, dispatch)
    ) {
      dispatch(
        signUp({ state: { firstname, lastname, username, password }, navigate })
      );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-blue-400 h-[10%] flex justify-center items-center">
        <h1 className="text-white">Join FeatherTalk</h1>
      </div>

      <div className="bg-blue-100 flex grow justify-center items-center">
        <form
          onSubmit={handleSignup}
          className="w-[80%] max-w-[400px] md:w-[50%]"
        >
          <div className="flex flex-col gap-2 shadow-md rounded-md p-3 bg-blue-50">
            <div className="flex bg-white p-2 px-2 gap-1 items-center rounded-md outline outline-1 outline-gray-300  focus-within:outline-blue-400 focus-within:outline-1">
              <RightArrowIcon className="text-gray-400 h-5 w-5" />

              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                className="w-full outline-none"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="flex bg-white p-2 px-2 gap-1 items-center rounded-md outline outline-1 outline-gray-300  focus-within:outline-blue-400 focus-within:outline-1">
              <RightArrowIcon className="text-gray-400 h-5 w-5" />

              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                className="w-full outline-none"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="flex bg-white p-2 px-2 gap-1 items-center rounded-md outline outline-1 outline-gray-300  focus-within:outline-blue-400 focus-within:outline-1">
              <UserIcon className="text-gray-400 h-5 w-5" />

              <input
                type="text"
                placeholder="Username"
                value={username}
                className="w-full outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex bg-white p-2 px-2 gap-1 items-center rounded-md outline outline-1 outline-gray-300 focus-within:outline-blue-400 focus-within:outline-1">
              <LockIcon className="text-gray-400 h-5 w-5" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <EyeOffIcon
                  className="text-gray-400 h-5 w-5 cursor-pointer hover:text-slate-800 hover:scale-[120%]"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeIcon
                  className="text-gray-400 h-5 w-5 cursor-pointer hover:text-slate-800 hover:scale-[120%]"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <button
              type="submit"
              value="submit"
              className="bg-blue-400 text-white p-1.5 rounded-md hover:bg-blue-300 mt-4"
            >
              Signup
            </button>

            <div className="mt-4">
              <span className="text-sm  mr-1">Already a user?</span>

              <NavLink
                to="/login"
                className="underline w-max cursor-pointer text-slate-600 hover:text-slate-800"
              >
                Login
              </NavLink>
            </div>

            {error && (
              <p className="text-red-600 text-center break-words">{`* ${error}`}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
