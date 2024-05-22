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
import NotFound from "./pages/error/NotFound";
import Problem from "./pages/problem/Problem";
import EditProblem from "./pages/admin/EditProblem";
import UserHome from "./pages/user/UserHome";
import Leaderboard from "./pages/auth/Leaderboard/Leaderboard";
import GlobalLeaderboard from "./pages/auth/Leaderboard/GlobalLeaderboard";
import { RootState } from "./redux/store/store";
import Notifications from "./components/notification/Notification";
import ClanLeaderboard from "./pages/auth/Leaderboard/ClanLeaderboard";
import FriendsLeaderboard from "./pages/auth/Leaderboard/FriendsLeaderboard";
import Clan from "./pages/Clan/Clan";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import CreateClan from "./pages/Clan/CreateClan";
import JoinClan from "./pages/Clan/JoinClan";
import Friends from "./pages/friends/Friends";
import Notification from "./pages/notifications/Notification";
import UserSubscriptionInfo from "./pages/user/UserSubscriptionInfo";
import { ChatProvider } from "./contexts/useChatContext";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   console.log("User data : ", user);
  // }, [user]);
  useEffect(() => {
    console.log("USER : ", user);
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
      <ChatProvider user={user}>
        <Notifications />
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
              path="problems/edit-problem/:problemId"
              element={<AdminProtectedRoute element={<EditProblem />} />}
            ></Route>
            <Route
              path="categories"
              element={<AdminProtectedRoute element={<AdminCategories />} />}
            ></Route>

            <Route
              path="categories/add-category"
              element={<AdminProtectedRoute element={<AddCategory />} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>

          {/* User Routes */}
          <Route path="/" element={<UserNavbar />}>
            <Route index element={user ? <UserHome /> : <Landing />}></Route>
            <Route path="problems" element={<ProblemSet />}></Route>
            <Route path="problems/:problemNumber" element={<Problem />}></Route>
            <Route path="clan">
              <Route index element={<Clan />}></Route>
              <Route
                path="create"
                element={<ProtectedRoute element={<CreateClan />} />}
              ></Route>
              <Route
                path="join/:clanId"
                element={<ProtectedRoute element={<JoinClan />} />}
              ></Route>
            </Route>
            <Route
              path="premium/subscribe"
              element={<ProtectedRoute element={<></>} />}
            ></Route>
            <Route
              path="subscription/info"
              element={<ProtectedRoute element={<UserSubscriptionInfo />} />}
            ></Route>
            <Route
              path="friends"
              element={<ProtectedRoute element={<Friends />} />}
            ></Route>
            <Route path="/leaderboard">
              <Route index element={<Leaderboard />}></Route>
              <Route path="global" element={<GlobalLeaderboard />}></Route>
              <Route
                path="friends"
                element={<ProtectedRoute element={<FriendsLeaderboard />} />}
              ></Route>
              <Route
                path="clans"
                element={<ProtectedRoute element={<ClanLeaderboard />} />}
              ></Route>
            </Route>
            <Route path="payment/success" element={<PaymentSuccess />}></Route>
            <Route
              path="notifications"
              element={<ProtectedRoute element={<Notification />} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </ChatProvider>
    </>
  );
}

export default App;
