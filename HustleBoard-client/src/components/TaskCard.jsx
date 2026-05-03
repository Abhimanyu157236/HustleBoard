import React from "react";
import { useNavigate } from "react-router-dom";
import { taskContext } from "../context/Task.context";
import { Clock, FilePenLine, Trash, Save } from "lucide-react";
import ToggleBtn from "./ToggleBtn";

const TaskCard = ({
  title,
  taskId,
  tag,
  decription,
  completed,
  priority,
  duedate,
  handleDelete,
  handleUpdate,
  toggleComplete,
}) => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const handleSave = (taskId, newTitle, newDescription, completed) => {
    handleUpdate(taskId, newTitle, newDescription, completed);
    setIsEditable(false);
  };

  return (
    <div className="w-[95%] md:w-[30%]  bg-white/30 shadow-inner shadow-white rounded-2xl py-5 ">
      <div className="w-full flex items-center justify-evenly pb-3 px-3">
        <input
          value={isEditable ? newTitle : title}
          placeholder="New title"
          onChange={(e) => isEditable && setNewTitle(e.target.value)}
          readOnly={!isEditable}
          className={`text-xl p-2 font-extrabold text-[#454545] mb-2 outline-none bg-transparent w-[95%] mx-2`}
        />

        <div className="flex gap-2">
          {isEditable ? (
            <button
              className={`bg-yellow-500 text-white px-3 py-2 rounded-xl text-sm flex gap-2 items-center shadow-lg`}
              onClick={() =>
                handleSave(taskId, newTitle, newDescription, completed)
              }
            >
              <Save size={16} />
            </button>
          ) : (
            <button
              className={`bg-[#1b5eef] text-white px-3 py-2 rounded-xl text-sm flex gap-2 items-center shadow-lg`}
              onClick={() => setIsEditable(true)}
            >
              <FilePenLine size={16} />
            </button>
          )}
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-xl shadow-lg text-sm flex gap-2 items-center"
            onClick={() => handleDelete(taskId)}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <span className="flex gap-2 items-center px-10 mb-4 ">
        <Clock
          size={28}
          color="#ffffff "
          className="bg-[#34a7bc] rounded-full p-1.5"
        />{" "}
        <p className="text-sm text-gray-600">
          {duedate
            ? new Date(duedate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No Due Date"}
        </p>
      </span>
      <span className="flex gap-2 items-center px-10 mb-4">
        <p className="text-sm font-bold text-gray-600">Priority:</p>
        <p className="text-sm">{priority}</p>
      </span>
      <span className="flex gap-2 items-center px-10 mb-4">
        <p className="text-sm font-bold text-gray-600">Tag:</p>
        <p className="text-sm">{tag}</p>
      </span>
      <textarea
        value={isEditable ? newDescription : decription}
        rows={4}
        placeholder="New Decription"
        onChange={(e) => isEditable && setNewDescription(e.target.value)}
        readOnly={!isEditable}
        className={`text-sm w-[80%] mx-10 mb-2 p-3 rounded-lg outline-none bg-transparent border border-gray-400 `}
      />
      <ToggleBtn
        toggleComplete={toggleComplete}
        id={taskId}
        completed={completed}
      />
    </div>
  );
};

export default TaskCard;
