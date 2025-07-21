// src/components/AddMasterUniversity.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialFormData = {
  university_name: "",
  early_decision: "",
  early_action: "",
  regular_decision: "",
  scholarship_priority: "",
  det: "",
  toefl: "",
  ielts: "",
  pte: "",
  gpa_acceptance: "",
  gpa_scholarship: "",
  gre_acceptance: "",
  gre_scholarship: "",
  admission: "",
  scholarship: "",
  gpa_based: "",
  gre_based: "",
  need_based: "",
  holistic_review: "",
  application_fee: "",
  application_fee_waiver: "",
  i20_deposit: "",
  tuition: "",
  living_and_tuition: "",
  avg_scholarship: "",
  tuition_after_scholarship: "",
  coa_after_scholarship: "",
  us_news_ranking: "",
  niche_ranking: "",
  major_ranking: "",
  place_name: "",
  settings: "",
  racial_mix: "",
  population: "",
  population_trend: "",
  job_and_opportunities: "",
  crime: "",
  college_essay: false,
  college_essay_titles: [""],
  university_level: "master",
};

export default function AddMasterUniversity({ onAdded }) {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "college_essay") {
      const yes = value === "yes";
      setFormData((prev) => ({
        ...prev,
        college_essay: yes,
        college_essay_titles: yes ? prev.college_essay_titles : [""],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addEssayTitle = () =>
    setFormData((prev) => ({
      ...prev,
      college_essay_titles: [...prev.college_essay_titles, ""],
    }));

  const removeEssayTitle = (idx) =>
    setFormData((prev) => {
      const titles = [...prev.college_essay_titles];
      titles.splice(idx, 1);
      return { ...prev, college_essay_titles: titles };
    });

  const handleEssayTitleChange = (idx, val) =>
    setFormData((prev) => {
      const titles = [...prev.college_essay_titles];
      titles[idx] = val;
      return { ...prev, college_essay_titles: titles };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        college_essay_titles: formData.college_essay_titles.map((t) => ({ title: t })),
      };
      await axios.post(`${API_BASE_URL}/university-details/`, payload);
      alert("Master-level university added!");
      setFormData({ ...initialFormData });
      onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add university.");
    } finally {
      setLoading(false);
    }
  };

  const inputField = (label, name) => (
    <div className="flex justify-between mb-2" key={name}>
      <label className="capitalize mr-4">{label}:</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border w-1/2 p-1"
      />
    </div>
  );
  const selectString = (label, name) => (
    <div className="flex justify-between mb-2" key={name}>
      <label className="capitalize mr-4">{label}:</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border w-1/2 p-1"
      >
        <option value="">-- select --</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {inputField("University Name", "university_name")}

      <h3 className="mt-4 font-semibold">Deadline</h3>
      {inputField("Early Decision", "early_decision")}
      {inputField("Early Action", "early_action")}
      {inputField("Regular Decision", "regular_decision")}
      {inputField("Scholarship Priority", "scholarship_priority")}

      <h3 className="mt-4 font-semibold">Minimum English Proficiency</h3>
      {inputField("DET", "det")}
      {inputField("TOEFL", "toefl")}
      {inputField("IELTS", "ielts")}
      {inputField("PTE", "pte")}

      <h3 className="mt-4 font-semibold">Minimum GPA</h3>
      {inputField("GPA Acceptance", "gpa_acceptance")}
      {inputField("GPA Scholarship", "gpa_scholarship")}

      <h3 className="mt-4 font-semibold">Minimum GRE</h3>
      {inputField("GRE Acceptance", "gre_acceptance")}
      {inputField("GRE Scholarship", "gre_scholarship")}

      <h3 className="mt-4 font-semibold">Admission & Scholarship</h3>
      {selectString("Admission", "admission")}
      {selectString("Scholarship", "scholarship")}

      <h3 className="mt-4 font-semibold">Scholarship Requirements</h3>
      {selectString("GPA Based", "gpa_based")}
      {selectString("GRE Based", "gre_based")}
      {selectString("Need Based", "need_based")}
      {selectString("Holistic Review", "holistic_review")}

      <h3 className="mt-4 font-semibold">Cost</h3>
      {inputField("Application Fee", "application_fee")}
      {inputField("Application Fee Waiver", "application_fee_waiver")}
      {inputField("I20 Deposit", "i20_deposit")}
      {inputField("Tuition", "tuition")}
      {inputField("Living & Tuition", "living_and_tuition")}
      {inputField("Average Scholarship", "avg_scholarship")}
      {inputField("Tuition After Scholarship", "tuition_after_scholarship")}
      {inputField("COA After Scholarship", "coa_after_scholarship")}

      <h3 className="mt-4 font-semibold">Ranking</h3>
      {inputField("US News Ranking", "us_news_ranking")}
      {inputField("Niche Ranking", "niche_ranking")}
      {inputField("Major Ranking", "major_ranking")}

      <h3 className="mt-4 font-semibold">Location Details</h3>
      {inputField("Place Name", "place_name")}
      {inputField("Settings", "settings")}
      {inputField("Racial Mix", "racial_mix")}
      {inputField("Population", "population")}
      {inputField("Population Trend", "population_trend")}
      {inputField("Jobs & Opportunities", "job_and_opportunities")}
      {inputField("Crime", "crime")}

      <h3 className="mt-4 font-semibold">SOP</h3>
      <div className="flex justify-between mb-2">
        <label className="capitalize mr-4">College Essay Required:</label>
        <select
          name="college_essay"
          value={formData.college_essay ? "yes" : "no"}
          onChange={handleChange}
          className="border w-1/2 p-1"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {formData.college_essay && (
        <>
          {formData.college_essay_titles.map((t, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <label className="w-32">{`Essay ${idx + 1} Title:`}</label>
              <input
                type="text"
                value={t}
                onChange={(e) => handleEssayTitleChange(idx, e.target.value)}
                className="border p-1 flex-1"
              />
              {formData.college_essay_titles.length > 1 && (
                <FaTrash
                  onClick={() => removeEssayTitle(idx)}
                  className="ml-2 text-red-500 cursor-pointer"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addEssayTitle}
            className="mb-4 bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded"
          >
            + Add Essay
          </button>
        </>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="border px-5 py-3 w-[50%] my-5 rounded"
        >
          {loading ? "Submitting..." : "Add Master University"}
        </button>
      </div>
    </form>
  );
}
