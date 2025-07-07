import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage2View = () => {
  const [stage2Data, setStage2Data] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [graduationFilter, setGraduationFilter] = useState("");

  const buildUrl = (baseUrl, filter) => {
    if (filter) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}std_graduation=${filter}`;
    }
    return baseUrl;
  };

  const getStage2Data = async (url = `${API_BASE_URL}/stage-two-submissions-minimal/`) => {
    try {
      const response = await axios.get(url);
      if (response?.data) {
        const { results, next, previous, count } = response.data;
        setStage2Data(results);
        setNextPage(next);
        setPrevPage(previous);
        setCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    const url = buildUrl(
      `${API_BASE_URL}/stage-two-submissions-minimal/`,
      graduationFilter
    );
    getStage2Data(url);
  }, [graduationFilter]);

  const handlePopup = async (studentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/stage-two-submissions/?student=${studentId}`
      );
      if (res?.data?.length > 0) {
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
      await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
        stage: stage,
        student_id: studentId,
      });
      alert("User stage2 approved");
    } catch (error) {
      console.error("Failed to approve the user", error);
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/stage-two-submissions/${submissionId}/`,
        { status: "completed" }
      );
      console.log("Stage 2 submission marked as completed");
      closePopup();
      const url = buildUrl(
        `${API_BASE_URL}/stage-two-submissions-minimal/`,
        graduationFilter
      );
      getStage2Data(url);
    } catch (error) {
      console.error("Failed to update stage 2 submission status", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const confirmDecline = window.confirm(
        "Are you sure you want to decline the stage 2 of this user?"
      );
      if (!confirmDecline) return;

      await axios.delete(
        `${API_BASE_URL}/stage-two-submissions/${id}/`
      );
      alert("User's stage 2 declined");
      const url = buildUrl(
        `${API_BASE_URL}/stage-two-submissions-minimal/`,
        graduationFilter
      );
      getStage2Data(url);
    } catch (error) {
      console.error("Failed to delete the user stage", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 p-5 mx-auto mt-5">
        <h2 className="text-center text-3xl font-bold">
          Stage 2 Submissions
        </h2>
        <div className="w-full flex mt-5 gap-5 justify-center px-6">
          <button
            onClick={() => setGraduationFilter("undergraduate")}
            className={`rounded-lg p-2 text-xl font-semibold w-1/2 ${
              graduationFilter === "undergraduate"
                ? "bg-blue-500 text-white"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
          >
            Undergraduate
          </button>
          <button
            onClick={() => setGraduationFilter("graduate")}
            className={`rounded-lg p-2 text-xl font-semibold w-1/2 ${
              graduationFilter === "graduate"
                ? "bg-blue-500 text-white"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
          >
            Graduate
          </button>
        </div>

        {stage2Data.length > 0 ? (
          <>
            <div className="grid grid-cols-5 gap-5 mt-10">
              {stage2Data.map((data) => (
                <div
                  key={data.id}
                  onClick={() => handlePopup(data.student)}
                  className="cursor-pointer bg-[#f1f1f1] p-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
                >
                  <p className="text-center font-semibold text-2xl">
                    {data.name}
                  </p>
                  <p>Submitted Date: {data.submitted_at.split("T")[0]}</p>
                  <p>Stage: Stage {data.stage}</p>
                  <p>Date of Birth: {data.date_of_birth}</p>
                  <p>Status: {data.status}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => prevPage && getStage2Data(prevPage)}
                disabled={!prevPage}
                className={`px-4 py-2 rounded bg-blue-500 text-white ${
                  !prevPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Previous
              </button>

              <p className="text-lg">Total Submissions: {count}</p>

              <button
                onClick={() => nextPage && getStage2Data(nextPage)}
                disabled={!nextPage}
                className={`px-4 py-2 rounded bg-blue-500 text-white ${
                  !nextPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No data available at the moment!!</p>
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
              {selectedStudentData.name}'s Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedStudentData).map(([key, value]) => {
                if (value === null || value === "" || value === false)
                  return null;

                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

                const formattedValue =
                  key === "submitted_at" || key === "date_of_birth"
                    ? value.split("T")[0]
                    : value;

                return (
                  <div key={key}>
                    <p className="font-semibold">{formattedKey}</p>
                    <p>{formattedValue}</p>
                  </div>
                );
              })}
            </div>
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

export default Stage2View;
