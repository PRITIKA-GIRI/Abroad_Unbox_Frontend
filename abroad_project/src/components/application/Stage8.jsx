import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Stage8 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [stageVideo, setStageVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [sessionData, setSessionData] = useState({limit: null});


  const fetchEvents = () => {
    axios
      .get(`${API_BASE_URL}/stage-eight-sessions/`)
      .then(({ data }) => {
        setEvents(data);
        if (data.length > 0) {
          setSessionData({ limit: data[0].limit });
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  };


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
  const stage8Data = stagesDetail.find((item) => item.stage === "8");
  const isStage8Completed = stage8Data?.is_complete === "completed";

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(response.data);
    } catch (err) {
      console.log("Failed to get stage videos", err);
    }
  };

  useEffect(() => {
    getStages();
    getStageVideo();
    fetchEvents();
  }, []);

  const now = new Date();
  const upcoming = events.filter((ev) => {
    const [y, m, d] = ev.date.split("-").map(Number);
    const [h, min] = ev.start_time.split(":").map(Number);
    const evDateTime = new Date(y, m - 1, d, h, min);
    return evDateTime >= now;
  });
  const expired = events.filter((ev) => {
    const [y, m, d] = ev.date.split("-").map(Number);
    const [h, min] = ev.start_time.split(":").map(Number);
    const evDateTime = new Date(y, m - 1, d, h, min);
    return evDateTime < now;
  });

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    const month = monthNames[parseInt(m, 10) - 1];
    return `${y} ${month} ${d}`;
  };

  const videoUrl1 = stageVideo[0]?.stage8_video1;
  const videoUrl2 = stageVideo[0]?.stage8_video1;

  const handleSubmit = async () => {
    if (isStage8Completed) return;
  
    try {
      if (!registeredEvent) {
        alert("Please register for a session before submitting.");
        return;
      }
  
      const payload = {
        student: studentID,
        applied_session: [
          {
            id: registeredEvent.id,
            display_range: registeredEvent.display_range,
          },
        ],
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/stage-eight-submissions/`,
        payload
      );
  
      if (response) {
        console.log(response.data);
        alert("Stage 8 submission successful! (Wait for admin approval to unlock next stage)");
        getStages();
        editStageEight(registeredEvent.id, registeredEvent.limit);
      }
    } catch (error) {
      console.log("Failed to post the form data", error);
      alert("Failed to submit Stage 8. Please try again.");
    }
  };
  

  const editStageEight = async (sessionId, currentLimit) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/stage-eight-sessions/${sessionId}/`,
        {
          limit: currentLimit - 1,
        }
      );
      console.log("Session limit updated:", response.data);
    } catch (error) {
      console.log("Failed to edit Stage 8 session", error);
    }
  };
  

  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 8:</h2>
        <h2 className="text-xl font-semibold mt-6">VISA</h2>
        <p className="font-medium mt-5">
          Not it is the time of the application where we do the visa
          application. Some of you already have the visa application and
          documents done.
        </p>
        <p className="font-medium mt-5">
          Also, we are at the phase where we need to have you visa preparation
          going as well.
        </p>
        <p className="font-medium mt-3">Also, be sure to register for the visa session time. These session will be conducted both online and offline. So, no matter where you are, we got you covered.</p>
      </div>
      <div className="w-full md:w-3/4 bg-white h-svh p-4">
        <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
          <p>DS 160</p>
          <div className="flex justify-end items-end">
            {/* <FaCirclePlus className="text-green-900 text-2xl" /> */}
          </div>
        </div>
        <div>
          <div className="bg-gray-300 px-5 py-3  mt-2 text-center w-full tect-center">
            <p className="text-xl font-medium">DS 160</p>
          </div>
          <iframe
            className="w-full h-[300px] md:h-[400px] mt-2"
            src={videoUrl1}
            allowFullScreen
          />
        </div>
        <div>
          <div className="bg-gray-300 px-5 py-3 w-full mt-2 text-center">
            <p className="text-xl font-medium">CGI Portal</p>
          </div>
          <iframe
            className="w-full h-[300px] md:h-[400px] mt-2"
            src={videoUrl2}
          ></iframe>
        </div>
        <div className=" px-5 py-3 w-[80%] mx-auto mt-2 text-center">
          <p className="text-md font-semibold">
            You can always call or email us if you need any help. Please Make
            sure you have done everything right and let us <i>REVIEW</i> your
            progress before final submission.
          </p>
        </div>
        <div>
          <a
            href="mailto:abroadunbox@gmail.com"
            className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-lg"
          >
            Contact Abroad Unbox Team
          </a>
        </div>
        <div className="w-full flex justify-between px-4 py-3 bg-gradient-to-r text-xl from-white to-blue-300 mt-3">
          <p className="text-xl font-semibold">Visa Preparation</p>
        </div>
        <div className="px-5 py-3 mt-2 text-center w-[96%] mx-auto">
          Now it is about time for getting you ready for visa interview. This is
          going to be a 4 - 6 weeks online or in-person session.
        </div>
        <div className="w-3/4 mx-auto px-4 py-2 bg-gradient-to-r from-white to-blue-300">
          Register for a session
        </div>
        <div className="w-3/4 mx-auto p-3 bg-gray-100 mt-3 rounded-lg space-y-2">
          <p className="mb-2 font-semibold">Available Sessions:</p>
          {upcoming.map((ev) => (
            <div className="bg-blue-300 px-3 py-1 flex justify-between items-center rounded-lg">
              <p>{`${formatDate(ev.date)} | ${
                ev.display_range.split(" | ")[1]
              }`}</p>
              
              <button
                onClick={() => {
                  setIsRegistered(true);
                  setRegisteredEvent(ev);
                }}
                className={`py-1 px-3 font-semibold rounded-lg transition ${
                  isStage8Completed || ev.limit === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-300 hover:bg-green-400 cursor-pointer"
                }`}
                disabled={ev.limit === 0 || isStage8Completed}
              >
                Register
              </button>
            </div>
          ))}

        </div>

        {isRegistered && registeredEvent && (
            <div className="text-green-600 mt-2 w-[90%] mx-auto p-3 bg-gray-100 rounded-lg">
              <p>
                You are registered for this session:{" "}
                {`${formatDate(registeredEvent.date)} | ${
                  registeredEvent.display_range.split(" | ")[1]
                }`}
              </p>
              <button
                onClick={() => {
                  setIsRegistered(false);
                  setRegisteredEvent(null);
                }}
                className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg"
              >
                Unregister
              </button>
            </div>
          )}

        <div className="mt-4">
          <button
            onClick={() => handleSubmit()}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage8Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage8Completed}
          >
            {isStage8Completed ? "Stage 8: Completed" : "Stage 8: Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Stage8;
