import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Nav from "../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AddSession() {
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(1);
  const startRef = useRef();
  const endRef = useRef();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEvents = () => {
    axios
      .get(`${API_BASE_URL}/stage-eight-sessions/`)
      .then(({ data }) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const start_time = startRef.current.value;
    const end_time = endRef.current.value;

    if (!date || !start_time || !end_time || !limit) {
      setError("All fields are required.");
      return;
    }

    const payload = { date, start_time, end_time, limit };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/stage-eight-sessions/`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setEvents((prev) => [...prev, response.data]);
      setDate("");
      setLimit(1);
      startRef.current.value = "00:00";
      endRef.current.value = "00:00";
      alert("Session created successfully");
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/stage-eight-sessions/${id}/`
      );
      alert("Session deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting session", error);
      setError("Failed to delete session.");
    }
  };

  const now = new Date();
  const upcoming = events.filter(ev => {
    const [y, m, d] = ev.date.split('-').map(Number);
    const [h, min] = ev.start_time.split(':').map(Number);
    const evDateTime = new Date(y, m - 1, d, h, min);
    return evDateTime >= now;
  });

  const expired = events.filter(ev => {
    const [y, m, d] = ev.date.split('-').map(Number);
    const [h, min] = ev.start_time.split(':').map(Number);
    const evDateTime = new Date(y, m - 1, d, h, min);
    return evDateTime < now;
  });

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    const month = monthNames[parseInt(m, 10) - 1];
    return `${y} ${month} ${d}`;
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto p-4 flex flex-col md:flex-row gap-5">
        {/* Form */}
        <div className="w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
          <p className="font-semibold text-lg text-center">Add Sessions</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Start Time <i>(24-hour format)</i></label>
              <input
                type="time"
                defaultValue="00:00"
                ref={startRef}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium">End Time <i>(24-hour format)</i></label>
              <input
                type="time"
                defaultValue="00:00"
                ref={endRef}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Number of Student</label>
              <input
                type="number"
                min="1"
                value={limit}
                onChange={e => setLimit(Number(e.target.value))}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add Session
            </button>
          </form>
        </div>

        {/* Upcoming sessions */}
        <div className="max-h-[60svh] overflow-scroll w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
          <p className="font-semibold text-lg text-center">Available Sessions</p>
          <ul className="space-y-2 mt-6">
            {upcoming.map(ev => (
              <li key={ev.id} className="border p-3 rounded flex justify-between text-sm">
                {`${formatDate(ev.date)} | ${ev.display_range.split(' | ')[1]} | Limit: ${ev.limit}`}
                <FaTrash
                  onClick={() => handleDelete(ev.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 ml-10"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Expired sessions */}
        <div className="max-h-[60svh] overflow-scroll w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
          <p className="font-semibold text-lg text-center">Expired Sessions</p>
          <ul className="space-y-2 mt-6">
            {expired.map(ev => (
              <li key={ev.id} className="border p-3 rounded flex justify-between text-sm">
                {`${formatDate(ev.date)} | ${ev.display_range.split(' | ')[1]} | Limit: ${ev.limit}`}
                <FaTrash
                  onClick={() => handleDelete(ev.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700 ml-10"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}











// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";
// import Nav from "../Nav";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function AddSession() {
//   const [date, setDate] = useState("");
//   const startRef = useRef();
//   const endRef = useRef();
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchEvents = () => {
//     axios
//       .get(`${API_BASE_URL}/stage-eight-sessions/`)
//       .then(({ data }) => setEvents(data))
//       .catch((err) => console.error("Error fetching events:", err));
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const start_time = startRef.current.value;
//     const end_time = endRef.current.value;

//     if (!date || !start_time || !end_time) {
//       setError("All fields are required.");
//       return;
//     }

//     const payload = { date, start_time, end_time };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/stage-eight-sessions/`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEvents((prev) => [...prev, response.data]);
//       setDate("");
//       startRef.current.value = "00:00";
//       endRef.current.value = "00:00";
//       alert("Session created successfully");
//     } catch (err) {
//       console.error("Error creating session:", err);
//       setError("Failed to create event.");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this session?"
//     );
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(
//         `${API_BASE_URL}/stage-eight-sessions/${id}/`
//       );
//       alert("Session deleted successfully");
//       fetchEvents();
//     } catch (error) {
//       console.error("Error deleting session", error);
//       setError("Failed to delete session.");
//     }
//   };

//   // split upcoming vs expired
//   const today = new Date();
//   const upcoming = events.filter(ev => new Date(ev.date) >= today);
//   const expired = events.filter(ev => new Date(ev.date) < today);

//   return (
//     <>
//       <Nav />
//       <div className="w-11/12 mx-auto p-4 flex flex-col md:flex-row gap-5">
//         {/* Form */}
//         <div className="w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
//           <p className="font-semibold text-lg text-center">Add Sessions</p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <p className="text-red-600">{error}</p>}

//             <div>
//               <label className="block font-medium">Date</label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={e => setDate(e.target.value)}
//                 className="mt-1 block w-full border rounded p-2"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Start Time</label>
//               <input
//                 type="time"
//                 defaultValue="00:00"
//                 ref={startRef}
//                 className="mt-1 block w-full border rounded p-2"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">End Time (24-hour format)</label>
//               <input
//                 type="time"
//                 defaultValue="00:00"
//                 ref={endRef}
//                 className="mt-1 block w-full border rounded p-2"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Add Session
//             </button>
//           </form>
//         </div>

//         {/* Upcoming sessions */}
//         <div className="max-h-[60svh] overflow-scroll w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
//           <p className="font-semibold text-lg text-center">Available Sessions</p>
//           <ul className="space-y-2 mt-6">
//             {upcoming.map(ev => (
//               <li key={ev.id} className="border p-3 rounded flex justify-between">
//                 {`${ev.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1 $2 $3')} | ${ev.display_range.split(' | ')[1]}`}
//                 <FaTrash
//                   onClick={() => handleDelete(ev.id)}
//                   className="text-red-500 cursor-pointer hover:text-red-700 ml-10"
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Expired sessions */}
//         <div className="max-h-[60svh] overflow-scroll w-full md:w-1/3 bg-gray-100 p-2 rounded-lg">
//           <p className="font-semibold text-lg text-center">Expired Sessions</p>
//           <ul className="space-y-2 mt-6">
//             {expired.map(ev => (
//               <li key={ev.id} className="border p-3 rounded flex justify-between">
//                 {`${ev.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1 $2 $3')} | ${ev.display_range.split(' | ')[1]}`}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
