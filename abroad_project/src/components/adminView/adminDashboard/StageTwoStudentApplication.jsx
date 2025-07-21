import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageTwoStudentApplication({ studentId, onClose }) {
  const [studentStageTwoDetail, setStudentStageTwoDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentStageTwoDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/stage-two-submissions/?student=${studentId}`
      );
      setStudentStageTwoDetail(data);
    } catch (error) {
      console.error("Error fetching student stage two detail:", error);
      setStudentStageTwoDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentStageTwoDetail();
    }
  }, [studentId]);

  const handleApprove = async (stage, submissionId) => {
    try {
      await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
        stage,
        student_id: studentId,
      });
      await axios.patch(
        `${API_BASE_URL}/stage-two-submissions/${submissionId}/`,
        { status: "completed" }
      );
      alert("Student's stage 2 approved!");
      fetchStudentStageTwoDetail();
    } catch (err) {
      console.error("Failed to approve:", err);
      alert("Could not approve. See console for details.");
    }
  };

  const handleDecline = async (submissionId) => {
    if (!window.confirm("Are you sure you want to decline this submission?")) {
      return;
    }
    try {
      await axios.delete(
        `${API_BASE_URL}/stage-two-submissions/${submissionId}/`
      );
      alert("Student's stage 2 declined.");
      fetchStudentStageTwoDetail();
    } catch (err) {
      console.error("Failed to decline:", err);
      alert("Could not decline. See console for details.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
        <p className="text-gray-500 text-sm">
          Loading student's stage two details...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full">
      <div className="bg-white shadow-md rounded-lg px-6 py-3 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Stage Two Student Application
        </h2>

        {studentStageTwoDetail.length > 0 ? (
          studentStageTwoDetail.map((detail) => (
            <div
              key={detail.id}
              className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
            >
              <div className="flex gap-3">
                <strong>Application ID:</strong> <span>{detail.id}</span>
              </div>
              <div className="flex gap-3">
                <strong>Stage No:</strong> <span>{detail.stage}</span>
              </div>
              <div className="flex gap-3">
                <strong>Student Name:</strong> <span>{detail.name}</span>
              </div>
              <div className="flex gap-3">
                <strong>Submission Date:</strong>{" "}
                <span>
                  {new Date(detail.submitted_at).toLocaleDateString()}
                </span>
              </div>
                    <div className="flex gap-3"><strong>Gender: </strong><p>{detail.gender}</p></div>
                    <div className="flex gap-3"><strong>Marital Status: </strong><p>{detail.marital_status ? "Married" : "Single"}</p></div>
                    <div className="flex gap-3"><strong>Date of Birth: </strong><p>{new Date(detail.date_of_birth).toLocaleDateString()}</p></div>
                    <div className="flex gap-3"><strong>Address I: </strong><p>{detail.address_i}</p></div>
                    <div className="flex gap-3"><strong>Address II: </strong><p>{detail.address_ii}</p></div>
                    <div className="flex gap-3"><strong>City: </strong><p>{detail.city}</p></div>
                    <div className="flex gap-3"><strong>State: </strong><p>{detail.state}</p></div>
                    <div className="flex gap-3"><strong>Country: </strong><p>{detail.country}</p></div>
                    <div className="flex gap-3"><strong>Zip Code: </strong><p>{detail.zip_code}</p></div>
                    <div className="flex gap-3"><strong>Level: </strong><p>{detail.level}</p></div>
                    <div className="flex gap-3"><strong>Year Graduated: </strong><p>{detail.year_graduated}</p></div>
                    <div className="flex gap-3"><strong>Standardized Test: </strong><p>{detail.standardized_test}</p></div>
                    <div className="flex gap-3"><strong>SAT Verbal: </strong><p>{detail.sat_verbal}</p></div>
                    <div className="flex gap-3"><strong>SAT Quant: </strong><p>{detail.sat_quant}</p></div>
                    <div className="flex gap-3"><strong>GRE Verbal Reasoning: </strong><p>{detail.gre_verbal_reasoning || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>GRE Quant Reasoning: </strong><p>{detail.gre_quant_reasoning || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>GRE Analytical Writing: </strong><p>{detail.gre_analytical_writing || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>GMAT Quantitative: </strong><p>{detail.gmat_quantitative || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>GMAT Verbal: </strong><p>{detail.gmat_verbal || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>GMAT Data Insights: </strong><p>{detail.gmat_data_insights || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>English Test Type: </strong><p>{detail.english_test_type}</p></div>
                    <div className="flex gap-3"><strong>English Reading: </strong><p>{detail.english_reading}</p></div>
                    <div className="flex gap-3"><strong>English Writing: </strong><p>{detail.english_writing}</p></div>
                    <div className="flex gap-3"><strong>English Listening: </strong><p>{detail.english_listening}</p></div>
                    <div className="flex gap-3"><strong>English Speaking: </strong><p>{detail.english_speaking}</p></div>
                    <div className="flex gap-3"><strong>Major: </strong><p>{detail.major}</p></div>
                    <div className="flex gap-3"><strong>Special Note: </strong><p>{detail.special_note || "N/A"}</p></div>
                    <div className="flex gap-3"><strong>Status: </strong>
                        <span 
                            className={
                                detail.status === "pending"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }>
                            {detail.status}
                        </span>
                    </div>
                    {/* <div className="flex gap-3"><strong>Student ID: </strong><p>{detail.student}</p></div> */}
                    
                    <div className="col-span-full flex gap-2 mt-4">
                        {detail.status === "pending" && (
                        <>
                            <button
                            onClick={() =>
                                handleApprove(detail.stage, detail.id)
                            }
                            className="py-1 px-4 bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                            Approve
                            </button>
                            <button
                            onClick={() => handleDecline(detail.id)}
                            className="py-1 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                            Decline
                            </button>
                        </>
                        )}
                        <button
                        onClick={onClose}
                        className="py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                        Close
                        </button>
                    </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p>No submissions available.</p>
            <button
              onClick={onClose}
              className="mt-4 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}