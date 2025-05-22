import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage3 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = localStorage.getItem('student_id');
    if (!studentId) {
      alert('Student ID not found in local storage!');
      return;
    }

    const payload = new FormData();
    payload.append('student', studentId);

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value || '');
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) payload.append(key, file);
    });

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/stage-three-submissions/`,
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Form submitted successfully!');
      setFormData({});
      setFiles({});
    } catch (err) {
      console.error('Submission error:', err.response || err.message);
      alert('Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      <div className="md:w-1/5 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 3:</h2>
        <h2 className="text-xl font-semibold mt-6">Profile</h2>
        <p className="font-medium mt-5">
          Let's build your comprehensive profile
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Now you have a good idea of your mindset, career, and university selection;
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Please give the details of everything to the best of your knowledge. This will help us during your application.
        </p>
      </div>

      <div className="w-full md:w-4/5 bg-white h-svh overflow-scroll">
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
          Documents
        </div>
        <div className='flex flex-col'>
          <label>10 Transcript/ Transcript I:</label>
          <input type='file' name='transcript_i' onChange={handleFileChange} className='border-1 p-2 w-full' required/>
        </div>
        <div className='flex flex-col'>
          <label>11 Transcript/ Transcript II:</label>
          <input type='file' name='transcript_ii' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className='flex flex-col'>
          <label>12 Transcript/ Transcript III:</label>
          <input type='file' name='transcript_iii' onChange={handleFileChange} className='border-1 p-2 ' required/>
        </div>
        <div className='flex flex-col'>
          <label>Provisional:</label>
          <input type='file' name='provisional' onChange={handleFileChange} className='border-1 p-2 ' required/>
        </div>
        <div className='flex flex-col'>
          <label>Migration:</label>
          <input type='file' name='migration' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className='flex flex-col'>
          <label>Character:</label>
          <input type='file' name='character' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mb-5">
          Letter of Recommendation
        </div>
        <div className='flex flex-col'>
          <label>LOR I:</label>
          <input type='file' name='lor_i' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className='flex flex-col'>
          <label>LOR II:</label>
          <input type='file' name='lor_ii' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className='flex flex-col'>
          <label>LOR III:</label>
          <input type='file' name='lor_iii' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>

        <div className='flex flex-col'>
          <label>LOR IV:</label>
          <input type='file' name='lor_iv' onChange={handleFileChange} className='border-1 p-2' required/>
        </div>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold ">
          English Proficiency Test Score
          <input type='file' name='eng_test_score' onChange={handleFileChange} className='w-1/2 float-right text-xl font-normal bg-gray-50 p-2' required/>
        </div>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold">
          Standardize Test Score
          <input type='file' name='standardize_test_score' onChange={handleFileChange} className='w-1/2 float-right text-xl font-normal bg-gray-50 p-2' required/>
        </div>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold">
          Passport
          <input type='file' name='passport' onChange={handleFileChange} className='w-1/2 float-right text-xl font-normal bg-gray-50 p-2' required/>
        </div>
        <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold">
          Bank Balance Certificate 
          <input type='file' name='bank_balance' onChange={handleFileChange} className='w-1/2 float-right text-xl font-normal bg-gray-50 p-2' required/>
        </div>
        <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-l from-[#ffffff] to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Stage 3: Submit'}
          </button>
        </form>
      </div>
    </div>
  )
};

export default Stage3;
