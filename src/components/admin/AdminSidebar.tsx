import { NavLink, Outlet } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaTrophy } from "react-icons/fa6";
import { BsShieldShaded } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/userSlice";

function AdminSidebar() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex h-[99vh]">
        <div className="w-full max-w-[15rem]">
          <Card
            className="h-[100vh] w-full max-w-[15rem] fixed bg-dark-200 rounded-none py-4 shadow-xl shadow-blue-gray-900/5"
            placeholder=""
          >
            <div className="mb-8 p-4">
              <Typography
                variant="h3"
                color="white"
                className=""
                placeholder=""
              >
                Hack<span className="text-primary">N</span>Conquer
              </Typography>
            </div>
            <div className="flex flex-col justify-between h-[100vh]">
              <div>
                <List className="text-white p-2" placeholder="">
                  <NavLink
                    to="/admin/dashboard"
                    end
                    className={({ isActive }) =>
                      isActive ? "bg-transparent text-primary" : "text-white"
                    }
                  >
                    <ListItem placeholder="" className="focus:bg-transparent">
                      <ListItemPrefix placeholder="">
                        <PresentationChartBarIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Dashboard
                    </ListItem>
                  </NavLink>
                  <NavLink
                    to="/admin/problems"
                    end
                    className={({ isActive }) =>
                      isActive ||
                      window.location.pathname.startsWith("/admin/problems")
                        ? "bg-transparent text-primary"
                        : "text-white"
                    }
                  >
                    <ListItem placeholder="" className="focus:bg-transparent">
                      <ListItemPrefix placeholder="">
                        <HiDocumentReport className="h-5 w-5" />
                      </ListItemPrefix>
                      Problems
                    </ListItem>
                  </NavLink>
                  <NavLink
                    to="/admin/clans"
                    end
                    className={({ isActive }) =>
                      isActive ? "bg-transparent text-primary" : "text-white"
                    }
                  >
                    <ListItem
                      placeholder=""
                      className="focus:bg-transparent focus:text-primary"
                    >
                      <ListItemPrefix placeholder="">
                        <BsShieldShaded className="h-5 w-5" />
                      </ListItemPrefix>
                      Clans
                    </ListItem>
                  </NavLink>
                  <NavLink
                    to="/admin/leaderboards"
                    end
                    className={({ isActive }) =>
                      isActive ? "bg-transparent text-primary" : "text-white"
                    }
                  >
                    <ListItem
                      placeholder=""
                      className="focus:bg-transparent focus:text-primary"
                    >
                      <ListItemPrefix placeholder="">
                        <FaTrophy className="h-5 w-5" />
                      </ListItemPrefix>
                      LeaderBoard
                    </ListItem>
                  </NavLink>
                </List>
              </div>
              <div>
                <List className="text-white p-2" placeholder="">
                  <NavLink
                    to="/admin/profile"
                    end
                    className={({ isActive }) =>
                      isActive ? "bg-transparent text-primary" : "text-white"
                    }
                  >
                    <ListItem
                      placeholder=""
                      className="focus:bg-transparent focus:text-primary"
                    >
                      <ListItemPrefix placeholder="">
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Profile
                    </ListItem>
                  </NavLink>
                  <ListItem
                    placeholder=""
                    className="focus:bg-transparent active:text-primary focus:text-white"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <ListItemPrefix placeholder="">
                      <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
                </List>
              </div>
            </div>
          </Card>
        </div>
        <div className="pt-10 mx-14 h-full w-[81.58vw]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
