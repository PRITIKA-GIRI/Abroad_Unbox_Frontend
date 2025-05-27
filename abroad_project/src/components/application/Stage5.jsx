// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Stage5 = () => {
//   const [universities, setUniversities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedUniversity, setSelectedUniversity] = useState('');
//   const [otherUniversity, setOtherUniversity] = useState('');
  
//   // Form data state
//   const [formData, setFormData] = useState({
//     early_decision: '',
//     early_action: '',
//     regular_decision: '',
//     scholarship_priority: '',
//     det: '',
//     toefl: '',
//     ielts: '',
//     pte: '',
//     gpa_acceptance: '',
//     gpa_scholarship: '',
//     sat_acceptance: '',
//     sat_scholarship: '',
//     need_based: '',
//     holistic_review: '',
//     tuition: '',
//     living_and_tuition: '',
//     avg_scholarship: '',
//     tuition_after_scholarship: '',
//     coa_after_scholarship: '',
//     us_news_ranking: '',
//     niche_ranking: '',
//     location_arling_texas: '',
//     settings: '',
//     racial_mix: '',
//     population: '',
//     population_trend: '',
//     job_and_opportunities: ''
//   });

//   // Fetch university list on component mount
//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/universities/`)
//       .then(response => {
//         setUniversities(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching universities:', error);
//       });
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const studentId = localStorage.getItem("student_id");
//     if (!studentId) {
//       alert("Student ID not found in local storage!");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       let universityToSubmit = '';
//       let otherUniversityToSubmit = '';

//       // Handle university selection logic
//       if (selectedUniversity === 'other') {
//         if (!otherUniversity.trim()) {
//           alert("Please enter the university name!");
//           return;
//         }
        
//         // First, create the new university
//         try {
//           const newUniversityResponse = await axios.post(`${API_BASE_URL}/universities/`, {
//             name: otherUniversity.trim()
//           });
//           console.log('New university created:', newUniversityResponse.data);
//         } catch (universityError) {
//           console.error('Error creating university:', universityError);
//           // Continue even if university creation fails (might already exist)
//         }
        
//         otherUniversityToSubmit = otherUniversity.trim();
//       } else {
//         universityToSubmit = selectedUniversity;
//       }

//       // Prepare the payload for stage 5 submission
//       const payload = {
//         student: studentId,
//         university: universityToSubmit,
//         other_university: otherUniversityToSubmit,
//         ...formData
//       };

//       // Submit the stage 5 application
//       await axios.post(`${API_BASE_URL}/stage-five-submissions/`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       alert("Form submitted successfully!");
      
//       // Reset form
//       setSelectedUniversity('');
//       setOtherUniversity('');
//       setFormData({
//         early_decision: '',
//         early_action: '',
//         regular_decision: '',
//         scholarship_priority: '',
//         det: '',
//         toefl: '',
//         ielts: '',
//         pte: '',
//         gpa_acceptance: '',
//         gpa_scholarship: '',
//         sat_acceptance: '',
//         sat_scholarship: '',
//         need_based: '',
//         holistic_review: '',
//         tuition: '',
//         living_and_tuition: '',
//         avg_scholarship: '',
//         tuition_after_scholarship: '',
//         coa_after_scholarship: '',
//         us_news_ranking: '',
//         niche_ranking: '',
//         location_arling_texas: '',
//         settings: '',
//         racial_mix: '',
//         population: '',
//         population_trend: '',
//         job_and_opportunities: ''
//       });

//     } catch (err) {
//       console.error("Submission error:", err.response || err.message);
//       alert("Failed to submit form. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex md:flex-row flex-col mx-auto w-full">
//       <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center">
//         <h2 className="text-2xl underline font-bold">Stage 5:</h2>
//         <p className="font-medium mt-5 md:flex hidden">
//           University Finalization
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           Let's finalize on the list of university based on your expectation.
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           Don't apply to very few University, nor too many. There has to be a
//           happy medium when it comes to applying to the university.
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           Also, BE PATIENCE, Most of the university usually takes over few weeks
//           even months to send you I-20. Be sure to followup.
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           We usually recommend 5-10 University for Undergraduate, and 2-5 for
//           the Graduate Students.
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           Also, don't forget every university has their own requirements, they
//           have their own ways of determining scholarship.
//         </p>
//       </div>
//       <div className="w-full md:w-3/4 bg-white h-svh overflow-scroll">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <div className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold">
//             University Selection
//           </div>
//           <div className="bg-gradient-to-r from-[#ffffff] to-green-300 px-5 py-3 w-full text-center">
//             <p className="text-xl font-medium">SESSION IV - University Selection</p>
//           </div>
//           <div>
//             <iframe
//               className="w-full h-[400px] mt-2"
//               src="https://www.youtube.com/embed/lK-5voIYkTo"
//               allowFullScreen
//               title="Session 1 - The Mindset"
//             />
//           </div>
//           <a href="mailto:abroadunbox@gmail.com?subject=Request%20for%20University%20Selection"
//             className="bg-green-300 px-5 py-3 w-1/2 mt-2 border-1 text-center"
//           >
//             <p className="text-xl font-medium">Request Appointment</p>
//           </a>
//           <hr />

//           <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2">
//             UNIVERSITY I
//           </div>

//           <div className="border p-5 mx-5">
          
//           <div className="px -5">
//             <label className="block mb-2 font-medium">Select University:</label>
//             <select
//               className="border p-2 w-full"
//               value={selectedUniversity}
//               onChange={(e) => setSelectedUniversity(e.target.value)}
//               required
//             >
//               <option value="">-- Select a university --</option>
//               {universities.map((uni) => (
//                 <option key={uni.id} value={uni.name}>{uni.name}</option>
//               ))}
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {selectedUniversity === 'other' && (
//             <div className="px -5">
//               <label className="block mb-2 font-medium">Enter University Name:</label>
//               <input
//                 type="text"
//                 className="border p-2 w-full"
//                 value={otherUniversity}
//                 onChange={(e) => setOtherUniversity(e.target.value)}
//                 placeholder="Enter new university name"
//                 required
//               />
//             </div>
//           )}

          
//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 my-2">
//               Deadline
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Early Decision: </label>
//               <input 
//                 type="text" 
//                 name="early_decision" 
//                 value={formData.early_decision}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Early Action: </label>
//               <input 
//                 type="text" 
//                 name="early_action" 
//                 value={formData.early_action}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Regular Decision: </label>
//               <input 
//                 type="text" 
//                 name="regular_decision" 
//                 value={formData.regular_decision}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Scholarship Priority: </label>
//               <input 
//                 type="text" 
//                 name="scholarship_priority" 
//                 value={formData.scholarship_priority}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Minimum English Proficiency Score Required
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Duolingo English Test: </label>
//               <input 
//                 type="text" 
//                 name="det" 
//                 value={formData.det}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>TOEFL: </label>
//               <input 
//                 type="text" 
//                 name="toefl" 
//                 value={formData.toefl}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>IELTS: </label>
//               <input 
//                 type="text" 
//                 name="ielts" 
//                 value={formData.ielts}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>PTE: </label>
//               <input 
//                 type="text" 
//                 name="pte" 
//                 value={formData.pte}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Minimum GPA Required
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Acceptance: </label>
//               <input 
//                 type="text" 
//                 name="gpa_acceptance" 
//                 value={formData.gpa_acceptance}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Scholarship: </label>
//               <input 
//                 type="text" 
//                 name="gpa_scholarship" 
//                 value={formData.gpa_scholarship}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Minimum SAT Required
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Acceptance: </label>
//               <input 
//                 type="text" 
//                 name="sat_acceptance" 
//                 value={formData.sat_acceptance}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Scholarship: </label>
//               <input 
//                 type="text" 
//                 name="sat_scholarship" 
//                 value={formData.sat_scholarship}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Scholarship Requirement
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Need Based: </label>
//               <input 
//                 type="text" 
//                 name="need_based" 
//                 value={formData.need_based}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Holistic Review: </label>
//               <input 
//                 type="text" 
//                 name="holistic_review" 
//                 value={formData.holistic_review}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Cost
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Tuition: </label>
//               <input 
//                 type="text" 
//                 name="tuition" 
//                 value={formData.tuition}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Living and Tuition (COA): </label>
//               <input 
//                 type="text" 
//                 name="living_and_tuition" 
//                 value={formData.living_and_tuition}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Average Scholarship: </label>
//               <input 
//                 type="text" 
//                 name="avg_scholarship" 
//                 value={formData.avg_scholarship}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Tuition after Scholarship: </label>
//               <input 
//                 type="text" 
//                 name="tuition_after_scholarship" 
//                 value={formData.tuition_after_scholarship}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>COA - After Scholarship: </label>
//               <input 
//                 type="text" 
//                 name="coa_after_scholarship" 
//                 value={formData.coa_after_scholarship}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Ranking
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>US News Ranking: </label>
//               <input 
//                 type="text" 
//                 name="us_news_ranking" 
//                 value={formData.us_news_ranking}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Niche Ranking: </label>
//               <input 
//                 type="text" 
//                 name="niche_ranking" 
//                 value={formData.niche_ranking}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>

//             <div className="text-2xl font-semibold text-center bg-gradient-to-r from-white to-blue-300 p-2 mb-2">
//               Location
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Arlington, Texas: </label>
//               <input 
//                 type="text" 
//                 name="location_arling_texas" 
//                 value={formData.location_arling_texas}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Setting: </label>
//               <input 
//                 type="text" 
//                 name="settings" 
//                 value={formData.settings}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Racial mix: </label>
//               <input 
//                 type="text" 
//                 name="racial_mix" 
//                 value={formData.racial_mix}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Population: </label>
//               <input 
//                 type="text" 
//                 name="population" 
//                 value={formData.population}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Population Trend: </label>
//               <input 
//                 type="text" 
//                 name="population_trend" 
//                 value={formData.population_trend}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <label>Jobs and Opportunities: </label>
//               <input 
//                 type="text" 
//                 name="job_and_opportunities" 
//                 value={formData.job_and_opportunities}
//                 onChange={handleInputChange}
//                 className="border w-1/2 p-1" 
//               />
//             </div>
//           </div>

//           <button
//             type="button"
//             // onClick={addMoreUniversity}
//             className="bg-blue-300 hover:bg-blue-400 p-3 text-xl font-semibold text-center"
//           >
//             Add More University +
//           </button>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className={`bg-gradient-to-r from-white to-green-300 hover:to-green-500 py-4 w-full text-2xl font-semibold mt-3 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Submitting..." : "Stage 5: Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Stage5;






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
