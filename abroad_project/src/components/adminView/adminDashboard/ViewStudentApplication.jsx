import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Nav";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaHourglassStart, FaLock } from "react-icons/fa";

import StageOneStudentApplication from "./StageOneStudentApplication";
import StageTwoStudentApplication from "./StageTwoStudentApplication";
import StageThreeStudentApplication from "./StageThreeStudentApplication";
import StageFourStudentApplication from "./StageFourStudentApplication";
import StageFiveStudentApplication from "./StageFiveStudentApplication";
import StageSixStudentApplication from "./StageSixStudentApplication";
import StageSevenStudentApplication from "./StageSevenStudentApplication";
import StageEightStudentApplication from "./StageEightStudentApplication";
import StageNineStudentApplication from "./StageNineStudentApplication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewStudentApplication() {
  const { id } = useParams();
  const [studentApplicationDetail, setStudentApplicationDetail] = useState(null);
  const [student, setStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    // Fetch application stages for the given student
    const fetchStudentApplicationDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/application-time-stages/?student=${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentApplicationDetail(data);
      } catch (error) {
        console.error("Error fetching student application detail:", error);
      }
    };

    // Fetch student basic details
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/students/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudentApplicationDetail();
    fetchStudent();
  }, [id]);

  const handlePopUp = (stage, student) => {

    setShowPopup(true);
    setPopupContent({
      stage: stage,
      studentName: student
    });
  };

  // Loading states
  if (!studentApplicationDetail) {
    return (
      <>
        <Nav />
        <div className="w-11/12 mx-auto p-3 mt-3">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Loading Student Application...
          </h1>
        </div>
      </>
    );
  }

  if (!student) {
    return (
      <>
        <Nav />
        <div className="w-11/12 mx-auto p-3 mt-3">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Loading Student Details...
          </h1>
        </div>
      </>
    );
  }

  // Main content render
  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto p-3 mt-3">
        <h1 className="text-2xl font-bold mb-4 text-center">
          View Student Application
        </h1>

        <p className="text-center text-gray-600"><strong>Student:</strong> {student.first_name} {student.last_name} (<strong>ID:</strong> {id})</p>
        <p className="text-center text-gray-600"><strong>Level:</strong> {student.application_level}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {studentApplicationDetail.map((stage, index) => (
            <div key={index}>
              { stage.is_complete === "completed" && stage.is_locked === "unlocked" ? (
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between cursor-pointer" 
                    onClick={() => handlePopUp(stage.stage, student.first_name)}>
                  <h2 className="text-xl font-semibold">Stage: {stage.stage}</h2>
                    <IoIosCheckmarkCircle className="text-4xl text-green-700" />
                </div>
              ) : stage.is_complete === "pending" && stage.is_locked === "unlocked" ? (
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between cursor-pointer"
                    onClick={() => handlePopUp(stage.stage, student.first_name)}>
                    <h2 className="text-xl font-semibold">Stage: {stage.stage}</h2>
                    <FaHourglassStart className="text-4xl text-yellow-500" />
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between cursor-not-allowed">
                  <h2 className="text-xl font-semibold">Stage: {stage.stage}</h2>
                  <FaLock className="text-4xl" />
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="mt-3 w-full p-2 mx-auto">
            <Link to="/view/student" className="block w-1/2 md:w-1/3 px-4 py-2 text-center mx-auto bg-yellow-400 hover:bg-yellow-500 hover:text- white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg font-semibold text-xl">Go To Student</Link>
        </div>
      </div>
      {showPopup && (
      <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-2 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
          <button
            className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
            onClick={() => setShowPopup(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Stage {popupContent.stage} Detail </h2>
          <div className="my-2 border-b border-gray-300"></div>
          {/* <p><strong>Stage:</strong> {popupContent.stage}</p>
          <p><strong>Student:</strong> {popupContent.studentName}</p> */}

          <div className="max-h-[80dvh] overflow-y-auto p-2">
              {popupContent.stage === "1" ? (
                  <StageOneStudentApplication studentId={id} onClose={() => setShowPopup(false)}/>
              ) : popupContent.stage === "2" ? (
                  <StageTwoStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "3" ? (
                  <StageThreeStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "4" ? ( 
                  <StageFourStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "5" ? ( 
                <StageFiveStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "6" ? ( 
                <StageSixStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "7" ? ( 
                <StageSevenStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "8" ? ( 
                <StageEightStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : popupContent.stage === "9" ? ( 
                <StageNineStudentApplication studentId={id} onClose={() => setShowPopup(false)} />
              ) : (
                  <p className="text-gray-500">Details for this stage are not available yet.</p>
              )}
          </div>
                
          
        </div>
      </div>
    )}
    </>
    
  );
}

