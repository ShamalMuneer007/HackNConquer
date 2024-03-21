import { Outlet } from "react-router-dom";

function UserSidebar() {
  return (
    <div>
      <h1 className="font-bold text-white">User sidebar</h1>
      <Outlet />
    </div>
  );
}

export default UserSidebar;
