import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage4View = () => {
  const [stage4Data, setStage4Data] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getStage4Data = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-four-submissions/`);
      if (response?.data?.results) {
        setStage4Data(response.data.results);
      }
    } catch (error) {
      console.log("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage4Data();
  }, []);

  const handlePopup = async (studentId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stage-four-submissions/?student=${studentId}`);
      if (res?.data?.results?.length > 0) {
        setSelectedStudentData(res.data.results[0]);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Failed to fetch student details", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudentData(null);
  };

  const handleApprove = async (studentId, stage, submissionId) => {
    try {
      await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
        stage: stage,
        student_id: studentId,
      });
      alert("User stage 4 approved");

      await axios.patch(`${API_BASE_URL}/stage-four-submissions/${submissionId}/`, {
        status: "completed",
      });

      closePopup();
      getStage4Data();
    } catch (error) {
      console.log("Failed to approve or update status", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to decline stage 4?");
      if (!confirm) return;

      await axios.delete(`${API_BASE_URL}/stage-four-submissions/${id}/`);
      alert("Stage 4 declined");
      closePopup();
      getStage4Data();
    } catch (error) {
      console.log("Failed to delete the stage 4 submission", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 p-5 mx-auto mt-5">
        <h2 className="text-center text-3xl font-bold">Stage 4 Submissions</h2>

        {stage4Data.length > 0 ? (
          <div className="grid grid-cols-5 gap-5 mt-6">
            {stage4Data.map((data) => (
              <div
                key={data.id}
                onClick={() => handlePopup(data.student)}
                className="cursor-pointer bg-[#f1f1f1] p-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
              >
                <p className="text-center font-semibold text-2xl">{data.student_name}</p>
                <p>Submitted Date: {data.submitted_at?.split("T")[0]}</p>
                <p>Stage: Stage {data.stage}</p>
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-600">No data available at the moment!</p>
        )}
      </div>

      {showPopup && selectedStudentData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              {selectedStudentData.student_name}'s Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedStudentData).map(([key, value]) => {
                if (value === null || value === "" || key === "eca_data") return null;

                const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
                let formattedValue = value;

                if (key === "submitted_at") {
                  formattedValue = value.split("T")[0];
                }

                const isPdf = typeof value === "string" && value.endsWith(".pdf");
                const fileName = isPdf ? value.split("/").pop() : null;

                return (
                  <div key={key}>
                    <p className="font-semibold">{formattedKey}</p>
                    {isPdf ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {/* {fileName} */}
                        View Resume File
                      </a>
                    ) : (
                      <p>{formattedValue}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ECA Data Display */}
            {selectedStudentData.eca_data?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-bold mb-2">ECA Details</h4>
                {selectedStudentData.eca_data.map((eca, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-300 rounded-lg mb-3 bg-gray-50"
                  >
                    {Object.entries(eca).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-semibold capitalize">{key.replace(/_/g, " ")}:</span>{" "}
                        {value}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 text-center gap-3 flex justify-center">
              {selectedStudentData.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleApprove(
                        selectedStudentData.student,
                        selectedStudentData.stage,
                        selectedStudentData.id
                      )
                    }
                    className="px-3 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(selectedStudentData.id)}
                    className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
                  >
                    Decline
                  </button>
                </>
              )}
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stage4View;
