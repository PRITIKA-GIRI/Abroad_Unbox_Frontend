// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaHome, FaTrash } from "react-icons/fa";
// import Nav from "../Nav";
// import { Link } from "react-router-dom";
// import { FaCheck } from "react-icons/fa6";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const EsewaSucess = () => {
//   return (
//     <>
//     <Nav />
//     <div className="w-full mt-8">
//         <div className="w-1/4 mx-auto justify-center space-y-3 bg-gray-200 p-3 rounded-lg shadow-lg">
//             <div className="w-full"><FaCheck size={50} className="border-2 p-2 rounded-full text-green-600" /></div>
//             <h1 className="text-2xl font-bold text-green-600">Payment successful!</h1>
//             <p className="">Yout payment of <i>RS, 5000</i> for after visa was successful.</p>
//             <Link to="/" className="flex items-center bg-gray-700 text-white px-4 py-2 w-fit rounded-lg mx-auto hover:bg-gray-800">Back to Home</Link>
//         </div>
//     </div>
//     </>
//   )}

// export default EsewaSucess;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome, FaTrash } from "react-icons/fa";
import Nav from "../Nav";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const studentID = localStorage.getItem("student_id");

function EsewaSuccess() {
  const location = useLocation();
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("data");
    if (!encoded) {
      setError("No payment data found in URL.");
      return;
    }

    try {
      // Base64 decode (browser built‑in)
      const jsonString = atob(encoded);
      // Parse JSON
      const parsed = JSON.parse(jsonString);
      setReceipt(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to decode or parse payment data.");
    }
  }, [location.search]);

  useEffect(() => {
    if (!receipt) return;
    (async () => {

    try {
      if (!receipt) {
        alert("Transaction detail not found!.");
        return;
      }
  
      const payload = {
        student: studentID,
        transaction_code: receipt.transaction_code,
        status: receipt.status,
        total_amount: receipt.total_amount,
        transaction_uuid: receipt.transaction_uuid,
        product_code: receipt.product_code,
        signed_field_names: receipt.signed_field_names,
        signature: receipt.signature,
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/after-visa-payments/`,
        payload
      );

      console.log("Transaction detail stored sucessfully!");
    } catch (error) {
      console.log("Failed to post the transaction data", error);
      alert("Failed to store transaction details.");
    }
  })();
}, [receipt]);

  return (
    <>
      <Nav />
      <div className="w-full mt-8">
        <div className="w-1/4 mx-auto space-y-3 bg-gray-200 p-3 rounded-lg shadow-lg">
          <div className="w-full text- center">
            <FaCheck size={50} className="border-2 p-2 rounded-full text-green-600 mx- auto" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 text- center">
            Payment successful!
          </h1>
          <p className="text- center">
            Your payment of <i>RS. 5000</i> for after visa was successful.
          </p>
          <Link
            to="/"
            className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 w-fit rounded-lg mx-auto hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>

        <div className="w-1/4 mx-auto mt-6 p-3 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Payment Details</h2>

          {error && (
            <p className="text-red-500 font-medium">{error}</p>
          )}

          {receipt && (
            <>
            <pre className="whitespace- pre-wrap overflow-scroll text-sm bg-gray-50 p-2 rounded">
              {JSON.stringify(receipt, null, 2)}
            </pre>
            
            <p><strong>Transaction Code: </strong>{receipt.transaction_code}</p>
            <p><strong>Status: </strong>{receipt.status}</p>
            <p><strong>Total Amount: </strong>RS. {receipt.total_amount}</p>
            <p><strong>Student ID: </strong> {studentID}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EsewaSuccess;
