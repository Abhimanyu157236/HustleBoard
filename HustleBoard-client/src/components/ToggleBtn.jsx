import { motion } from "framer-motion";
import { useState } from "react";

export default function ToggleBtn({ id, toggleComplete, completed }) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const toggleSwitch = (id) => {
    setIsCompleted(!isCompleted);
    toggleComplete(id);
  };

  return (
    <div className="flex items-center gap-3 px-10">
      <button
        className="toggle-container"
        style={{
          ...container,
          justifyContent: "flex-" + (isCompleted ? "end" : "start"),
        }}
        onClick={() => toggleSwitch(id, isCompleted)}
      >
        <motion.div
          className="toggle-handle"
          style={handle}
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
        />
      </button>
      <p
        className={`text-sm font-bold ${isCompleted ? " text-teal-500 " : " text-gray-400"}`}
      >
        {isCompleted ? "Completed" : "Mark as completed"}
      </p>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

const container = {
  width: 65,
  height: 25,
  backgroundColor: "#b7e4c7",
  borderRadius: 50,
  cursor: "pointer",
  display: "flex",
  padding: 5,
};

const handle = {
  width: 15,
  height: 15,
  backgroundColor: "#52b788",
  borderRadius: "50%",
};
