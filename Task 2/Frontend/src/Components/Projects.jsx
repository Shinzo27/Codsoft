import React from "react";
import Button from "./Shared/Button";

const Projects = () => {
  const projectDetails = [
    {
      ProjectName: "Dsms",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptas vitae nisi exercitationem architecto dignissimos.",
      StartDate: "22-06-24",
      EndDate: "25-06-24",
      Status: "In-progress"
    },
    {
      ProjectName: "Project Management Tool",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptas vitae nisi exercitationem architecto dignissimos.",
      StartDate: "22-06-24",
      EndDate: "25-06-24",
      Status: "Todo"
    },
    {
      ProjectName: "Chat-App",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptas vitae nisi exercitationem architecto dignissimos.",
      StartDate: "22-06-24",
      EndDate: "25-06-24",
      Status: "Finished"
    },
  ];
  return (
    <>
      <div className="pl-8 font-bold text-2xl">Projects</div>
      <div className="p-6 flex flex-col justify-center items-center flex-wrap gap-6">
        {projectDetails.map((project, index) => (
          <div
            className="w-full p-5 bg-white shadow-sm border-opacity-10 border border-black rounded-lg flex flex-col justify-between gap-5"
            key={index}
          >
            <div className="flex justify-between">
                <div>
                    <div className="font-bold text-2xl">{ project.ProjectName}</div>
                    <div className="font-medium text-md text-gray-400 ">
                        {project.Description}
                    </div>
                </div>
                <div>
                    <Button title={"View Project"} bgColor={"Black"} fontColor={"White"}/>
                </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div>Start Date</div>
                <div>{project.StartDate}</div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div>Start Date</div>
                <div>{project.EndDate}</div>
              </div>
              <div className="mt-3 p-1 rounded-md w-fit bg-gray-100">
                {project.Status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
