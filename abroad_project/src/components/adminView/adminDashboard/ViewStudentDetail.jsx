import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Nav";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewStudentDetail() {

    const { id } = useParams();
    const[student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/students/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudent(data);}
            catch (error) {
                console.error('Error fetching student detail:', error);
            }
        }
        fetchStudentDetail();
    }, [parseInt(id)]);

    if (!student) {
        return (
            <>
                <Nav />
                <div className="w-11/12 mx-auto p-3 mt-3">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Loading Student Detail...
                    </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />

            <div className="w-11/12 mx-auto p-3 mt-3">
                <h1 className="text-2xl font-bold mb-4 text-center">Student Detail for {student.first_name}</h1>

                <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div> <strong>First Name:</strong> {student.first_name}</div>
                        <div> <strong>Last Name:</strong> {student.last_name}</div>
                        <div> <strong>Email:</strong> {student.email} </div>
                        <div> <strong>Contact Number:</strong> {student.contact_number} </div>
                        <div> <strong>Date of Birth:</strong> {new Date(student.date_of_birth).toLocaleDateString()} </div>
                        <div> <strong>Gender:</strong> {student.gender} </div>
                        <div> <strong>Application Level:</strong> {student.application_level} </div>
                        <div> <strong>Obtained GPA/Percent:</strong> {student.obtained_gpa_percent} </div>
                        <div> <strong>Total GPA/Percent:</strong> {student.total_gpa_percent} </div>
                        <div> <strong>Major:</strong> {student.major} </div>
                        {/* <div> <strong>Expected Intake:</strong> {new Date(student.expected_intake).toLocaleDateString()} </div> */}
                        <div>
                            <strong>Expected Intake:</strong>{" "}
                            {new Date(student.expected_intake).toLocaleDateString(undefined, {
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                        <div> <strong>Profile Number:</strong> {student.profile_number} </div>
                    </div>
                </div>

                <div className="mt-3 w-full p-2 mx-auto">
                    <Link to="/view/student" className="block w-1/2 md:w-1/3 px-4 py-2 text-center mx-auto bg-blue-400 hover:bg-blue-500 hover:text-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg font-semibold text-xl">Go To Student</Link>
                </div>
            </div>
        </>
   );
}
