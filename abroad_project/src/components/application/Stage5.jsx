import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Template for a single university entry
const emptyEntry = {
  university: "",
  showDetails: false,
  formData: {
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
    admission: "",
    sat_scholarship: "",
    gpa_based: "",
    sat_based: "",
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
    college_essay_titles: [{ title: "" }],
  },
};

const Stage5 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [stageVideo, setStageVideo] = useState([]);
  const [entries, setEntries] = useState([{ ...emptyEntry }]);
  const [linkedUniversityIds, setLinkedUniversityIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [isUniSelectionOpen, setIsUniSelectionOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparisonData, setComparisonData] = useState({
    uniNames: [],
    fieldKeys: [],
    values: {},
  });

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    getStages();
    fetchUniversities();
    fetchLinkedUniversities();
    fetchStageVideo();
  }, []);

  const getStages = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${student_id}`
      );
      setStagesDetail(res.data);
    } catch (err) {
      console.error("getStages:", err);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/university-details/`);
      setUniversities(res.data.results || []);
    } catch (err) {
      console.error("fetchUniversities:", err);
    }
  };

  const fetchLinkedUniversities = async () => {
    if (!student_id) return;
    try {
      const res = await axios.get(
        `${API_BASE_URL}/student-university-details/?student=${student_id}`
      );
      setLinkedUniversityIds(new Set(res.data.map((i) => i.university)));
    } catch (err) {
      console.error("fetchLinkedUniversities:", err);
    }
  };

  const fetchStageVideo = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(res.data);
    } catch (err) {
      console.error("fetchStageVideo:", err);
    }
  };

  const addMoreUniversity = () => {
    if (entries.length < 20) {
      setEntries((prev) => [...prev, { ...emptyEntry }]);
    }
  };

  const removeUniversity = (idx) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUniversityChange = (idx, universityName) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[idx].university = universityName;
      updated[idx].showDetails = !!universityName;
      // preload any formData fields from detail if available:
      const detail = universities.find((u) => u.university_name === universityName);
      if (detail) {
        updated[idx].formData = {
          ...updated[idx].formData,
          ...detail,
          college_essay: detail.college_essay || false,
          college_essay_titles:
            detail.college_essay_titles?.length > 0
              ? detail.college_essay_titles.map((t) =>
                  typeof t === "string" ? { title: t } : t
                )
              : [{ title: "" }],
        };
      } else {
        updated[idx].formData = { ...emptyEntry.formData };
      }
      return updated;
    });
  };

  const toggleDetails = (idx) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[idx].showDetails = !updated[idx].showDetails;
      return updated;
    });
  };

  const handleFieldChange = (idx, field, value) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[idx].formData[field] = value;
      return updated;
    });
  };

  const addEssayTitle = (idx) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[idx].formData.college_essay_titles.push({ title: "" });
      return updated;
    });
  };

  const handleEssayTitleChange = (idx, eIdx, value) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[idx].formData.college_essay_titles[eIdx].title = value;
      return updated;
    });
  };

  const compareUniversity = () => {
    const selected = entries.filter((e) => e.university);
    if (selected.length < 2) {
      return alert("Select at least two universities to compare.");
    }
    const uniNames = selected.map((e) => e.university);
    const fieldKeys = Object.keys(emptyEntry.formData);
    const values = {};
    fieldKeys.forEach((key) => {
      values[key] = selected.map((e) => e.formData[key] ?? "");
    });
    setComparisonData({ uniNames, fieldKeys, values });
    setIsCompareOpen(true);
  };

  const closeCompare = () => setIsCompareOpen(false);

  const addToProfile = async (idx) => {
    const entry = entries[idx];
    if (!entry.university) return alert("Select a university first.");
    try {
      const uniObj = universities.find((u) => u.university_name === entry.university);
      if (!uniObj) return alert("Invalid university.");
      const uniId = uniObj.id;

      if (linkedUniversityIds.has(uniId)) {
        return alert("This university is already linked to your profile.");
      }

      await axios.post(`${API_BASE_URL}/student-university-details/`, {
        student: student_id,
        university: uniId,
        university_name: entry.university,
        early_decision: entry.formData.early_decision,
        early_action: entry.formData.early_action,
        regular_decision: entry.formData.regular_decision,
        scholarship_priority: entry.formData.scholarship_priority,
        application_fee: entry.formData.application_fee,
        application_fee_waiver: entry.formData.application_fee_waiver,
        college_essay_titles: JSON.stringify(entry.formData.college_essay_titles),
      });

      setLinkedUniversityIds((prev) => new Set(prev).add(uniId));
      alert(`University "${entry.university}" added to your profile.`);
    } catch (err) {
      console.error("addToProfile:", err);
      alert("Failed to add university to profile.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        student: student_id,
        entries: entries.map((ent) => ({
          university: ent.university,
          ...ent.formData,
        })),
      };
      await axios.post(`${API_BASE_URL}/stage-five-submissions/`, payload);
      // also add each to profile
      for (let i = 0; i < entries.length; i++) {
        await addToProfile(i);
      }
      alert("Stage 5 submitted successfully! (wait for admin approval)");
      setEntries([{ ...emptyEntry }]);
    } catch (err) {
      console.error("handleSubmit:", err);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const isStage5Completed =
    stagesDetail.find((s) => s.stage === "5")?.is_complete === "completed";
    
  const videoUrl1 = stageVideo[0]?.bachelors_stage5_university_selection_video;

  const selectedNames = entries.map((e) => e.university).filter(Boolean);

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gradient-to-l from-white to-green-500 p-4">
        <h2 className="text-2xl underline font-bold">Stage 5:</h2>
        <p className="mt-4 font-semibold">University Finalization</p>
        <p className="mt-3">
          Let's finalize on the list of universities based on your expectations.
        </p>
        <p className="mt-3">
          We recommend applying to 5–10 for undergrads, 2–5 for grads. Patience is
          key—most I‑20s take weeks or months.
        </p>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full bg-white p-4 h-screen md:overflow-auto">
        {/* University Selection Toggle */}
        <div
          className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 text-center text-2xl font-semibold flex items-center cursor-pointer"
          onClick={() => setIsUniSelectionOpen((o) => !o)}
        >
          <span>University Selection</span>
          {isUniSelectionOpen ? (
            <MdOutlineExpandLess className="ml-auto text-4xl" />
          ) : (
            <MdOutlineExpandMore className="ml-auto text-4xl" />
          )}
        </div>

        {isUniSelectionOpen && (
          <div>
            <div className="w-1/2 bg-amber-500 rounded-full px-5 py-2 mt-4 font-semibold">
              SESSION IV - University Selection
            </div>
            <iframe
              src={videoUrl1}
              className="w-full h-[300px] md:h-[400px] mt-2 mb-4"
              title="University Selection Video"
              allowFullScreen
            />
            <a
              href="mailto:abroadunbox@gmail.com"
              className="w-1/2 bg-yellow-300 rounded-full px-5 py-2 mt-4 font-semibold shadow-lg hover:bg-yellow-400 block text-center"
            >
              Request Appointment
            </a>
          </div>
        )}

        <div className="border-t border-gray-300 my-6" />

        <h2 className="text-xl font-semibold mb-2">University Profile:</h2>
        <p className="mb-6">
          We shall create a comprehensive report on the important things about your
          chosen university that you have to work on. You can always refer back
          when comparing universities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {entries.map((entry, idx) => {
            const locked = !!entry.university;
            return (
              <div key={idx} className="p-4 shadow rounded relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">University #{idx + 1}</h3>
                  <div className="flex items-center gap-2">
                    {entry.university && (
                      <button
                        type="button"
                        onClick={() => toggleDetails(idx)}
                        className="text-sm underline"
                      >
                        {entry.showDetails ? "Hide Details" : "Show Details"}
                      </button>
                    )}
                    {entries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUniversity(idx)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* University Dropdown */}
                <label className="block mb-2">Select University:</label>
                <select
                  value={entry.university}
                  onChange={(e) => handleUniversityChange(idx, e.target.value)}
                  className="border rounded p-2 w-full mb-4"
                >
                  <option value="">-- Select a university --</option>
                  {universities.map((u) => (
                    <option
                      key={u.id}
                      value={u.university_name}
                      disabled={
                        selectedNames.includes(u.university_name) &&
                        u.university_name !== entry.university
                      }
                    >
                      {u.university_name}
                    </option>
                  ))}
                </select>

                {/* Details Section */}
                {entry.showDetails && (
                  <>
                    {[
                      {
                        title: "Deadline",
                        fields: [
                          "early_decision",
                          "early_action",
                          "regular_decision",
                          "scholarship_priority",
                        ],
                      },
                      {
                        title: "Minimum English Proficiency",
                        fields: ["det", "toefl", "ielts", "pte"],
                      },
                      {
                        title: "Minimum GPA",
                        fields: ["gpa_acceptance", "gpa_scholarship"],
                      },
                      {
                        title: "Minimum SAT",
                        fields: ["admission", "sat_scholarship"],
                      },
                      {
                        title: "Scholarship Requirements",
                        fields: [
                          "gpa_based",
                          "sat_based",
                          "need_based",
                          "holistic_review",
                        ],
                      },
                      {
                        title: "Cost",
                        fields: [
                          "application_fee",
                          "application_fee_waiver",
                          "i20_deposit",
                          "tuition",
                          "living_and_tuition",
                          "avg_scholarship",
                          "tuition_after_scholarship",
                          "coa_after_scholarship",
                        ],
                      },
                      {
                        title: "Ranking",
                        fields: [
                          "us_news_ranking",
                          "niche_ranking",
                          "major_ranking",
                        ],
                      },
                      {
                        title: "Location Details",
                        fields: [
                          "place_name",
                          "settings",
                          "racial_mix",
                          "population",
                          "population_trend",
                          "job_and_opportunities",
                          "crime",
                        ],
                      },
                    ].map(({ title, fields }) => (
                      <div key={title}>
                        <div className="text-lg font-semibold mt-4 mb-2">
                          {title}
                        </div>
                        {fields.map((fld) => (
                          <div
                            key={fld}
                            className="flex justify-between items-center mb-2"
                          >
                            <label className="capitalize mr-4">
                              {fld.replace(/_/g, " ")}:
                            </label>
                            <input
                              type="text"
                              value={entry.formData[fld] || ""}
                              onChange={(e) =>
                                handleFieldChange(idx, fld, e.target.value)
                              }
                              disabled={locked}
                              className="border rounded w-1/2 p-2"
                            />
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* SOP Section */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">SOP</h3>
                      <div className="flex items-center mb-4">
                        <label className="mr-4">
                          College Essay Required:
                        </label>
                        <select
                          value={entry.formData.college_essay ? "yes" : "no"}
                          onChange={(e) =>
                            handleFieldChange(
                              idx,
                              "college_essay",
                              e.target.value === "yes"
                            )
                          }
                          disabled={locked}
                          className="border p-1 rounded"
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </div>
                      {entry.formData.college_essay && (
                        <div>
                          {entry.formData.college_essay_titles.map(
                            (tObj, eIdx) => (
                              <div
                                key={eIdx}
                                className="flex items-center mb-2"
                              >
                                <label className="w-32">
                                  Essay {eIdx + 1} Title:
                                </label>
                                <input
                                  type="text"
                                  value={tObj.title}
                                  onChange={(e) =>
                                    handleEssayTitleChange(
                                      idx,
                                      eIdx,
                                      e.target.value
                                    )
                                  }
                                  disabled={locked}
                                  className="border p-2 rounded flex-1"
                                />
                              </div>
                            )
                          )}
                          {/* <button
                            type="button"
                            onClick={() => addEssayTitle(idx)}
                            disabled={locked}
                            className="mt-2 bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded"
                          >
                            + Add Essay
                          </button> */}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Add to Profile */}
                <button
                  type="button"
                  onClick={() => addToProfile(idx)}
                  className="mt-4 w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded"
                >
                  Add This University to Your Profile
                </button>
              </div>
            );
          })}

          {/* + More / Compare */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={addMoreUniversity}
              className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded"
            >
              + Add More University
            </button>
            <button
              type="button"
              onClick={compareUniversity}
              className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded"
            >
              Compare University
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || isStage5Completed}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage5Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-white to-green-300 hover:to-green-500"
            }`}
          >
            {isStage5Completed
              ? "Stage 5: Completed"
              : loading
              ? "Submitting..."
              : "Stage 5: Submit"}
          </button>
        </form>

        {/* Compare Modal */}
        {isCompareOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeCompare}
          >
            <div
              className="bg-white rounded-lg overflow-auto max-h-[80vh] w-[90vw] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                  Compare Universities
                </h3>
                <button
                  onClick={closeCompare}
                  className="text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border bg-gray-100 px-3 py-2 text-left">
                        Field
                      </th>
                      {comparisonData.uniNames.map((u, i) => (
                        <th
                          key={i}
                          className="border bg-gray-100 px-3 py-2 text-left"
                        >
                          {u}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.fieldKeys.map((fk) => (
                      <tr key={fk}>
                        <td className="border px-3 py-1 font-semibold">
                          {fk.replace(/_/g, " ")}
                        </td>
                        {comparisonData.values[fk].map((v, j) => (
                          <td key={j} className="border px-3 py-1">
                            {Array.isArray(v)
                              ? v.map((it) => it.title ?? it).join(", ")
                              : v || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage5;



















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Template for a single university entry
// const emptyEntry = {
//   university: "",
//   other_university: "",
//   isDisabled: false,
//   formData: {
//     early_decision: "",
//     early_action: "",
//     regular_decision: "",
//     scholarship_priority: "",
//     det: "",
//     toefl: "",
//     ielts: "",
//     pte: "",
//     gpa_acceptance: "",
//     gpa_scholarship: "",
//     sat_acceptance: "",
//     sat_scholarship: "",
//     admission: "",
//     scholarship: "",
//     gpa_based: "",
//     sat_based: "",
//     need_based: "",
//     holistic_review: "",
//     application_fee: "",
//     application_fee_waiver: "",
//     i20_deposit: "",
//     tuition: "",
//     living_and_tuition: "",
//     avg_scholarship: "",
//     tuition_after_scholarship: "",
//     coa_after_scholarship: "",
//     us_news_ranking: "",
//     niche_ranking: "",
//     major_ranking: "",
//     place_name: "",
//     settings: "",
//     racial_mix: "",
//     population: "",
//     population_trend: "",
//     job_and_opportunities: "",
//     crime: "",
//     college_essay: false,
//     college_essay_titles: [{ title: "" }],
//   },
// };

// const Stage5 = () => {
//   const [stagesDetail, setStagesDetail] = useState([]);
//   const [universities, setUniversities] = useState([]);
//   const [stageVideo, setStageVideo] = useState([]);
//   const [linkedUniversityIds, setLinkedUniversityIds] = useState(new Set());
//   const [loading, setLoading] = useState(false);
//   const [entries, setEntries] = useState([{ ...emptyEntry }]);
//   const [isCompareOpen, setIsCompareOpen] = useState(false);
//   const [comparisonData, setComparisonData] = useState({
//     uniNames: [],
//     fieldKeys: [],
//     values: {},
//   });
//   console.log(comparisonData);

//   const student_id = localStorage.getItem("student_id");

//   useEffect(() => {
//     getStages();
//     fetchUniversities();
//     fetchLinkedUniversities();
//     getStageVideo();
//   }, []);

//   const getStages = async () => {
//     try {
//       const res = await axios.get(
//         `${API_BASE_URL}/application-time-stages/?student=${student_id}`
//       );
//       setStagesDetail(res.data);
//     } catch (err) {
//       console.error("getStages:", err);
//     }
//   };

//   const fetchUniversities = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/university-details/`);
//       setUniversities(res.data);
//     } catch (err) {
//       console.error("fetchUniversities:", err);
//     }
//   };

//   const fetchLinkedUniversities = async () => {
//     if (!student_id) return;
//     try {
//       const res = await axios.get(
//         `${API_BASE_URL}/student-university-details/?student=${student_id}`
//       );
//       setLinkedUniversityIds(new Set(res.data.map((item) => item.university)));
//     } catch (err) {
//       console.error("fetchLinkedUniversities:", err);
//     }
//   };

//   const getStageVideo = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/stages-videos/`);
//       setStageVideo(res.data);
//     } catch (err) {
//       console.error("getStageVideo:", err);
//     }
//   };

//   const addMoreUniversity = () => {
//     setEntries((prev) =>
//       prev.length < 20 ? [...prev, { ...emptyEntry }] : prev
//     );
//   };

//   const handleEntryChange = (index, field, value) => {
//     setEntries((prev) => {
//       const updated = [...prev];
//       const entry = updated[index];

//       if (field === "university") {
//         entry.university = value;
//         entry.other_university = "";
//         if (value && value !== "other") {
//           const detail = universities.find((u) => u.university_name === value);
//           if (detail) {
//             entry.formData = {
//               ...entry.formData,
//               ...detail,
//               college_essay: detail.college_essay || false,
//               // Ensure college_essay_titles are in object format
//               college_essay_titles:
//                 detail.college_essay_titles &&
//                 detail.college_essay_titles.length
//                   ? detail.college_essay_titles.map((title) =>
//                       typeof title === "string" ? { title } : title
//                     )
//                   : [{ title: "" }],
//             };
//           }
//           entry.isDisabled = true;
//         } else {
//           entry.formData = { ...emptyEntry.formData };
//           entry.isDisabled = false;
//         }
//       } else if (field === "other_university") {
//         entry.other_university = value;
//       } else if (field === "college_essay") {
//         if (!entry.isDisabled) {
//           entry.formData.college_essay = value === "yes";
//           if (
//             entry.formData.college_essay &&
//             !entry.formData.college_essay_titles.length
//           ) {
//             entry.formData.college_essay_titles = [{ title: "" }];
//           }
//           if (!entry.formData.college_essay) {
//             entry.formData.college_essay_titles = [];
//           }
//         }
//       } else {
//         entry.formData[field] = value;
//       }

//       return updated;
//     });
//   };

//   const addEssayTitle = (index) => {
//     setEntries((prev) => {
//       const updated = [...prev];
//       const entry = updated[index];
//       if (!entry.isDisabled && entry.formData.college_essay) {
//         entry.formData.college_essay_titles.push({ title: "" });
//       }
//       return updated;
//     });
//   };

//   const handleEssayTitleChange = (index, essayIdx, value) => {
//     setEntries((prev) => {
//       const updated = [...prev];
//       if (!updated[index].isDisabled) {
//         updated[index].formData.college_essay_titles[essayIdx] = {
//           title: value,
//         };
//       }
//       return updated;
//     });
//   };

//   const addToProfile = async (idx) => {
//     const entry = entries[idx];
//     try {
//       let uniId;
//       if (entry.university === "other") {
//         const name = entry.other_university.trim();
//         const existing = universities.find(
//           (u) => u.university_name.toLowerCase() === name.toLowerCase()
//         );
//         if (existing) {
//           uniId = existing.id;
//         } else {
//           const res = await axios.post(`${API_BASE_URL}/university-details/`, {
//             university_name: name,
//             ...entry.formData,
//           });
//           uniId = res.data.id;
//           await fetchUniversities();
//         }
//       } else {
//         uniId = universities.find(
//           (u) => u.university_name === entry.university
//         ).id;
//       }

//       if (linkedUniversityIds.has(uniId)) {
//         return alert("This university is already linked to your profile.");
//       }

//       await axios.post(`${API_BASE_URL}/student-university-details/`, {
//         student: student_id,
//         university: uniId,
//         university_name:
//           entry.university === "other"
//             ? entry.other_university
//             : entry.university,
//         early_decision: entry.formData.early_decision,
//         early_action: entry.formData.early_action,
//         regular_decision: entry.formData.regular_decision,
//         scholarship_priority: entry.formData.scholarship_priority,
//         application_fee: entry.formData.application_fee,
//         application_fee_waiver: entry.formData.application_fee_waiver,
//         college_essay_titles: JSON.stringify(
//           entry.formData.college_essay_titles
//         ),
//       });

//       setLinkedUniversityIds((prev) => new Set(prev).add(uniId));
//       alert(
//         `University "${
//           entry.university || entry.other_university
//         }" added to your profile.`
//       );
//     } catch (err) {
//       console.error("addToProfile:", err);
//       alert("Failed to add university to profile.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const bulkPayload = {
//         student: student_id,
//         entries: entries.map((ent) => ({
//           university: ent.university === "other" ? "" : ent.university,
//           other_university:
//             ent.university === "other" ? ent.other_university : "",
//           ...ent.formData,
//         })),
//       };
//       await axios.post(`${API_BASE_URL}/stage-five-submissions/`, bulkPayload);

//       for (let i = 0; i < entries.length; i++) {
//         await addToProfile(i);
//       }

//       alert("Stage 5 submitted successfully! (wait for admin approval)");
//       setEntries([{ ...emptyEntry }]);
//     } catch (err) {
//       console.error("handleSubmit:", err);
//       alert("Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const compareUniversity = () => {
//     const selected = entries.filter(
//       (ent) => ent.university || ent.other_university
//     );
//     if (selected.length < 2) {
//       return alert(
//         "Please select or fill in at least two universities to compare."
//       );
//     }
//     const uniNames = selected.map((ent) =>
//       ent.university === "other" ? ent.other_university : ent.university
//     );
//     const fieldKeys = Object.keys(emptyEntry.formData);
//     const values = {};
//     fieldKeys.forEach((k) => {
//       values[k] = selected.map((ent) => ent.formData[k] || "");
//     });
//     setComparisonData({ uniNames, fieldKeys, values });
//     setIsCompareOpen(true);
//   };

//   const closeCompare = () => setIsCompareOpen(false);

//   const isStage5Completed =
//     stagesDetail.find((s) => s.stage === "5")?.is_complete === "completed";
//   const videoUrl1 = stageVideo[0]?.stage5_video1;

//   return (
//     <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
//       {/* Sidebar */}
//       <div className="md:w-1/4 w-full bg-gradient-to-l from-white to-green-500 p-4">
//         <h2 className="text-2xl underline font-bold">Stage 5:</h2>
//         <p className="mt-4 font-semibold">University Finalization</p>
//         <p className="mt-3">
//           Let's finalize on the list of universities based on your expectations.
//         </p>
//         <p className="mt-3">
//           We recommend applying to 5–10 for undergrads, 2–5 for grads. Patience
//           is key—most I‑20s take weeks or months.
//         </p>
//       </div>

//       {/* Main Content */}
//       <div className="md:w-3/4 w-full bg-white p-4 h-screen overflow-auto">
//         {/* Video */}
//         <iframe
//           src={videoUrl1}
//           className="w-full h-64 mb-4"
//           title="stage5 video"
//           allowFullScreen
//         />

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {entries.map((entry, idx) => (
//             <div key={idx} className="p-4 shadow rounded">
//               <h3 className="text-xl font-semibold mb-4">
//                 University #{idx + 1}
//               </h3>

//               {/* University Selector */}
//               <label className="block mb-2">Select University:</label>
//               <select
//                 value={entry.university}
//                 onChange={(e) =>
//                   handleEntryChange(idx, "university", e.target.value)
//                 }
//                 className="border rounded p-2 w-full mb-4"
//               >
//                 <option value="">-- Select a university --</option>
//                 {universities.map((u) => (
//                   <option key={u.id} value={u.university_name}>
//                     {u.university_name}
//                   </option>
//                 ))}
//                 <option value="other">Other</option>
//               </select>
//               {entry.university === "other" && (
//                 <input
//                   type="text"
//                   placeholder="Enter university name"
//                   value={entry.other_university}
//                   onChange={(e) =>
//                     handleEntryChange(idx, "other_university", e.target.value)
//                   }
//                   className="border rounded p-2 w-full mb-4"
//                 />
//               )}

//               {/* Field Groups */}
//               {[
//                 {
//                   title: "Deadline",
//                   fields: [
//                     "early_decision",
//                     "early_action",
//                     "regular_decision",
//                     "scholarship_priority",
//                   ],
//                 },
//                 {
//                   title: "Minimum English Proficiency",
//                   fields: ["det", "toefl", "ielts", "pte"],
//                 },
//                 {
//                   title: "Minimum GPA",
//                   fields: ["gpa_acceptance", "gpa_scholarship"],
//                 },
//                 {
//                   title: "Minimum SAT",
//                   fields: ["admission", "sat_scholarship"],
//                 },
//                 {
//                   title: "Scholarship Requirements",
//                   fields: [
//                     "gpa_based",
//                     "sat_based",
//                     "need_based",
//                     "holistic_review",
//                   ],
//                 },
//                 {
//                   title: "Cost",
//                   fields: [
//                     "application_fee",
//                     "application_fee_waiver",
//                     "i20_deposit",
//                     "tuition",
//                     "living_and_tuition",
//                     "avg_scholarship",
//                     "tuition_after_scholarship",
//                     "coa_after_scholarship",
//                   ],
//                 },
//                 {
//                   title: "Ranking",
//                   fields: ["us_news_ranking", "niche_ranking", "major_ranking"],
//                 },
//                 {
//                   title: "Location Details",
//                   fields: [
//                     "place_name",
//                     "settings",
//                     "racial_mix",
//                     "population",
//                     "population_trend",
//                     "job_and_opportunities",
//                     "crime",
//                   ],
//                 },
//               ].map(({ title, fields }) => (
//                 <div key={title}>
//                   <div className="text-lg font-semibold mt-4 mb-2">{title}</div>
//                   {fields.map((fld) => (
//                     <div
//                       key={fld}
//                       className="flex justify-between items-center mb-2"
//                     >
//                       <label className="capitalize mr-4">
//                         {fld.replace(/_/g, " ")}:
//                       </label>

//                       {[
//                         "scholarship",
//                         "gpa_based",
//                         "sat_based",
//                         "need_based",
//                         "holistic_review",
//                       ].includes(fld) ? (
//                         <select
//                           value={entry.formData[fld]}
//                           onChange={(e) =>
//                             handleEntryChange(idx, fld, e.target.value)
//                           }
//                           disabled={entry.isDisabled}
//                           className="border rounded w-1/2 p-1"
//                         >
//                           <option value="">-- select --</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           value={entry.formData[fld]}
//                           onChange={(e) =>
//                             handleEntryChange(idx, fld, e.target.value)
//                           }
//                           disabled={entry.isDisabled}
//                           className="border rounded w-1/2 p-2"
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}

//               {/* Dynamic SOP Section */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">SOP</h3>
//                 <div className="flex items-center mb-4">
//                   <label className="mr-4">College Essay Required:</label>
//                   <select
//                     value={entry.formData.college_essay ? "yes" : "no"}
//                     onChange={(e) =>
//                       handleEntryChange(idx, "college_essay", e.target.value)
//                     }
//                     disabled={entry.isDisabled}
//                     className="border p-1 rounded"
//                   >
//                     <option value="no">No</option>
//                     <option value="yes">Yes</option>
//                   </select>
//                 </div>

//                 {entry.formData.college_essay && (
//                   <div>
//                     {entry.formData.college_essay_titles.map(
//                       (titleObj, eIdx) => (
//                         <div key={eIdx} className="flex items-center mb-2">
//                           <label className="w-32">
//                             Essay {eIdx + 1} Title:
//                           </label>
//                           <input
//                             type="text"
//                             value={titleObj.title || ""}
//                             onChange={(e) =>
//                               handleEssayTitleChange(idx, eIdx, e.target.value)
//                             }
//                             disabled={entry.isDisabled}
//                             className="border p-2 rounded flex-1"
//                           />
//                         </div>
//                       )
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => addEssayTitle(idx)}
//                       disabled={entry.isDisabled}
//                       className="mt-2 bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded"
//                     >
//                       + Add Essay
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Add to Profile */}
//               <button
//                 type="button"
//                 onClick={() => addToProfile(idx)}
//                 className="mt-4 w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded"
//               >
//                 Add This University to Your Profile
//               </button>
//             </div>
//           ))}

//           {/* More / Compare / Submit Controls */}
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={addMoreUniversity}
//               className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded"
//             >
//               + More
//             </button>
//             <button
//               type="button"
//               onClick={compareUniversity}
//               className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded"
//             >
//               Compare University
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading || isStage5Completed}
//             className={`w-full py-4 text-2xl font-semibold mt-3 ${
//               isStage5Completed
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-l from-white to-green-300 hover:to-green-500"
//             }`}
//           >
//             {isStage5Completed
//               ? "Stage 5: Completed"
//               : loading
//               ? "Submitting..."
//               : "Stage 5: Submit"}
//           </button>
//         </form>

//         {/* Compare Modal */}
//         {isCompareOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             onClick={closeCompare}
//           >
//             <div
//               className="bg-white rounded-lg overflow-auto max-h-[80vh] w-[90vw] p-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-semibold">Compare Universities</h3>
//                 <button onClick={closeCompare} className="text-xl font-bold">
//                   ✕
//                 </button>
//               </div>
//               <div className="overflow-auto">
//                 <table className="min-w-full border-collapse">
//                   <thead>
//                     <tr>
//                       <th className="border bg-gray-100 px-3 py-2 text-left">
//                         Field
//                       </th>
//                       {comparisonData.uniNames.map((u, i) => (
//                         <th
//                           key={i}
//                           className="border bg-gray-100 px-3 py-2 text-left"
//                         >
//                           {u}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {comparisonData.fieldKeys.map((fk) => (
//                       <tr key={fk}>
//                         <td className="border px-3 py-1 font-semibold">
//                           {fk.replace(/_/g, " ")}
//                         </td>
//                         {comparisonData.values[fk].map((v, j) => {
//                           // If it’s an array (e.g. college_essay_titles), extract titles
//                           const display = Array.isArray(v)
//                             ? v.map((item) => item.title ?? item).join(", ")
//                             : v || "-";

//                           return (
//                             <td key={j} className="border px-3 py-1">
//                               {display}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Stage5;
