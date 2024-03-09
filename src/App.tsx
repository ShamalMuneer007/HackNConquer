import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "./pages/auth/Signup/Signup";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSidebar from "./components/admin/AdminSidebar";
import UserSidebar from "./components/user/UserSidebar";
import UserDashboard from "./pages/user/UserDashboard";
import AdminProblems from "./pages/admin/AdminProblems";
import AddProblem from "./pages/admin/AddProblem";

function App() {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user ? element : <Navigate to="/login" />;
  };
  const AdminProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user && user.role === "ROLE_ADMIN" ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            !user ? (
              <Login />
            ) : user.role === "ROLE_ADMIN" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !user ? (
              <Signup />
            ) : user.role === "ROLE_ADMIN" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/user/dashboard" />
            )
          }
        ></Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<AdminProtectedRoute element={<AdminSidebar />} />}
        >
          <Route
            path="dashboard"
            element={<AdminProtectedRoute element={<AdminDashboard />} />}
          ></Route>
          <Route
            path="problems"
            element={<AdminProtectedRoute element={<AdminProblems />} />}
          ></Route>
          <Route
            path="problems/add-problem"
            element={<AdminProtectedRoute element={<AddProblem />} />}
          ></Route>
        </Route>

        {/* User Routes */}
        <Route path="/" element={<ProtectedRoute element={<UserSidebar />} />}>
          <Route
            path="dashboard"
            element={<ProtectedRoute element={<UserDashboard />} />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
