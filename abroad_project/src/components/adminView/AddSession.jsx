import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Nav from "../Nav";
import { FaUsersViewfinder } from "react-icons/fa6";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddSession() {
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limit, setLimit] = useState(1);
  const [meetingLink, setMeetingLink] = useState("");
  const startRef = useRef();
  const endRef = useRef();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  // const [openSessionStudent, setOpenSessionStudent] = useState(false);
  const [sessionStudent, setSessionStudent] = useState([]);
  const [openSessionStudentId, setOpenSessionStudentId] = useState(null);
  
  // edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchSessionStudents = async () => {
    if (openSessionStudentId === null) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student-sessions/?session=${openSessionStudentId}`
      );
      setSessionStudent(response.data);
    } catch (err) {
      console.error("Error fetching session students:", err);
    }
  };


  const fetchEvents = () => {
    axios
      .get(`${API_BASE_URL}/stage-eight-sessions/`)
      .then(({ data }) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (openSessionStudentId !== null) {
      fetchSessionStudents();
    }
  }, [openSessionStudentId]);

  // helper to trim seconds from time strings
  const trimTime = (timeStr) => timeStr?.length > 5 ? timeStr.slice(0,5) : timeStr;

  const openEdit = (ev) => {
    setIsEditing(true);
    setEditId(ev.id);
    setDate(ev.date);
    setEndDate(ev.end_date);
    setLimit(ev.limit);
    setMeetingLink(ev.meeting_link || "");
    // trim seconds for inputs
    startRef.current.value = trimTime(ev.start_time);
    endRef.current.value = trimTime(ev.end_time);
  };

  const resetForm = () => {
    setDate("");
    setEndDate("");
    setLimit(1);
    setMeetingLink("");
    startRef.current.value = "00:00";
    endRef.current.value = "00:00";
    setError(null);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // get raw values
    let start_time = startRef.current.value;
    let end_time = endRef.current.value;
    // ensure "HH:MM" format
    start_time = trimTime(start_time);
    end_time = trimTime(end_time);

    if (!date || !endDate || !start_time || !end_time || !limit) {
      setError("All fields are required.");
      return;
    }

    const payload = { date, end_date: endDate, start_time, end_time, limit, meeting_link: meetingLink || null };

    try {
      if (isEditing && editId) {
        await axios.patch(
          `${API_BASE_URL}/stage-eight-sessions/${editId}/`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Session updated successfully");
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/stage-eight-sessions/`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        setEvents((prev) => [...prev, response.data]);
        alert("Session created successfully");
      }
      fetchEvents();
      resetForm();
    } catch (err) {
      console.error("Error saving session:", err);
      setError(isEditing ? "Failed to update session." : "Failed to create session.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/stage-eight-sessions/${id}/`);
      alert("Session deleted successfully");
      fetchEvents();
    } catch (err) {
      console.error("Error deleting session", err);
      setError("Failed to delete session.");
    }
  };

  const now = new Date();
  const upcoming = events.filter((ev) => new Date(`${ev.date}T${trimTime(ev.start_time)}`) >= now);
  const expired = events.filter((ev) => new Date(`${ev.date}T${trimTime(ev.start_time)}`) < now);

  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto p-4 flex flex-col md:flex-row gap-5">
        {/* Form */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-lg text-center mb-4">{isEditing ? "Edit Session" : "Add Session"}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="block font-medium">Start Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Start Time <i>(24-hour Format)</i></label>
              <input
                type="time"
                defaultValue="00:00"
                ref={startRef}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">End Time <i>(24-hour Format)</i></label>
              <input
                type="time"
                defaultValue="00:00"
                ref={endRef}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Number of Students</label>
              <input
                type="number"
                min="1"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium">Meeting Link</label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://"
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {isEditing ? "Update Session" : "Add Session"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Available Sessions */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg overflow-auto max-h-[60vh]">
          <p className="font-semibold text-lg text-center mb-4">Available Sessions</p>
          <ul className="space-y-2">
            {upcoming.map((ev) => (
              <li key={ev.id} className="border p-3 rounded flex flex-col gap-1 text-sm">
                <span>{ev.display_range}</span>
                <span>Student Limit: {ev.limit}</span>
                {/* {ev.meeting_link && (
                  <a href={ev.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Join Meeting</a>
                )} */}
                <div className="flex self-end gap-2.5 mt-2">
                  <FaUsersViewfinder title="View Students" className="text-green-500 cursor-pointer hover:text-green-700 text-xl" onClick={() => setOpenSessionStudentId(ev.id)}/>
                  <FaEdit title="Edit Session" className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl" onClick={() => openEdit(ev)} />
                  <FaTrash title="Delete Session" className="text-red-500 cursor-pointer hover:text-red-700 text-xl" onClick={() => handleDelete(ev.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Expired Sessions */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg overflow-auto max-h-[60vh]">
          <p className="font-semibold text-lg text-center mb-4">Expired Sessions</p>
          <ul className="space-y-2">
            {expired.map((ev) => (
              <li key={ev.id} className="border p-3 rounded flex flex-col gap-1 text-sm">
                <span>{ev.display_range}</span>
                <span>Limit: {ev.limit}</span>
                {/* {ev.meeting_link && (
                  <a href={ev.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Meeting Link</a>
                )} */}
                <div className="flex self-end gap-2.5 mt-2">
                <FaUsersViewfinder title="View Students" className="text-green-500 cursor-pointer hover:text-green-700 text-xl" onClick={() => setOpenSessionStudentId(ev.id)}/>
                  <FaTrash title="Delete Session" className="text-red-500 cursor-pointer hover:text-red-700 text-xl" onClick={() => handleDelete(ev.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
      {openSessionStudentId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/5">
            <h2 className="text-xl font-semibold mb-4">Session Students </h2>
            {/* <p>{openSessionStudentId}</p> */}
            {sessionStudent.length > 0 ? (
              <ul className="space-y-2">
                {sessionStudent.map((student) => (
                  <li key={student.id} className="border p-3 rounded flex flex-col gap-1 text-sm">
                    <div><span>{student.student_name} {student.last_name}</span> | 
                    <span className="text-yellow-600"> {student.display_range}</span></div>
                    <div><span className="text-gray-500">{student.email}</span> |
                    <span className="text-gray-500"> {student.contact_number}</span></div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No students enrolled in this session.</p>
            )}

            {/* Here you would render the students for the session */}
            <button
              onClick={() => setOpenSessionStudentId(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}
