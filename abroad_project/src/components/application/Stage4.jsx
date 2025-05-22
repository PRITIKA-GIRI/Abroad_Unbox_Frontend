import React, { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage4 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
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
        `${API_BASE_URL}/stage-three -submissions/`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Form submitted successfully!");
      setFormData({});
      setFiles({});
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      <div className="md:w-1/5 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 4:</h2>
        {/* <h2 className="text-xl font-semibold mt-6">Extra Curricular Activities</h2> */}

        <p className="font-medium mt-5 md:flex hidden">
          Your ECA MATTERS! All those tireless hours spend on the volunteering
          and engagement is going to make your application exceptional.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Most of the liberal arts college and high rank university considers
          your ECA for the admission and scholarship consideration.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Be sure to get them all in order.
        </p>
      </div>

      <div className="w-full md:w-4/5 bg-white h-svh overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb- 5">
            What can be included?
          </div>
          <div className="p-2 w-full bg-green-300">
            <p>Everything could be included. (But after grade 9 and over)</p>
            <p>
              1. House Captain or Hall Monitor or School Captain 
            </p>
            <p>
              2. Drawing,Painting, musical instrument or others. 
            </p>
            <p>
              3. Athletics or sports team participation (off College also) 
            </p>
            <p>
              4. Olympiad, other competition wins or top positions 
            </p>
            <p>
              5. Debate team, Quiz team, orother Participation. 
            </p>
            <p>
              6. Workshop or Professional course. 
            </p>
            <p>
              7. Club Participation or others.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb- 5">
            ECA I
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-[#ffffff] to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Stage 4: Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stage4;
