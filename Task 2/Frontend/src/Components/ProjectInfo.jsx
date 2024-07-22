import React from "react";

const ProjectInfo = () => {
  return (
    <>
      <div>
        <h2 className="pl-8 text-2xl font-bold">
            Project Details
        </h2>
      </div>
      <div className="p-6 flex flex-col lg:flex-row justify-around gap-6">
        {/* Tasks Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Tasks</h2>
          <p className="text-gray-400 mb-4">View and manage tasks</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Finalize project proposal</h3>
                <p className="text-gray-500">
                  Create final project proposal for client
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
                  In Progress
                </span>
                <span className="ml-4">June 30, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        {/* <div className="flex-1 bg-white p-6 rounded-xl shadow-sm"> */}
        {/* <h2 className="text-2xl font-bold mb-2">Users</h2> */}
        {/* <p className="text-gray-400 mb-4"></p> */}
        {/* <div className="calendar"> */}
        {/* You can use a calendar component here */}
        {/* Example: react-calendar */}

        {/* </div> */}
        {/* </div> */}

        {/* Project Overview Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Project List</h2>
          <p className="text-gray-400 mb-4">current projects</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Project Completion</span>
              <span className="font-bold text-2xl">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Budget Spent</span>
              <span className="font-bold text-2xl">$124k</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Milestones Achieved</span>
              <span className="font-bold text-2xl">12</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
