import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UpdateStudent() {
    const { id } = useParams();
    const student_id = parseInt(id);
    const [student, setStudent] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/students/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudent(data);
                setFormData(data); // Initialize formData with fetched data
            } catch (error) {
                console.error('Error fetching student detail:', error);
            }
        };
        fetchStudentDetail();
    }, [student_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
                method: 'PATCH', // Use PATCH instead of PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Student updated successfully!");
            } else {
                alert("Failed to update student.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

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
                <h1 className="text-2xl font-bold mb-4 text-center">Update Student</h1>
                <p className="text-center text-gray-600 mb-6">Update the details for student with ID: {id}</p>

                <form onSubmit={handleSubmit} className="shadow-md rounded-lg p-6 w-full md:w-2/3 mx-auto bg-gray-50">
                    {[
                        { label: "First Name", name: "first_name" },
                        { label: "Middle Name", name: "middle_name" },
                        { label: "Last Name", name: "last_name" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Contact Number", name: "contact_number" },
                        { label: "Secondary Number", name: "secondary_number" },
                        { label: "Date of Birth", name: "date_of_birth", type: "date" },
                        { label: "Obtained GPA/Percent", name: "obtained_gpa_percent" },
                        { label: "Total GPA/Percent", name: "total_gpa_percent" },
                        { label: "Major", name: "major" },
                        { label: "Expected Intake", name: "expected_intake" },
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <strong>{label}:</strong>
                            <input
                                type={type}
                                name={name}
                                className="mt-1 bg-white w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                value={formData[name] || ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <strong>Gender:</strong>
                        <select
                            name="gender"
                            className="bg-white mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            value={formData.gender || ""}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <strong>Application Level:</strong>
                        <select
                            name="application_level"
                            className="bg-white mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            value={formData.application_level || ""}
                            onChange={handleChange}
                        >
                            <option value="undergraduate">Bachelors</option>
                            <option value="graduate">Masters</option>
                        </select>
                    </div>

                    <input
                        type="submit"
                        value="Update Student"
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg cursor-pointer transition duration-300 ease-in-out"
                    />
                </form>
            </div>

            <div className="mt-3 w-full p-2 mx-auto">
                <Link to="/view/student" className="block w-1/2 md:w-1/3 px-4 py-2 text-center mx-auto bg-yellow-400 hover:bg-yellow-500 hover:text- white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg font-semibold text-xl">Go To Student</Link>
            </div>
        </>
    );
}
