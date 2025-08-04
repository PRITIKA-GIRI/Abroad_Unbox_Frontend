import { z } from "zod";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const stage2Schema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
    gender: z.enum(["Male", "Female", "Other"], "Gender is required"),
    marital_status: z.enum(["True", "False"], "Marital status is required"),
    date_of_birth: z
      .string()
      .min(1, "Date of Birth is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Date of Birth must be a valid date",
      })
      .refine((val) => val !== getTodayDate(), {
        message: "Date of Birth cannot be today's date",
      }),
    address_i: z
      .string()
      .min(1, "Address Line I is required")
      .regex(
        /^[a-zA-Z]+(?:[,\s][a-zA-Z]+)*$/,
        "Address Line I must contain only letters and spaces"
      ),
    address_ii: z
      .string()
      .regex(
        /^[a-zA-Z]+(?:[,\s][a-zA-Z]+)*$/,
        "Address Line II must contain letters"
      )
      .optional(),

    city: z
      .string()
      .min(1, "City is required")
      .regex(/^[a-zA-Z]+(?:[,\s][a-zA-Z]+)*$/, "City must contain letters"),
    state: z
      .string()
      .min(1, "State is required")
      .regex(/^[a-zA-Z]+(?:[,\s][a-zA-Z]+)*$/, "State must contain letters"),

    country: z
      .string()
      .min(1, "Country is required")
      .regex(/^[a-zA-Z\s]+$/, "Country must contain only letters"),
    zip_code: z
      .string()
      .min(5, "Zip code must be at least 5 digits")
      .regex(/^[0-9]+$/, "Zip code must be numeric"),
    level: z
      .string()
      .min(2, "Level is required")
      .regex(/^[a-zA-Z\s]+$/, "Level must contain only letters"),
    year_graduated: z
      .string()
      .length(4, "Year Graduated must be exactly 4 digits")
      .regex(
        /^(19|20)\d{2}$/,
        "Year Graduated must be a valid year (1900-2099)"
      ),

    standardized_test: z.string().optional(),

    sat_verbal: z.string().optional(),
    sat_quant: z.string().optional(),
    gre_verbal_reasoning: z.string().optional(),
    gre_quant_reasoning: z.string().optional(),
    gre_analytical_writing: z.string().optional(),
    gmat_quantitative: z.string().optional(),
    gmat_verbal: z.string().optional(),
    gmat_data_insights: z.string().optional(),

    english_test_type: z.string().optional(),
    english_reading: z.string().optional(),
    english_writing: z.string().optional(),
    english_listening: z.string().optional(),
    english_speaking: z.string().optional(),

    major: z.string().optional(),
    special_note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // English Tests Validation
    if (data.english_test_type) {
      const englishTests = {
        ielts: { min: 0, max: 9 },
        det: { min: 10, max: 160 },
        pte: { min: 10, max: 90 },
        toefl: { min: 0, max: 120 },
      };

      const testType = data.english_test_type.toLowerCase();
      if (englishTests[testType]) {
        const { min, max } = englishTests[testType];
        [
          "english_reading",
          "english_writing",
          "english_listening",
          "english_speaking",
        ].forEach((field) => {
          const val = data[field];
          if (val !== undefined && val !== "") {
            const num = Number(val);
            if (isNaN(num)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field
                  .replace("english_", "")
                  .toUpperCase()} must be a number`,
                path: [field],
              });
            } else if (num < min || num > max) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field
                  .replace("english_", "")
                  .toUpperCase()} must be between ${min} and ${max}`,
                path: [field],
              });
            }
          }
        });
      }
    }

    // Standardized Tests Validation
    if (data.standardized_test) {
      const test = data.standardized_test.toUpperCase();

      const validateTest = (fields, range, isFloat = false) => {
        fields.forEach((field) => {
          const val = data[field];
          if (!val) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field.replace(/_/g, " ").toUpperCase()} is required`,
              path: [field],
            });
            return;
          }
          const num = isFloat ? parseFloat(val) : parseInt(val);
          if (isNaN(num)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field
                .replace(/_/g, " ")
                .toUpperCase()} must be a number`,
              path: [field],
            });
          } else if (num < range.min || num > range.max) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${field
                .replace(/_/g, " ")
                .toUpperCase()} must be between ${range.min} and ${range.max}`,
              path: [field],
            });
          }
        });
      };

      if (test === "SAT") {
        validateTest(["sat_verbal", "sat_quant"], { min: 200, max: 800 });
      }

      if (test === "GRE") {
        validateTest(["gre_verbal_reasoning", "gre_quant_reasoning"], {
          min: 130,
          max: 170,
        });
        validateTest(["gre_analytical_writing"], { min: 0, max: 6 }, true);
      }

      if (test === "GMAT") {
        validateTest(
          ["gmat_quantitative", "gmat_verbal", "gmat_data_insights"],
          { min: 0, max: 60 }
        );
      }
    }
  });
