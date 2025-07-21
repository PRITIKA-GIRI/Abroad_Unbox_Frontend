import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage4Masters = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stageVideo, setStageVideo] = useState([]);

  // Assuming you store or otherwise obtain the current student's ID in localStorage
  const student_id = localStorage.getItem("student_id");
  const graduation = localStorage.getItem("graduation");


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

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(response.data);
    } catch (err) {
      console.log("Failed to get stage videos", err);
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
    payload.append("std_graduation", graduation);

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/stage-four-submissions/`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        "Stage 4 Form submitted successfully! (wait for admin approval to unlock next stage)"
      );
      
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
  }, []);

  const videoUrl1 =stageVideo[0]?.masters_stage4_assistantship_video1_general_idea;
  const videoUrl2 = stageVideo[0]?.masters_stage4_assistantship_video2_contact;
  const videoUrl3 = stageVideo[0]?.masters_stage4_assistantship_video3_pro_tips;
  const videoUrl4 = stageVideo[0]?.masters_stage4_video4_resume;
  const videoUrl5 = stageVideo[0]?.masters_stage4_video5_linkedin;

  const sample1 = stageVideo[0]?.masters_stage4_resume_linkedin_sample1;
  const sample2 = stageVideo[0]?.masters_stage4_resume_linkedin_sample2;

  // Check if Stage 3 is marked "completed" in the fetched stages array
  const stage4Data = stagesDetail.find((item) => item.stage === "4");
  const isStage4Completed = stage4Data?.is_complete === "completed";

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 4:</h2>
        <p className="text-xl font-semibold mt-5">
          Extra Curricular Activities
        </p>
        <p className="font-medium mt-3">
          Your ECA MATTERS! All those tireless hours spend on the volunteering
          and engagement is going to make your application exceptional.
        </p>

        <p className="font-medium mt-3">
          Most of the liberal arts college and high rank university considers
          your ECA for the admission and scholarship consideration.
        </p>
        <p className="font-medium mt-3">Be sure to get them all in order.</p>
      </div>

      <div className="w-full md:w-3/4 p-4 bg-white h-svh md:overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            Assistantship
          </div>

          <div className="w-11/12 mx-auto">
            <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
              The general Idea and what are the criteria?
            </div>
            <div>
              <iframe
                className="w-full h-[400px] mt-2"
                src={videoUrl1}
                allowFullScreen
                title="The general Idea and what are the criteria?"
              />
            </div>
            <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold mt-10">
              Whom to contact and how to approach.
            </div>
            <div>
              <iframe
                className="w-full h-[400px] mt-2"
                src={videoUrl2}
                allowFullScreen
                title="Whom to contact and how to approach."
              />
            </div>
            <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold mt-10">
              Pro tips to get Assistantship.
            </div>
            <div>
              <iframe
                className="w-full h-[400px] mt-2"
                src={videoUrl3}
                allowFullScreen
                title="Pro tips to get Assistantship."
              />
            </div>
          </div>
          <div className="border-t border-gray-300 my-6"></div>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
            Resume and Linkedin
          </div>
          <div className="w-11/12 mx-auto">
            <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
              Resume
            </div>
            <div>
              <iframe
                className="w-full h-[400px] mt-2"
                src={videoUrl4}
                allowFullScreen
                title="Resume"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-3">
              { sample1 ? (
              <a
                href={sample1}
                download="Sample_I.pdf"
                className="w-full md:w-1/2 p-2 rounded-full bg-yellow-300 hover:bg-yellow-400 font-semibold text-center cursor-pointer"
              >
                Download Sample I
              </a>
              ) : (
                <p className="w-full md:w-1/2 p-2 rounded-full bg-gray-300 text-center font-semibold">
                  Sample I not available
                </p>
              )}
              <a
                href={sample2}
                download="Sample_II.pdf"
                className="w-full md:w-1/2 p-2 rounded-full bg-yellow-300 hover:bg-yellow-400 font-semibold text-center cursor-pointer"
              >
                Download Sample II
              </a>
            </div>

            {/* Divider */}{" "}
            <div className="border-t border-gray-300 my-6"></div>
            <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
              Linkedin
            </div>
            <div>
              <iframe
                className="w-full h-[400px] mt-2"
                src={videoUrl5}
                allowFullScreen
                title="Linkedin"
              />
            </div>
          </div>

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

export default Stage4Masters;
