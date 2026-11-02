import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen w-full flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
