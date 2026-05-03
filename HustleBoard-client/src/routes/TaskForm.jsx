import React, { useContext, useState } from "react";
import { taskContext } from "../context/Task.context";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskAdded, setTaskAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && desc && priority && tag && dueDate) {
      const res = await fetch(" http://10.175.74.225:5000/tasks/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          desc,
          priority,
          tag,
          dueDate,
          taskId: uuidv4(),
        }),
        method: "POST",
      }).then((res) => res.json());
      setToastMsg(res.message);

      setTaskAdded(true);
    } else {
      setErrorMsg(true);
    }
  };

  setTimeout(() => {
    setTaskAdded(false);
  }, 1200);

  setTimeout(() => {
    setErrorMsg(false);
  }, 1200);

  const handleReset = () => {
    setTitle("");
    setDesc("");
    setDueDate("");
  };

  return (
    <div className="w-[95%] md:w-[74%] h-max  bg-white/30 shadow-inner shadow-white rounded-2xl py-2 ">
      <div className="w-[95%] mx-auto flex items-center gap-4 p-2 border-b border-gray-400">
        <img src="/hustleboard_logo.png" alt="logo" className="w-10" />
        <h1 className="text-xl md:text-3xl text-[#ff537b]">
          <b>HustleBoard</b>
        </h1>
        <button
          className="text-white px-3 py-2 text-sm text-center bg-[#0bb208]/60 shadow-inner shadow-white font-bold rounded-lg mx-auto my-4 md:relative left-[25%]"
          onClick={() => navigate("/")}
        >
          ←Dashboard
        </button>
      </div>
      <div className="w-[95%] mx-auto my-7 md:w-[80%] h-max bg-white/40 shadow-inner shadow-white py-7 md:py-10 px-4 md:px-8 border rounded-2xl ">
        <h1 className="text-lg mb-2 font-bold text-gray-700">Add New Task</h1>
        {errorMsg && (
          <h1 className=" mx-auto mb-8 text-orange-600 font-bold">
            Task incomplete⚠️ - Fill all the fields to continue the hustle
          </h1>
        )}
        {taskAdded && (
          <h1 className=" mx-auto mb-8 text-green-600 font-bold">
            Task saved Successfully ✅
          </h1>
        )}
        <form>
          <input
            type="text"
            placeholder="Task Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none w-[95%] bg-white/30 border border-pink-600/60 p-3 mb-4 rounded-md"
          />

          <textarea
            type="text"
            rows={3}
            placeholder="Description"
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="outline-none w-[95%] bg-white/30 border border-pink-600/60 p-3 mb-4 rounded-md"
          />
          <br />
          <label
            htmlFor="Due-Date"
            className="text-md mb-8 font-semibold text-gray-700"
          >
            Due-Date
          </label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-[65%] md:w-[80%] outline-none bg-white/30 border border-pink-600/60 p-2 ml-4 mb-4 rounded-md"
          />
          <div className="w-full flex gap-1 items-center">
            <label
              htmlFor="priority"
              className="text-md mr-3 md:mr-8 font-semibold text-gray-700"
            >
              Priority
            </label>
            <select
              name="priority"
              required
              className="w-[40%] outline-none bg-white/30 border border-pink-600/60 p-2 rounded-md"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="set Priority">Set Priority</option>
              <option value={"Low"}>Low</option>
              <option value={"High"}>High</option>
              <option value={"Very High"}>Very High</option>
            </select>

            <select
              name="tags"
              required
              className="w-[40%] outline-none bg-white/30 border border-pink-600/60 p-2 rounded-md"
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="set Tags">Select Tags</option>
              <option value={"Work"}>Work</option>
              <option value={"Personal"}>Personal</option>
              <option value={"Urgent"}>Urgent</option>
              <option value={"Health"}>Health</option>
              <option value={"Gym"}>Gym</option>
            </select>
          </div>
          <button
            className="text-white px-4 py-2 text-sm text-center bg-[#27d4ff]/70 shadow-inner shadow-white font-bold rounded-lg mx-auto my-4 relative left-[65%] md:left-[80%]"
            onClick={handleSubmit}
          >
            Add Task
          </button>
          <button
            type="submit"
            className="text-white px-4 py-2 text-sm text-center bg-red-500/70 shadow-inner shadow-white font-bold rounded-lg mx-auto my-4 relative left-[7%] md:left-[60%]"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
