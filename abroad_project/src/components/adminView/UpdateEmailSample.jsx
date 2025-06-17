import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = "/stage-seven-email-samples/";
const KEYS = [
  "sample_i",
  "sample_ii",
  "sample_iii",
  "sample_iv",
  "sample_v",
  "sample_vi",
  "sample_vii",
];

const UpdateEmailSample = () => {
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);
  const [existingUrls, setExistingUrls] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing record
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`);
      const payload = response.data;
      const results = Array.isArray(payload) ? payload : payload.results || [];
      if (results.length > 0) {
        const rec = results[0];
        setRecordId(rec.id);
        const urls = {};
        KEYS.forEach((key) => {
          urls[key] = rec[key] || null;
        });
        setExistingUrls(urls);
      }
    } catch (err) {
      console.error("Failed to load email samples", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const { name, files: selected } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selected[0] }));
    // remove existing url preview if new file selected
    setExistingUrls((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // only append files if provided
    KEYS.forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });
    try {
      if (recordId) {
        await axios.patch(
          `${API_BASE_URL}${ENDPOINT}${recordId}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Email samples updated successfully.");
      } else {
        await axios.post(
          `${API_BASE_URL}${ENDPOINT}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Email samples created successfully.");
      }
      navigate('/admin_dashboard');
    } catch (err) {
      console.error("Failed to save email samples", err);
      alert("An error occurred while saving.");
    //   navigate('/admin_dashboard');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <>
    <Nav />
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {recordId ? "Update" : "Create"} Stage VII Email Samples
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {KEYS.map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-2 font-medium capitalize">
              {key.replace(/_/g, ' ')}
            </label>
            {existingUrls[key] && (
              <a
                href={existingUrls[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mb-1"
              >
                View existing file
              </a>
            )}
            <input
              type="file"
              id={key}
              name={key}
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="border rounded px-3 py-2"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {recordId ? "Update Samples" : "Save Samples"}
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateEmailSample;
