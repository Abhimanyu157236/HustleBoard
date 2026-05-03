import React, { useContext } from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { taskContext } from "../context/Task.context";
import { useNavigate } from "react-router-dom";

const DoughnutChart = ({
  totalTasks,
  pending_tasks,
  urgent_task,
  completed_tasks,
}) => {
  const navigate = useNavigate();
  const dataArray = [completed_tasks, pending_tasks, urgent_task];
  const labels = ["Completed", "Pending", "Urgent"];
  const backgroundColor = ["bg-[#008000]", "bg-[#ff9505]", "bg-[#bf0603]"];

  if (totalTasks > 0) {
    return (
      <div className="w-[60%] h-56 flex md:gap-5">
        <Doughnut
          className="max-w-fit"
          data={{
            datasets: [
              {
                data: labels.map((label, index) => dataArray[index]),
                backgroundColor: ["#008000", "#ff9505", "#bf0603"],
                hoverBorderWidth: 2,
                cutout: "43%",
              },
            ],
          }}
        />

        <div className="w-[35%] my-3 md:my-auto">
          {labels.map((data, index) => (
            <div className="w-full  flex gap-2 my-5">
              <span
                className={`p-3 rounded-full ${backgroundColor[index]} `}
              ></span>
              <p>{data}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-56 flex flex-col items-center justify-center">
        <p className="text-center font-semibold text-md text-[#ff758f]">
          Dashboard is sleeping😴... Add some tasks to visualize them here
        </p>
        <img
          src="/icons8-add-button-64.png"
          alt="Add"
          className="mt-4 hover:scale-125 transition-transform duration-300"
          onClick={() => navigate("/taskform")}
        />
      </div>
    );
  }
};

export default DoughnutChart;
