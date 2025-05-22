import React, { useEffect, useState } from "react";
import Nav from "../Nav";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const Stage3View = () => {
  const [stage3Data, setStage3Data] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getStage3Data = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-three-submissions/minimal/`
      );
      if (response?.data?.results) {
        setStage3Data(response.data.results);
      }
    } catch (error) {
      console.log("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage3Data();
  }, []);

  const handlePopup = async (studentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/stage-three-submissions/?student=${studentId}`
      );
      if (res?.data?.length > 0) {
        console.log("Student data:", res.data[0]);
        setSelectedStudentData(res.data[0]);
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
      const response = await axios.post(
        `${API_BASE_URL}/students/complete-stage/`,
        {
          stage: stage,
          student_id: studentId,
        }
      );
      if (response) {
        alert("User stage 3 approved");
      }
    } catch (error) {
      console.log("Failed to approve the user", error);
    }
    try {
      const patchRes = await axios.patch(
        `${API_BASE_URL}/stage-three-submissions/${submissionId}/`,
        {
          status: "completed",
        }
      );

      if (patchRes) {
        console.log("Stage 3 submission marked as completed");
        closePopup(); // Close the popup
        getStage3Data(); // Refresh the updated list
      }
    } catch (error) {
      console.error("Failed to update stage 3 submission status", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to decline the stage 3 of this user?"
      );
      if (!confirm) return;

      const response = await axios.delete(
        `${API_BASE_URL}/stage-three-submissions/${id}/`
      );
      if (response) {
        alert("User's stage 3 declined");
        getStage3Data();
      }
    } catch (error) {
      console.log("Failed to delete the user satge", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 p-5 mx-auto mt-5">
        <h2 className="text-center text-3xl font-bold">Stage 3 Submissions</h2>

        {stage3Data.length > 0 ? (
          <div className="grid grid-cols-5 gap-5">
            {stage3Data.map((data) => (
              <div
                key={data.id}
                onClick={() => handlePopup(data.student)}
                className="cursor-pointer bg-[#f1f1f1] p-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
              >
                <p className="text-center font-semibold text-2xl">
                  {data.student__first_name}
                </p>
                <p>Submitted Date: {data.submitted_at.split("T")[0]}</p>
                <p>Stage: Stage {data.stage}</p>
                {/* <p>Date of Birth: {data.date_of_birth}</p> */}
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available at the moment!!</p>
        )}
      </div>

      {/* Popup Modal */}
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
                if (value === null || value === "" || value === false)
                  return null;

                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

                let formattedValue = value;

                // Format date fields
                if (key === "submitted_at" || key === "date_of_birth") {
                  formattedValue = value.split("T")[0];
                }

                // Check if value is a PDF link
                const isPdf =
                  typeof value === "string" && value.endsWith(".pdf");
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
                        {fileName}
                      </a>
                    ) : (
                      <p>{formattedValue}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center gap-3 flex justify-center">
              {selectedStudentData.status == "pending" && (
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
              {/* <p>{selectedStudentData.student}</p> */}
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

export default Stage3View;
