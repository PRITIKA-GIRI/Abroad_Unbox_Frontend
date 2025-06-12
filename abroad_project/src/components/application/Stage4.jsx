import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdPulse } from "react-icons/io";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage4 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ecaList, setEcaList] = useState([
    { activities_type: "", position: "", org_involved: "", roles_duties: "" },
  ]);
  const [files, setFiles] = useState({});

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
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...ecaList];
    updatedList[index][name] = value;
    setEcaList(updatedList);
  };

  const addMoreECA = () => {
    setEcaList([
      ...ecaList,
      { activities_type: "", position: "", org_involved: "", roles_duties: "" },
    ]);
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
    payload.append("eca_data", JSON.stringify(ecaList));

    Object.entries(files).forEach(([key, file]) => {
      if (file) payload.append(key, file);
    });

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/stage-four-submissions/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully!");
      setEcaList([
        { activities_type: "", position: "", org_involved: "", roles_duties: "" },
      ]);
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
    const stage4Data = stagesDetail.find((item) => item.stage === "4");
    const isStage4Completed = stage4Data?.is_complete === "completed";

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 4:</h2>
        <p className="font-medium mt-5">
          Your ECA MATTERS! All those tireless hours...
        </p>
      </div>

      <div className="w-full md:w-3/4 bg-white h-svh md:overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            What can be included?
          </div>
          <div className="p-2 bg-green-300 text-left">
            <p>Everything could be included. (But after grade 9 and over)</p>
            <ul className="list-disc ml-5">
              <li>House Captain or Hall Monitor</li>
              <li>Drawing, Painting, Musical Instrument</li>
              <li>Sports team participation</li>
              <li>Olympiad, competition wins</li>
              <li>Debate team, Quiz team</li>
              <li>Workshops or Professional courses</li>
              <li>Club Participation</li>
            </ul>
          </div>

          {ecaList.map((eca, index) => (
            <div key={index} className="border p-4">
              <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2">
                ECA {index + 1}
              </div>
              <input
                type="text"
                name="activities_type"
                value={eca.activities_type}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border p-2 mt-3"
                placeholder="Activities Type"
              />
              <input
                type="text"
                name="position"
                value={eca.position}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border p-2 mt-3"
                placeholder="Position"
              />
              <input
                type="text"
                name="org_involved"
                value={eca.org_involved}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border p-2 mt-3"
                placeholder="Organization Involved With"
              />
              <textarea
                name="roles_duties"
                value={eca.roles_duties}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border p-2 mt-3"
                placeholder="Describe your roles and duties (150 Words)"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addMoreECA}
            className="bg-blue-300 hover:bg-blue-400 p-3 text-xl font-semibold text-center"
          >
            Add More ECA +
          </button>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            Resume and LinkedIn
          </div>
          <div>
            <iframe
              className="w-full h-[400px] mt-2"
              src="https://www.youtube.com/embed/lK-5voIYkTo"
              allowFullScreen
              title="Session 1 - The Mindset"
            />
            <button className="mt-3 border rounded-4xl w-1/3 py-4 mx-auto">
              Download Sample
            </button>
            <br />
            <label>Upload Resume: </label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="mt-3 px-3 border rounded-4xl w-1/3 py-4 text-center"
            />
          </div>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            LinkedIn
          </div>
          <div>
            <iframe
              className="w-full h-[400px] mt-2"
              src="https://www.youtube.com/embed/lK-5voIYkTo"
              allowFullScreen
              title="Session 1 - The Mindset"
            />
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-white to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Stage 4: Submit"}
          </button> */}

          {/* Submit / Completed Button */}
        <div className="mt-4">
          <button
            onClick={() => handleSubmit(responseLink[0]?.stage)}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage4Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage4Completed}
          >
            {isStage4Completed ? "Stage 4: Completed" : "Stage 4: Submit"}
          </button>
        </div>
          
        </form>
      </div>
    </div>
  );
};

export default Stage4;
