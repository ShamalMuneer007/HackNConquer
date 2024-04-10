import { Link, NavLink, Outlet } from "react-router-dom";
import { BsPower } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/userSlice";
import Logo from "../Logo/Logo";

function AdminNavbar() {
  const activeNavLinkStyle =
    "text-primary underline bg-gray-800/20 rounded p-3  underline-offset-8";
  const notActiveLinkstyle = "text-white p-3";
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-screen backdrop-blur-md flex z-50 text-sm items-center py-3 px-20 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white flex items-center">
          <Link to={"/"} className="w-[45%] pt-2">
            <Logo />
          </Link>
        </div>
        <div className="flex text-white w-full justify-center gap-5">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive || window.location.pathname.startsWith("/admin/users")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/problems"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive ||
                window.location.pathname.startsWith("/admin/problems")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/admin/categories"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive ||
                window.location.pathname.startsWith("/admin/categories")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/leaderboard"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Leaderboards
          </NavLink>
          <NavLink
            to="/admin/clans"
            end
            className={({ isActive }) =>
              `transition-all ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Clans
          </NavLink>
        </div>
        <div className="w-[40%] flex justify-end">
          <button
            onClick={() => {
              dispatch(logout());
            }}
            className="text-white text-xl hover:text-red-500 transition-colors flex items-center gap-3"
          >
            {/* Logout */}
            <BsPower />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminNavbar;
