import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage9View = () => {
  const [stage9Data, setStage9Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/stage-nine-submissions/`);
      setStage9Data(response.data.results || []);
    } catch (err) {
      console.error("Failed to get the stage 9 data", err);
      setError("Failed to load Stage 9 data.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    window.confirm(`Are you sure you want to decline the stage 9th of this student?`);
    if (!window.confirm) return;
    try {
      await axios.delete(`${API_BASE_URL}/stage-nine-submissions/${id}/`, {
        status: newStatus,
      });
      getData(); 
    } catch (err) {
      console.error(`Failed to update status to ${newStatus}`, err);
    }
  };

  const handleUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/stage-nine-submissions/${id}/`, {
        status: newStatus,
      });
      getData(); 
    } catch (err) {
      console.error(`Failed to update status to ${newStatus}`, err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-[96%] mx-auto p-4'>
      <table className="w-full border-collapse">
        <caption className='my-2 text-xl font-semibold md:text-2xl'>
          Stage 9 Submissions
        </caption>
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="px-4 py-3 text-left">S.No</th>
            <th className="px-4 py-3 text-left">Student Name</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
            <th className="px-4 py-3 text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center px-4 py-4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center px-4 py-4 text-red-600">{error}</td>
            </tr>
          ) : stage9Data.length > 0 ? (
            stage9Data.map((data, index) => (
              <tr
                key={data.id}
                className="odd:bg-gray-50 bg-white hover:bg-gray-100 text-gray-900"
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{data.student_name}</td>
                <td className="px-4 py-4 capitalize">{data.status || "pending"}</td>
                <td className="px-4 py-4 flex gap-3">
                  <button
                    className="px-3 py-2 bg-green-600 rounded text-white hover:bg-green-700"
                    onClick={() => handleUpdate(data.id, "completed")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-2 bg-red-600 rounded text-white hover:bg-red-700"
                    onClick={() => updateStatus(data.id, "declined")}
                  >
                    Decline
                  </button>
                </td>
                <td className="px-4 py-4">{data.payment_status || "Not Paid"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-4">No submissions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Stage9View;
