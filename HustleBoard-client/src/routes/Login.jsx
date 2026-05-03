import React, { useState } from "react";
import { UserLock, User } from "lucide-react";
import { loginContext } from "../context/login.context";
import { useContext } from "react";
import LoadingCircleSpinner from "../components/LoadingCircleSpinner";

const Home = () => {
  const token = localStorage.getItem("token");
 
  const { isLoggedIn, setIsLoggedIn } = useContext(loginContext);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSignUp = async () => {
    const res = await fetch(" https://hustleboard-tv3y.onrender.com/api/v1/auth/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = async () => {
    const res = await fetch(" https://hustleboard-tv3y.onrender.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
      })
      .catch((err) => {
        console.log(err);
      });
    if (response === "login Successfull,Redirecting to dashboard...") {
      setIsLoggedIn(true);
    }
  };

  if (response == "login Successfull,Redirecting to dashboard...") {
  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
  }
  console.log(response);

  return (
    <div className="w-[95%] md:w-[60%] h-max  bg-white/30 shadow-inner shadow-white rounded-2xl py-2 ">
      <section className="py-5 px-4 md:p-5 md:px-10 md:flex justify-between">
        <span className="flex items-center gap-3">
          <img src="/hustleboard_logo.png" alt="logo" className="w-10" />
          <h1 className="text-lg md:text-2xl text-[#ff537b]">
            <b>HustleBoard</b>
          </h1>
        </span>
      </section>
      <div className="w-[95%] h-max flex flex-col items-center bg-white/40 shadow-inner shadow-white rounded-2xl py-7 mx-auto ">
        <span className="rounded-full p-3 bg-[radial-gradient(circle_farthest-corner_at_10%_20%,rgba(253,115,200,1)_0%,rgba(0,92,141,1)_90.5%)]">
          <UserLock color="#ffffff" />
        </span>
        <h1 className="font-semibold text-lg mt-2">Welcome to Hustleboard</h1>
        { response != "" ? 
          <p
          className={`${response == "login Successfull,Redirecting to dashboard..." || response == "sign up successfull " ? " text-green-600" : " text-orange-600"} font-semibold text-sm text-center md:text-lg`}
        >
           {response}
        </p>
        :
         <p
          className={`text-xs text-black font-light`}
        >
        Please login to manage and track your task
        </p>
        }
      </div>
      <div className="w-[95%] h-max bg-white/80 my-3 shadow-inner shadow-white rounded-2xl py-7 mx-auto">
        <span className="px-4 flex gap-2">
          <User color="#7002de" />
          <p className="font-semibold text-sm border-b-2 border-[#7002de]">
            {login ? "Login to continue" : "Create new account"}
          </p>
        </span>
        <section className="w-[95%] md:w-[70%] flex flex-col items-center gap-5 mx-auto py-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`w-[95%]  bg-white shadow-md rounded-lg p-3 outline-none border border-gray-300 ${login ? "hidden" : "block"} `}
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-[95%]  bg-white shadow-md rounded-lg p-3 outline-none border border-gray-300 "
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-[95%] bg-white shadow-md rounded-lg p-3 outline-none border border-gray-300 "
          />
          {login ? (
            <button
              className="w-[95%] flex justify-center gap-2 bg-[radial-gradient(circle_farthest-corner_at_10%_20%,rgba(253,115,200,1)_0%,rgba(0,92,141,1)_90.5%)] shadow-md rounded-lg p-2 outline-none text-white"
              onClick={handleLogin}
            >
             {response == "login Successfull,Redirecting to dashboard..."?<LoadingCircleSpinner /> : "Login"}
            </button>
          ) : (
            <button
              className="w-[95%] flex justify-center gap-2 bg-[radial-gradient(circle_farthest-corner_at_10%_20%,rgba(253,115,200,1)_0%,rgba(0,92,141,1)_90.5%)] shadow-md rounded-lg p-2 outline-none text-white"
              onClick={handleSignUp}
            >
              Register
            </button>
          )}
          <span className=" flex gap-1">
            {login ? " New User?" : " Already have an account?"}
            <button
              className="text-[#7002de]"
              onClick={() => setLogin((prev) => !prev)}
            >
              {login ? "Create New Account" : "Go To Login"
              }
              
            </button>
          </span>
        </section>
      </div>
    </div>
  );
};

export default Home;
