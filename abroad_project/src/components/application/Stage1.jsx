import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
} from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage1 = () => {
  const [stageVideo, setStageVideo] = useState([]);
  const [stagesDetail, setStagesDetail] = useState([]);
  const [responseLink, setResponseLink] = useState([]);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMindsetOpen, setIsMindsetOpen] = useState(true);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isCareerCounselingOpen, setIsCareerCounselingOpen] = useState(false);
  const [isEPTOpen, setIsEPTOpen] = useState(false);

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

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(response.data);
    } catch (err) {
      console.log("Failed to get stage videos", err);
    }
  };

  // Fetch Stage 1 video content (if any)
  const getVideoLink = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-one-content/`);
      if (response) {
        setResponseLink(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch the video link", error);
    }
  };

  // When component mounts, load both video link and stage statuses
  useEffect(() => {
    getVideoLink();
    getStageVideo();
    getStages();
    // eslint-disable-next-line
  }, []);

  // Redirect to add a new video (admin only)
  const handleRedirect = () => {
    navigate("/stage1/add_video");
  };

  // Delete existing video content
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the whole video content?"
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${API_BASE_URL}/stage-one-content/${id}/`
      );
      if (response) {
        alert("Stage 1 video content deleted successfully");
        getVideoLink();
      } else {
        console.log(response.data.detail);
      }
    } catch (error) {
      console.log("Failed to delete the data", error);
    }
  };

  // Navigate to edit video page
  const handleEdit = (id) => {
    navigate(`/stage1/edit_video/${id}`);
  };

  // Submit completion for Stage 1
  const handleSubmit = async (stageId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stage-one-submissions/`,
        { stage: stageId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response) {
        console.log(response.data);
        alert("Stage 1 (one) submission successful!");
        // Refresh stages so the button state updates
        getStages();
      }
    } catch (error) {
      console.log("Failed to post the form data", error);
      setError(error.response?.data?.detail || "");
    }
  };

  // Check if Stage 1 is marked "completed" in the fetched stages array
  const stage1Data = stagesDetail.find((item) => item.stage === "1");
  const isStage1Completed = stage1Data?.is_complete === "completed";

  const videoUrl1 = stageVideo[0]?.bachelors_stage1_the_mindset_video;
  const videoUrl2 = stageVideo[0]?.bachelors_stage1_the_timeline_video;
  const videoUrl3 = stageVideo[0]?.bachelors_stage1_career_counseling_video;
  const videoUrl4 = stageVideo[0]?.bachelors_stage1_english_proficiency_test_video;

  return (
    <div className="flex md:flex-row-reverse flex-col">
      {/* Sidebar / Description */}
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center text-xs md:text-base">
        <h2 className="text-2xl underline font-bold">Stage 1:</h2>
        <h2 className="text-xl font-semibold mt-6">Understanding the Basics</h2>
        <p className="font-medium mt-5">
          We need to understand the ramification of our decisions to go Abroad.
        </p>
        <p className="font-medium mt-5 ">
          It's always a good idea to understand the reason we should or
          shouldn't go to the US. Always a good idea to understand the reason we
          should or shouldn't go to the USA.
        </p>
        <p className="font-medium mt-5 ">
          Getting a comprehensive understanding of what to do is very important.
        </p>
        <p className="font-medium mt-5 ">
          Don't forget, your major is going to define the life you are going to
          have.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-white h-svh p-4 md:overflow-scroll">
        {/* Admin controls: Add / Edit / Delete / View */}
        {role === "admin" &&
          (responseLink.length === 0 ? (
            <div className="flex justify-end items-end">
              <button
                className="px-3 py-2 my-2 rounded-lg text-white bg-green-800"
                onClick={handleRedirect}
              >
                Add Video
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-2 items-center">
              <button
                className="px-3 py-2 my-2 rounded-lg"
                title="Edit Video"
                onClick={() => handleEdit(responseLink[0]?.id)}
              >
                <FaRegEdit className="text-blue-500 text-xl" />
              </button>
              <button
                className="px-3 py-2 my-2 rounded-lg"
                title="Delete Video"
                onClick={() => handleDelete(responseLink[0]?.id)}
              >
                <MdDelete className="text-red-600 text-xl" />
              </button>
              <div>
                <Link to="/stage1/view">
                  <button className="px-3 py-2 my-2 rounded-lg bg-blue-200">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}

        {/* SESSION I: The Mindset */}
        {/* <div className="bg-gradient-to-r from-white to-blue-300 p-2 flex items-center">
        <p className="text-2xl font-semibold text-center">The Mindset</p>
        {isMindsetOpen
          ? (
            <MdOutlineExpandLess
              className="ml-auto text-4xl cursor-pointer"
              onClick={() => setIsMindsetOpen(false)}
            />
          )
          : (
            <MdOutlineExpandMore
              className="ml-auto text-4xl cursor-pointer"
              onClick={() => setIsMindsetOpen(true)}
            />
          )
        }
      </div> */}
        <div
          className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full flex items-center cursor-pointer"
          onClick={() => setIsMindsetOpen((o) => !o)}
        >
          <p className="text-2xl font-semibold text-center">The Mindset</p>
          {isMindsetOpen ? (
            <MdOutlineExpandLess className="ml-auto text-4xl" />
          ) : (
            <MdOutlineExpandMore className="ml-auto text-4xl" />
          )}
        </div>

        {/* Expandable content */}
        {isMindsetOpen && (
          <div className="mt-2">
            <div className="bg-gradient-to-r from-white to-green-300 px-5 py-3 text-center w-full">
              <p className="text-xl font-medium">SESSION I - The Mindset</p>
            </div>
            <iframe
              className="w-full h-[400px] mt-2"
              src={videoUrl1}
              allowFullScreen
              title="Session 1 - The Mindset"
            />
            <a
              href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20The%20Mindset"
              className="block mx-auto mt-2 w-2/3 md:w-1/3"
            >
              <div className="bg-green-300 px-5 py-3 text-center rounded">
                <p className="text-xl font-medium">Request Appointment</p>
              </div>
            </a>
          </div>
        )}

        {/* SESSION II: The Timeline */}
        <div
          className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full flex items-center cursor-pointer mt-3"
          onClick={() => setIsTimelineOpen((o) => !o)}
        >
          <p className="text-2xl font-semibold text-center">The Timeline</p>
          {isTimelineOpen ? (
            <MdOutlineExpandLess className="ml-auto text-4xl" />
          ) : (
            <MdOutlineExpandMore className="ml-auto text-4xl" />
          )}
        </div>
        {isTimelineOpen && (
          <div className="mt-2">
            <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 text-center w-full">
              <p className="text-xl font-medium">SESSION II - The Timeline</p>
            </div>
            <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl2}
              allowFullScreen
              title="Session 2 - The Timeline"
            />

            <a
              href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20Application%20Timeline"
              className="block mx-auto mt-2 w-2/3 md:w-1/3"
            >
              <div className="bg-green-300 px-5 py-3 text-center rounded">
                <p className="text-xl font-medium">Request Appointment</p>
              </div>
            </a>
          </div>
        )}

        {/* SESSION III: Career Counseling & Major Selection */}
        <div
          className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full mt-3 cursor-pointer flex items-center"
          onClick={() => setIsCareerCounselingOpen((o) => !o)}
        >
          <p className="text-2xl font-semibold text-center">
            Career Counseling & Major Selection
          </p>
          {isCareerCounselingOpen ? (
            <MdOutlineExpandLess className="ml-auto text-4xl" />
          ) : (
            <MdOutlineExpandMore className="ml-auto text-4xl" />
          )}
        </div>

        {isCareerCounselingOpen && (
          <div className="mt-2">
            <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 text-center w-full">
              <p className="text-xl font-medium">SESSION III - Career</p>
            </div>
            <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl3}
              allowFullScreen
              title="Session 3 - Career Counseling"
            />

            <a
              href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20Career%20Counseling"
              className="block mx-auto mt-2 w-2/3 md:w-1/3"
            >
              <div className="bg-green-300 px-5 py-3 text-center rounded">
                <p className="text-xl font-medium">Request Appointment</p>
              </div>
            </a>
          </div>
        )}

        {/* EPT Section */}
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold mt-3 text-center flex items-center"
          onClick={() => setIsEPTOpen((o) => !o)}
        >
          <p className="text-2xl font-semibold text-center">English Proficiency Test (EPT)</p>
          {isEPTOpen ? (
            <MdOutlineExpandLess className="ml-auto text-4xl" />
          ) : (
            <MdOutlineExpandMore className="ml-auto text-4xl" />
          )}
        </div>

        {isEPTOpen && (
        <div className="gap-5 w-full mt-2">
          <iframe
            className="w-full h-[300px] md:h-[400px] mt-2"
            src={videoUrl4}
            allowFullScreen
            title="Session 3 - Career Counseling"
          />

          <div className="flex flex-col md:flex-row gap-5 px-3 mt-2">
            <a
              href="https://englishtest.duolingo.com/applicants"
              className="bg-yellow-300 hover:bg-yellow-400 shadow-lg px-5 mx-auto py-3 w-2/3 md:w-1/2 text-center rounded-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-xl font-medium">Practice Module</p>
            </a>

            <a
              href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Stage%20one%20EPT"
              className="bg-green-300 hover:bg-green-400 shadow-lg px-5 py-3 mx-auto w-2/3 md:w-1/2 text-center rounded-lg"
            >
                <p className="text-xl font-medium">Request Appointment</p>
            </a>
          </div>
        </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-lg text-center text-red-500 mt-3">{error}</p>
        )}

        {/* Submit / Completed Button */}
        <div className="mt-4">
          <button
            onClick={() => handleSubmit(responseLink[0]?.stage)}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage1Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage1Completed}
          >
            {isStage1Completed ? "Stage 1: Completed" : "Stage 1: Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stage1;
