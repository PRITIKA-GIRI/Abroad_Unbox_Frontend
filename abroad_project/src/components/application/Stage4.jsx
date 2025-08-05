import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdPulse } from "react-icons/io";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage4 = () => {
  const [fileErrors, setFileErrors] = useState({});
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stageVideo, setStageVideo] = useState([]);
  const [resumeSample, setResumeSample] = useState([]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);
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

  const getResumeSample = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-seven-email-samples/`);
      setResumeSample(response.data);
    } catch (err) {
      console.log("Failed to get email samples.", err);
    }
  };

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(response.data);
    } catch (err) {
      console.log("Failed to get stage videos", err);
    }
  };

  const handleFileChange = (e) => {
  const { name, files } = e.target;
  const file = files[0];
  let error = "";

  if (file) {
    const fileType = file.type;
    const fileSize = file.size;

    if (fileType !== "application/pdf") {
      error = "Only PDF files are allowed.";
    } else if (fileSize > 5 * 1024 * 1024) {
      error = "File size should not exceed 5 MB.";
    }

    if (error) {
      setFileErrors((prev) => ({ ...prev, [name]: error }));
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

      alert("Stage 4 Form submitted successfully! (wait for admin approval to unlock next stage)");
      setEcaList([
        {
          activities_type: "",
          position: "",
          org_involved: "",
          roles_duties: "",
        },
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
    getStageVideo();
    getResumeSample();
  }, []);

  const videoUrl1 = stageVideo[0]?.bachelors_stage4_resume_video;
  const videoUrl2 = stageVideo[0]?.bachelors_stage4_linkedin_video;

  // Check if Stage 3 is marked "completed" in the fetched stages array
  const stage4Data = stagesDetail.find((item) => item.stage === "4");
  const isStage4Completed = stage4Data?.is_complete === "completed";

  const resume_sample = resumeSample[0]?.bachelors_resume_sample_stage4;

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 4:</h2>
        <p className="text-xl font-semibold mt-5">
          Extra Curricular Activities
        </p>
        <p className="font-medium mt-3">
          Your ECA MATTERS! All
          those tireless hours
          spend on the
          volunteering and
          engagement is going to
          make your application
          exceptional.
        </p>

        <p className="font-medium mt-3">
          Most of the liberal arts
          college and high rank
          university considers
          your ECA for the
          admission and
          scholarship
          consideration.
        </p>
        <p className="font-medium mt-3">
        Be sure to get them all in
        order.
        </p>
      </div>

      <div className="w-full md:w-3/4 p-4 bg-white h-svh md:overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            What can be included?
          </div>
          <div className="p-2 text-lg font-normal text-left">
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
            <div
              key={index}
              className="border border-gray-200 shadow-md rounded p-4"
            >
              <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2">
                ECA {index + 1}
              </div>
              <input
                type="text"
                name="activities_type"
                value={eca.activities_type}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border border-gray-300 rounded p-2 mt-3"
                placeholder="Activities Type"
                required
              />
              <input
                type="text"
                name="position"
                value={eca.position}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border border-gray-300 rounded p-2 mt-3"
                placeholder="Position"
                required
              />
              <input
                type="text"
                name="org_involved"
                value={eca.org_involved}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border border-gray-300 rounded p-2 mt-3"
                placeholder="Organization Involved With"
                required
              />
              <textarea
                name="roles_duties"
                value={eca.roles_duties}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border border-gray-300 rounded p-2 mt-3"
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

          {/* Divider */} <div className="border-t border-gray-300"></div>

          <div className="bg-gradient-to-l from-[#ffffff] to-green-300 p-2 text-center text-2xl font-semibold">
            Resume and LinkedIn
          </div>

          <div className="relative bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold flex items-center cursor-pointer"
            onClick={() => setIsResumeOpen(!isResumeOpen)}>
            <p className="absolute left-1/2 transform -translate-x-1/2">Resume</p>
            {isResumeOpen ? (
              <MdOutlineExpandLess className="ml-auto text-4xl" />
            ) : (
              <MdOutlineExpandMore className="ml-auto text-4xl" />
            )}
          </div>

          { isResumeOpen && (
          <div>
            <iframe
              className="w-full h-[400px] mt-2"
              src={videoUrl1}
              allowFullScreen
              title="Session 1 - The Mindset"
            />
            <a href={resume_sample} download="resume_sample.pdf" className="mt-5 px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-300 hover:from-blue-300 hover:to-blue-500 hover:text-white rounded-2xl w-1/3 mx-auto shadow-lg">
                Download Resume Sample
            </a>
          </div>
          )}

            <div className="mt -3 flex items-center gap-4 w-full bg-gradient-to-r from-blue-50 to-blue-300">
              <label className="text-center w-1/4">Upload Resume:</label>
              <input
                type="file"
                accept=".pdf"
                name="resume"
                onChange={handleFileChange}
                className="m-2 px-3 border border-gray-300 bg-gray-50 rounded w-full py-2 text-center"
                required
              />
              {fileErrors.resume && (
              <p className="text-red-600 text-sm mt-1">
                {fileErrors.resume}
              </p>
            )}
            </div>

          <div className="relative bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold flex items-center cursor-pointer"
            onClick={() => setIsLinkedInOpen(!isLinkedInOpen)}>
            <p className="absolute left-1/2 transform -translate-x-1/2">LinkedIn</p>
            {isLinkedInOpen ? (
              <MdOutlineExpandLess className="ml-auto text-4xl" />
            ) : (
              <MdOutlineExpandMore className="ml-auto text-4xl" />
            )}
          </div>

          {isLinkedInOpen && (
          <div>
            <iframe
              className="w-full h-[400px] mt-2"
              src={videoUrl2}
              allowFullScreen
              title="Session 1 - The Mindset"
            />
          </div>
          )}

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
