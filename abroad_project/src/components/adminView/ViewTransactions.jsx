import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewTransactions = () => {
  // state holds the paginated response
  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  // fetch transactions, optionally at a specific URL
  const getTransactions = async (url = `${API_BASE_URL}/after-visa-payments/`) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch payments data:', error);
    }
  };

  // load initial page
  useEffect(() => {
    getTransactions();
  }, []);

  // handlers for pagination
  const handlePrev = () => {
    if (data.previous) getTransactions(data.previous);
  };

  const handleNext = () => {
    if (data.next) getTransactions(data.next);
  };

  return (
    <>
    <Nav />
    <div className="p-6 w-[96%] mx-auto">
      <table className="w-full border-collapse">
        <caption className="text-xl md:text-2xl font-semibold text-center items-center mb-5">
          After Visa Transactions <span className='text-lg font-medium'>(No of Transactions: {data.count})</span>
        </caption>
        <thead className=''> 
          <tr className="bg-green-800 text-white">
            <th className="px-4 py-3 text-left">S.No</th>
            <th className="px-4 py-3 text-left">Student Name</th>
            <th className="px-4 py-3 text-left">Transaction Code</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Payent For</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((tx, index) => (
            <tr
              key={tx.id}
              className="border-b border-gray-300 odd:bg-gray-50 even:bg-white hover:bg-gray-100"
            >
              <td className="px-4 py-4">{index + 1}.</td>
              <td className="px-4 py-4">{tx.student_name}</td>
              <td className="px-4 py-4">{tx.transaction_code}</td>
              <td className="px-4 py-4">
                {new Date(tx.transaction_at).toLocaleString()}
              </td>
              <td className="px-4 py-4">{tx.payment_type}</td>
              <td className="px-4 py-4">{tx.total_amount}</td>
              <td className="px-4 py-4">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={!data.previous}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!data.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default ViewTransactions;
