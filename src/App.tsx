import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "./pages/auth/Signup/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
