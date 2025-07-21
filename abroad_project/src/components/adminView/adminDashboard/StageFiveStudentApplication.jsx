import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageFiveStudentApplication({ studentId, onClose }) {
  const [studentStageFiveDetail, setStudentStageFiveDetail] = useState(null);
  const [uniDetailOpenMap, setUniDetailOpenMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStudentStageFiveDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/stage-five-submissions/?student=${studentId}`
      );
      setStudentStageFiveDetail(data.results);
    } catch (error) {
      console.error("Error fetching student stage five detail:", error);
      setStudentStageFiveDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentStageFiveDetail();
    }
  }, [studentId]);

  const handleApprove = async (stage, submissionId) => {
    try {
      await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
        stage,
        student_id: studentId,
      });
      await axios.patch(
        `${API_BASE_URL}/stage-five-submissions/${submissionId}/`,
        { status: "completed" }
      );
      alert("Student's stage 5 approved!");
      fetchStudentStageFiveDetail();
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
            `${API_BASE_URL}/stage-five-submissions/${submissionId}/`
        );
        alert("Student's stage 5 declined.");
        fetchStudentStageFiveDetail();
    } catch (err) {
        console.error("Failed to decline:", err);
        alert("Could not decline. See console for details.");
    }
};



if (loading) {
    return (
        <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
            <p className="text-gray-500 text-sm">
            Loading student's stage five details...
            </p>
        </div>
    );
}

  return(
        <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full">
            <div className="bg-white shadow-md rounded-lg px-6 py-3 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Stage Five Student Application
                </h2>

                {studentStageFiveDetail.length > 0 ? (
                studentStageFiveDetail.map((detail) => (

                    <div
                    key={detail.id}
                    className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
                    >
                        <div className="flex gap-3"><strong>Application ID:</strong> <span>{detail.id}</span> </div>
                        <div className="flex gap-3"><strong>Stage No:</strong> <span>{detail.stage}</span></div>
                        <div className="flex gap-3"><strong>Student Name:</strong> <span>{detail.student_name} {detail.student_last_name}</span></div>
                        <div className="flex gap-3"><strong>Submission Date:</strong>{" "}<span>{new Date(detail.submitted_at).toLocaleDateString()}</span></div>
                        <div className="flex gap-3"><strong>Level: </strong><p>{detail.std_graduation}</p></div>
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

                        <div className="bg-gray-200 col-span-2 p-2 rounded-lg">
                        <span className="text-xl font-bold mb-3">Extracurricular Activities Detail:</span>
                        {detail.entries.map((uni_detail, i) => (
                            <div key={uni_detail.i}>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-white p-2 rounded-lg mt-2 flex items-center cursor-pointer"
                                    onClick={() =>
                                        setUniDetailOpenMap((prev) => ({
                                          ...prev,
                                          [i]: !prev[i],
                                        }))
                                      }>
                                        <strong>University {i+1}: </strong><span className="ml-1.5"> {uni_detail.university_name}</span><br/>
                                        {uniDetailOpenMap[i] ? (
                                            <MdOutlineExpandLess className="ml-auto text-4xl" />
                                        ) : (
                                            <MdOutlineExpandMore className="ml-auto text-4xl" />
                                        )}
                                    </div>

                                    {uniDetailOpenMap[i] && (
                                        <div className="grid grid-cols-2">
                                            <div><strong>University Name: </strong> <span>{uni_detail.university_name}</span></div>
                                            <div><strong>Early Decision: </strong> <span>{uni_detail.early_decision}</span></div>
                                            <div><strong>Early Action: </strong> <span>{uni_detail.early_action}</span></div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}
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