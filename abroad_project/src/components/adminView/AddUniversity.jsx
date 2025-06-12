import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddUniversity = () => {
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
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
    sat_acceptance: "",
    sat_scholarship: "",
    admission: "",
    scholarship: "",
    gpa_based: "",
    sat_based: "",
    need_based: "",
    holistic_review: "",
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
    crime: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/university-details/`);
      setUniversities(res.data);
    } catch (err) {
      console.error("Failed to fetch universities:", err.response || err.message);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/university-details/`, formData);
      alert("Form submitted successfully!");
      setFormData({
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
        sat_acceptance: "",
        sat_scholarship: "",
        admission: "",
        scholarship: "",
        gpa_based: "",
        sat_based: "",
        need_based: "",
        holistic_review: "",
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
        crime: ""
      });
      fetchUniversities();
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  const inputField = (label, name, type = "text") => (
    <div className="flex justify-between mb-2">
      <label className="capitalize mr-4">{label}:</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border w-1/2 p-1"
      />
    </div>
  );

  const selectField = (label, name) => (
    <div className="flex justify-between mb-2">
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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this university?");
    if(!confirm) return;
    try {
      const response = await axios.delete(`${API_BASE_URL}/university-details/${id}/`);
      if(response){
        alert("University deleted successfully");
        getData();
      }
    }
    catch (error) {
      console.error("Error deleting university", error);
    }
  }

  return (
    <>
      <Nav />
      <div className="w-11/12 mx-auto mt-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-bold mb-5">Add University</h2>

          {inputField("University Name", "university_name")}

          <div className="text-lg font-semibold mt-4 mb-2">Deadline</div>
          {inputField("Early Decision", "early_decision")}
          {inputField("Early Action", "early_action")}
          {inputField("Regular Decision", "regular_decision")}
          {inputField("Scholarship Priority", "scholarship_priority")}

          <div className="text-lg font-semibold mt-4 mb-2">Minimum English Proficiency</div>
          {inputField("DET", "det")}
          {inputField("TOEFL", "toefl")}
          {inputField("IELTS", "ielts")}
          {inputField("PTE", "pte")}

          <div className="text-lg font-semibold mt-4 mb-2">Minimum GPA</div>
          {inputField("GPA Acceptance", "gpa_acceptance")}
          {inputField("GPA Scholarship", "gpa_scholarship")}

          <div className="text-lg font-semibold mt-4 mb-2">Minimum SAT</div>
          {inputField("SAT Acceptance", "sat_acceptance")}
          {inputField("SAT Scholarship", "sat_scholarship")}

          <div className="text-lg font-semibold mt-4 mb-2">SAT Requirements</div>
          {selectField("Admission", "admission")}
          {selectField("Scholarship", "scholarship")}

          <div className="text-lg font-semibold mt-4 mb-2">Scholarship Requirements</div>
          {selectField("GPA Based", "gpa_based")}
          {selectField("SAT Based", "sat_based")}
          {selectField("Need Based", "need_based")}
          {selectField("Holistic Review", "holistic_review")}

          <div className="text-lg font-semibold mt-4 mb-2">Cost</div>
          {inputField("Tuition", "tuition")}
          {inputField("Living and Tuition", "living_and_tuition")}
          {inputField("Average Scholarship", "avg_scholarship")}
          {inputField("Tuition After Scholarship", "tuition_after_scholarship")}
          {inputField("COA After Scholarship", "coa_after_scholarship")}

          <div className="text-lg font-semibold mt-4 mb-2">Ranking</div>
          {inputField("US News Ranking", "us_news_ranking")}
          {inputField("Niche Ranking", "niche_ranking")}
          {inputField("Major Ranking", "major_ranking")}

          <div className="text-lg font-semibold mt-4 mb-2">Location Details</div>
          {inputField("Place Name", "place_name")}
          {inputField("Settings", "settings")}
          {inputField("Racial Mix", "racial_mix")}
          {inputField("Population", "population")}
          {inputField("Population Trend", "population_trend")}
          {inputField("Job and Opportunities", "job_and_opportunities")}
          {inputField("Crime", "crime")}

          <div className="text-center">
            <button
              type="submit"
              className="border px-5 py-3 w-[50%] my-5 rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add University"}
            </button>
          </div>
        </form>

        <hr />

        <div className="my-6">
          <h3 className="text-xl font-bold mb-2">University List:</h3>
          {universities.length === 0 ? (
            <p>No universities found.</p>
          ) : (
            <ul className="list-disc pl-5">
              <tr>
                <th>University Name</th>
                {/* <th>Action</th> */}
              </tr>
              {universities.map((uni) => (
                <>
                <tr>
                  <td><li 
                className="flex"
                key={uni.id}> {uni.university_name}
                </li></td>
                <td><FaTrash
                onClick={() => handleDelete(uni.id)}
                className="text-red-500 cursor-pointer hover:text-red-700 ml-10"
              /></td>
                </tr>
                {/* <li 
                className="flex"
                key={uni.id}> {uni.university_name}
                </li>
                <FaTrash
                onClick={() => handleDelete(uni.id)}
                className="text-red-500 cursor-pointer hover:text-red-700 ml-10"
              /> */}
            </>
                
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUniversity;
