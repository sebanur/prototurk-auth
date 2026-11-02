import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {auth.currentUser.photoURL && (
            <img
              src={auth.currentUser.photoURL}
              className="w-7 h-7 rounded-full"
            />
          )}
          Oturumun açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
            >
              E-posta onayla
            </button>
          )}
        </h1>

        <UpdateProfile />
      </div>
    );
  }
  return (
    <div>
      <Link to="/register">Kayıt ol</Link>
      <Link to="/login">Giriş yap</Link>
    </div>
  );
};

export default Home;
