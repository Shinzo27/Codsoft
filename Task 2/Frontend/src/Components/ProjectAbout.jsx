import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";

const ProjectAbout = ({ projectId }) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/getProjectDetail/${projectId}`,
        { withCredentials: true }
      );
      const response = await axios.get(
        `http://localhost:8000/api/v1/project/getUsersRole/${projectId}`,
        { withCredentials: true }
      );
      setRole(response.data.role);
      setName(data.projectDetails[0].title);
      setDescription(data.projectDetails[0].description);
      setStatus(data.projectDetails[0].status);
      setStartDate(data.projectDetails[0].startDate);
      setEndDate(data.projectDetails[0].deadline);
    };
    fetchDetails();
  }, []);

  return (
    <>
      <div className="flex justify-around items-center mb-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex justify-center items-center gap-5">
          <button className="bg-black text-white px-4 py-2 rounded-lg" disabled>
            {status}
          </button>
          {
            role === 'Product Manager' ? (
              <>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Add User
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Add Task
              </button>
              </>
            ) : null
          }
          
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Project Details</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            disabled
            value={name}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Project Description"
            value={description}
            readOnly
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            disabled
            value={status}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={startDate}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">End Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={endDate}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default ProjectAbout;
