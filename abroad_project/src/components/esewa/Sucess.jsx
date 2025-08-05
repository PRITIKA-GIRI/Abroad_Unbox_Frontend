import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import Nav from "../Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const studentID = localStorage.getItem("student_id");

export default function EsewaSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState(null);
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState("");

  // Decode once from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("data");
    if (!encoded) {
      setError("No payment data found in URL.");
      return;
    }
    try {
      const jsonString = atob(encoded);
      setReceipt(JSON.parse(jsonString));
    } catch (err) {
      console.error(err);
      setError("Failed to decode or parse payment data.");
    }
  }, [location.search]);

  // POST once, then strip query params
  useEffect(() => {
    if (!receipt || posted) return;

    (async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/after-visa-payments/`,
          {
            student: studentID,
            transaction_code:    receipt.transaction_code,
            status:              receipt.status,
            total_amount:        receipt.total_amount,
            transaction_uuid:    receipt.transaction_uuid,
            product_code:        receipt.product_code,
            signed_field_names:  receipt.signed_field_names,
            signature:           receipt.signature,
            payment_type:        "After Visa",
          }
        );
        setPosted(true);

        // remove ?data=... so refresh won't re-POST
        navigate(location.pathname, { replace: true });
      } catch (err) {
        console.error("Failed to store transaction:", err);
        setError("Failed to store transaction details.");
      }
    })();
  }, [receipt, posted, navigate, location.pathname]);

  return (
    <>
      <Nav />
      <div className="w-full mt-8 flex flex-col items-center gap-6">
        <div className="w-full max-w-sm bg-gray-200 p-6 rounded-lg shadow-lg text-center">
          <FaCheck size={50} className="text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Payment successful!
          </h1>
          <p className="mb-4">
            Your payment of <strong>RS. {receipt?.total_amount}</strong> was successful.
          </p>
          <Link
            to="/"
            className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-center">Payment Details</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {receipt && (
            <div className="space-y-2 text-sm">
              <p><strong>Transaction Code:</strong> {receipt.transaction_code}</p>
              <p><strong>Status:</strong> {receipt.status}</p>
              <p><strong>Total Amount:</strong> RS. {receipt.total_amount}</p>
              <p><strong>Student ID:</strong> {studentID}</p>
              {/* <pre className="bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify(receipt, null, 2)}
              </pre> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}