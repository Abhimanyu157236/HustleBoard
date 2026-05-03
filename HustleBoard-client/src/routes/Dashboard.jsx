import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import InsightCards from "../components/InsightCards";
import TaskOverView from "../components/TaskOverView";
import TagsSummary from "../components/TagsSummary";
import { useNavigate } from "react-router-dom";
import { LayoutList, LogOut, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const user = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const fetchTask = async () => {
    const res = await fetch(" http://10.175.74.225:5000/tasks/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    setTask(res.task);
  };

  useEffect(() => {
    fetchTask();
  }, [task]);

  const totalTasks = task?.length;
  const completed_tasks = task?.filter(
    (item) => item.completed === true,
  ).length;
  const pending_tasks = task?.filter((item) => item.completed === false).length;
  const urgent_task = task?.filter((item) => item.tag === "Urgent").length;

  if (token) {
    return (
      <div className="w-[95%] md:w-[80%] h-max  bg-white/30 shadow-inner shadow-white rounded-2xl py-2 ">
        <section className="py-5 px-4 md:p-5 md:px-10 md:flex justify-between">
          <span className="flex items-center gap-4">
            <img src="/hustleboard_logo.png" alt="logo" className="w-10" />
            <div></div>
            <h1 className="text-lg md:text-2xl text-[#ff537b]">
              <b>{user?.charAt(0).toUpperCase() + user?.slice(1)}'s</b>{" "}
              Dashboard
            </h1>
          </span>
          <div className="w-full md:w-[53%] flex justify-end my-3 ">
            <button
              className="text-white py-2 px-5 md:px-10 md:py-3 flex gap-1 items-center text-xs text-center bg-[#27d4ff]/60 shadow-inner shadow-white/80  font-bold rounded-full"
              onClick={() => navigate("/taskform")}
            >
            <Plus color="#ffffff" size={20} strokeWidth={5}/>
              New
            </button>
            <button
              className="text-white px-4 md:px-4 md:py-2 text-xs flex gap-2 items-center text-center bg-[#174cbd]/80 shadow-inner shadow-white/80 font-bold rounded-full mx-auto md:mx-1"
              onClick={() => navigate("/tasklist")}
            >
              <LayoutList color="#ffffff" size={16} />
              View Task
            </button>

            <button className="text-white px-3 py-2 md:px-10 md:py-3 text-xs text-center flex gap-2 items-center bg-orange-500/60 shadow-inner shadow-white/80 font-bold rounded-full"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <LogOut color="#ffffff" />
              Logout
            </button>
          </div>
        </section>
        <div className="w-full flex gap-1 flex-wrap justify-center px-4">
          <InsightCards
            bg="bg-[#00b4d8]/60"
            img="tick_blue.png"
            message="Total Tasks"
            numbers={totalTasks}
          />
          <InsightCards
            bg="bg-[#008000]/60"
            img="Green_tick.png"
            message="Finished Tasks"
            numbers={completed_tasks}
          />
          <InsightCards
            bg="bg-gradient-to-t from-[#f57f29]/80 to-[#f57f]/70"
            img="icons8-danger-50.png"
            message="Pending Tasks"
            numbers={pending_tasks}
          />
          <InsightCards
            bg="bg-[#bf0603]/60"
            img="icons8-danger-64 (1).png"
            message="Urgent Tasks"
            numbers={urgent_task}
          />
        </div>
        <div className="md:flex">
          <TaskOverView
            task={task}
            totalTasks={totalTasks}
            pending_tasks={pending_tasks}
            urgent_task={urgent_task}
            completed_tasks={completed_tasks}
          />
          <TagsSummary task={task} />
        </div>
      </div>
    );
  }
};

export default Dashboard;
