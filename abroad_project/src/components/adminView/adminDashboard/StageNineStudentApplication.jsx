import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageNineStudentApplication({ studentId, onClose }){
  const [studentStageNineDetail, setStudentStageNineDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentStageNinetDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/stage-nine-submissions/?student=${studentId}`
      );
      setStudentStageNineDetail(data.results);
    } catch (error) {
      console.error("Error fetching student stage eight detail:", error);
      setStudentStageNineDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (studentId) {
        fetchStudentStageNinetDetail();
      }
    }, [studentId]);

    const handleApprove = async (stage, submissionId) => {
        try {
            await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
                stage: '9',
                student_id: studentId,
            });
            await axios.patch(
                `${API_BASE_URL}/stage-nine-submissions/${submissionId}/`,
                { status: "completed" }
            );
            alert("Student's stage 9 approved!");
            fetchStudentStageNinetDetail(); 
        } catch (err) {
            console.error("Failed to approve:", err);
            alert("Could not approve.");
        }
    };
    
    const handleDecline = async (submissionId) => {
        if (!window.confirm("Are you sure you want to decline this submission?")) {
            return;
        }
        try {
            await axios.delete(
                `${API_BASE_URL}/stage-nine-submissions/${submissionId}/`
            );
            alert("Student's stage 9 declined.");
            fetchStudentStageNinetDetail();
        } catch (err) {
            console.error("Failed to decline:", err);
            alert("Could not decline.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
                <p className="text-gray-500 text-sm">
                    Loading student's stage nine details...
                </p>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full">
            <div className="bg-white shadow-md rounded-lg px-6 py-3 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Stage Nine Student Application
                </h2>

                {studentStageNineDetail.length > 0 ? (
                    studentStageNineDetail.map((detail) => (
                        <div
                        key={detail.id}
                        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
                        >
                            <div className="flex gap-3"><strong>Application ID:</strong> <span>{detail.id}</span> </div>
                            <div className="flex gap-3"><strong>Stage No:</strong> <span>{detail.stage}</span></div>
                            <div className="flex gap-3"><strong>Student Name:</strong> <span>{detail.student_name} {detail.student_last_name}</span></div>
                            <div className="flex gap-3"><strong>Submission Date:</strong>{" "}<span>{new Date(detail.submitted_at).toLocaleDateString()}</span></div>
                            <div className="flex gap-3"><strong>Level: </strong><p>{detail.std_graduation}</p></div>
                            <div className="flex gap-3"><strong>Payment Status: </strong><p>{detail.payment_status}</p></div>
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

                            <div className="col-span-full flex gap-2 mt-4">
                                {detail.status === "pending" && (
                                <>
                                    <button
                                    onClick={() => handleApprove(detail.stage, detail.id)}
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
    )
}