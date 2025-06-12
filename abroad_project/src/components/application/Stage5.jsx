import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Template for a single university entry
const emptyEntry = {
  university: "",
  other_university: "",
  isDisabled: false,
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
  }
};

const Stage5 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [linkedUniversityIds, setLinkedUniversityIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([{ ...emptyEntry }]);

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

  // ─── COMPARISON STATE ─────────────────────────────────────────────────────
  // Whether “Compare” modal is open
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  // { uniNames: [...], fieldKeys: [...], values: { [fieldKey]: [val1, val2, ...] } }
  const [comparisonData, setComparisonData] = useState({
    uniNames: [],
    fieldKeys: [],
    values: {}
  });

  //----------------------------------------
  // 1) Fetch master list of universities
  //----------------------------------------
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/university-details/`);
      setUniversities(res.data);
    } catch (err) {
      console.error("Error fetching universities:", err.response || err.message);
    }
  };

  //----------------------------------------
  // 2) Fetch existing StudentUniversityDetail links
  //----------------------------------------
  const fetchLinkedUniversities = async () => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    try {
      const res = await axios.get(
        `${API_BASE_URL}/student-university-details/?student=${studentId}`
      );
      // Build a Set of all linked “university” IDs
      const idSet = new Set(res.data.map((item) => item.university));
      setLinkedUniversityIds(idSet);
    } catch (err) {
      console.error(
        "Error fetching student-university-details:",
        err.response || err.message
      );
    }
  };

  // Run both on mount
  useEffect(() => {
    fetchUniversities();
    fetchLinkedUniversities();
    getStages();
  }, []);

  const addMoreUniversity = () => {
    setEntries((prev) =>
      prev.length >= 20 ? prev : [...prev, { ...emptyEntry }]
    );
  };

  const handleEntryChange = (index, field, value) => {
    setEntries((prev) => {
      const updated = [...prev];

      if (field === "university") {
        updated[index].university = value;
        updated[index].other_university = "";

        if (value && value !== "other") {
          // Prefill formData from master “universities”
          const detail = universities.find((u) => u.university_name === value);
          if (detail) {
            updated[index].formData = {
              early_decision: detail.early_decision || "",
              early_action: detail.early_action || "",
              regular_decision: detail.regular_decision || "",
              scholarship_priority: detail.scholarship_priority || "",
              det: detail.det || "",
              toefl: detail.toefl || "",
              ielts: detail.ielts || "",
              pte: detail.pte || "",
              gpa_acceptance: detail.gpa_acceptance || "",
              gpa_scholarship: detail.gpa_scholarship || "",
              sat_acceptance: detail.sat_acceptance || "",
              sat_scholarship: detail.sat_scholarship || "",
              admission: detail.admission || "",
              scholarship: detail.scholarship || "",
              gpa_based: detail.gpa_based || "",
              sat_based: detail.sat_based || "",
              need_based: detail.need_based || "",
              holistic_review: detail.holistic_review || "",
              tuition: detail.tuition || "",
              living_and_tuition: detail.living_and_tuition || "",
              avg_scholarship: detail.avg_scholarship || "",
              tuition_after_scholarship: detail.tuition_after_scholarship || "",
              coa_after_scholarship: detail.coa_after_scholarship || "",
              us_news_ranking: detail.us_news_ranking || "",
              niche_ranking: detail.niche_ranking || "",
              major_ranking: detail.major_ranking || "",
              place_name: detail.place_name || "",
              settings: detail.settings || "",
              racial_mix: detail.racial_mix || "",
              population: detail.population || "",
              population_trend: detail.population_trend || "",
              job_and_opportunities: detail.job_and_opportunities || "",
              crime: detail.crime || ""
            };
          }
          updated[index].isDisabled = true;
        } else {
          // “Other” or cleared → reset
          updated[index].formData = { ...emptyEntry.formData };
          updated[index].isDisabled = false;
        }
      } else if (field === "other_university") {
        updated[index].other_university = value;
      } else {
        // Any other form field
        updated[index].formData[field] = value;
      }

      return updated;
    });
  };

  //------------------------------------------------------------------------------
  // addToProfile(idx):
  //   (same as before: handle “other,” prevent duplicates, post StudentUniversityDetail)
  //------------------------------------------------------------------------------
  const addToProfile = async (idx) => {
    const entry = entries[idx];
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      return alert("Student ID not found in localStorage!");
    }

    let universityId = null;
    let universityName = "";

    try {
      // --- 1) Handle “other” case: create if not already in master list ---
      if (entry.university === "other") {
        universityName = entry.other_university.trim();
        if (!universityName) {
          return alert("Please enter a name for the new university.");
        }

        // Check if this name already exists (case-insensitive match)
        const existing = universities.find(
          (u) =>
            u.university_name.trim().toLowerCase() ===
            universityName.toLowerCase()
        );
        if (existing) {
          universityId = existing.id;
        } else {
          // POST a brand-new UniversityDetail
          const uniPayload = {
            university_name: universityName,
            early_decision: entry.formData.early_decision,
            early_action: entry.formData.early_action,
            regular_decision: entry.formData.regular_decision,
            scholarship_priority: entry.formData.scholarship_priority,
            det: entry.formData.det,
            toefl: entry.formData.toefl,
            ielts: entry.formData.ielts,
            pte: entry.formData.pte,
            gpa_acceptance: entry.formData.gpa_acceptance,
            gpa_scholarship: entry.formData.gpa_scholarship,
            sat_acceptance: entry.formData.sat_acceptance,
            sat_scholarship: entry.formData.sat_scholarship,
            admission: entry.formData.admission,
            scholarship: entry.formData.scholarship,
            gpa_based: entry.formData.gpa_based,
            sat_based: entry.formData.sat_based,
            need_based: entry.formData.need_based,
            holistic_review: entry.formData.holistic_review,
            tuition: entry.formData.tuition,
            living_and_tuition: entry.formData.living_and_tuition,
            avg_scholarship: entry.formData.avg_scholarship,
            tuition_after_scholarship:
              entry.formData.tuition_after_scholarship,
            coa_after_scholarship: entry.formData.coa_after_scholarship,
            us_news_ranking: entry.formData.us_news_ranking,
            niche_ranking: entry.formData.niche_ranking,
            major_ranking: entry.formData.major_ranking,
            place_name: entry.formData.place_name,
            settings: entry.formData.settings,
            racial_mix: entry.formData.racial_mix,
            population: entry.formData.population,
            population_trend: entry.formData.population_trend,
            job_and_opportunities: entry.formData.job_and_opportunities,
            crime: entry.formData.crime
          };

          const uniRes = await axios.post(
            `${API_BASE_URL}/university-details/`,
            uniPayload
          );
          universityId = uniRes.data.id;
          // Refresh master list so future dropdowns include this new record
          await fetchUniversities();
        }
      } else {
        // --- 2) Existing university: find its ID in master list ---
        const detail = universities.find(
          (u) => u.university_name === entry.university
        );
        if (!detail) {
          return alert("Selected university not found in master list!");
        }
        universityId = detail.id;
        universityName = detail.university_name;
      }

      // --- 3) Prevent duplicates: check if already linked ---
      if (linkedUniversityIds.has(universityId)) {
        return alert(
          `“${universityId === null ? universityName : entry.university
          }” is already linked to your profile.`
        );
      }

      // --- 4) Create StudentUniversityDetail link ---
      const studentUniPayload = {
        student: studentId,
        university: universityId,
        university_name:
          entry.university === "other"
            ? entry.other_university.trim()
            : entry.university
      };

      await axios.post(
        `${API_BASE_URL}/student-university-details/`,
        studentUniPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      // 5) Update our set so we don’t re-link
      setLinkedUniversityIds((prevSet) => {
        const next = new Set(prevSet);
        next.add(universityId);
        return next;
      });

      alert(`University “${studentUniPayload.university_name}” added to your profile.`);
    } catch (err) {
      console.error("Error in addToProfile:", err.response || err.message);
      alert("Failed to add university to profile: " + (err.message || err));
    }
  };

  //------------------------------------------------------------------------------
  // handleSubmit(e) “Submit All”
  //  (same bulk‐submit + linking logic as before)
  //------------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      return alert("Student ID not found!");
    }

    setLoading(true);
    try {
      // 1) Bulk POST to stage-five-submissions
      const payloadEntries = entries.map((ent) => ({
        university: ent.university === "other" ? "" : ent.university,
        other_university:
          ent.university === "other"
            ? ent.other_university.trim()
            : "",
        ...ent.formData
      }));
      const bulkPayload = { student: studentId, entries: payloadEntries };

      await axios.post(
        `${API_BASE_URL}/stage-five-submissions/`,
        bulkPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      // 2) For each entry, replicate addToProfile logic:
      for (let ent of entries) {
        let uniId = null;
        let uniName = "";

        if (ent.university === "other") {
          uniName = ent.other_university.trim();
          if (!uniName) continue; // skip blank “other”

          // Check master list (case-insensitive)
          let existing = universities.find(
            (u) => u.university_name.trim().toLowerCase() === uniName.toLowerCase()
          );
          if (existing) {
            uniId = existing.id;
          } else {
            // Create new
            const uniPayload = {
              university_name: uniName,
              early_decision: ent.formData.early_decision,
              early_action: ent.formData.early_action,
              regular_decision: ent.formData.regular_decision,
              scholarship_priority: ent.formData.scholarship_priority,
              det: ent.formData.det,
              toefl: ent.formData.toefl,
              ielts: ent.formData.ielts,
              pte: ent.formData.pte,
              gpa_acceptance: ent.formData.gpa_acceptance,
              gpa_scholarship: ent.formData.gpa_scholarship,
              sat_acceptance: ent.formData.sat_acceptance,
              sat_scholarship: ent.formData.sat_scholarship,
              admission: ent.formData.admission,
              scholarship: ent.formData.scholarship,
              gpa_based: ent.formData.gpa_based,
              sat_based: ent.formData.sat_based,
              need_based: ent.formData.need_based,
              holistic_review: ent.formData.holistic_review,
              tuition: ent.formData.tuition,
              living_and_tuition: ent.formData.living_and_tuition,
              avg_scholarship: ent.formData.avg_scholarship,
              tuition_after_scholarship: ent.formData.tuition_after_scholarship,
              coa_after_scholarship: ent.formData.coa_after_scholarship,
              us_news_ranking: ent.formData.us_news_ranking,
              niche_ranking: ent.formData.niche_ranking,
              major_ranking: ent.formData.major_ranking,
              place_name: ent.formData.place_name,
              settings: ent.formData.settings,
              racial_mix: ent.formData.racial_mix,
              population: ent.formData.population,
              population_trend: ent.formData.population_trend,
              job_and_opportunities: ent.formData.job_and_opportunities,
              crime: ent.formData.crime
            };

            const uniRes = await axios.post(
              `${API_BASE_URL}/university-details/`,
              uniPayload
            );
            uniId = uniRes.data.id;
            await fetchUniversities(); // refresh master list
          }
        } else {
          // Existing university
          const detail = universities.find(
            (u) => u.university_name === ent.university
          );
          if (!detail) {
            // If somehow missing, skip
            continue;
          }
          uniId = detail.id;
          uniName = detail.university_name;
        }

        // Skip if already linked
        if (linkedUniversityIds.has(uniId)) {
          continue;
        }

        // Create StudentUniversityDetail
        const studentUniPayload = {
          student: studentId,
          university: uniId,
          university_name:
            ent.university === "other"
              ? ent.other_university.trim()
              : ent.university
        };
        await axios.post(
          `${API_BASE_URL}/student-university-details/`,
          studentUniPayload,
          { headers: { "Content-Type": "application/json" } }
        );

        // Update the Set so subsequent entries don’t duplicate
        setLinkedUniversityIds((prevSet) => {
          const next = new Set(prevSet);
          next.add(uniId);
          return next;
        });
      }

      alert("All entries submitted & linked to your profile (no duplicates).");
      // Reset to a single empty entry
      setEntries([{ ...emptyEntry }]);
    } catch (err) {
      console.error("Error in handleSubmit:", err.response || err.message);
      alert("Failed to submit: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  //──────────────────────────────────────────────────────────────────────────────
  // compareUniversity():
  //   - Take only “filled” entries (where entry.university is non‐empty OR “other” is filled)
  //   - If fewer than 2, alert the user
  //   - Otherwise, build a table of (fields × universities) and open the modal
  //──────────────────────────────────────────────────────────────────────────────
  const compareUniversity = () => {
    // 1) Filter out entries where no university was chosen
    const selected = entries.filter((ent) => {
      // If user chose “other,” ensure they typed an actual other_university
      if (ent.university === "other") {
        return ent.other_university.trim() !== "";
      }
      // Otherwise, if they picked a known university, that counts
      return ent.university !== "";
    });

    if (selected.length < 2) {
      return alert("Please select or fill in at least two universities to compare.");
    }

    // 2) Build an array of the display names (either chosen or “other”)
    const uniNames = selected.map((ent) =>
      ent.university === "other" ? ent.other_university.trim() : ent.university
    );

    // 3) Collect all the keys of formData (we assume they’re identical for each entry)
    const fieldKeys = Object.keys(emptyEntry.formData);

    // 4) Build a map: fieldKey → [ valueForUni1, valueForUni2, ... ]
    const values = {};
    fieldKeys.forEach((fld) => {
      values[fld] = selected.map((ent) => ent.formData[fld] || "");
    });

    // 5) Save into state and open modal
    setComparisonData({ uniNames, fieldKeys, values });
    setIsCompareOpen(true);
  };

  //──────────────────────────────────────────────────────────────────────────────
  // closeCompare(): simply hide the popup
  //──────────────────────────────────────────────────────────────────────────────
  const closeCompare = () => {
    setIsCompareOpen(false);
  };

  // Check if Stage 5 is marked "completed" in the fetched stages array
  const stage5Data = stagesDetail.find((item) => item.stage === "5");
  const isStage5Completed = stage5Data?.is_complete === "completed";

  return (
    <div className="flex md:flex-row flex-col mx-auto w-full">
      <div className="md:w-1/4 w-full bg-gradient-to-l from-white to-green-500 p-4 h-auto">
        <h2 className="text-2xl underline font-bold">Stage 5:</h2>
        <p className="mt-4">University Finalization</p>
        <p className="mt-2">
          Pick 5–10 for undergrad (2–5 for grad), then follow up on I-20s!
        </p>
      </div>

      <div className="md:w-3/4 w-full bg-white h-screen overflow-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {entries.map((entry, idx) => (
            <div key={idx} className="border p-4 rounded">
              <h3 className="text-xl font-semibold mb-4">
                University #{idx + 1}
              </h3>

              {/* University Selector */}
              <label className="block mb-2">Select University:</label>
              <select
                name="university"
                value={entry.university}
                onChange={(e) =>
                  handleEntryChange(idx, "university", e.target.value)
                }
                className="border p-2 w-full mb-4"
              >
                <option value="">-- Select a university --</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.university_name}>
                    {u.university_name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>

              {/* “Other” name input */}
              {entry.university === "other" && (
                <input
                  type="text"
                  name="other_university"
                  placeholder="Enter university name"
                  value={entry.other_university}
                  onChange={(e) =>
                    handleEntryChange(idx, "other_university", e.target.value)
                  }
                  className="border p-2 w-full mb-4"
                />
              )}

              {/* Reusable renderer for all form fields */}
              {[
                {
                  title: "Deadline",
                  fields: [
                    "early_decision",
                    "early_action",
                    "regular_decision",
                    "scholarship_priority"
                  ]
                },
                {
                  title: "Minimum English Proficiency",
                  fields: ["det", "toefl", "ielts", "pte"]
                },
                {
                  title: "Minimum GPA",
                  fields: ["gpa_acceptance", "gpa_scholarship"]
                },
                {
                  title: "Minimum SAT",
                  fields: ["sat_acceptance", "sat_scholarship"]
                },
                {
                  title: "SAT Requirements",
                  fields: ["admission", "scholarship"]
                },
                {
                  title: "Scholarship Requirements",
                  fields: [
                    "gpa_based",
                    "sat_based",
                    "need_based",
                    "holistic_review"
                  ]
                },
                {
                  title: "Cost",
                  fields: [
                    "tuition",
                    "living_and_tuition",
                    "avg_scholarship",
                    "tuition_after_scholarship",
                    "coa_after_scholarship"
                  ]
                },
                {
                  title: "Ranking",
                  fields: ["us_news_ranking", "niche_ranking", "major_ranking"]
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
                    "crime"
                  ]
                }
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

                      {[
                        "admission",
                        "scholarship",
                        "gpa_based",
                        "sat_based",
                        "need_based",
                        "holistic_review"
                      ].includes(fld) ? (
                        <select
                          name={fld}
                          value={entry.formData[fld]}
                          onChange={(e) =>
                            handleEntryChange(idx, fld, e.target.value)
                          }
                          disabled={entry.isDisabled}
                          className="border w-1/2 p-1"
                        >
                          <option value="">-- select --</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={fld}
                          value={entry.formData[fld]}
                          onChange={(e) =>
                            handleEntryChange(idx, fld, e.target.value)
                          }
                          disabled={entry.isDisabled}
                          className="border w-1/2 p-1"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Add single entry to profile */}
              <button
                type="button"
                onClick={() => addToProfile(idx)}
                className="w-full bg-blue-300 hover:bg-blue-400 p-3 text-lg font-semibold mt-4"
              >
                Add This University to Your Profile
              </button>
            </div>
          ))}

          <div className="flex flex-col justify-center gap-4">
            {/* COMPARE button now calls our new function */}
            
            <button
              type="button"
              onClick={addMoreUniversity}
              className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded w-full"
            >
              + More
            </button>

            <button
              type="button"
              onClick={compareUniversity}
              className="bg-green-300 hover:bg-green-400 py-2 px-4 rounded w-full"
            >
              Compare University
            </button>

            {/* <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-green-300 to-green-500 py-2 px-6 rounded text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Stage 5: Submit All"}
            </button> */}

            {/* Submit / Completed Button */}
        <div className="mt-4">
          <button
            onClick={() => handleSubmit(responseLink[0]?.stage)}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage5Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage5Completed}
          >
            {isStage5Completed ? "Stage 5: Completed" : "Stage 5: Submit"}
          </button>
          
        </div>

          </div>
        </form>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          COMPARE MODAL POPUP
          Only render when isCompareOpen === true
      ───────────────────────────────────────────────────────────────────── */}
      {isCompareOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeCompare}
        >
          {/* Clicking the translucent background closes the popup */}
          <div
            className="bg-white rounded-lg overflow-auto max-h-[80vh] w-[90vw] md:w-[70vw] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Compare Universities</h3>
              <button
                onClick={closeCompare}
                className="text-xl font-bold px-2 hover:text-red-600"
              >
                ✕
              </button>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    {/* First header can be “Field” or blank */}
                    <th className="border bg-gray-100 px-3 py-2 text-left">
                      Field
                    </th>
                    {comparisonData.uniNames.map((uName, i) => (
                      <th
                        key={i}
                        className="border bg-gray-100 px-3 py-2 text-left"
                      >
                        {uName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.fieldKeys.map((fldKey) => (
                    <tr key={fldKey}>
                      <td className="border px-3 py-1 font-semibold">
                        {fldKey.replace(/_/g, " ")}
                      </td>
                      {comparisonData.values[fldKey].map((val, j) => (
                        <td key={j} className="border px-3 py-1">
                          {val || "-"}
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
  );
};

export default Stage5;
