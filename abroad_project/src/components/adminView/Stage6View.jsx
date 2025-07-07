import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage6View = () => {
  const [stage6Data, setStage6Data] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [essayDetails, setEssayDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // console.log(essayDetails);

  // Fetch all stage 6 submissions
  const getStage6Data = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-six-submissions/`
      );
      setStage6Data(response.data.results || response.data);
    } catch (error) {
      console.error("Failed to fetch Stage 6 submissions:", error);
    }
  };

  useEffect(() => {
    getStage6Data();
  }, []);

  // Open popup for specific student
  const handlePopup = async (studentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/stage-six-submissions/?student=${studentId}`
      );
      if (res.data.results?.length) {
        const submission = res.data.results[0];
        setSelectedStudentData(submission);

        // Fetch essay details for that student
        const essaysRes = await axios.get(
          `${API_BASE_URL}/student-university-essay-details/?student=${studentId}`
        );
        setEssayDetails(essaysRes.data);

        setShowPopup(true);
      }
    } catch (error) {
      console.error("Failed to fetch student details:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudentData(null);
    setEssayDetails([]);
  };

  const handleApprove = async (studentId, stage, submissionId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/students/complete-stage/`,
        { stage, student_id: studentId }
      );
      await axios.patch(
        `${API_BASE_URL}/stage-six-submissions/${submissionId}/`,
        { status: "completed" }
      );
      alert("Stage 6 approved");
      closePopup();
      getStage6Data();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleDecline = async (submissionId) => {
    if (!window.confirm("Are you sure you want to decline this submission?")) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/stage-six-submissions/${submissionId}/`
      );
      alert("Stage 6 declined");
      closePopup();
      getStage6Data();
    } catch (error) {
      console.error("Decline failed:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Stage 6 Submissions
        </h1>
        {stage6Data.length ? (
          <div className="grid grid-cols-5 gap-4">
            {stage6Data.map((data) => (
              <div
                key={data.id}
                onClick={() => handlePopup(data.student)}
                className="p-4 bg-gray-100 rounded-lg shadow hover:scale-105 transition"
              >
                <h2 className="text-xl font-semibold text-center">
                  {data.student_name}
                </h2>
                <p>Submitted: {data.submitted_at.split("T")[0]}</p>
                <p>Stage: {data.stage}</p>
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No submissions yet.</p>
        )}
      </div>

      {showPopup && selectedStudentData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedStudentData.student_name}'s Submission Details
            </h2>

            {/* Basic fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(selectedStudentData)
                .filter(([k, v]) =>
                  !["id", "student", "applied_university_info"].includes(k) &&
                  v && typeof v !== "object"
                )
                .map(([key, val]) => (
                  <div key={key}>
                    <span className="font-semibold capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>{" "}
                    <span>
                      {key === "submitted_at" ? val.split("T")[0] : val}
                    </span>
                  </div>
                ))}
            </div>

            {/* Essay Details */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Essay Details</h3>
              {essayDetails.length ? (
                <ul className="list-disc list-inside space-y-1">
                  {essayDetails.map((essay) => (
                    <li key={essay.id}>
                      <span className="font-medium">{essay.university_name}</span> - {essay.title}: <a
                        href={essay.essay_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >View File</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No essays submitted for this student.</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(selectedStudentData.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Decline
                  </button>
                </>
              )}
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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

export default Stage6View;

