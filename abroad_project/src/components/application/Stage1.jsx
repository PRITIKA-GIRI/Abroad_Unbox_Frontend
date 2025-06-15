import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage1 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [responseLink, setResponseLink] = useState([]);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  return (
    <div className="flex md:flex-row flex-col">
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
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
          The Mindset
        </div>
        <div className="mt-2">
          <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 text-center w-full">
            <p className="text-xl font-medium">SESSION I - The Mindset</p>
          </div>
          {responseLink.length > 0 && (
            <iframe
              className="w-full h-[400px] mt-2"
              src={responseLink[0]?.video_link1}
              allowFullScreen
              title="Session 1 - The Mindset"
            />
          )}
          <a
            href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20The%20Mindset"
            className="block mx-auto mt-2 w-1/2 md:w-1/3"
          >
            <div className="bg-green-300 px-5 py-3 text-center rounded">
              <p className="text-xl font-medium">Request Appointment</p>
            </div>
          </a>
        </div>

        {/* SESSION II: The Timeline */}
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold mt-8 text-center">
          The Timeline
        </div>
        <div className="mt-2">
          <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 text-center w-full">
            <p className="text-xl font-medium">SESSION II - The Timeline</p>
          </div>
          {responseLink.length > 0 && (
            <iframe
              className="w-full h-[600px] mt-2"
              src={responseLink[0]?.video_link2}
              allowFullScreen
              title="Session 2 - The Timeline"
            />
          )}
          <a
            href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20Application%20Timeline"
            className="block mx-auto mt-2 w-1/2 md:w-1/3"
          >
            <div className="bg-green-300 px-5 py-3 text-center rounded">
              <p className="text-xl font-medium">
                Request Appointment
              </p>
            </div>
          </a>
        </div>

        {/* SESSION III: Career Counseling & Major Selection */}
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold mt-8 text-center">
          Career Counseling & Major Selection
        </div>
        <div className="mt-2">
          <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 text-center w-full">
            <p className="text-xl font-medium">SESSION III - Career</p>
          </div>
          {responseLink.length > 0 && (
            <iframe
              className="w-full h-[600px] mt-2"
              src={responseLink[0]?.video_link3}
              allowFullScreen
              title="Session 3 - Career Counseling"
            />
          )}
          <a
            href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20Career%20Counseling"
            className="block mx-auto mt-2 w-1/2 md:w-1/3"
          >
            <div className="bg-green-300 px-5 py-3 text-center rounded">
              <p className="text-xl font-medium">
                Request Appointment
              </p>
            </div>
          </a>
        </div>

        {/* EPT Section */}
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold mt-8 text-center">
          English Proficiency Test (EPT)
        </div>
        <div className="flex gap-5 w-full mt-2">
          <a
            href="https://englishtest.duolingo.com/applicants"
            className="bg-yellow-300 px-5 py-3 w-1/2 text-center rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xl font-medium">Practice Module</p>
          </a>
          <a
            href="mailto:abroadunbox@gmail.com?subject=Request%20for%20Appointment%20for%20English%20Proficiency"
            className="bg-green-300 px-5 py-3 w-1/2 text-center rounded"
          >
            <p className="text-xl font-medium">Request Appointment</p>
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-lg text-center text-red-500 mt-3">
            {error}
          </p>
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
