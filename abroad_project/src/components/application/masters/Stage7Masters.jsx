import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Stage7Masters = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stageVideo, setStageVideo] = useState([]);
  const [emailSample, setEmailSample] = useState([]);
  const [error, setError] = useState("");

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
  const stage7Data = stagesDetail.find((item) => item.stage === "7");
  const isStage7Completed = stage7Data?.is_complete === "completed";

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(response.data);
    } catch (err) {
      console.log("Failed to get stage videos", err);
    }
  };

  const getEmailSample = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-seven-email-samples/`);
      setEmailSample(response.data);
    } catch (err) {
      console.log("Failed to get emaol samples.", err);
    }
  };

  useEffect(() => {
    getStageVideo();
    getEmailSample();
    getStages();
  }, []);

  const handleSubmit = async (stageId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stage-seven-submissions/`,
        {
          student: studentID,
          // stage: "7"
        }
      );
      if (response) {
        console.log(response.data);
        // Refresh stages so the button state updates
        alert("Stage 7 submission successful! (Wait for admin approval to unlock next stage) ");
        getStages();
      }
    } catch (error) {
      console.log("Failed to post the form data", error);
      setError(error.response?.data?.detail || "");
    }
  };

  const videoUrl1 = stageVideo[0]?.stage7_video1;
  const videoUrl2 = stageVideo[0]?.stage7_video2;

  const emailSample_i = emailSample[0]?.sample_i;
  const emailSample_ii = emailSample[0]?.sample_i;
  const emailSample_iii = emailSample[0]?.sample_i;
  const emailSample_iv = emailSample[0]?.sample_i;
  const emailSample_v = emailSample[0]?.sample_i;
  const emailSample_vi = emailSample[0]?.sample_i;
  const emailSample_vii = emailSample[0]?.sample_i;

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] p-4 ">
        <h2 className="text-2xl underline font-bold">Stage 7:</h2>
        <p className="mt-2 font-bold text-xl text-center">
        Email
        </p>
        <p className="mt-3">
        Let's finalize on the list
        of university based on
        your expectation.
        </p>
        <p className="mt-3">
        Don't apply to very few
        University, nor too
        many. There has to be
        a happy medium when
        it comes to applying to
        the university.
        </p>
        <p className="mt-3">
          Also, BE PATIENCE,
          Most of the university
          usually takes over few
          weeks even months to
          send you I-20. Be sure
          to followup.
        </p>
        <p className="mt-3">
          We usually recommend
          5-10 University for
          Undergraduate, and
          2-5 for the Graduate
          Students.
        </p>
        <p className="mt-3">
        Also, don't forget
        every university has
        their own
        requirements, they
        have their own ways of
        determining
        scholarship.
        </p>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full bg-white h-screen p-4 md:overflow-scroll">
        <div 
        className="space-y-4" 
        // onSubmit={handleSubmit}
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Email Session
          </div>

          <p className="px-10 flex flex-col">
            <span># Don't forget, just applying doesn't mean the your decision will come on time.</span>
            <span># University needs to know that you are serious candidate.</span>
            <span># So, a followup through email is a must.</span>
            <span># There is a rule to the email - Too little is inadequate & too much can be nuisance.</span>
            <span># We have created Sessions for writing email, set of email that is going to help you with the email optimization.</span>
            <span># Go through the email session, go through the guidelines and samples; You will have a perfect timing and good rapport build up.</span>
          </p>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Writing Email Section */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Writing Email
          </div>
          <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl1}
              allowFullScreen
              title="CommonApp Video Tutorial"
            />
          
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Writing Timeline
          </div>
          <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl2}
              allowFullScreen
              title="CommonApp Video Tutorial"
          />
          <a
            href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20Career%20Counseling"
            className="block mx-auto mt-2 w-1/2 md:w-1/3"
          >
            <div className="bg-green-300 px-5 py-3 text-center">
              <p className="text-xl font-medium">
                Request Appointment
              </p>
            </div>
          </a>
          
          {/* Divider */}<div className="border-t border-gray-300 my-6"></div>

          <div className="bg-gradient-to-r from-green-300 to-[#fff] p-2 w-full text-2xl font-semibold text-center">
            Email Samples
          </div>

          <div className="bg-gradient-to-l from-blue-300 to-[#fff] p-2 w-full text-2xl font-semibold text-center">
            Email I
          </div>
          <p className='w-full md:w-1/2 py-2 px-4 bg-gray-400'>Within 7 -10 Days of SUBMITTING APPLICATION</p>
          
          <div className='w-full md:w-3/4'><img src={emailSample_i} alt='email i' loading='lazy' className='w-full h-auto' /></div>
          <div className='w-full md:w-3/4'><img src={emailSample_ii} alt='email i' loading='lazy' className='w-full h-auto' /></div>

          <div className="bg-gradient-to-l from-blue-300 to-[#fff] p-2 w-full text-2xl font-semibold text-center">
            Email II
          </div>
          <p className='w-full md:w-1/2 py-2 px-4 bg-gray-400'>Within 10 - 14 Days of SUBMITTING APPLICATION</p>
          
          <div className='w-full md:w-3/4'><img src={emailSample_iii} alt='email i' loading='lazy' className='w-full h-auto' /></div>
          <div className='w-full md:w-3/4'><img src={emailSample_iv} alt='email i' loading='lazy' className='w-full h-auto' /></div>

          <div className="bg-gradient-to-l from-blue-300 to-[#fff] p-2 w-full text-2xl font-semibold text-center">
            Email III
          </div>
          <p className='w-full md:w-1/2 py-2 px-4 bg-gray-400'>Within 15 - 21 Days of SUBMITTING APPLICATION</p>
          
          <div className='w-full md:w-3/4'><img src={emailSample_v} alt='email i' loading='lazy' className='w-full h-auto' /></div>
          <div className='w-full md:w-3/4'><img src={emailSample_vi} alt='email i' loading='lazy' className='w-full h-auto' /></div>

          <div className="bg-gradient-to-l from-blue-300 to-[#fff] p-2 w-full text-2xl font-semibold text-center">
            Email IV
          </div>
          <p className='w-full md:w-1/2 py-2 px-4 bg-gray-400'>Within 21 - 27 Days of SUBMITTING APPLICATION</p>
          
          <div className='w-full md:w-3/4'><img src={emailSample_vii} alt='email i' loading='lazy' className='w-full h-auto' /></div>

          <div className="mt-4">
          <button
            onClick={() => handleSubmit()}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage7Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage7Completed}
          >
            {isStage7Completed ? "Stage 7: Completed" : "Stage 7: Submit"}
          </button>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Stage7Masters;
