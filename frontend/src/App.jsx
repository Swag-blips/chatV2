import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import { Loader } from "lucide-react";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
