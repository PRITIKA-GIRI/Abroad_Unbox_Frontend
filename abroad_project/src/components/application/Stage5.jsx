import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Template for a single university entry
const emptyEntry = {
  university: '',
  other_university: '',
  formData: {
    early_decision: '',
    early_action: '',
    regular_decision: '',
    scholarship_priority: '',
    det: '',
    toefl: '',
    ielts: '',
    pte: '',
    gpa_acceptance: '',
    gpa_scholarship: '',
    sat_acceptance: '',
    sat_scholarship: '',
    need_based: '',
    holistic_review: '',
    tuition: '',
    living_and_tuition: '',
    avg_scholarship: '',
    tuition_after_scholarship: '',
    coa_after_scholarship: '',
    us_news_ranking: '',
    niche_ranking: '',
    location_arling_texas: '',
    settings: '',
    racial_mix: '',
    population: '',
    population_trend: '',
    job_and_opportunities: ''
  }
};

const Stage5 = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([{ ...emptyEntry }]);

  // Fetch list on mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/universities/`)
      .then(res => setUniversities(res.data))
      .catch(err => console.error('Error fetching universities:', err));
  }, []);

  // Add another entry
  const addMoreUniversity = () => {
    setEntries(prev => ([ ...prev, { ...emptyEntry } ]));
  };

  // Handle changes
  const handleEntryChange = (index, field, value) => {
    setEntries(prev => {
      const updated = [...prev];
      if (field === 'university' || field === 'other_university') {
        updated[index][field] = value;
      } else {
        updated[index].formData[field] = value;
      }
      return updated;
    });
  };

  // Submit all
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = localStorage.getItem('student_id');
    if (!studentId) return alert('Student ID not found!');

    setLoading(true);
    try {
      for (let entry of entries) {
        let uniToSubmit = '';
        let otherUni = '';
        if (entry.university === 'other') {
          if (!entry.other_university.trim()) throw new Error('Please enter university name');
          await axios.post(`${API_BASE_URL}/universities/`, { name: entry.other_university.trim() })
            .catch(() => {});
          otherUni = entry.other_university.trim();
        } else {
          uniToSubmit = entry.university;
        }

        const payload = {
          student: studentId,
          entries: entries.map(e => ({
            university: e.university === 'other' ? '' : e.university,
            other_university: e.university === 'other' ? e.other_university.trim() : '',
            ...e.formData
          }))
        };

        await axios.post(`${API_BASE_URL}/stage-five-submissions/`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      alert('All entries submitted successfully!');
      setEntries([{ ...emptyEntry }]);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit: ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 5:</h2>
        <p className="font-medium mt-5 md:flex hidden">
          University Finalization
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Let's finalize on the list of university based on your expectation.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Don't apply to very few University, nor too many. There has to be a
          happy medium when it comes to applying to the university.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Also, BE PATIENCE, Most of the university usually takes over few weeks
          even months to send you I-20. Be sure to followup.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          We usually recommend 5-10 University for Undergraduate, and 2-5 for
          the Graduate Students.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Also, don't forget every university has their own requirements, they
          have their own ways of determining scholarship.
        </p>
      </div>
      {/* Sidebar could go here */}
      <div className="w-full md:w-3/4 bg-white h-svh overflow-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2">
            UNIVERSITY FINALIZATION
          </div>

          {entries.map((entry, idx) => (
            <div key={idx} className="border p-5 mx-5">
              <h3 className="text-xl font-semibold mb-4">University #{idx + 1}</h3>

              {/* Selection */}
              <label className="block mb-2">Select University:</label>
              <select
                value={entry.university}
                onChange={e => handleEntryChange(idx, 'university', e.target.value)}
                className="border p-2 w-full mb-4"
                required
              >
                <option value="">-- Select a university --</option>
                {universities.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
                <option value="other">Other</option>
              </select>

              {entry.university === 'other' && (
                <input
                  type="text"
                  placeholder="Enter university name"
                  value={entry.other_university}
                  onChange={e => handleEntryChange(idx, 'other_university', e.target.value)}
                  className="border p-2 w-full mb-4"
                  required
                />
              )}

              {/* Deadline */}
              <div className="text-lg font-semibold mb-2">Deadline</div>
              {['early_decision', 'early_action', 'regular_decision', 'scholarship_priority'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* English Scores */}
              <div className="text-lg font-semibold mb-2 mt-4">Minimum English Proficiency</div>
              {['det', 'toefl', 'ielts', 'pte'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize">{field.toUpperCase()}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* GPA */}
              <div className="text-lg font-semibold mb-2 mt-4">Minimum GPA</div>
              {['gpa_acceptance', 'gpa_scholarship'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* SAT */}
              <div className="text-lg font-semibold mb-2 mt-4">Minimum SAT</div>
              {['sat_acceptance', 'sat_scholarship'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* Scholarship Requirement */}
              <div className="text-lg font-semibold mb-2 mt-4">Scholarship Requirement</div>
              {['need_based', 'holistic_review'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* Cost */}
              <div className="text-lg font-semibold mb-2 mt-4">Cost</div>
              {['tuition', 'living_and_tuition', 'avg_scholarship', 'tuition_after_scholarship', 'coa_after_scholarship'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* Ranking */}
              <div className="text-lg font-semibold mb-2 mt-4">Ranking</div>
              {['us_news_ranking', 'niche_ranking'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}

              {/* Location */}
              <div className="text-lg font-semibold mb-2 mt-4">Location</div>
              {['location_arling_texas', 'settings', 'racial_mix', 'population', 'population_trend', 'job_and_opportunities'].map(field => (
                <div key={field} className="flex justify-between mb-2">
                  <label className="capitalize replace-_ with-space">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    value={entry.formData[field]}
                    onChange={e => handleEntryChange(idx, field, e.target.value)}
                    className="border w-1/2 p-1"
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addMoreUniversity}
            className="bg-blue-300 hover:bg-blue-400 p-3 text-xl font-semibold text-center mx-5"
          >
            Add More University +
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-white to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Stage 5: Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stage5;
