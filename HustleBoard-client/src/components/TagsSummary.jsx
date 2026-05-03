import React from "react";

const TagsSummary = ({ task }) => {
  const tags = ["Work", "personal", "Urgent", "Health", "Gym"];
  const urgent_task = task.filter((item) => item.tag === "Urgent").length;
  const work_task = task.filter((item) => item.tag === "Work").length;
  const personal_task = task.filter((item) => item.tag === "Personal").length;
  const health_task = task.filter((item) => item.tag === "Health").length;
  const important_task = task.filter((item) => item.important === true).length;
  const gym_task = task.filter((item) => item.tag === "Gym").length;
  const number = [
    work_task,
    personal_task,
    urgent_task,
    health_task,
    important_task,
    gym_task,
  ];
  const backgroundColor = [
    "bg-[#f72585]/70",
    "bg-[#5a189a]/70",
    "bg-[#ff9505]/70",
    "bg-[#415a77]/70",
    "bg-[#9c6644]/70",
  ];
  return (
    <div className="w-[95%] mx-auto my-7 md:w-[58%] h-max  bg-white/30 shadow-inner shadow-white py-5 md:py-7 px-4 md:px-8 border border-white rounded-2xl ">
      <div className="w-[97%] mx-auto mb-5 border-b border-gray-600">
        <h1 className="text-lg mb-2 font-bold text-gray-700">Tags Summary</h1>
      </div>
      <div className="w-full md:w-[85%] py-6 mx-auto flex flex-wrap gap-3">
        {tags.map((tagItem, index) => (
          <div
            key={index}
            className={`w-[45%] flex gap-3 justify-center rounded-lg py-3 text-white ${backgroundColor[index]} shadow-inner shadow-white`}
          >
            <p>{tagItem} - </p>
            <p>{number[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsSummary;
