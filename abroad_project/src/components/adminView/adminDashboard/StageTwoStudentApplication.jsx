import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StageTwoStudentApplication({ studentId, onClose }) {
  const [studentStageTwoDetail, setStudentStageTwoDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleEdit = (detail) => {
    setEditMode(detail.id);
    setFormData({ ...detail });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (submissionId) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/stage-two-submissions/${submissionId}/`,
        formData
      );
      alert("Submission updated successfully!");
      setEditMode(null);
      fetchStudentStageTwoDetail();
    } catch (err) {
      console.error("Failed to update submission:", err);
      alert("Could not update submission. See console for details.");
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setFormData({});
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
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 w-full p-2">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Stage Two Student Application
        </h2>

        {studentStageTwoDetail.length > 0 ? (
          studentStageTwoDetail.map((detail) => (
            <div
              key={detail.id}
              className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-1 rounded-lg"
            >
              <div className="flex items-center gap-5">
                <strong className="w-1/3">Application ID:</strong>
                <span className="w-2/3">{detail.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Stage No:</strong>
                <span className="w-2/3">{detail.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Student Name:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.name}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Submission Date:</strong>
                <span className="w-2/3">
                  {new Date(detail.submitted_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Gender:</strong>
                {editMode === detail.id ? (
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="w-2/3">{detail.gender}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Marital Status:</strong>
                {editMode === detail.id ? (
                  <input
                    type="checkbox"
                    name="marital_status"
                    checked={formData.marital_status || false}
                    onChange={handleInputChange}
                    className="ml-2"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.marital_status ? "Married" : "Single"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Date of Birth:</strong>
                {editMode === detail.id ? (
                  <input
                    type="date"
                    name="date_of_birth"
                    value={
                      formData.date_of_birth
                        ? new Date(formData.date_of_birth)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {new Date(detail.date_of_birth).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Address I:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="address_i"
                    value={formData.address_i || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.address_i}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Address II:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="address_ii"
                    value={formData.address_ii || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.address_ii}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">City:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.city}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">State:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.state}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Country:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.country}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Zip Code:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.zip_code}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Level:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="level"
                    value={formData.level || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.level}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Year Graduated:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="year_graduated"
                    value={formData.year_graduated || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.year_graduated}</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <strong className="w-1/3">Standardized Test:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="standardized_test"
                    value={formData.standardized_test || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.standardized_test}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">SAT Verbal:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="sat_verbal"
                    value={formData.sat_verbal || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.sat_verbal}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">SAT Quant:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="sat_quant"
                    value={formData.sat_quant || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.sat_quant}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GRE Verbal Reasoning:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gre_verbal_reasoning"
                    value={formData.gre_verbal_reasoning || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.gre_verbal_reasoning || "N/A"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GRE Quant Reasoning:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gre_quant_reasoning"
                    value={formData.gre_quant_reasoning || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.gre_quant_reasoning || "N/A"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GRE Analytical Writing:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gre_analytical_writing"
                    value={formData.gre_analytical_writing || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.gre_analytical_writing || "N/A"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GMAT Quantitative:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gmat_quantitative"
                    value={formData.gmat_quantitative || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.gmat_quantitative || "N/A"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GMAT Verbal:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gmat_verbal"
                    value={formData.gmat_verbal || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.gmat_verbal || "N/A"}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">GMAT Data Insights:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="gmat_data_insights"
                    value={formData.gmat_data_insights || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">
                    {detail.gmat_data_insights || "N/A"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">English Test Type:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="english_test_type"
                    value={formData.english_test_type || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.english_test_type}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">English Reading:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="english_reading"
                    value={formData.english_reading || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.english_reading}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">English Writing:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="english_writing"
                    value={formData.english_writing || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.english_writing}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">English Listening:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="english_listening"
                    value={formData.english_listening || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.english_listening}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">English Speaking:</strong>
                {editMode === detail.id ? (
                  <input
                    type="number"
                    name="english_speaking"
                    value={formData.english_speaking || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.english_speaking}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Major:</strong>
                {editMode === detail.id ? (
                  <input
                    type="text"
                    name="major"
                    value={formData.major || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3"
                  />
                ) : (
                  <span className="w-2/3">{detail.major}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Special Note:</strong>
                {editMode === detail.id ? (
                  <textarea
                    name="special_note"
                    value={formData.special_note || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-2/3 h-20"
                  />
                ) : (
                  <span className="w-2/3">{detail.special_note || "N/A"}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <strong className="w-1/3">Status:</strong>
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
              <div className="col-span-full flex gap-2 mt-4">
                {detail.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(detail.stage, detail.id)}
                      className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(detail.id)}
                      className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Decline
                    </button>
                  </>
                )}
                {editMode === detail.id ? (
                  <>
                    <button
                      onClick={() => handleSave(detail.id)}
                      className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(detail)}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
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
              className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
