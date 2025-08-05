import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage3 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  // Assuming you store or otherwise obtain the current student's ID in localStorage
  const student_id = localStorage.getItem("student_id");

  // Fetch the student’s stages and status
  const getStages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${student_id}`
      );
      setStagesDetail(response.data);
    } catch (error) {
      console.log("Failed to get the stages data", error);
    }
  };

  const handleFileChange = (e) => {
  const { name, files } = e.target;
  const file = files[0];

  if (file) {
    const fileType = file.type;
    const fileSize = file.size;

    let error = "";

    if (fileType !== "application/pdf") {
      error = "Only PDF files are allowed.";
    } else if (fileSize > 5 * 1024 * 1024) {
      error = "File size should not exceed 5 MB.";
    }

    setFileErrors((prev) => ({ ...prev, [name]: error }));

    if (error) {
      
      e.target.value = "";
      setFiles((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
      return;
    }

    
    setFileErrors((prev) => ({ ...prev, [name]: "" }));
    setFiles((prev) => ({ ...prev, [name]: file }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      alert("Student ID not found in local storage!");
      return;
    }

    const payload = new FormData();
    payload.append("student", studentId);

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value || "");
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) payload.append(key, file);
    });

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/stage-three-submissions/`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Stage 3 (three) Form submitted successfully!");
      setFormData({});
      setFiles({});
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  // Check if Stage 3 is marked "completed" in the fetched stages array
  const stage3Data = stagesDetail.find((item) => item.stage === "3");
  const isStage3Completed = stage3Data?.is_complete === "completed";

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 3:</h2>
        <h2 className="text-xl font-semibold mt-6">Profile</h2>
        <p className="font-medium mt-5">
          Let's build your comprehensive profile
        </p>
        <p className="font-medium mt-5">
          Now you have a good idea of your mindset, career, and university
          selection;
        </p>
        <p className="font-medium mt-5">
          Please give the details of everything to the best of your knowledge.
          This will help us during your application.
        </p>
      </div>

      <div className="w-full md:w-3/4 p-4 bg-white h-svh md:overflow-scroll no-scrollbar">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
            Documents
          </div>
          <div className="flex flex-col">
            <label>10 Transcript/ Transcript I:</label>
            <input
              type="file"
              name="transcript_i"
              title="Please select a pdf file"
              accept=".pdf"
              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.transcript_i && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.transcript_i}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>11 Transcript/ Transcript II:</label>
            <input
              type="file"
              name="transcript_ii"
              accept=".pdf"
              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.transcript_ii && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.transcript_ii}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>12 Transcript/ Transcript III:</label>
            <input
              type="file"
              name="transcript_iii"
              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2 "
              required
            />

            {fileErrors.transcript_iii && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.transcript_iii}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>Provisional:</label>
            <input
              type="file"
              name="provisional"

              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2 "
              required
            />

             {fileErrors.provisional && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.provisional}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>Migration:</label>
            <input
              type="file"

              accept=".pdf"

              name="migration"
              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.migration && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.migration}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>Character:</label>
            <input
              type="file"

              accept=".pdf"

              name="character"
              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.character && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.character}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
            Letter of Recommendation
          </div>
          <div className="flex flex-col">
            <label>LOR I:</label>
            <input
              type="file"
              name="lor_i"

              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.lor_i && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.lor_i}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>LOR II:</label>
            <input
              type="file"
              name="lor_ii"

              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.lor_ii && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.lor_ii}
              </p>
            )}

          </div>
          <div className="flex flex-col">
            <label>LOR III:</label>
            <input
              type="file"
              name="lor_iii"

              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.lor_iii && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.lor_iii}
              </p>
            )}

          </div>

          <div className="flex flex-col">
            <label>LOR IV:</label>
            <input
              type="file"
              name="lor_iv"

              accept=".pdf"

              onChange={handleFileChange}
              className="border border-gray-300 w-full rounded p-2"
              required
            />

            {fileErrors.lor_iv && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.lor_iv}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg  ">
            English Proficiency Test Score
            <input
              type="file"
              name="eng_test_score"

              accept=".pdf"

              onChange={handleFileChange}
              className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2"
              required
            />

            {fileErrors.eng_test_score && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.eng_test_score}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg ">
            Standardize Test Score
            <input
              type="file"
              name="standardize_test_score"
              onChange={handleFileChange}

              accept=".pdf"
              className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2"
              required
            />
            {fileErrors.standardize_test_score && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.standardize_test_score}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg ">
            Passport
            <input
              type="file"
              name="passport"

              accept=".pdf"

              onChange={handleFileChange}
              className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2"
              required
            />

            {fileErrors.passport && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.passport}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg ">
            Personal Essay
            <input
              type="file"
              name="personal_essay"

              accept=".pdf"

              onChange={handleFileChange}
              className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2"
              required
            />

            {fileErrors.personal_essay && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.personal_essay}
              </p>
            )}

          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg ">
            Bank Balance Certificate
            <input
              type="file"
              name="bank_balance"

              accept=".pdf"

              onChange={handleFileChange}
              className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2"
              required
            />

            {fileErrors.bank_balance && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.bank_balance}
              </p>
            )}

          </div>
          {/* <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-[#ffffff] to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Stage 3: Submit'}
          </button> */}

          {/* Submit / Completed Button */}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className={`w-full py-4 text-2xl font-semibold mt-3 ${
                isStage3Completed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
              }`}
              disabled={isStage3Completed}
            >
              {isStage3Completed ? "Stage 3: Completed" : "Stage 3: Submit"}
            </button>
          </div>

           {/* Submit / Completed Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage3Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage3Completed}
          >
            {isStage3Completed ? "Stage 3: Completed" : "Stage 3: Submit"}
          </button>
        </div>


        </form>
      </div>
    </div>
  );
};

export default Stage3;
