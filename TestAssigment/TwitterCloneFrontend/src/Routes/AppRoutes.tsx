import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import AddTweet from "../Pages/AddTweet";
import SearchUsers from "../Pages/SearchUsers";

import ProtectedRoute from "../Components/ProtectedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/tweets/:userId" element={<Profile />} />

      <Route
        path="/add-tweet"
        element={
          <ProtectedRoute>
            <AddTweet />
          </ProtectedRoute>
        }
      />

      <Route path="/search" element={<SearchUsers />} />
    </Routes>
  );
}

export default AppRoutes;