import React, {useState, useEffect} from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageThreeStudentApplication({studentId, onClose}){
    const [studentStageThreeDetail, setStudentStageThreeDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudentStageThreeDetail = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${API_BASE_URL}/stage-three-submissions/?student=${studentId}`
            );
            setStudentStageThreeDetail(data);
        } catch (error) {
            console.error("Error fetching student stage two detail:", error);
            setStudentStageThreeDetail([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(studentId){
            fetchStudentStageThreeDetail();
        }
    }, [studentId]);

    const handleApprove = async (stage, submissionId) => {
        try {
          await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
            stage,
            student_id: studentId,
          });
          await axios.patch(
            `${API_BASE_URL}/stage-three-submissions/${submissionId}/`,
            { status: "completed" }
          );
          alert("Student's stage 3 approved!");
          fetchStudentStageThreeDetail();
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
                `${API_BASE_URL}/stage-three-submissions/${submissionId}/`
            );
            alert("Student's stage 3 declined.");
            fetchStudentStageThreeDetail();
        } catch (err) {
            console.error("Failed to decline:", err);
            alert("Could not decline. See console for details.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
                <p className="text-gray-500 text-sm">
                    Loading student's stage three details...
                </p>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full">
            <div className="bg-white shadow-md rounded-lg px-6 py-3 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                Stage Three Student Application
                </h2>

                {studentStageThreeDetail.length > 0 ? (
                    studentStageThreeDetail.map((detail) => (
                        <div
                        key={detail.id}
                        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
                        >

                            <div className="flex gap-3"><strong>Application ID:</strong> <span>{detail.id}</span></div>
                            <div className="flex gap-3"><strong>Stage No:</strong> <span>{detail.stage}</span></div>
                            <div className="flex gap-3"><strong>Student Name:</strong> <span>{detail.student_name} {detail.student_last_name}</span></div>
                            <div className="flex gap-3"><strong>Submission Date:</strong>{" "}<span>{new Date(detail.submitted_at).toLocaleDateString()}</span></div>
                            <div className="flex gap-3"><strong>Level: </strong><p>{detail.std_graduation}</p></div> <br />

                            <div className="flex gap-3"><strong>10 Transcript: </strong> <a href={detail.transcript_i} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>11 Transcript: </strong> <a href={detail.transcript_ii} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>12 Transcript: </strong> <a href={detail.transcript_iii} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Bachelors Transcript: </strong> 
                                {detail.bachelors_transcript ? ( 
                                    <a href={detail.bachelors_transcript} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a>
                                ): (
                                    <span>N/A</span>    
                                )}
                            </div>
                            <div className="flex gap-3"><strong>Provisional: </strong> <a href={detail.provisional} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Migration: </strong> <a href={detail.migration} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Character: </strong> <a href={detail.character} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>WES/IEE/NACES: </strong> {detail.wes_iee_naces ? (  <a href={detail.wes_iee_naces} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> ): ( <span>N/A</span> )} </div>
                            <div className="flex gap-3"><strong>LOR I: </strong> <a href={detail.lor_i} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>LOR II: </strong> <a href={detail.lor_ii} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>LOR III: </strong> <a href={detail.lor_iii} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>LOR IV: </strong> <a href={detail.lor_iv} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>English Test Score: </strong> <a href={detail.eng_test_score} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Standardize Test Score: </strong> <a href={detail.standardize_test_score} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Passport: </strong> <a href={detail.passport} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Personal Essay: </strong> <a href={detail.personal_essay} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div>
                            <div className="flex gap-3"><strong>Bank Balance: </strong> <a href={detail.bank_balance} target="_blank" className="text-blue-500 hover:underline hover:text-blue-600">View File</a> </div> <br />
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
    )
}
