import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage1View = () => {
  const [stage1Data, setStage1Data] = useState([]);

  // Fetch all Stage-1 submissions
  const getStage1Data = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-one-submissions/`
      );
      if (response?.data) {
        // Assume response.data is a list of objects like:
        // { id, student, student_name, stage, status, ... }
        setStage1Data(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage1Data();
  }, []);

  // Approve handler: calls complete‐stage, then patches the submission to “completed”
  const handleApprove = async (studentId, stage, submissionId) => {
    try {
      // 1) Notify backend that student has completed this stage
      const response = await axios.post(
        `${API_BASE_URL}/students/complete-stage/`,
        {
          stage: stage,
          student_id: studentId,
        }
        
      );
      if (response.status === 200) {
        // 2) Patch the submission’s status to “completed”
        await axios.patch(
          `${API_BASE_URL}/stage-one-submissions/${submissionId}/`,
          {
            status: "completed",
          }
        );

        alert("User's stage 1 successfully approved!");
        // 3) Refresh the list so the row’s status updates
        getStage1Data();
      }
    } catch (error) {
      console.log("Failed to approve the user", error);
    }
  };

  // Decline handler: deletes the submission
  const handleDecline = async (submissionId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to decline this Stage-1 submission?"
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${API_BASE_URL}/stage-one-submissions/${submissionId}/`
      );
      if (response.status === 204 || response.status === 200) {
        alert("User’s Stage-1 submission declined.");
        getStage1Data();
      }
    } catch (error) {
      console.log("Failed to delete the submission", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-[94%] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Stage 1 Submissions
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {stage1Data.length > 0 ? (
              stage1Data.map((data, index) => (
                <tr
                  key={data.id}
                  className="odd:bg-gray-50 bg-white hover:bg-gray-100 text-gray-900"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{data.student_name}</td>
                  <td className="px-4 py-4 capitalize">
                    {data.status || "pending"}
                  </td>
                  <td className="px-4 py-4">
                    {data.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleApprove(
                              data.student,
                              data.stage,
                              data.id
                            )
                          }
                          className="px-3 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecline(data.id)}
                          className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="italic text-gray-600">
                        {data.status.charAt(0).toUpperCase() +
                          data.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-gray-600"
                >
                  No data available at the moment!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stage1View;
