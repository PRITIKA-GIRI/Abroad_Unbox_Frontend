import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage3Masters = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});

  const student_id = localStorage.getItem('student_id');
  const graduation = localStorage.getItem('application_level');

  // Fetch the student’s stages and status
  const getStages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${student_id}`
      );
      setStagesDetail(response.data);
    } catch (error) {
      console.error('Failed to get the stages data', error);
    }
  };

  useEffect(() => {
    getStages();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student_id) {
      alert('Student ID not found in local storage!');
      return;
    }

    const payload = new FormData();
    payload.append('student', student_id);
    // Include graduation field
    if (graduation) payload.append('std_graduation', graduation);

    // Append all file fields defined in the backend model
    [
      'bachelors_transcript',
      'provisional',
      'migration',
      'character',
      'wes_iee_naces',
      'lor_i',
      'lor_ii',
      'lor_iii',
      'lor_iv',
      'eng_test_score',
      'standardize_test_score',
      'passport',
      'personal_essay',
      'bank_balance'
    ].forEach((key) => {
      if (files[key]) payload.append(key, files[key]);
    });

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/stage-three-submissions/`,
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Stage 3 form submitted successfully!');
      setFiles({});
    } catch (err) {
      console.error('Submission error:', err.response || err.message);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if Stage 3 is marked "completed"
  const stage3Data = stagesDetail.find((item) => item.stage === '3');
  const isStage3Completed = stage3Data?.is_complete === 'completed';

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 3:</h2>
        <h2 className="text-xl font-semibold mt-6">Profile</h2>
        <p className="font-medium mt-5">Let's build your comprehensive profile</p>
        <p className="font-medium mt-5">Now you have a good idea of your mindset, career, and university selection;</p>
        <p className="font-medium mt-5">Please give the details of everything to the best of your knowledge. This will help us during your application.</p>
      </div>

      <div className="w-full md:w-3/4 p-4 bg-white h-svh md:overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
            Documents
          </div>

          {/* Existing fields */}
          <div className="flex flex-col">
            <label>Bachelors Transcript:</label>
            <input type="file" name="bachelors_transcript" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>Provisional:</label>
            <input type="file" name="provisional" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>Migration:</label>
            <input type="file" name="migration" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>Character:</label>
            <input type="file" name="character" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>WES/IEE/NACES Evaluation:</label>
            <input type="file" name="wes_iee_naces" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
            Letter of Recommendation
          </div>
          <div className="flex flex-col">
            <label>LOR I: <span className="text-xs">(Academics)</span></label>
            <input type="file" name="lor_i" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>LOR II: <span className="text-xs">(Academics)</span></label>
            <input type="file" name="lor_ii" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>LOR III: <span className="text-xs">(Work)</span></label>
            <input type="file" name="lor_iii" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>
          <div className="flex flex-col">
            <label>LOR IV: <span className="text-xs">(Work)</span></label>
            <input type="file" name="lor_iv" onChange={handleFileChange} className="border border-gray-300 w-full rounded p-2" required />
          </div>

          <div className="border-t border-gray-300 my-6"></div>

          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg">
            English Proficiency Test Score
            <input type="file" name="eng_test_score" onChange={handleFileChange} className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2" required />
          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg">
            Standardized Test Score
            <input type="file" name="standardize_test_score" onChange={handleFileChange} className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2" required />
          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg">
            Passport
            <input type="file" name="passport" onChange={handleFileChange} className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2" required />
          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg">
            Personal Essay
            <input type="file" name="personal_essay" onChange={handleFileChange} className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2" required />
          </div>
          <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full rounded-lg text-lg">
            Bank Balance Certificate
            <input type="file" name="bank_balance" onChange={handleFileChange} className="w-full md:w-[70%] float-right text-lg font-normal bg-gray-50 p-2" required />
          </div>

          <button
            type="submit"
            disabled={isStage3Completed || loading}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage3Completed
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-l from-[#ffffff] to-green-300 hover:to-green-500'
            }`}
          >
            {isStage3Completed ? 'Stage 3: Completed' : loading ? 'Submitting...' : 'Stage 3: Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stage3Masters;
