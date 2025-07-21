// import React, {useEffect, useState} from "react";
// import { useParams } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// export default function StageOneStudentApplication({ onClose }) {
//     const { id } = useParams();
//     const [studentStageOneDetail, setStudentStageOneDetail] = useState(null);
//     console.log(studentStageOneDetail);

//     useEffect(() => {
//         const fetchStudentStageOneDetail = async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/stage-one-submissions/?student=${id}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 } 
//                 const data = await response.json();
//                 setStudentStageOneDetail(data);
//             } catch (error) {
//                 console.error('Error fetching student stage one detail:', error);
//             }
//         }
//         fetchStudentStageOneDetail();
//     }, [id]);
  
//   const handleApprove = async (studentId, stage, submissionId) => {
//       try {
//         // 1) Notify backend that student has completed this stage
//         const response = await axios.post(
//           `${API_BASE_URL}/students/complete-stage/`,
//           {
//             stage: stage,
//             student_id: studentId,
//           }
          
//         );
//         if (response.status === 200) {
//           // 2) Patch the submission’s status to “completed”
//           await axios.patch(
//             `${API_BASE_URL}/stage-one-submissions/${submissionId}/`,
//             {
//               status: "completed",
//             }
//           );
  
//           alert("User's stage 1 successfully approved!");
//           // 3) Refresh the list so the row’s status updates
//           getStage1Data();
//         }
//       } catch (error) {
//         console.log("Failed to approve the user", error);
//       }
//     };
  
//     // Decline handler: deletes the submission
//     const handleDecline = async (submissionId) => {
//       try {
//         const confirmDelete = window.confirm(
//           "Are you sure you want to decline this Stage-1 submission?"
//         );
//         if (!confirmDelete) return;
  
//         const response = await axios.delete(
//           `${API_BASE_URL}/stage-one-submissions/${submissionId}/`
//         );
//         if (response.status === 204 || response.status === 200) {
//           alert("User’s Stage-1 submission declined.");
//           getStage1Data();
//         }
//       } catch (error) {
//         console.log("Failed to delete the submission", error);
//       }
//     };

//   if (!studentStageOneDetail) {
//     return (
//       <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
//         <p className="text-gray-500 text-sm">Loading student's stage one details...</p>
//       </div>
//     );
//   } 


//   return (
//     <div className="flex flex-col items-center justify-center h-auto bg-gray -100 w-full">
//       <div className="bg-white shadow-md rounded-lg px-6 py-3 w-full">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Stage One Student Application</h2>

//         {studentStageOneDetail.map((detail, index) => (
//             <div key={index} className="">
//                 <div className="flex gap-3">
//                     <strong>Application ID: </strong>
//                     <p>{detail.id}</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <strong>Stage No: </strong>
//                     <p>{detail.stage}</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <strong>Student Name: </strong>
//                     <p>{detail.student_first_name} {detail.student_last_name}</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <strong>Submission Date: </strong>
//                     <p>{new Date(detail.submitted_at).toLocaleDateString()}</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <strong>Level: </strong>
//                     <p>{detail.std_graduation}</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <strong>Status: </strong>
//                     <p>{detail.status}</p>
//                 </div>
//                 <div className="flex gap-3">
//                   {/* {detail.status === "pending" ? ( */}
//                       <>
//                           <button className="py-1.5 px-4 bg-green-500 hover:bg-green-600 hover:text-white rounded-lg mt-3 hover:shadow-lg transition-shadow duration-300 font-semibold" onClick={onClose}>Approve</button>
//                           <button className="py-1.5 px-4 bg-red-500 hover:bg-red-600 hover:text-white rounded-lg mt-3 hover:shadow-lg transition-shadow duration-300 font-semibold" onClick={onClose}>Decline</button>
//                           <button className="py-1.5 px-4 bg-blue-500 hover:bg-blue-600 hover:text-white rounded-lg mt-3 hover:shadow-lg transition-shadow duration-300 font-semibold" onClick={onClose}>Close</button>
//                       </>
//                   {/* ) : (
//                       <button className="py-1.5 px-4 bg-blue-500 hover:bg-blue-600 hover:text-white rounded-lg mt-3 hover:shadow-lg transition-shadow duration-300 font-semibold" onClick={onClose}>Close</button>
//                   )}   */}
//                 </div>
//           </div>
          
//         ))}
//       </div>
//     </div>
//   );
// }




















import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageOneStudentApplication({ onClose }) {
  const { id: studentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) Fetch function extracted so we can call it from useEffect and after approve/decline
  const getStage1Data = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/stage-one-submissions/?student=${studentId}`
      );
      setSubmissions(data);
    } catch (err) {
      console.error("Error fetching stage-one submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    getStage1Data();
  }, [getStage1Data]);

  // 2) Approve: notify backend, patch submission, then reload
  const handleApprove = async (stage, submissionId) => {
    try {
      // mark the student's stage as complete
      await axios.post(`${API_BASE_URL}/students/complete-stage/`, {
        stage,
        student_id: studentId,
      });

      // update the submission record
      await axios.patch(
        `${API_BASE_URL}/stage-one-submissions/${submissionId}/`,
        { status: "completed" }
      );

      alert("Stage 1 approved!");
      await getStage1Data();
    } catch (err) {
      console.error("Failed to approve:", err);
      alert("Could not approve. See console for details.");
    }
  };

  // 3) Decline: delete the submission, then reload
  const handleDecline = async (submissionId) => {
    if (!window.confirm("Decline this submission?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/stage-one-submissions/${submissionId}/`
      );
      alert("Stage 1 declined.");
      await getStage1Data();
    } catch (err) {
      console.error("Failed to decline:", err);
      alert("Could not decline. See console for details.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-auto bg-gray-100 w-full p-5">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full p-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Stage One Submissions
        </h2>

        {submissions.length === 0 ? (
          <p className="text-center text-gray-600">No submissions found.</p>
        ) : (
          submissions.map((sub) => (
            <div key={sub.id} className="mb-4 border-b pb-4">
              <p>
                <strong>Application ID:</strong> {sub.id}
              </p>
              <p>
                <strong>Stage No:</strong> {sub.stage}
              </p>
              <p>
                <strong>Student:</strong> {sub.student_first_name}{" "}
                {sub.student_last_name}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(sub.submitted_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Level:</strong> {sub.std_graduation}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    sub.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {sub.status}
                </span>
              </p>

              <div className="flex gap-2 mt-3">
                {sub.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleApprove(sub.stage, sub.id)
                      }
                      className="py-1 px-4 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(sub.id)}
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
        )}
      </div>
    </div>
  );
}
