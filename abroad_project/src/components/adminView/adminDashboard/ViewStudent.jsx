import React, {useEffect} from "react";
import Nav from "../../Nav"; 
import { IoMdEye, IoMdPaper } from "react-icons/io";
import { Gi3dStairs } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewStudent() {
    const [students, setStudents] = React.useState([]); // Assuming you will fetch students data from an API or state management

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/students/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    
    }, []);


  return (
    <>
        <Nav />
        <div className="w-11/12 mx-auto p-3 mt-3 ">
            <h1 className="text-2xl font-bold mb-4 text-center ">View Students</h1>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
                        <th className="px-4 py-2 w-1/8">S.N.</th>
                        <th className="px-4 py-2 w-1/8">First Name</th>
                        <th className="px-4 py-2 w-1/8">Last Name</th> 
                        <th className="px-4 py-2 w-1/8">Email</th>
                        <th className="px-4 py-2 w-1/8">Gender</th>
                        <th className="px-4 py-2 w-1/8">Phone</th>
                        <th className="px-4 py-2 w-1/8">Level</th>
                        <th className="px-4 py-2 w-1/8">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample data, replace with actual data from your state or props */}
                    {students.map((student, index) => (
                        <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{student.first_name}</td>
                            <td className="px-4 py-2 text-center">{student.last_name}</td>
                            <td className="px-4 py-2 text-center">{student.email}</td>
                            <td className="px-4 py-2 text-center">{student.gender}</td>
                            <td className="px-4 py-2 text-center">{student.contact_number}</td>
                            <td className="px-4 py-2 text-center">{student.application_level}</td>
                            <td className="px-4 py-2 text-center flex justify-between gap-2">
                                <a href={`/view/student/detail/${student.id}`}>    
                                    <IoMdEye title="Views Detail" className="text-blue-500 cursor-pointer hover:text-blue-700 text-2xl" />
                                </a>

                                <a href={`/view/student/application/${student.id}`}> 
                                    <FaUserEdit title="Update Student's Detail" className="text-amber-400 cursor-pointer hover:text-amber-500 text-2xl" />
                                </a>

                                <a href={`/view/student/application/${student.id}`}> 
                                    <Gi3dStairs title="View Student's Application Progress" className="text-green-500 cursor-pointer hover:text-green-700 text-2xl" /> 
                                </a>

                                <a href={`/view/student/application/${student.id}`}>
                                    <MdDelete title="Delete Student" className="text-red-500 cursor-pointer hover:text-red-700 text-2xl" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>    
    </>
  );
}       
