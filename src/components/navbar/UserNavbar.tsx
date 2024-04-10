import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/userSlice";
import profileIcon from "/profile-icon.png";
import { useState } from "react";
function UserNavbar() {
  const activeNavLinkStyle =
    "text-primary underline bg-gray-800/20 rounded p-3  underline-offset-8";
  const notActiveLinkstyle = "text-white p-3";
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      {showSidebar && (
        <div className="flex w-screen h-screen backdrop-blur-md lg:hidden z-50 items-start justify-center  bg-black/30 left-0 fixed top-0">
          <div className="w-screen h-[50%] bg-dark-100 rounded-b-3xl border-b-2 border-b-primary">
            <div className=""></div>
          </div>
        </div>
      )}
      <div className="flex w-screen backdrop-blur-md lg:hidden z-20 items-center py-3 px-5 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white flex items-center text-2xl font-bold">
          <Link to={"/"}>classname</Link>
        </div>
        <div className="w-full flex justify-end">
          <div
            className="text-white active:text-primary"
            onClick={() => setShowSidebar(true)}
          >
            {" "}
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h16a1 1 0 100-2H4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="hidden text-sm w-screen backdrop-blur-md lg:flex z-50 items-center py-3 px-20 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white flex items-center">
          <Link to={"/"} className="w-[45%] pt-2">
            <Logo />
          </Link>
        </div>
        <div className="flex text-white w-full justify-start gap-5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/problems"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20 ${
                isActive || window.location.pathname.startsWith("/problems")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/categories"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive || window.location.pathname.startsWith("/categories")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/leaderboard"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20 ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Leaderboards
          </NavLink>
          <NavLink
            to="/clans"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Clan
          </NavLink>
        </div>
        <div className=" flex justify-start">
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="text-white hover:text-red-500 transition-colors flex items-center gap-3"
            >
              {user.username}
              {/* Logout */}
              <img
                src={user.profileImage ? user.profileImage : profileIcon}
                className="rounded-full"
                width={"35px"}
                height={"35px"}
              />
            </button>
          ) : (
            <div className="flex text-white gap-4">
              <Link
                className="hover:text-primary transition-colors"
                to={"/login"}
              >
                Login
              </Link>
              <div> | </div>
              <Link
                className="hover:text-primary transition-colors"
                to={"/signup"}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default UserNavbar;
