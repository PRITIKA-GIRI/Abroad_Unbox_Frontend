import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APPLIED_KEY = "stage6_applied_unis";

const Stage6Masters = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentUniDetail, setStudentUniDetail] = useState([]);
  const [stageVideo, setStageVideo] = useState([]);
  const [error, setError] = useState("");
  const [appliedUniIds, setAppliedUniIds] = useState([]);
  const [essayFiles, setEssayFiles] = useState({});
  const [isCommonAppOpen, setIsCommonAppOpen] = useState(false);

  const studentID = localStorage.getItem("student_id");

  useEffect(() => {
    const saved = localStorage.getItem(APPLIED_KEY);
    if (saved) {
      setAppliedUniIds(JSON.parse(saved));
    }
    getStages();
    getStageVideo();
    getStuUniDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStages = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${studentID}`
      );
      setStagesDetail(data);
    } catch (err) {
      console.error("Failed to get stages data", err);
    }
  };

  const getStageVideo = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/stages-videos/`);
      setStageVideo(data);
    } catch (err) {
      console.error("Failed to get stage videos", err);
    }
  };

  const getStuUniDetail = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/student-university-details/?student=${studentID}`
      );

      const parsed = data.map((item) => {
        const raw = item.college_essay_titles;
        let essays = [];
        if (Array.isArray(raw)) {
          essays = raw;
        } else {
          try { essays = JSON.parse(raw); } catch { essays = []; }
        }
        const titles = essays.map((obj, idx) => ({ id: idx, title: obj.title }));
        return { ...item, college_essay_titles: titles };
      });

      setStudentUniDetail(parsed);
    } catch (err) {
      console.error("Failed to get university list", err);
      setError("Could not load your university list.");
    }
  };

  const stage6Data = stagesDetail.find((item) => item.stage === "6");
  const isStage6Completed = stage6Data?.is_complete === "completed";
  const videoUrl = stageVideo[0]?.bachelors_stage6_commonapp_video;

  const handleFileChange = (uniDetailId, essayTitleId, file) => {
    setEssayFiles((prev) => ({
      ...prev,
      [uniDetailId]: {
        ...(prev[uniDetailId] || {}),
        [essayTitleId]: file,
      },
    }));
  };

  // Check if any essay file is missing for a university
  const isMissingEssay = (uniDetail) => {
    const needed = uniDetail.college_essay_titles.map((t) => t.id);
    const filesForUni = essayFiles[uniDetail.id] || {};
    return needed.some((id) => !filesForUni[id]);
  };

  const handleApply = (uniDetail) => {
    if (!appliedUniIds.includes(uniDetail.university)) {
      const updated = [...appliedUniIds, uniDetail.university];
      setAppliedUniIds(updated);
      localStorage.setItem(APPLIED_KEY, JSON.stringify(updated));
    }
  };

  const handleRemove = (uniDetail) => {
    const updated = appliedUniIds.filter((id) => id !== uniDetail.university);
    setAppliedUniIds(updated);
    localStorage.setItem(APPLIED_KEY, JSON.stringify(updated));
  };

  const appliedUnis = studentUniDetail.filter((u) =>
    appliedUniIds.includes(u.university)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentID) {
      alert("Student ID not found in local storage!");
      return;
    }
    if (appliedUniIds.length === 0) {
      alert("Please apply to at least one university before submitting.");
      return;
    }
    try {
      setLoading(true);
      const uploadPromises = appliedUnis.flatMap((uniDetail) =>
        uniDetail.college_essay_titles.map(({ id, title }) => {
          const file = essayFiles[uniDetail.id]?.[id];
          const form = new FormData();
          form.append("student", studentID);
          form.append("university", uniDetail.university);
          form.append("title", title);
          form.append("essay_file", file);
          return axios.post(
            `${API_BASE_URL}/student-university-essay-details/`,
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        })
      );

      await Promise.all(uploadPromises);
      const payload = {
        student: studentID,
        stage: "6",
        applied_university: appliedUniIds,
      };
      await axios.post(
        `${API_BASE_URL}/stage-six-submissions/`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(
        "Stage 6 submission successful! (Wait for admin approval to unlock next stage)"
      );
      setAppliedUniIds([]);
      setEssayFiles({});
      localStorage.removeItem(APPLIED_KEY);
      getStages();
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit Stage 6. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row-reverse flex-col mx-auto w-full">
      {/* Sidebar */}
      <div className="md:w-1/5 w-full bg-gradient-to-l from-white to-green-500 p-4 h-auto">
        <h2 className="text-2xl underline font-bold">Stage 6:</h2>
        <p className="mt-2">Now we have all the documents ready & we have all the university list. Let's apply.</p>
        <p className="mt-2">Although there are many ways to apply, we prefer CommonApp, University portal, and AU Portal.</p>
        <p className="mt-2">Our goal with the combination of portals is to reduce cost and shorten the time to get an offer letter.</p>
      </div>

      {/* Main Content */}
      <div className="md:w-4/5 w-full bg-white h-screen p-4 md:overflow-scroll">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-white to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Applying to University
          </div>
          <div className="bg-gradient-to-r from-white to-blue-300 p-2 text-2xl font-semibold text-center flex items-center">
            <p>Abroad Unbox Portal</p>
          </div>
          <p className="px-10">This Portal, the one you are using right now will help you
            with applying to your selected University. Just click apply
            next to the list of your finalized university. Your application
            DONE.</p>
          <p className="px-10">
            Someone from our team will reach out to you if there is
            anything.</p>

          {studentUniDetail.map((uniDetail) => {
            const applied = appliedUniIds.includes(uniDetail.university);
            const disableApply = applied || isMissingEssay(uniDetail);

            return (
              <div key={uniDetail.id} className="mb-6">
                <div className="bg-gradient-to-r from-white to-green-300 p-2 flex justify-between items-center">
                  <span className="text-xl font-semibold">
                    {uniDetail.university_name} (ID: {uniDetail.university})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleApply(uniDetail)}
                    disabled={disableApply || loading}
                    className={`px-3 py-1 rounded-3xl transition duration-150 ${
                      disableApply ? "bg-gray-300 cursor-not-allowed opacity-70" : "bg-blue-300 hover:bg-blue-400"
                    }`}
                  >
                    {applied ? "Applied" : "Apply"}
                  </button>
                </div>
                  
                  {/* {isStage6Completed ? (
                    <div className="text-red-500 text-sm mt-2">
                      Stage 6 is already completed. You cannot apply again.
                    </div>
                    // <></>
                  ) : isMissingEssay(uniDetail) ? (
                    <div className="text-red-500 text-sm mt-2">
                      Please upload all required essays before applying.
                    </div>
                  ) : ( */}
                  <div className="flex flex-col md:flex-row gap-5 mt-2">
                    <div className="w-full md:w-1/3 space-y-2 md:border-r border-gray-300">
                      <p className="font-semibold underline">Duration Details:</p>
                      <p>Early Action: {uniDetail.early_action}</p>
                      <p>Early Decision: {uniDetail.early_decision}</p>
                      <p>Regular Decision: {uniDetail.regular_decision}</p>
                      <p>Scholarship Priority: {uniDetail.scholarship_priority}</p>
                      <p className="font-semibold underline">Cost Details:</p>
                      <p>Application Fee: {uniDetail.application_fee}</p>
                      <p>Application Fee Waiver: {uniDetail.application_fee_waiver}</p>
                    </div>

                    <div className="w-full md:w-2/3 space-y-2">
                      {uniDetail.college_essay_titles.map(({ id, title }) => (
                        
                        <div key={id} className="flex justify-between items-center">
                          <p>{title}</p>
                          <input
                            type="file"
                            className="border p-2 rounded-lg w-1/2 right-0"
                            // accept=".pdf,.doc,.docx,.txt"
                            accept=".pdf"
                            onChange={(e) =>
                              handleFileChange(uniDetail.id, id, e.target.files[0])
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* )} */}
                
              </div>
            );
          })}

          {appliedUnis.length > 0 && (
            <>
              <div className="bg-gradient-to-r from-white to-blue-300 p-2 text-2xl font-semibold text-center mt-6 mb-3">
                Applied Universities
              </div>
              {appliedUnis.map((uniDetail) => (
                <div key={uniDetail.id} className="bg-gradient-to-r from-white to-green-300 p-2 flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold">
                    {uniDetail.university_name} (ID: {uniDetail.university})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(uniDetail)}
                    className="px-3 py-1 bg-blue-400 rounded-3xl hover:bg-blue-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}

          <div className="border-t border-gray-300 my-6" />

          <div className="bg-gradient-to-r from-white to-blue-300 p-2 text-2xl font-semibold text-center flex items-center cursor-pointer"
              onClick={() => setIsCommonAppOpen((o) => !o)}>
              <p className="text-2xl font-semibold text-center">CommonApp</p>
              {isCommonAppOpen ? (
                <MdOutlineExpandLess className="ml-auto text-4xl" />
              ) : (
                <MdOutlineExpandMore className="ml-auto text-4xl" />
              )}
          </div>
          {isCommonAppOpen && (
          <div>
          <p className="px-10">CommonApp allows applying to up to 20 universities. It's for undergraduates only.</p>
          <div className="w-full mb-4">
            <a
              href="https://www.commonapp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-1/2 py-3 px-5 bg-green-300 rounded-lg text-center inline-block"
            >
              Go To CommonApp
            </a>
          </div>
          <div className="bg-blue-300 py-2 w-full text-xl font-semibold text-center">CommonApp Video Tutorial</div>
          {videoUrl && (
            <iframe
              className="w-full h-[300px] md:h-[400px] mt-2"
              src={videoUrl}
              allowFullScreen
              title="CommonApp Video Tutorial"
            />
          )}
          </div>
        )}

          <div className="border-t border-gray-300 my-6" />

          <button
            type="submit"
            disabled={isStage6Completed || loading || appliedUniIds.length === 0}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage6Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-white to-green-300 hover:to-green-500"
            }`}
          >
            {isStage6Completed
              ? "Stage 6: Completed"
              : loading
              ? "Submitting..."
              : "Stage 6: Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stage6Masters;
