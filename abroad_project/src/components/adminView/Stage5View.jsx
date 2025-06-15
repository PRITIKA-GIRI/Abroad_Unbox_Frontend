import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage5View = () => {
  const [stage5Data, setStage5Data] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getStage5Data = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-five-submissions/`);
      setStage5Data(response.data.results || []);
    } catch (error) {
      console.error("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage5Data();
  }, []);

  const handlePopup = async (studentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/stage-five-submissions/?student=${studentId}`
      );
      if (res.data.results?.length) {
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
        stage,
        student_id: studentId,
      });
      await axios.patch(
        `${API_BASE_URL}/stage-five-submissions/${submissionId}/`,
        { status: "completed" }
      );
      alert("User stage 5 approved");
      closePopup();
      getStage5Data();
    } catch (error) {
      console.error("Failed to approve or update status", error);
    }
  };

  const handleDecline = async (submissionId) => {
    if (!window.confirm("Are you sure you want to decline stage 5?")) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/stage-five-submissions/${submissionId}/`
      );
      alert("Stage 5 declined");
      closePopup();
      getStage5Data();
    } catch (error) {
      console.error("Failed to delete the stage 5 submission", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 p-5 mx-auto mt-5">
        <h2 className="text-center text-3xl font-bold">Stage 5 Submissions</h2>

        {stage5Data.length > 0 ? (
          <div className="grid grid-cols-5 gap-5 mt-6">
            {stage5Data.map((data) => (
              <div
                key={data.id}
                onClick={() => handlePopup(data.student)}
                className="cursor-pointer bg-[#f1f1f1] p-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
              >
                <p className="text-center font-semibold text-2xl">
                  {data.student_name}
                </p>
                <p>Submitted Date: {data.submitted_at.split("T")[0]}</p>
                <p>Stage: Stage {data.stage}</p>
                <p>Status: {data.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-600">
            No data available at the moment!
          </p>
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
              {selectedStudentData.student_name}'s University Details
            </h3>

            {/* Top-level fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(selectedStudentData)
                .filter(
                  ([key, val]) =>
                    !["entries", "eca_data", "student", "id"].includes(key) &&
                    val != null &&
                    val !== ""
                )
                .map(([key, value]) => {
                  const label = key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  let display = value;
                  if (key === "submitted_at") {
                    display = value.split("T")[0];
                  }
                  return (
                    <div key={key}>
                      <p className="font-semibold">{label}:</p>
                      <p>{display}</p>
                    </div>
                  );
                })}
            </div>

            {/* entries JSONField */}
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">University Entries</h4>
              {selectedStudentData.entries.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-gray-300 rounded-lg mb-3 bg-gray-50"
                >
                  <p className="font-semibold mb-2">Entry #{idx + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(entry).map(([k, v]) => (
                      <div key={k}>
                        <span className="font-semibold">
                          {k
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                          :
                        </span>{" "}
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 text-center flex justify-center gap-3">
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
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
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

export default Stage5View;
