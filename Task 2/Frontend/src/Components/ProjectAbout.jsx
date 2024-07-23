import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectAbout = ({ projectId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/project/getProjectDetail/${projectId}`,
        { withCredentials: true }
      );
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
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          {status}
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Project Details</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" className="w-full border rounded p-2" disabled value={name}/>
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
          <input type="text" className="w-full border rounded p-2" disabled value={status} readOnly/>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Start Date</label>
          <input type="date" className="w-full border rounded p-2" value={startDate} readOnly/>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">End Date</label>
          <input type="date" className="w-full border rounded p-2" value={endDate} readOnly/>
        </div>
      </div>
    </>
  );
};

export default ProjectAbout;
