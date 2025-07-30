// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const Stage8 = () => {
//   const [stagesDetail, setStagesDetail] = useState([]);
//   const [stageVideo, setStageVideo] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [date, setDate] = useState("");
//   const [events, setEvents] = useState([]);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [registeredEvent, setRegisteredEvent] = useState(null);
//   const [sessionData, setSessionData] = useState({limit: null});
//   const [isDS160Open, setIsDS160Open] = useState(false);
//   const [isCGIPortalOpen, setIsCGIPortalOpen] = useState(false);

//   const fetchEvents = () => {
//     axios
//       .get(`${API_BASE_URL}/stage-eight-sessions/`)
//       .then(({ data }) => {
//         setEvents(data);
//         if (data.length > 0) {
//           setSessionData({ limit: data[0].limit });
//         }
//       })
//       .catch((err) => console.error("Error fetching events:", err));
//   };


//   const studentID = localStorage.getItem("student_id");

//   const getStages = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/application-time-stages/?student=${studentID}`
//       );
//       setStagesDetail(response.data);
//     } catch (err) {
//       console.log("Failed to get stages data", err);
//     }
//   };
//   const stage8Data = stagesDetail.find((item) => item.stage === "8");
//   const isStage8Completed = stage8Data?.is_complete === "completed";

//   const getStageVideo = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
//       setStageVideo(response.data);
//     } catch (err) {
//       console.log("Failed to get stage videos", err);
//     }
//   };

//   useEffect(() => {
//     getStages();
//     getStageVideo();
//     fetchEvents();
//   }, []);

//   const now = new Date();
//   const upcoming = events.filter((ev) => {
//     const [y, m, d] = ev.date.split("-").map(Number);
//     const [h, min] = ev.start_time.split(":").map(Number);
//     const evDateTime = new Date(y, m - 1, d, h, min);
//     return evDateTime >= now;
//   });
//   const expired = events.filter((ev) => {
//     const [y, m, d] = ev.date.split("-").map(Number);
//     const [h, min] = ev.start_time.split(":").map(Number);
//     const evDateTime = new Date(y, m - 1, d, h, min);
//     return evDateTime < now;
//   });

//   const formatDate = (dateStr) => {
//     const [y, m, d] = dateStr.split("-");
//     const month = monthNames[parseInt(m, 10) - 1];
//     return `${y} ${month} ${d}`;
//   };

//   const videoUrl1 = stageVideo[0]?.stage8_video1;
//   const videoUrl2 = stageVideo[0]?.stage8_video1;

//   const handleSubmit = async () => {
//     if (isStage8Completed) return;
  
//     try {
//       if (!registeredEvent) {
//         alert("Please register for a session before submitting.");
//         return;
//       }
  
//       const payload = {
//         student: studentID,
//         applied_session: [
//           {
//             id: registeredEvent.id,
//             display_range: registeredEvent.display_range,
//           },
//         ],
//       };
  
//       const response = await axios.post(
//         `${API_BASE_URL}/stage-eight-submissions/`,
//         payload
//       );
  
//       if (response) {
//         console.log(response.data);
//         alert("Stage 8 submission successful! (Wait for admin approval to unlock next stage)");
//         getStages();
//         editStageEight(registeredEvent.id, registeredEvent.limit);
//       }
//     } catch (error) {
//       console.log("Failed to post the form data", error);
//       alert("Failed to submit Stage 8. Please try again.");
//     }
//   };
  

//   const editStageEight = async (sessionId, currentLimit) => {
//     try {
//       const response = await axios.patch(
//         `${API_BASE_URL}/stage-eight-sessions/${sessionId}/`,
//         {
//           limit: currentLimit - 1,
//         }
//       );
//       console.log("Session limit updated:", response.data);
//     } catch (error) {
//       console.log("Failed to edit Stage 8 session", error);
//     }
//   };
  

//   return (
//     <div className="flex md:flex-row-reverse flex-col">
//       <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
//         <h2 className="text-2xl underline font-bold">Stage 8:</h2>
//         <h2 className="text-xl font-semibold mt-6">VISA</h2>
//         <p className="font-medium mt-5">
//           Not it is the time of the application where we do the visa
//           application. Some of you already have the visa application and
//           documents done.
//         </p>
//         <p className="font-medium mt-5">
//           Also, we are at the phase where we need to have you visa preparation
//           going as well.
//         </p>
//         <p className="font-medium mt-3">Also, be sure to register for the visa session time. These session will be conducted both online and offline. So, no matter where you are, we got you covered.</p>
//       </div>
//       <div className="w-full md:w-3/4 bg-white h-svh p-4 md:overflow-scroll">
//         <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
//           <p>DS 160</p>
//           <div className="flex justify-end items-end">
//             {/* <FaCirclePlus className="text-green-900 text-2xl" /> */}
//           </div>
//         </div>
//         <div>
//           <div className="relative bg-gray-300 px-5 py-3 text-xl font-medium mt-2 text-center w-full tect-center flex items-center cursor-pointer"
//           onClick={() => setIsDS160Open(!isDS160Open)}>
//             <p className="absolute left-1/2 transform -translate-x-1/2">DS 160</p>
//             {isDS160Open ? (
//               <MdOutlineExpandLess className="ml-auto text-4xl" />
//             ) : (
//               <MdOutlineExpandMore className="ml-auto text-4xl" />
//             )}
//           </div>

//           {isDS160Open && (
//             <>
//           {videoUrl1 ? (
//           <iframe
//             className="w-full h-[300px] md:h-[400px] mt-2"
//             src={videoUrl1}
//             allowFullScreen
//           />
//           ) : (
//             <p className="text-center text-red-500 mt-2">
//               Video for DS 160 is not available at the moment.
//             </p>
//           )} 
//           </>
//           )} 
//         </div>
//         <div>
//           <div className="relative bg-gray-300 px-5 py-3 w-full text-xl font-medium mt-2 text-center flex items-center cursor-pointer"
//           onClick={() => setIsCGIPortalOpen(!isCGIPortalOpen)}>
//             <p className="absolute left-1/2 transform -translate-x-1/2">CGI Portal</p>
//             {isCGIPortalOpen ? (
//               <MdOutlineExpandLess className="ml-auto text-4xl" />
//             ) : (
//               <MdOutlineExpandMore className="ml-auto text-4xl" />
//             )}
//           </div>

//           {isCGIPortalOpen && (
//             <>
//               {videoUrl2 ? (
//               <iframe className="w-full h-[300px] md:h-[400px] mt-2" src={videoUrl2}></iframe>
//               ) : (
//                 <p className="text-center text-red-500 mt-2">
//                   Video for CGI Portal is not available at the moment.
//                 </p>
//               )}
//             </>
//           )}  
//         </div>
//         <div className=" px-5 py-3 w-[80%] mx-auto mt-2 text-center">
//           <p className="text-md font-semibold">
//             You can always call or email us if you need any help. Please Make
//             sure you have done everything right and let us <i>REVIEW</i> your
//             progress before final submission.
//           </p>
//         </div>
//         <div>
//           <a
//             href="mailto:abroadunbox@gmail.com"
//             className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-lg"
//           >
//             Contact Abroad Unbox Team
//           </a>
//         </div>
//         <div className="w-full flex justify-between px-4 py-3 bg-gradient-to-r text-xl from-white to-blue-300 mt-3">
//           <p className="text-xl font-semibold">Visa Preparation</p>
//         </div>
//         <div className="px-5 py-3 mt-2 text-center w-[96%] mx-auto">
//           Now it is about time for getting you ready for visa interview. This is
//           going to be a 4 - 6 weeks online or in-person session.
//         </div>
//         <div className="w-3/4 mx-auto px-4 py-2 bg-gradient-to-r from-white to-blue-300">
//           Register for a session
//         </div>
//         <div className="w-3/4 mx-auto p-3 bg-gray-100 mt-3 rounded-lg space-y-2">
//           <p className="mb-2 font-semibold">Available Sessions:</p>
//           {upcoming.map((ev) => (
//             <div className="bg-blue-300 px-3 py-1 flex justify-between items-center rounded-lg">
//               <p>{`${formatDate(ev.date)} | ${
//                 ev.display_range.split(" | ")[1]
//               }`}</p>
              
//               <button
//                 onClick={() => {
//                   setIsRegistered(true);
//                   setRegisteredEvent(ev);
//                 }}
//                 className={`py-1 px-3 font-semibold rounded-lg transition ${
//                   isStage8Completed || ev.limit === 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-green-300 hover:bg-green-400 cursor-pointer"
//                 }`}
//                 disabled={ev.limit === 0 || isStage8Completed}
//               >
//                 Register
//               </button>
//             </div>
//           ))}

//         </div>

//         {isRegistered && registeredEvent && (
//             <div className="text-green-600 mt-2 w-[90%] mx-auto p-3 bg-gray-100 rounded-lg">
//               <p>
//                 You are registered for this session:{" "}
//                 {`${formatDate(registeredEvent.date)} | ${
//                   registeredEvent.display_range.split(" | ")[1]
//                 }`}
//               </p>
//               <button
//                 onClick={() => {
//                   setIsRegistered(false);
//                   setRegisteredEvent(null);
//                 }}
//                 className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg"
//               >
//                 Unregister
//               </button>
//             </div>
//           )}

//         <div className="mt-4">
//           <button
//             onClick={() => handleSubmit()}
//             className={`w-full py-4 text-2xl font-semibold mt-3 ${
//               isStage8Completed
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
//             }`}
//             disabled={isStage8Completed}
//           >
//             {isStage8Completed ? "Stage 8: Completed" : "Stage 8: Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Stage8;














// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const monthNames = [
//   "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
// ];

// const Stage8 = () => {
//   const [stagesDetail, setStagesDetail] = useState([]);
//   const [stageVideo, setStageVideo] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [studentSession, setStudentSession] = useState(null);
//   const [sessionData, setSessionData] = useState({ limit: null });
//   const [isDS160Open, setIsDS160Open] = useState(false);
//   const [isCGIPortalOpen, setIsCGIPortalOpen] = useState(false);

//   const studentID = localStorage.getItem("student_id");
//   const now = new Date();

//   // fetch all available sessions
//   const fetchEvents = () => {
//     axios.get(`${API_BASE_URL}/stage-eight-sessions/`)
//       .then(({ data }) => {
//         setEvents(data);
//         if (data.length > 0) setSessionData({ limit: data[0].limit });
//       })
//       .catch(err => console.error("Error fetching events:", err));
//   };

//   // fetch student session, pick only upcoming one
//   const fetchStudentSession = () => {
//     axios.get(`${API_BASE_URL}/student-sessions/?student=${studentID}`)
//       .then(({ data }) => {
//         const upcomingSessions = data.filter(item => {
//           if (!item.session_start_date) return false;
//           const [y,m,d] = item.session_start_date.split("-").map(Number);
//           return new Date(y, m-1, d) >= now;
//         });
//         setStudentSession(upcomingSessions[0] || null);
//       })
//       .catch(err => console.error("Error fetching student session:", err));
//   };

//   const getStages = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/application-time-stages/?student=${studentID}`
//       );
//       setStagesDetail(response.data);
//     } catch (err) {
//       console.log("Failed to get stages data", err);
//     }
//   };

//   const getStageVideo = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
//       setStageVideo(response.data);
//     } catch (err) {
//       console.log("Failed to get stage videos", err);
//     }
//   };

//   useEffect(() => {
//     getStages();
//     getStageVideo();
//     fetchEvents();
//     fetchStudentSession();
//   }, []);

//   const stage8Data = stagesDetail.find(item => item.stage === "8");
//   const isStage8Completed = stage8Data?.is_complete === "completed";

//   const upcoming = events.filter(ev => {
//     const [y,m,d] = ev.date.split("-").map(Number);
//     const [h,min] = ev.start_time.split(':').map(Number);
//     return new Date(y, m-1, d, h, min) >= now;
//   });

//   const formatDate = dateStr => {
//     const [y,m,d] = dateStr.split("-");
//     const month = monthNames[parseInt(m,10)-1];
//     return `${y} ${month} ${d}`;
//   };

//   const videoUrl1 = stageVideo[0]?.stage8_video1;
//   const videoUrl2 = stageVideo[0]?.stage8_video2;

//   const handleRegister = async ev => {
//     // prevent duplicate or if already registered
//     if (studentSession) {
//       alert("You already have a registered upcoming session. Please unregister it before registering another.");
//       return;
//     }
//     if (ev.limit === 0) {
//       alert("This session is full.");
//       return;
//     }
//     try {
//       const payload = { student: studentID, session: ev.id };
//       const { data } = await axios.post(`${API_BASE_URL}/student-sessions/`, payload);
//       setStudentSession(data);
//       await axios.patch(
//         `${API_BASE_URL}/stage-eight-sessions/${ev.id}/`,
//         { limit: ev.limit - 1 }
//       );
//       fetchEvents();
//       alert("Session registered successfully.");
//     } catch (err) {
//       console.error("Registration failed", err);
//       alert("Failed to register. Please try again.");
//     }
//   };

//   const handleUnregister = async () => {
//     if (!studentSession) return;
//     // only allow if not started
//     const ev = events.find(e => e.id === studentSession.session);
//     const [y,m,d] = studentSession.session_start_date.split("-").map(Number);
//     if (new Date(y, m-1, d) <= now) {
//       alert("Cannot unregister past or started session.");
//       return;
//     }
//     try {
//       await axios.delete(`${API_BASE_URL}/student-sessions/${studentSession.id}/`);
//       await axios.patch(
//         `${API_BASE_URL}/stage-eight-sessions/${ev.id}/`,
//         { limit: ev.limit + 1 }
//       );
//       setStudentSession(null);
//       fetchEvents();
//       alert("Unregistered successfully.");
//     } catch (err) {
//       console.error("Unregistration failed", err);
//       alert("Failed to unregister. Please try again.");
//     }
//   };

//   return (
//     <div className="flex md:flex-row-reverse flex-col">
//       <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
//         <h2 className="text-2xl underline font-bold">Stage 8:</h2>
//         <h2 className="text-xl font-semibold mt-6">VISA</h2>
//         <p className="font-medium mt-5">Not it is the time of the application where we do the visa application. Some of you already have the visa application and documents done.</p>
//         <p className="font-medium mt-5">Also, we are at the phase where we need to have you visa preparation going as well.</p>
//         <p className="font-medium mt-3">Also, be sure to register for the visa session time. These session will be conducted both online and offline. So, no matter where you are, we got you covered.</p>
//       </div>
//       <div className="w-full md:w-3/4 bg-white h-svh p-4 md:overflow-scroll">
//         <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
//           <p>DS 160</p>
//         </div>
//         <div className="relative bg-gray-300 px-5 py-3 text-xl font-medium mt-2 text-center w-full flex items-center cursor-pointer" onClick={() => setIsDS160Open(!isDS160Open)}>
//           <p className="absolute left-1/2 transform -translate-x-1/2">DS 160</p>
//           {isDS160Open ? <MdOutlineExpandLess className="ml-auto text-4xl"/> : <MdOutlineExpandMore className="ml-auto text-4xl"/>}
//         </div>
//         {isDS160Open && (videoUrl1 ? <iframe className="w-full h-[300px] md:h-[400px] mt-2" src={videoUrl1} allowFullScreen/> : <p className="text-center text-red-500 mt-2">Video for DS 160 is not available at the moment.</p>)}

//         <div className="relative bg-gray-300 px-5 py-3 w-full text-xl font-medium mt-2 text-center flex items-center cursor-pointer" onClick={() => setIsCGIPortalOpen(!isCGIPortalOpen)}>
//           <p className="absolute left-1/2 transform -translate-x-1/2">CGI Portal</p>
//           {isCGIPortalOpen ? <MdOutlineExpandLess className="ml-auto text-4xl"/> : <MdOutlineExpandMore className="ml-auto text-4xl"/>}
//         </div>
//         {isCGIPortalOpen && (videoUrl2 ? <iframe className="w-full h-[300px] md:h-[400px] mt-2" src={videoUrl2}/> : <p className="text-center text-red-500 mt-2">Video for CGI Portal is not available at the moment.</p>)}

//         <div className="px-5 py-3 w-[80%] mx-auto mt-2 text-center">
//           <p className="text-md font-semibold">You can always call or email us if you need any help. Please Make sure you have done everything right and let us <i>REVIEW</i> your progress before final submission.</p>
//         </div>
//         <div><a href="mailto:abroadunbox@gmail.com" className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-lg">Contact Abroad Unbox Team</a></div>

//         <div className="w-full flex justify-between px-4 py-3 bg-gradient-to-r text-xl from-white to-blue-300 mt-3">
//           <p className="text-xl font-semibold">Visa Preparation</p>
//         </div>
//         <div className="px-5 py-3 mt-2 text-center w-[96%] mx-auto">
//           Now it is about time for getting you ready for visa interview. This is going to be a 4 - 6 weeks online or in-person session.
//         </div>
//         <div className="w-3/4 mx-auto px-4 py-2 bg-gradient-to-r from-white to-blue-300">Register for a session</div>

//         <div className="w-3/4 mx-auto p-3 bg-gray-100 mt-3 rounded-lg space-y-2">
//           <p className="mb-2 font-semibold">Available Sessions:</p>
//           {upcoming.map(ev => (
//             <div key={ev.id} className="bg-blue-300 px-3 py-1 flex justify-between items-center rounded-lg">
//               <p>{`${formatDate(ev.date)} | ${ev.display_range.split(" | ")[1]}`}</p>
//               <button
//                 onClick={() => handleRegister(ev)}
//                 className={`py-1 px-3 font-semibold rounded-lg transition ${ev.limit === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-300 hover:bg-green-400 cursor-pointer"}`}
//                 disabled={ev.limit === 0}
//               >Register</button>
//             </div>
//           ))}
//         </div>

//         {studentSession && (
//           <div className="text-green-600 mt-2 w-[90%] mx-auto p-3 bg-gray-100 rounded-lg">
//             <p>You are registered for this session: {`${formatDate(studentSession.session_start_date)} | ${studentSession.display_range.split(" | ")[1]}`}</p>
//             <button onClick={handleUnregister} className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg">Unregister</button>
//           </div>
//         )}

//         <div className="mt-4">
//           <button
//             onClick={() => alert("Please use the session register above to apply.")}
//             className={`w-full py-4 text-2xl font-semibold mt-3 ${isStage8Completed ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"}`}
//             disabled={false}
//           >{isStage8Completed ? "Stage 8: Completed" : "Stage 8: Submit"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Stage8;
















import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
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
  const [isDS160Open, setIsDS160Open] = useState(false);
  const [isCGIPortalOpen, setIsCGIPortalOpen] = useState(false);
  const [studentSessions, setStudentSessions] = useState([]);
  const [currentRegistration, setCurrentRegistration] = useState(null);

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

  const fetchStudentSessions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student-sessions/?student=${studentID}`
      );
      setStudentSessions(response.data);
      
      // Find current active registration (not expired and not ended)
      const now = new Date();
      const activeRegistration = response.data.find((session) => {
        const sessionEndDate = new Date(session.session_end_date);
        return sessionEndDate >= now;
      });
      
      if (activeRegistration) {
        setCurrentRegistration(activeRegistration);
        setIsRegistered(true);
        
        // Find the corresponding event details
        const eventDetails = events.find(ev => ev.id === activeRegistration.session);
        if (eventDetails) {
          setRegisteredEvent(eventDetails);
        }
      } else {
        setCurrentRegistration(null);
        setIsRegistered(false);
        setRegisteredEvent(null);
      }
    } catch (err) {
      console.error("Failed to fetch student sessions", err);
    }
  };

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

  useEffect(() => {
    if (events.length > 0) {
      fetchStudentSessions();
    }
  }, [events]);

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

  const videoUrl1 = stageVideo[0]?.bachelors_stage8_DS160_video;
  const videoUrl2 = stageVideo[0]?.bachelors_stage8_CGI_portal_video;

  const handleRegister = async (selectedEvent) => {
    try {
      // Check if student is already registered for any active session
      if (currentRegistration) {
        alert("You are already registered for a session. Please unregister first to register for a different session.");
        return;
      }

      // Check if session has available slots
      if (selectedEvent.limit <= 0) {
        alert("This session is full. Please choose another session.");
        return;
      }

      // Register for the session
      const sessionPayload = {
        student: studentID,
        session: selectedEvent.id
      };

      const sessionResponse = await axios.post(
        `${API_BASE_URL}/student-sessions/`,
        sessionPayload
      );

      if (sessionResponse) {
        // Update session limit
        await editStageEight(selectedEvent.id, selectedEvent.limit);
        
        // Refresh data
        fetchEvents();
        fetchStudentSessions();
        
        alert("Successfully registered for the session!");
      }
    } catch (error) {
      console.error("Failed to register for session", error);
      alert("Failed to register for session. Please try again.");
    }
  };

  const handleUnregister = async () => {
    try {
      if (!currentRegistration) {
        alert("No active registration found.");
        return;
      }

      // Check if session has started (cannot unregister after session starts)
      const sessionEvent = events.find(ev => ev.id === currentRegistration.session);
      if (sessionEvent) {
        const [y, m, d] = sessionEvent.date.split("-").map(Number);
        const [h, min] = sessionEvent.start_time.split(":").map(Number);
        const sessionStartDateTime = new Date(y, m - 1, d, h, min);
        
        if (new Date() >= sessionStartDateTime) {
          alert("Cannot unregister. The session has already started.");
          return;
        }
      }

      // Delete the student session registration
      await axios.delete(`${API_BASE_URL}/student-sessions/${currentRegistration.id}/`);
      
      // Restore session limit
      if (sessionEvent) {
        await editStageEight(sessionEvent.id, sessionEvent.limit + 1, true);
      }
      
      // Refresh data
      fetchEvents();
      fetchStudentSessions();
      
      alert("Successfully unregistered from the session!");
    } catch (error) {
      console.error("Failed to unregister from session", error);
      alert("Failed to unregister from session. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (isStage8Completed) return;
  
    try {
      if (!currentRegistration) {
        alert("Please register for a session before submitting.");
        return;
      }
  
      const payload = {
        student: studentID,
        applied_session: [
          {
            id: currentRegistration.session,
            display_range: events.find(ev => ev.id === currentRegistration.session)?.display_range || "",
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
      }
    } catch (error) {
      console.log("Failed to post the form data", error);
      alert("Failed to submit Stage 8. Please try again.");
    }
  };
  
  const editStageEight = async (sessionId, currentLimit, isIncrement = false) => {
    try {
      const newLimit = isIncrement ? currentLimit : currentLimit - 1;
      const response = await axios.patch(
        `${API_BASE_URL}/stage-eight-sessions/${sessionId}/`,
        {
          limit: newLimit,
        }
      );
      console.log("Session limit updated:", response.data);
    } catch (error) {
      console.log("Failed to edit Stage 8 session", error);
    }
  };

  // Check if student can register for a specific session
  const canRegisterForSession = (sessionEvent) => {
    // Cannot register if already registered for an active session
    if (currentRegistration) return false;
    
    // Cannot register if session is full
    if (sessionEvent.limit <= 0) return false;
    
    // Cannot register for past sessions
    const [y, m, d] = sessionEvent.date.split("-").map(Number);
    const [h, min] = sessionEvent.start_time.split(":").map(Number);
    const sessionDateTime = new Date(y, m - 1, d, h, min);
    if (sessionDateTime < now) return false;
    
    return true;
  };

  // Check if student can unregister from current session
  const canUnregisterFromSession = () => {
    if (!currentRegistration) return false;
    
    const sessionEvent = events.find(ev => ev.id === currentRegistration.session);
    if (!sessionEvent) return false;
    
    // Check if session has started
    const [y, m, d] = sessionEvent.date.split("-").map(Number);
    const [h, min] = sessionEvent.start_time.split(":").map(Number);
    const sessionStartDateTime = new Date(y, m - 1, d, h, min);
    
    // Can unregister if session hasn't started yet
    return now < sessionStartDateTime;
  };

  return (
    <div className="flex md:flex-row-reverse flex-col">
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
      <div className="w-full md:w-3/4 bg-white h-svh p-4 md:overflow-scroll">
        <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
          <p>DS 160</p>
          <div className="flex justify-end items-end">
            {/* <FaCirclePlus className="text-green-900 text-2xl" /> */}
          </div>
        </div>
        <div>
          <div className="relative bg-gray-300 px-5 py-3 text-xl font-medium mt-2 text-center w-full tect-center flex items-center cursor-pointer"
          onClick={() => setIsDS160Open(!isDS160Open)}>
            <p className="absolute left-1/2 transform -translate-x-1/2">DS 160</p>
            {isDS160Open ? (
              <MdOutlineExpandLess className="ml-auto text-4xl" />
            ) : (
              <MdOutlineExpandMore className="ml-auto text-4xl" />
            )}
          </div>

          {isDS160Open && (
            <>
          {videoUrl1 ? (
          <iframe
            className="w-full h-[300px] md:h-[400px] mt-2"
            src={videoUrl1}
            allowFullScreen
          />
          ) : (
            <p className="text-center text-red-500 mt-2">
              Video for DS 160 is not available at the moment.
            </p>
          )} 
          </>
          )} 
        </div>
        <div>
          <div className="relative bg-gray-300 px-5 py-3 w-full text-xl font-medium mt-2 text-center flex items-center cursor-pointer"
          onClick={() => setIsCGIPortalOpen(!isCGIPortalOpen)}>
            <p className="absolute left-1/2 transform -translate-x-1/2">CGI Portal</p>
            {isCGIPortalOpen ? (
              <MdOutlineExpandLess className="ml-auto text-4xl" />
            ) : (
              <MdOutlineExpandMore className="ml-auto text-4xl" />
            )}
          </div>

          {isCGIPortalOpen && (
            <>
              {videoUrl2 ? (
              <iframe className="w-full h-[300px] md:h-[400px] mt-2" src={videoUrl2}></iframe>
              ) : (
                <p className="text-center text-red-500 mt-2">
                  Video for CGI Portal is not available at the moment.
                </p>
              )}
            </>
          )}  
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
        
        {/* Show current registration if exists */}
        {currentRegistration && (
          <div className="w-3/4 mx-auto mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-green-800 font-semibold mb-2">Currently Registered:</p>
            <div className="bg-green-200 px-3 py-2 rounded-lg flex justify-between items-center">
              <p className="text-green-800">
                {formatDate(currentRegistration.session_start_date)} | {
                  events.find(ev => ev.id === currentRegistration.session)?.display_range?.split(" | ")[1] || "Session details"
                }
              </p>
              {canUnregisterFromSession() && (
                <button
                  onClick={handleUnregister}
                  className="py-1 px-3 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition cursor-pointer"
                >
                  Unregister
                </button>
              )}
            </div>
            {!canUnregisterFromSession() && (
              <p className="text-sm text-gray-600 mt-2">
                Cannot unregister - session has started or ended
              </p>
            )}
          </div>
        )}

        <div className="w-3/4 mx-auto p-3 bg-gray-100 mt-3 rounded-lg space-y-2">
          <p className="mb-2 font-semibold">Available Sessions:</p>
          {upcoming.length > 0 ? (
            upcoming.map((ev) => (
              <div key={ev.id} className="bg-blue-300 px-3 py-1 flex justify-between items-center rounded-lg">
                <p>{`${formatDate(ev.date)} | ${
                  ev.display_range.split(" | ")[1]
                } (${ev.limit} slots left)`}</p>
                
                <button
                  onClick={() => handleRegister(ev)}
                  className={`py-1 px-3 font-semibold rounded-lg transition ${
                    canRegisterForSession(ev)
                      ? "bg-green-300 hover:bg-green-400 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canRegisterForSession(ev)}
                >
                  {currentRegistration ? "Already Registered" : 
                   ev.limit <= 0 ? "Full" : "Register"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No upcoming sessions available</p>
          )}
        </div>

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