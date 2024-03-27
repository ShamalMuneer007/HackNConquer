import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/userSlice";
import { BsPower } from "react-icons/bs";
import profileIcon from "/profile-icon.png";
function UserNavbar() {
  const activeNavLinkStyle =
    "text-primary underline bg-gray-800/20 rounded p-3  underline-offset-8";
  const notActiveLinkstyle = "text-white p-3";
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  return (
    <div>
      <div className="w-screen backdrop-blur-md flex z-50 items-center py-3 px-20 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white text-2xl font-bold">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="flex text-white w-full justify-center gap-5">
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
        <div className="w-[8%] flex justify-start">
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="text-white text-lg hover:text-red-500 transition-colors flex items-center gap-3"
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
