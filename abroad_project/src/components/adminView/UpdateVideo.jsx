import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UpdateVideo = () => {
  const navigate = useNavigate();
  const initialState = {
    stage1_video1: "",
    stage1_video2: "",
    stage1_video3: "",
    stage4_video1: "",
    stage4_video2: "",
    stage5_video1: "",
    stage6_video1: "",
    stage7_video1: "",
    stage7_video2: "",
    stage8_video1: "",
    stage8_video2: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing record (supports both list and paginated)
  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      const payload = response.data;
      // handle paginated vs direct list
      const results = Array.isArray(payload)
        ? payload
        : payload.results || [];

      if (results.length > 0) {
        const record = results[0];
        setRecordId(record.id);
        setFormData({
          stage1_video1: record.stage1_video1 || "",
          stage1_video2: record.stage1_video2 || "",
          stage1_video3: record.stage1_video3 || "",
          stage4_video1: record.stage4_video1 || "",
          stage4_video2: record.stage4_video2 || "",
          stage5_video1: record.stage5_video1 || "",
          stage6_video1: record.stage6_video1 || "",
          stage7_video1: record.stage7_video1 || "",
          stage7_video2: record.stage7_video2 || "",
          stage8_video1: record.stage8_video1 || "",
          stage8_video2: record.stage8_video2 || "",
        });
      }
    } catch (err) {
      console.error("Failed to get stage videos", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStageVideo();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler: POST if no record, PATCH if exists
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recordId) {
        await axios.patch(
          `${API_BASE_URL}/stages-videos/${recordId}/`,
          formData
        );
        alert("Video links updated successfully.");
        navigate('/admin_dashboard');
      } else {
        await axios.post(
          `${API_BASE_URL}/stages-videos/`,
          formData
        );
        alert("Video links created successfully.");
        navigate('/admin_dashboard');
      }
    } catch (err) {
      console.error("Failed to save stage videos", err);
      alert("An error occurred while saving.");
    //   navigate('/admin_dashboard');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data. Please check console for details.</p>;

  return (
    <>
    <Nav />
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {recordId ? "Update" : "Create"} Stage Videos
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(initialState).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 font-medium">
              {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="YouTube URL or embed link"
              className="border px-3 py-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {recordId ? "Update Videos" : "Save Videos"}
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateVideo;
