import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function RegisterStudent() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    try {
      const response = await axios.post(`${API_BASE_URL}/students/`
        ,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log(response);
        alert("New student added successfully");
        navigate('/register_student');
      }
    } catch (error) {
      console.error("Failed to post the student data", error);
    }
  };
  return (
    <>
      <Nav/>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded-lg shadow-gray-300 shadow-md mt-10"
      >
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Firstname</label>
          <input
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
          <label className="block mb-1 font-semibold">Lastname</label>
          <input
            type="text"
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
export default RegisterStudent;
