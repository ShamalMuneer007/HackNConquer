import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup/Signup";

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
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;