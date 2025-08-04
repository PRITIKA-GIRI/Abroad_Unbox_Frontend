import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageThreeStudentApplication({ studentId, onClose }) {
  const [studentStageThreeDetail, setStudentStageThreeDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileInputs, setFileInputs] = useState({}); // State to store selected files

  const fetchStudentStageThreeDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/stage-three-submissions/?student=${studentId}`
      );
      setStudentStageThreeDetail(data);
    } catch (error) {
      console.error("Error fetching student stage three detail:", error);
      setStudentStageThreeDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
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

  const handleEdit = (detail) => {
    setEditMode(detail.id);
    setFormData({ ...detail });
    setFileInputs({}); // Reset file inputs when entering edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileInputs((prev) => ({
      ...prev,
      [name]: files[0], // Store the first selected file
    }));
  };

  const handleSave = async (submissionId) => {
    const formDataToSend = new FormData();
    // Append text fields
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataToSend.append(key, value);
    // });
    // Append files if they exist
    Object.entries(fileInputs).forEach(([key, file]) => {
      if (file) {
        formDataToSend.append(key, file);
      }
    });

    try {
      await axios.patch(
        `${API_BASE_URL}/stage-three-submissions/${submissionId}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Submission updated successfully!");
      setEditMode(null);
      fetchStudentStageThreeDetail();
    } catch (err) {
      console.error("Failed to update submission:", err);
      alert("Could not update submission. See console for details.");
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setFormData({});
    setFileInputs({});
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

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full p-5">
      <div className="bg-white shadow-md rounded-lg px-6 py-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Stage Three Student Application
        </h2>

        {studentStageThreeDetail.length > 0 ? (
          studentStageThreeDetail.map((detail) => (
            <div
              key={detail.id}
              className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Application ID:
                  </span>
                  <span className="text-gray-900">{detail.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Stage No:</span>
                  <span className="text-gray-900">{detail.stage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Student Name:
                  </span>
                  {editMode === detail.id ? (
                    <>
                      <input
                        type="text"
                        name="student_name"
                        value={formData.student_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="student_last_name"
                        value={formData.student_last_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                      />
                    </>
                  ) : (
                    <span className="text-gray-900">
                      {detail.student_name} {detail.student_last_name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Submission Date:
                  </span>
                  <span className="text-gray-900">
                    {new Date(detail.submitted_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Level:</span>
                  {editMode === detail.id ? (
                    <input
                      type="text"
                      name="std_graduation"
                      value={formData.std_graduation || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-900">
                      {detail.std_graduation}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    10 Transcript:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="transcript_i"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.transcript_i}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    11 Transcript:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="transcript_ii"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.transcript_ii}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    12 Transcript:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="transcript_iii"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.transcript_iii}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Bachelors Transcript:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="bachelors_transcript"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.bachelors_transcript}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      {detail.bachelors_transcript ? "View File" : "N/A"}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Provisional:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="provisional"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.provisional}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Migration:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="migration"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.migration}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Character:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="character"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.character}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    WES/IEE/NACES:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="wes_iee_naces"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.wes_iee_naces}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      {detail.wes_iee_naces ? "View File" : "N/A"}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">LOR I:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="lor_i"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.lor_i}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">LOR II:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="lor_ii"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.lor_ii}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">LOR III:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="lor_iii"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.lor_iii}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">LOR IV:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="lor_iv"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.lor_iv}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    English Test Score:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="eng_test_score"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.eng_test_score}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Standardized Test Score:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="standardize_test_score"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.standardize_test_score}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Passport:</span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="passport"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.passport}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Personal Essay:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="personal_essay"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.personal_essay}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Bank Balance:
                  </span>
                  {editMode === detail.id ? (
                    <input
                      type="file"
                      name="bank_balance"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a
                      href={detail.bank_balance}
                      target="_blank"
                      className="text-blue-500 hover:underline hover:text-blue-600"
                    >
                      View File
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span
                    className={
                      detail.status === "pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {detail.status}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                {detail.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(detail.stage, detail.id)}
                      className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(detail.id)}
                      className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
                    >
                      Decline
                    </button>
                  </>
                )}
                {editMode === detail.id ? (
                  <>
                    <button
                      onClick={() => handleSave(detail.id)}
                      className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(detail)}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-200"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">No submissions available.</p>
            <button
              onClick={onClose}
              className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
