import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UpdateVideo = () => {
  const navigate = useNavigate();
  const initialTextState = {
    bachelors_stage1_the_mindset_video: "",
    bachelors_stage1_the_timeline_video: "",
    bachelors_stage1_career_counseling_video: "",
    bachelors_stage1_english_proficiency_test_video: "",

    bachelors_stage4_resume_video: "",
    bachelors_stage4_linkedin_video: "",

    bachelors_stage5_university_selection_video: "",
    bachelors_stage6_commonapp_video: "",

    bachelors_stage7_writing_email_video: "",
    bachelors_stage7_email_timeline_video: "",

    bachelors_stage8_DS160_video: "",
    bachelors_stage8_CGI_portal_video: "",

    masters_stage1_the_mindset_video: "",
    masters_stage1_the_timeline_video: "",
    masters_stage1_career_counseling_video: "",
    masters_stage1_english_proficiency_test_video: "",

    masters_stage4_assistantship_video1_general_idea: "",
    masters_stage4_assistantship_video2_contact: "",
    masters_stage4_assistantship_video3_pro_tips: "",
    masters_stage4_video4_resume: "",
    masters_stage4_video5_linkedin: "",

    masters_stage5_university_selection_video: "",
    masters_stage6_university_portal_video: "",
    masters_stage7_assistantship_emails_and_timeline_video: "",
    masters_stage7_application_update_video: "",
    masters_stage7_application_email_video: "",
    masters_stage8_DS160_video: "",
    masters_stage8_CGI_portal_video: "",
  };

  const [textData, setTextData] = useState(initialTextState);
  const [fileData, setFileData] = useState({ sample1: null, sample2: null });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStageVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stages-videos/`);
      const payload = response.data;
      const results = Array.isArray(payload) ? payload : payload.results || [];
      if (results.length > 0) {
        const record = results[0];
        setRecordId(record.id);
        // populate text fields
        const newText = {};
        Object.keys(initialTextState).forEach((key) => {
          newText[key] = record[key] || "";
        });
        setTextData(newText);
        // files not preloaded for download fields
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

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      // append text fields
      Object.entries(textData).forEach(([key, val]) => {
        form.append(key, val);
      });
      // append file fields
      if (fileData.sample1) {
        form.append("masters_stage4_resume_linkedin_sample1", fileData.sample1);
      }
      if (fileData.sample2) {
        form.append("masters_stage4_resume_linkedin_sample2", fileData.sample2);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (recordId) {
        await axios.patch(
          `${API_BASE_URL}/stages-videos/${recordId}/`,
          form,
          config
        );
        alert("Video links updated successfully.");
      } else {
        await axios.post(
          `${API_BASE_URL}/stages-videos/`,
          form,
          config
        );
        alert("Video links created successfully.");
      }
      navigate("/update-stage-videos");
    } catch (err) {
      console.error("Failed to save stage videos", err);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
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
          {/* Text fields */}
          {Object.entries(textData).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-1 font-medium">
                {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={val}
                onChange={handleTextChange}
                placeholder="YouTube URL or embed link"
                className="border px-3 py-2 rounded"
              />
            </div>
          ))}

          {/* File fields for samples */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="flex-1 flex flex-col">
              <label htmlFor="sample1" className="mb-1 font-medium">
                Resume & LinkedIn Sample 1
              </label>
              <input
                type="file"
                id="sample1"
                name="sample1"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="sample2" className="mb-1 font-medium">
                Resume & LinkedIn Sample 2
              </label>
              <input
                type="file"
                id="sample2"
                name="sample2"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="border px-3 py-2 rounded"
              />
            </div>
          </div>

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
