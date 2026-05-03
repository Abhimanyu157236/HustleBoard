import { createContext, useEffect, useState } from "react";

export const taskContext = createContext({
  task: [
    {
      id: "",
      title: "",
      desc: "",
      priority: "",
      tag: "",
      dueDate: "",
      completed: false,
      important: false,
    },
  ],
});

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState([""]);

  return (
    <taskContext.Provider
      value={{
        task,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};
