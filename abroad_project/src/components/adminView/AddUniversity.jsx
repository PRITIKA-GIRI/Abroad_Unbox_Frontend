import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddUniversity = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [universities, setUniversities] = useState([]);

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/universities/`);
      setUniversities(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch universities:",
        err.response || err.message
      );
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/universities/`, { name });

      alert("Form submitted successfully!");
      setName(""); // Clear form
      fetchUniversities(); // Refresh university list
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto mt-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-bold">Add University</h2>

          <label>University Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. University of NY"
            className="border p-3 w-full mb-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-white to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Stage 4: Submit"}
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">University List:</h3>
          {universities.length === 0 ? (
            <p>No universities found.</p>
          ) : (
            <ul className="list-disc pl-5">
              {universities.map((uni) => (
                <li key={uni.id}>{uni.name} </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUniversity;
