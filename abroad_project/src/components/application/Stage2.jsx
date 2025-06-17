import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage2 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [testType, setTestType] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Assuming you store or otherwise obtain the current student's ID in localStorage
  const student_id = localStorage.getItem("student_id");

  // Fetch the student’s stages and status
  const getStages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${student_id}`
      );
      setStagesDetail(response.data);
    } catch (error) {
      console.log("Failed to get the stages data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem('student_id');
    if (!studentId) {
      alert('Student ID not found in local storage!');
      return;
    }

    const payload = {
      student: studentId,
      name: formData.name || null,
      gender: formData.gender || null,
      marital_status: formData.marital_status || null,
      date_of_birth: formData.date_of_birth || null,
      address_i: formData.address_i || null,
      address_ii: formData.address_ii || null,
      city: formData.city || null,
      state: formData.state || null,
      country: formData.country || null,
      zip_code: formData.zip || null,
      level: formData.level || null,
      year_graduated: formData.year_graduated || null,
      standardized_test: formData.standardized_test || null,
      sat_verbal: formData.sat_verbal || null,
      sat_quant: formData.sat_quant || null,
      gre_verbal_reasoning: formData.gre_verbal_reasoning || null,
      gre_quant_reasoning: formData.gre_quant_reasoning || null,
      gre_analytical_writing: formData.gre_analytical_writing || null,
      gmat_quantitative: formData.gmat_quantitative || null,
      gmat_verbal: formData.gmat_verbal || null,
      gmat_data_insights: formData.gmat_data_insights || null,
      english_test_type: formData.english_test_type || null,
      english_reading: formData.english_reading || null,
      english_writing: formData.english_writing || null,
      english_listening: formData.english_listening || null,
      english_speaking: formData.english_speaking || null,
      major: formData.major || null,
      special_note: formData.special_note || null,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/stage-two-submissions/`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Stage 2 (two) Form submitted successfully!');
      setFormData({});
      setTestType('');
    } catch (err) {
      console.error('Submission error:', err.response || err.message);
      alert('Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  // Check if Stage 2 is marked "completed" in the fetched stages array
  const stage2Data = stagesDetail.find((item) => item.stage === "2");
  const isStage2Completed = stage2Data?.is_complete === "completed";

  return (
    <div className="flex md:flex-row-reverse flex-col w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center text-xs md:text-base">
        <h2 className="text-2xl underline font-bold">Stage 2:</h2>
        <h2 className="text-xl font-semibold mt-6">Profile</h2>
        <p className="font-medium mt-5">
          Let's build your comprehensive profile
        </p>
        <p className="font-medium mt-5">
          Now you have a good idea of your mindset, career, and university selection;
        </p>
        <p className="font-medium mt-5">
          Please give the details of everything to the best of your knowledge. This will help us during your application.
        </p>
      </div>

      <div className="w-full md:w-3/4 h-svh p-4 md:overflow-scroll">
        <form onSubmit={handleSubmit}>
          {/* Academic Information */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Academic Information
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border rounded border-gray-300 w-full p-2"
              onChange={handleChange}
              value={formData.name || ''}
            />
            <select
              name="gender"
              className="w-full bg-gray-100 p-2 rounded border border-gray-300"
              onChange={handleChange}
              value={formData.gender || ''}
            >
              <option value="">Select Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="marital_status"
              className="w-full bg-gray-100 rounded border border-gray-300 p-2"
              onChange={handleChange}
              value={formData.marital_status || ''}
            >
              <option value="">Choose Your Marital Status</option>
              <option value="True">Married</option>
              <option value="False">Single</option>
            </select>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              className="border rounded w-full p-2 border-gray-300"
              onChange={handleChange}
              value={formData.date_of_birth || ''}
            />
          </div>

          {/* Permanent Address */}
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mt-5">
            Permanent Address
          </div>
          <div className="mt-5 flex flex-col gap-4">
            {['address_i','address_ii','city','state','country','zip','level','year_graduated'].map(field => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
                className="border rounded w-full p-2 border-gray-300"
                onChange={handleChange}
                value={formData[field] || ''}
              />
            ))}
          </div>

          {/* Standardized Test */}
          <div className="mt-5 flex flex-col gap-4">
            <select
              name="standardized_test"
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              value={testType}
              onChange={e => {
                setTestType(e.target.value);
                handleChange(e);
              }}
            >
              <option value="">Choose Your Standardized Test</option>
              <option value="SAT">SAT</option>
              <option value="GRE">GRE</option>
              <option value="GMAT">GMAT</option>
            </select>

            {testType === 'SAT' && (
              <>
                <input
                  type="text"
                  name="sat_verbal"
                  placeholder="SAT Verbal"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.sat_verbal || ''}
                />
                <input
                  type="text"
                  name="sat_quant"
                  placeholder="SAT Quant"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.sat_quant || ''}
                />
              </>
            )}
            {testType === 'GRE' && (
              <>
                <input
                  type="text"
                  name="gre_verbal_reasoning"
                  placeholder="GRE Verbal Reasoning"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gre_verbal_reasoning || ''}
                />
                <input
                  type="text"
                  name="gre_quant_reasoning"
                  placeholder="GRE Quant Reasoning"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gre_quant_reasoning || ''}
                />
                <input
                  type="text"
                  name="gre_analytical_writing"
                  placeholder="GRE Analytical Writing"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gre_analytical_writing || ''}
                />
              </>
            )}
            {testType === 'GMAT' && (
              <>
                <input
                  type="text"
                  name="gmat_quantitative"
                  placeholder="GMAT Quantitative"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gmat_quantitative || ''}
                />
                <input
                  type="text"
                  name="gmat_verbal"
                  placeholder="GMAT Verbal"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gmat_verbal || ''}
                />
                <input
                  type="text"
                  name="gmat_data_insights"
                  placeholder="GMAT Data Insights"
                  className="border rounded w-full border-gray-300 p-2"
                  onChange={handleChange}
                  value={formData.gmat_data_insights || ''}
                />
              </>
            )}
          </div>

          {/* English Proficiency */}
          <div className="mt-5 flex flex-col gap-4">
            <select
              name="english_test_type"
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              onChange={handleChange}
              value={formData.english_test_type || ''}
            >
              <option value="">Choose your test type</option>
              <option value="det">DET</option>
              <option value="ielts">IELTS</option>
              <option value="pte">PTE</option>
              <option value="toefl">TOEFL</option>
            </select>
            {['english_reading','english_writing','english_listening','english_speaking'].map(field => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.split('_')[1].replace(/\b\w/g,c=>c.toUpperCase())}
                className="border rounded w-full border-gray-300 p-2"
                onChange={handleChange}
                value={formData[field] || ''}
              />
            ))}
          </div>

          {/* Major & Note */}
          <div className="mt-5 flex flex-col gap-4">
            <input
              type="text"
              name="major"
              placeholder="Major"
              className="border rounded w-full border-gray-300 p-2"
              onChange={handleChange}
              value={formData.major || ''}
            />
            <input
              type="text"
              name="special_note"
              placeholder="Special Note"
              className="border rounded w-full p-2 border-gray-300"
              onChange={handleChange}
              value={formData.special_note || ''}
            />
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-[#ffffff] to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Stage 2: Submit'}
          </button> */}

          {/* Submit / Completed Button */}
        <div className="mt-4">
          <button
            // onClick={() => handleSubmit(responseLink[0]?.stage)}
            type='submit'
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage2Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage2Completed}
          >
            {isStage2Completed ? "Stage 2: Completed" : "Stage 2: Submit"}
          </button>
        </div>

        </form>
      </div>
    </div>
  );
};

export default Stage2;
