import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Nav';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage9View = () => {
  const [stage9Data, setStage9Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStage9Data = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-nine-submissions/`
      );
      setStage9Data(response.data.results || []);
    } catch (err) {
      console.error('Failed to fetch the data', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (studentId, submissionId) => {
    try {
      // mark student stage as complete
      await axios.post(
        `${API_BASE_URL}/students/complete-stage/`,
        { stage: '9', student_id: studentId }
      );
      // update submission status
      await axios.patch(
        `${API_BASE_URL}/stage-nine-submissions/${submissionId}/`,
        { status: 'completed' }
      );
      alert('User stage 9 approved');
      // closePopup(); // remove or implement if needed
      getStage9Data();
    } catch (err) {
      console.error('Failed to approve or update status', err);
      alert('Approval failed. Please try again.');
    }
  };

  const handleDecline = async (submissionId) => {
    if (!window.confirm('Are you sure you want to decline stage 9?')) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/stage-nine-submissions/${submissionId}/`
      );
      alert('Stage 9 declined');
      getStage9Data();
    } catch (err) {
      console.error('Failed to delete the stage 9 submission', err);
      alert('Decline failed. Please try again.');
    }
  };

  useEffect(() => {
    getStage9Data();
  }, []);

  return (
    <>
      <Nav />
      <div className="w-[96%] mx-auto p-4">
        <table className="w-full border-collapse">
          <caption className="my-2 text-xl font-semibold md:text-2xl">
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
                <td colSpan="5" className="text-center px-4 py-4">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-red-600">
                  {error}
                </td>
              </tr>
            ) : stage9Data.length > 0 ? (
              stage9Data.map((data, index) => (
                <tr
                  key={data.id}
                  className="odd:bg-gray-50 bg-white hover:bg-gray-100 text-gray-900"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{data.student_name}</td>
                  <td className="px-4 py-4 capitalize">
                    {data.status || 'pending'}
                  </td>
                  <td className="px-4 py-4">
                    {data.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleApprove(data.student, data.id)
                          }
                          className="px-3 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecline(data.id)}
                          className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="italic text-gray-600">
                        {data.status.charAt(0).toUpperCase() +
                          data.status.slice(1)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {data.payment_status || 'Not Paid'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Stage9View;
