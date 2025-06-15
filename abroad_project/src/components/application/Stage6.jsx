import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage6 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentUniDetail, setStudentUniDetail] = useState([]);
  const [stageVideo, setStageVideo] = useState([]);
  const [error, setError] = useState("");
  // Now track actual University IDs (uniDetail.university), not StudentUniversityDetail IDs.
  const [appliedUniIds, setAppliedUniIds] = useState([]);

  const studentID = localStorage.getItem("student_id");

  const getStages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${studentID}`
      );
      setStagesDetail(response.data);
    } catch (err) {
      console.log("Failed to get stages data", err);
    }
  };

  const getStuUniDetail = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student-university-details/?student=${studentID}`
      );
      setStudentUniDetail(response.data);
    } catch (err) {
      console.log("Failed to get university list", err);
      setError("Could not load your university list.");
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

  useEffect(() => {
    getStuUniDetail();
    getStageVideo();
    getStages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if stage 6 is marked “completed”
  const stage6Data = stagesDetail.find((item) => item.stage === "6");
  const isStage6Completed = stage6Data?.is_complete === "completed";

  // Pull the CommonApp video URL from stageVideo[0].stage6_video1
  const videoUrl = stageVideo[0]?.stage6_video1;

  // When the user clicks “Apply”, add uniDetail.university (i.e. the University PK)
  const handleApply = (uniDetail) => {
    const uniPK = uniDetail.university; // ← this is the actual University ID
    if (!appliedUniIds.includes(uniPK)) {
      setAppliedUniIds((prev) => [...prev, uniPK]);
    }
  };

  // To “Remove” a university from the applied list, filter it out
  const handleRemove = (uniDetail) => {
    const uniPK = uniDetail.university;
    setAppliedUniIds((prev) => prev.filter((id) => id !== uniPK));
  };

  // Build a list of “applied” university‐details by matching uniDetail.university
  const appliedUnis = studentUniDetail.filter((u) =>
    appliedUniIds.includes(u.university)
  );

  // On form submit, POST { student, stage: "6", applied_university: [ <university IDs> ] }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentID) {
      alert("Student ID not found in local storage!");
      return;
    }

    const payload = {
      student: studentID,
      stage: "6",
      // send exactly the array of university‐PKs
      applied_university: appliedUniIds,
    };

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE_URL}/stage-six-submissions/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Stage 6 submission successful! (Wait for admin approval to unlock next stage)");
      // Clear local “applied” state and re-fetch stages to flip the button to “Completed”
      setAppliedUniIds([]);
      getStages();
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit Stage 6. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      {/* Sidebar */}
      <div className="md:w-1/5 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] p-4 h-auto">
        <h2 className="text-2xl underline font-bold">Stage 6:</h2>
        <p className="mt-2">
          Now we have all the documents ready & we have all the university list.
          Let's apply.
        </p>
        <p className="mt-2">
          Although there are many ways to apply, we prefer CommonApp, University
          portal, and AU Portal.
        </p>
        <p className="mt-2">
          Our goal with the combination of portals is to reduce cost and shorten
          the time to get an offer letter.
        </p>
      </div>

      {/* Main Content */}
      <div className="md:w-4/5 w-full bg-white h-screen p-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Applying to University
          </div>
          <p className="px-10">
            This Portal (the one you are using right now) will help you apply to
            your selected universities. Just click “Apply” next to the list of
            your finalized universities. Your application is DONE.
          </p>
          <p className="px-10">
            Someone from our team will reach out to you if anything else is
            needed.
          </p>

          {/* Render all universities */}
          {studentUniDetail.map((uniDetail) => {
            // “uniDetail.university” is the actual University PK
            const isApplied =
              appliedUniIds.includes(uniDetail.university);

            return (
              <div
                key={uniDetail.id}
                className="bg-gradient-to-r from-[#ffffff] to-green-300 p-2 w-full text-xl font-semibold flex justify-between items-center mb-2"
              >
                <span>
                  {uniDetail.university_name} (ID: {uniDetail.university})
                </span>
                <button
                  onClick={() => handleApply(uniDetail)}
                  disabled={isApplied}
                  className={`px-3 rounded-3xl py-1 box-border transition duration-150 ${
                    isApplied
                      ? "bg-gray-300 cursor-not-allowed opacity-70"
                      : "bg-blue-300 hover:bg-blue-400 cursor-pointer hover:shadow-md"
                  }`}
                  type="button"
                >
                  {isApplied ? "Applied" : "Apply"}
                </button>
              </div>
            );
          })}

          {/* Applied Universities Section */}
          {appliedUnis.length > 0 && (
            <>
              <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mt-6 mb-3">
                Applied Universities
              </div>
              {appliedUnis.map((uniDetail) => (
                <div
                  key={uniDetail.id}
                  className="bg-gradient-to-r from-[#ffffff] to-green-300 p-2 w-full text-xl font-semibold flex justify-between items-center mb-2"
                >
                  {/* Show the university_name; the “ID:” is uniDetail.university */}
                  <span>
                    {uniDetail.university_name} (ID: {uniDetail.university})
                  </span>
                  <button
                    onClick={() => handleRemove(uniDetail)}
                    className="px-3 bg-blue-400 rounded-3xl py-1 box-border shadow-md hover:bg-blue-500 transition duration-150"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* CommonApp Section */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            CommonApp
          </div>
          <p className="px-10">
            CommonApp is one of the best ways to apply to US universities. It
            allows you to apply to up to twenty (20) universities, and many are
            free to apply. Although it may sound simple, CommonApp must be filled
            with precise details—everything matters.
          </p>
          <p className="px-10">
            CommonApp is only for undergraduates. For Master’s students, please
            skip this one.
          </p>
          <div className="w-full mb-4">
            <a
              href="https://www.commonapp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-1/2 py-3 px-5 bg-green-300 rounded-lg text-center inline-block"
            >
              Go To CommonApp
            </a>
          </div>
          <div className="bg-blue-300 py-2 w-full text-xl font-semibold text-center">
            CommonApp Video Tutorial
          </div>
          {videoUrl && (
            <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl}
              allowFullScreen
              title="CommonApp Video Tutorial"
            />
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Final Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full py-4 text-2xl font-semibold mt-3 ${
                isStage6Completed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
              }`}
              disabled={isStage6Completed || loading}
            >
              {/* {isStage6Completed ? "Stage 6: Completed" : "Stage 6: Submit"} */}
              {isStage6Completed
                ? "Stage 6: Completed"
                : loading
                ? "Submitting..."
                : "Stage 6: Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Stage6;
