import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import { Link, useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EsewaFail() {
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

  return (
    <>
      <Nav />
      <div className="w-full mt-8">
        <div className="w-1/4 mx-auto space-y-3 bg-gray-200 p-3 rounded-lg shadow-lg">
          <div className="w-full text- center">
            <ImCross size={50} className="border-2 p-2 rounded-full text-red-600 mx- auto" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 text- center">
            Payment Failed!
          </h1>
          <p className="text- center">
            Your payment of <i>RS. 5000</i> for after visa was unsuccessful.
          </p>
          <Link
            to="/"
            className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 w-fit rounded-lg mx-auto hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </>
  );
}

export default EsewaFail;