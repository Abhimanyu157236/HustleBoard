import React from "react";
import DoughnutChart from "./DoughnutChart";

const TaskOverView = ({
  totalTasks,
  pending_tasks,
  urgent_task,
  completed_tasks,
}) => {
  return (
    <div className="w-[95%] mx-auto my-7 md:w-[37%] h-max bg-white/30 shadow-inner shadow-white  py-5 md:py-7 px-4 md:px-8 rounded-2xl ">
      <div className="w-[97%] mx-auto mb-5 border-b border-gray-600">
        <h1 className="text-lg mb-2 font-bold text-gray-700">
          📊 Tasks OverView
        </h1>
      </div>
      <DoughnutChart
        totalTasks={totalTasks}
        pending_tasks={pending_tasks}
        urgent_task={urgent_task}
        completed_tasks={completed_tasks}
      />
    </div>
  );
};

export default TaskOverView;
