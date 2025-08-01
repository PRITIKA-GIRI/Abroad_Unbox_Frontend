import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardSection() {
    const studentId = localStorage.getItem("student_id");
    const [studentDetail, setStudentDetail] = useState(null)
    const [studentStages, setStudentStages] = useState([]);
    const [currentStage, setCurrentStage] = useState(null);

    // Fetch studentas
    const fetchStudentDetail = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/students/${studentId}/`);
            setStudentDetail(response.data);
        } catch (error) {
            console.error("Error fetching student detail:", error);
            setStudentDetail(null);
        }
    }

    const fetchStages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/application-time-stages/?student=${studentId}`);
            setStudentStages(response.data);
        } catch (error) {
            console.error("Error fetching student's stages:", error);
            setStudentStages([]);
        }
    }

    useEffect(() => {
        if (studentId) {
            fetchStudentDetail();
            fetchStages();
        }
    }, [studentId]);

    useEffect(() => {
        if (studentStages.length > 0) {
          // Filter unlocked stages
          const unlockedStages = studentStages.filter(stage => stage.is_locked === "unlocked");
      
          // Get the highest unlocked stage number
          const lastUnlockedStage = Math.max(...unlockedStages.map(stage => parseInt(stage.stage)));
      
          setCurrentStage(lastUnlockedStage);
        }
      }, [studentStages]);


    return (
        <>
            <div className="w-full">
                <h2 className="py-4 text-xl font-semibold text-center bg-blue-400 rounded-lg">Student Dashboard</h2>

                <div className="w-11/12 p-2 mx-auto mt-3 border rounded-t-lg">
                    <h2 className="text-center border-b border-gray-300 text-lg font-semibold py-1.5">Student Profile of {studentId}</h2>
                    {studentDetail ? (
                        <div className="mt-3 space-y-2">
                            <div><strong>Name: </strong>{studentDetail.first_name} {studentDetail.last_name}</div>
                            <div><strong>Profile Number: </strong><span>{studentDetail.profile_number}</span></div>
                            <div><strong>email: </strong>{studentDetail.email}</div>
                            <div><strong>Phone: </strong><span>{studentDetail.contact_number}</span></div>
                            <div><strong>Application Level: </strong><span>{studentDetail.application_level}</span></div>
                            <div><strong>Major: </strong><span>{studentDetail.major}</span></div>
                            <div><strong>Date of Birth: </strong><span>{studentDetail.date_of_birth}</span></div>
                        </div>
                    ) : (
                        <p>Loading Student Detail ...</p>
                    )}
                </div>

                <div className="w-11/12 p-2 mx-auto mt-1 border rounded-b-lg">
                    <h2 className="text-center border-b border-gray-300 text-lg font-semibold py-1.5">Application Portal</h2>
                    <div className="mt-2"><strong>Stage Progression: </strong> <span>{currentStage}/9</span></div>
                    <Link to="/application-sat-payment"><button className="px-4 py-2 my-3 bg-gray-200 rounded-lg shadow-lg cursor-pointer hover:bg-blue-400">Go to Application Portal</button></Link>
                </div>
            </div>
        </>
    )
}
