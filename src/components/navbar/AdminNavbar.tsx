import { NavLink, Outlet } from "react-router-dom";
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
      <div className="w-screen backdrop-blur-md flex z-50 items-center py-3 px-20 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white text-2xl font-bold">
          <Logo />
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
            className="text-white text-2xl hover:text-red-500 transition-colors flex items-center gap-3"
          >
            {/* Logout */}
            <BsPower />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
  // <>
  //   <div className="flex h-[99vh]">
  //     <div className="w-full max-w-[15rem]">
  //       <Card
  //         className="h-[100vh] w-full max-w-[15rem] fixed bg-dark-200 rounded-none py-4 shadow-xl shadow-blue-gray-900/5"
  //         placeholder=""
  //       >
  //         <div className="mb-8 p-4">
  //           <Typography
  //             variant="h3"
  //             color="white"
  //             className=""
  //             placeholder=""
  //           >
  //             Hack<span className="text-primary">N</span>Conquer
  //           </Typography>
  //         </div>
  //         <div className="flex flex-col justify-between h-[100vh]">
  //           <div>
  //             <List className="text-white p-2" placeholder="">
  //               <NavLink
  //                 to="/admin/dashboard"
  //                 end
  //                 className={({ isActive }) =>
  //                   isActive ? "bg-transparent text-primary" : "text-white"
  //                 }
  //               >
  //                 <ListItem placeholder="" className="focus:bg-transparent">
  //                   <ListItemPrefix placeholder="">
  //                     <PresentationChartBarIcon className="h-5 w-5" />
  //                   </ListItemPrefix>
  //                   Dashboard
  //                 </ListItem>
  //               </NavLink>
  //               <NavLink
  //                 to="/admin/problems"
  //                 end
  //                 className={({ isActive }) =>
  //                   isActive ||
  //                   window.location.pathname.startsWith("/admin/problems")
  //                     ? "bg-transparent text-primary"
  //                     : "text-white"
  //                 }
  //               >
  //                 <ListItem placeholder="" className="focus:bg-transparent">
  //                   <ListItemPrefix placeholder="">
  //                     <HiDocumentReport className="h-5 w-5" />
  //                   </ListItemPrefix>
  //                   Problems
  //                 </ListItem>
  //               </NavLink>
  //               <NavLink
  //                 to="/admin/clans"
  //                 end
  //                 className={({ isActive }) =>
  //                   isActive ? "bg-transparent text-primary" : "text-white"
  //                 }
  //               >
  //                 <ListItem
  //                   placeholder=""
  //                   className="focus:bg-transparent focus:text-primary"
  //                 >
  //                   <ListItemPrefix placeholder="">
  //                     <BsShieldShaded className="h-5 w-5" />
  //                   </ListItemPrefix>
  //                   Clans
  //                 </ListItem>
  //               </NavLink>
  //               <NavLink
  //                 to="/admin/leaderboards"
  //                 end
  //                 className={({ isActive }) =>
  //                   isActive ? "bg-transparent text-primary" : "text-white"
  //                 }
  //               >
  //                 <ListItem
  //                   placeholder=""
  //                   className="focus:bg-transparent focus:text-primary"
  //                 >
  //                   <ListItemPrefix placeholder="">
  //                     <FaTrophy className="h-5 w-5" />
  //                   </ListItemPrefix>
  //                   LeaderBoard
  //                 </ListItem>
  //               </NavLink>
  //             </List>
  //           </div>
  //           <div>
  //             <List className="text-white p-2" placeholder="">
  //               <NavLink
  //                 to="/admin/profile"
  //                 end
  //                 className={({ isActive }) =>
  //                   isActive ? "bg-transparent text-primary" : "text-white"
  //                 }
  //               >
  //                 <ListItem
  //                   placeholder=""
  //                   className="focus:bg-transparent focus:text-primary"
  //                 >
  //                   <ListItemPrefix placeholder="">
  //                     <UserCircleIcon className="h-5 w-5" />
  //                   </ListItemPrefix>
  //                   Profile
  //                 </ListItem>
  //               </NavLink>
  //               <ListItem
  //                 placeholder=""
  //                 className="focus:bg-transparent active:text-primary focus:text-white"
  //                 onClick={() => {
  //                   dispatch(logout());
  //                 }}
  //               >
  //                 <ListItemPrefix placeholder="">
  //                   <PowerIcon className="h-5 w-5" />
  //                 </ListItemPrefix>
  //                 Log Out
  //               </ListItem>
  //             </List>
  //           </div>
  //         </div>
  //       </Card>
  //     </div>
  //     <div className="pt-10 mx-14 h-full w-[81.58vw]">
  //       <Outlet />
  //     </div>
  //   </div>
  // </>
  // );
}

export default AdminNavbar;
