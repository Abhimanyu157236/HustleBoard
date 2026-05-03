import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { use } from "react";

const Tasklist = () => {
  const [task, setTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const tagsArray = ["Work", "Personal", "Urgent", "Health", "Gym"];
  const priorityArray = ["Low", "High", "Very High"];
  const user = localStorage.getItem("name");

  const fetchTask = async () => {
    const res = await fetch(" https://hustleboard-tv3y.onrender.com/tasks/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
    setTask(res.task);
  };

  useEffect(() => {
    fetchTask();
  }, [task]);

  const handleDelete = async (id) => {
    alert("Are you sure you want to delete this task?");
    const res = await fetch(` https://hustleboard-tv3y.onrender.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
    setTask((prev) => prev.filter((task) => task.taskId !== id));
    if (res.message != "Task removed successfully") {
      alert("Failed to remove task");
    }
  };

  const handleUpdate = async (id, newTitle, newDescription, completed) => {
    const res = await fetch(` https://hustleboard-tv3y.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({newTitle, newDescription, completed: task.completed}),
    }).then((res) => res.json());
    setTask((prev) => prev.map((task) => (task.taskId === id ? res.task : task)));
    if (res.message != "Task Updated successfully") {
      alert("Failed to update task");
      console.log(res.message);
    }
  };

  const toggleComplete = async (id) => {
    const res = await fetch(` https://hustleboard-tv3y.onrender.com/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        isCompleted: !task.completed,
      }),
    }).then((res) => res.json());
    setTask((prev) => prev.map((task) => (task.taskId === id ? res.task : task)));
  };

  const applyFilter = (filter) => {
    if (task.length > 0) {
      const newTask = task.filter((task) => {
        const taskDate = task.dueDate ? task.dueDate.split("T")[0] : "";
        return (
          task.tag === filter || task.priority === filter || taskDate === filter
        );
      });
      setFilteredTask(newTask);
    }
  };

  useEffect(() => {
    applyFilter(filter);
  }, [filter]);

  return (
    <div className="w-[95%] md:w-[96%] h-[94vh] bg-white/30 shadow-inner shadow-white rounded-2xl py-2 ">
      <section className="pt-5 px-4 md:px-10 md:flex justify-between">
        <span className=" md:w-[30%] flex items-center gap-4">
          <img src="/hustleboard_logo.png" alt="logo" className="w-10" />
          <h1 className="text-lg md:text-2xl text-[#ff537b]">
            <b>{user.charAt(0).toUpperCase() + user.slice(1)}'s</b> Tasks
          </h1>
        </span>
      </section>
      <div className="w-full flex gap-2 flex-wrap justify-center mt-6">
        <div className="bg-white/50 shadow-inner shadow-white rounded-2xl w-[96%] mx-auto md:w-[50%] flex">
          <button
            className={`w-1/4 py-3 text-xs md:text-sm text-gray-600 font-bold rounded-2xl ${filter === "All" ? "bg-pink-500/50 shadow-inner shadow-white text-white" : ""}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          {tagsArray.map((tag, index) => (
            <button
              key={index}
              className={`w-1/4 text-xs md:text-sm text-gray-600 font-bold rounded-2xl ${filter === tag ? "bg-pink-500/50 shadow-inner shadow-white text-white" : ""}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <select
          className="w-[47%] md:w-1/5 outline-none bg-white border border-pink-500/60 px-3 py-1 rounded-xl shadow-lg"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="" className="text-center">
            {" "}
            priority
          </option>
          {priorityArray.map((priority, index) => (
            <option key={index} className="text-center" value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <div className=" w-[47%] md:w-1/5 flex items-center gap-3 outline-none bg-white border border-pink-500/60 px-3 py-1 rounded-xl shadow-lg md:mr-12">
          <label className="text-xs text-gray-600">Due Date</label>
          <input
            type="date"
            className="outline-none w-[70%]"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full h-[55%] md:h-[63%] overflow-y-scroll flex gap-3 flex-wrap justify-center items-center mt-12 pb-3">
        {task.length === 0  ? (
          <h1 className="text-red-500 font-bold text-lg">
            No Task Added Yet - Start Hustling! 🚀
          </h1>
        )
           : filter === "All"
            ?task?.map((item, index) => (
              <TaskCard
                key={index}
                title={item?.title}
                taskId={item?.taskId}
                tag={item?.tag}
                decription={item?.decription}
                priority={item?.priority}
                duedate={item?.dueDate}
                completed={item?.completed}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                toggleComplete={toggleComplete}
              />
            ))
          : filteredTask.map((item, index) => (
              <TaskCard
                key={index}
                title={item?.title}
                taskId={item.taskId}
                tag={item?.tag}
                decription={item?.decription}
                priority={item?.priority}
                duedate={item?.dueDate}
                completed={item?.completed}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                toggleComplete={toggleComplete}
              />
            ))}
      </div>
    </div>
  );
};

export default Tasklist;
