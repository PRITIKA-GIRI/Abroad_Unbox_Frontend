import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stage2Schema } from "./Stage2Validation";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage2 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(stage2Schema),
  });

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
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
    getStages();
  }, [student_id]);

  const onSubmit = async (data) => {
    const payload = { ...data, student: student_id };

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/stage-two-submissions/`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Stage 2 (two) Form submitted successfully!");
      reset();
    } catch (err) {
      console.error("Submission error:", err.response || err.message);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  const stage2Data = stagesDetail.find((item) => item.stage === "2");
  const isStage2Completed = stage2Data?.is_complete === "completed";
  const testType = watch("standardized_test");

  return (
    <div className="flex md:flex-row-reverse flex-col w-full">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#ffffff] to-[#248a4d] h-auto md:h-dvh p-2 text-center text-xs md:text-base">
        <h2 className="text-2xl underline font-bold">Stage 2:</h2>
        <h2 className="text-xl font-semibold mt-6">Profile</h2>
        <p className="font-medium mt-5">
          Let's build your comprehensive profile
        </p>
        <p className="font-medium mt-5">
          Now you have a good idea of your mindset, career, and university
          selection;
        </p>
        <p className="font-medium mt-5">
          Please give the details of everything to the best of your knowledge.
        </p>
      </div>

      {/* Form Content */}
      <div className="w-full md:w-3/4 h-svh p-4 overflow-y-auto no-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            Academic Information
          </h2>

          <div className="mt-5 flex flex-col gap-4">
            <input
              placeholder="Name"
              {...register("name")}
              className="border rounded border-gray-300 w-full p-2"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

            <select
              {...register("gender")}
              className="w-full bg-gray-100 p-2 rounded border border-gray-300"
              defaultValue=""
            >
              <option value="">Select Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}

            <select
              {...register("marital_status")}
              className="w-full bg-gray-100 p-2 rounded border border-gray-300"
              defaultValue=""
            >
              <option value="">Choose Your Marital Status</option>
              <option value="True">Married</option>
              <option value="False">Single</option>
            </select>
            {errors.marital_status && (
              <span className="text-red-500">
                {errors.marital_status.message}
              </span>
            )}

            <label>Date of Birth:</label>
            <input
              type="date"
              {...register("date_of_birth")}
              className="border rounded w-full p-2 border-gray-300"
            />
            {errors.date_of_birth && (
              <span className="text-red-500">
                {errors.date_of_birth.message}
              </span>
            )}
          </div>

          {/* Address Fields */}
          <h2 className="bg-gradient-to-r from-[#ffffff] to-blue-300 p-2 w-full text-2xl font-semibold text-center mt-5">
            Permanent Address
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {[
              "country",
              "city",
              "state",
              "address_i",
              "address_ii",
              "zip_code",
              "level",
              "year_graduated",
            ].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  {...register(field)}
                  placeholder={field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  className="border rounded w-full p-2 border-gray-300"
                />
                {errors[field] && (
                  <span className="text-red-500">{errors[field]?.message}</span>
                )}
              </div>
            ))}
          </div>

          {/* Standardized Test Section */}
          <div className="mt-5 flex flex-col gap-4">
            <select
              {...register("standardized_test")}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              defaultValue=""
            >
              <option value="">Choose Your Standardized Test</option>
              <option value="SAT">SAT</option>
              <option value="GRE">GRE</option>
              <option value="GMAT">GMAT</option>
            </select>

            {testType === "SAT" && (
              <>
                <input
                  {...register("sat_verbal")}
                  placeholder="SAT Verbal"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.sat_verbal && (
                  <span className="text-red-500">
                    {errors.sat_verbal.message}
                  </span>
                )}

                <input
                  {...register("sat_quant")}
                  placeholder="SAT Quant"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.sat_quant && (
                  <span className="text-red-500">
                    {errors.sat_quant.message}
                  </span>
                )}
              </>
            )}

            {testType === "GRE" && (
              <>
                <input
                  {...register("gre_verbal_reasoning")}
                  placeholder="GRE Verbal Reasoning"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gre_verbal_reasoning && (
                  <span className="text-red-500">
                    {errors.gre_verbal_reasoning.message}
                  </span>
                )}

                <input
                  {...register("gre_quant_reasoning")}
                  placeholder="GRE Quant Reasoning"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gre_quant_reasoning && (
                  <span className="text-red-500">
                    {errors.gre_quant_reasoning.message}
                  </span>
                )}

                <input
                  {...register("gre_analytical_writing")}
                  placeholder="GRE Analytical Writing"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gre_analytical_writing && (
                  <span className="text-red-500">
                    {errors.gre_analytical_writing.message}
                  </span>
                )}
              </>
            )}

            {testType === "GMAT" && (
              <>
                <input
                  {...register("gmat_quantitative")}
                  placeholder="GMAT Quantitative"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gmat_quantitative && (
                  <span className="text-red-500">
                    {errors.gmat_quantitative.message}
                  </span>
                )}

                <input
                  {...register("gmat_verbal")}
                  placeholder="GMAT Verbal"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gmat_verbal && (
                  <span className="text-red-500">
                    {errors.gmat_verbal.message}
                  </span>
                )}

                <input
                  {...register("gmat_data_insights")}
                  placeholder="GMAT Data Insights"
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors.gmat_data_insights && (
                  <span className="text-red-500">
                    {errors.gmat_data_insights.message}
                  </span>
                )}
              </>
            )}
          </div>

          {/* English Proficiency */}
          <div className="mt-5 flex flex-col gap-4">
            <select
              {...register("english_test_type")}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              defaultValue=""
            >
              <option value="">Choose your test type</option>
              <option value="det">DET</option>
              <option value="ielts">IELTS</option>
              <option value="pte">PTE</option>
              <option value="toefl">TOEFL</option>
            </select>

            {[
              "english_reading",
              "english_writing",
              "english_listening",
              "english_speaking",
            ].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  {...register(field)}
                  placeholder={field
                    .split("_")[1]
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  className="border rounded w-full border-gray-300 p-2"
                />
                {errors[field] && (
                  <span className="text-red-500">{errors[field]?.message}</span>
                )}
              </div>
            ))}
          </div>

          {/* Major & Notes */}
          <div className="mt-5 flex flex-col gap-4">
            <input
              {...register("major")}
              placeholder="Major"
              className="border rounded w-full border-gray-300 p-2"
            />
            <input
              {...register("special_note")}
              placeholder="Special Note"
              className="border rounded w-full p-2 border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full py-4 text-2xl font-semibold mt-3 ${
                isStage2Completed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
              }`}
              disabled={isStage2Completed || loading}
            >
              {isStage2Completed
                ? "Stage 2: Completed"
                : loading
                ? "Submitting..."
                : "Stage 2: Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Stage2;
