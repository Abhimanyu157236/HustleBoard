import React from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Dashboard />;
  } else {
    return (
      <div className="w-[95%] md:w-[80%] h-[40vh]  bg-white/30 shadow-inner shadow-white rounded-2xl py-2 flex flex-col items-center justify-center gap-2 ">
        <section className="py-5 px-7 md:p-5 md:px-10 md:flex justify-between">
          <span className="flex items-center gap-2">
            <img src="/hustleboard_logo.png" alt="logo" className="w-10" />
            <div></div>
            <h1 className="text-md md:text-2xl text-[#ff537b]">
              <b> HustleBoard </b> - Your Ultimate Task Management Dashboard
            </h1>
            </span>
            </section>
            <div className="w-fullflex items-center justify-center gap-2">
            <button
              className="text-white py-3 px-14 text-sm md:text-lg text-center bg-blue-500/60 shadow-inner shadow-white/80  font-bold rounded-2xl"
              onClick={() => navigate("/login")}
            > Login
            </button>
            </div>
            </div>
    )
  }
};

export default Home;
