import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "./pages/auth/Signup/Signup";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNavbar from "./components/navbar/AdminNavbar";
import UserNavbar from "./components/navbar/UserNavbar";
import AdminProblems from "./pages/admin/AdminProblems";
import AddProblem from "./pages/admin/AddProblem";
import AddCategory from "./pages/admin/AddCategory";
import ProblemDetails from "./pages/admin/ProblemDetails";
import Users from "./pages/admin/Users";
import AdminCategories from "./pages/admin/AdminCategories";
import Landing from "./pages/landing/Landing";
import ProblemSet from "./pages/problem/ProblemSet";
import NetworkError from "./pages/error/NetworkError";
import ServerError from "./pages/error/ServerError";
import NotFound from "./pages/error/NotFound";
import Problem from "./pages/problem/Problem";

function App() {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   console.log("User data : ", user);
  // }, [user]);
  const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user ? element : <Navigate to="/login" />;
  };
  const AdminProtectedRoute = ({ element }: { element: ReactNode }) => {
    useEffect(() => {
      console.log(user);
    }, []);
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
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/" />
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
          element={<AdminProtectedRoute element={<AdminNavbar />} />}
        >
          <Route
            index
            element={<AdminProtectedRoute element={<AdminDashboard />} />}
          ></Route>
          <Route
            path="users"
            element={<AdminProtectedRoute element={<Users />} />}
          ></Route>
          <Route
            path="problems"
            element={<AdminProtectedRoute element={<AdminProblems />} />}
          ></Route>
          <Route
            path="problems/add-problem"
            element={<AdminProtectedRoute element={<AddProblem />} />}
          ></Route>
          <Route
            path="problems/problem-details/:problemId"
            element={<AdminProtectedRoute element={<ProblemDetails />} />}
          ></Route>
          <Route
            path="categories"
            element={<AdminProtectedRoute element={<AdminCategories />} />}
          ></Route>

          <Route
            path="categories/add-category"
            element={<AdminProtectedRoute element={<AddCategory />} />}
          ></Route>
        </Route>

        {/* User Routes */}
        <Route path="/" element={<UserNavbar />}>
          <Route index element={<Landing />}></Route>
          <Route path="problems" element={<ProblemSet />}></Route>
          <Route path="problems/:problemNumber" element={<Problem />}></Route>
          {/* <Route path="network-error" element={<NetworkError />}></Route>
          <Route path="server-error" element={<ServerError />}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
