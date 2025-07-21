import React, { useEffect, useState } from "react";
import Nav from "../../Nav"; 
import { IoMdEye } from "react-icons/io";
import { Gi3dStairs } from "react-icons/gi";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // search term state
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async (url = `${API_BASE_URL}/students/`) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setStudents(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // search handler
  const handleSearch = () => {
    const term = searchTerm.trim();
    const url = term
      ? `${API_BASE_URL}/students/?search=${encodeURIComponent(term)}`
      : `${API_BASE_URL}/students/`;
    fetchStudents(url);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setStudents((prev) => prev.filter((s) => s.id !== id));
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto p-3 mt-3 ">
        <h1 className="text-2xl font-bold mb-4 text-center">View Students</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center mb-2 font-semibold">
            <div>
                <button
                    onClick={() => fetchStudents(`${API_BASE_URL}/students/`)}
                    className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg w-full cursor-pointer hover:text-white text-gray-100 transition-colors duration-200"
                >
                    All
                </button>
            </div>
            <div>
                <button
                    onClick={() => fetchStudents(`${API_BASE_URL}/students/?application_level=undergraduate`)}
                    className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg w-full cursor-pointer hover:text-white text-gray-100 transition-colors duration-200"
                >
                    Undergraduate
                </button>
            </div>
            <div>
                <button
                    onClick={() => fetchStudents(`${API_BASE_URL}/students/?application_level=graduate`)}
                    className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg w-full cursor-pointer hover:text-white text-gray-100 transition-colors duration-200"
                >
                    Graduate
                </button>
            </div>
            <div className="flex gap-2.5 items-center w-full">
                <input
                type="search"
                name="search_std"
                className="border border-gray-400 rounded-lg p-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by Name or Email."
                />
                <span>
                <FaSearch title="Search Student" className="text-2xl cursor-pointer" onClick={handleSearch} />
                </span>
            </div>
        </div>

        {loading ? (
          <p>Loading ...</p>
        ) : (
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
              {students.map((student, index) => (
                <tr key={student.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{student.first_name}</td>
                  <td className="px-4 py-2 text-center">{student.last_name}</td>
                  <td className="px-4 py-2 text-center">{student.email}</td>
                  <td className="px-4 py-2 text-center">{student.gender}</td>
                  <td className="px-4 py-2 text-center">{student.contact_number}</td>
                  <td className="px-4 py-2 text-center">{student.application_level}</td>
                  <td className="px-4 py-2 text-center flex justify-between gap-2">
                    <Link to={`/view/student/detail/${student.id}`}>
                      <IoMdEye title="Views Detail" className="text-blue-500 cursor-pointer hover:text-blue-700 text-2xl" />
                    </Link>
                    <Link to={`/update/student/${student.id}`}>
                      <FaUserEdit title="Update Student's Detail" className="text-amber-400 cursor-pointer hover:text-amber-500 text-2xl" />
                    </Link>
                    <Link to={`/view/student/application/${student.id}`}>
                      <Gi3dStairs title="View Student's Application Progress" className="text-green-500 cursor-pointer hover:text-green-700 text-2xl" />
                    </Link>
                    <button onClick={() => handleDelete(student.id)}>
                      <MdDelete title="Delete Student" className="text-red-500 cursor-pointer hover:text-red-700 text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-between mt-4 w-11/12 mx-auto">
          <button
            onClick={() => prevPage && fetchStudents(prevPage)}
            disabled={!prevPage}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {prevPage ? "Previous" : "First"}
          </button>
          <span className="text-gray-700">Total Students: {count}</span>
          <button
            onClick={() => nextPage && fetchStudents(nextPage)}
            disabled={!nextPage}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {nextPage ? "Next" : "Last"}
          </button>
        </div>
      </div>
    </>
  );
}
