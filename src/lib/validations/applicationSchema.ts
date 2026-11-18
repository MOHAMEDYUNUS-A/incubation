import { z } from "zod";

export const startupApplicationSchema = z.object({
  startupName: z
    .string()
    .min(2, "Startup or venture name must be at least 2 characters")
    .max(100, "Startup name cannot exceed 100 characters"),
  founderName: z
    .string()
    .min(2, "Founder name must be at least 2 characters")
    .max(100),
  founderEmail: z.string().email("Please provide a valid email address"),
  founderPhone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number format"),
  coFoundersCount: z.coerce.number().min(1).max(10).default(1),
  collegeOrEntity: z
    .string()
    .min(2, "Please state your college, department, or organization")
    .default("MAMCET"),
  category: z.enum([
    "AI_DATA_SCIENCE",
    "RENEWABLE_ENERGY_CLEAN_TECH",
    "DIGITAL_TECH_SOFTWARE",
    "ADVANCED_MANUFACTURING",
    "ELECTRONICS_IOT_SMART",
    "SUSTAINABLE_INFRASTRUCTURE",
    "OTHER_ENGINEERING_INNOVATION",
  ], {
    errorMap: () => ({ message: "Please select one of the 7 official focus areas" }),
  }),
  stage: z.enum([
    "IDEATION",
    "PROOF_OF_CONCEPT",
    "PROTOTYPE_MVP",
    "EARLY_TRACTION",
    "SCALING",
  ]),
  problemStatement: z
    .string()
    .min(30, "Please describe the problem you are solving in at least 30 characters")
    .max(2000),
  proposedSolution: z
    .string()
    .min(30, "Please explain your solution/technology in at least 30 characters")
    .max(2000),
  targetMarket: z
    .string()
    .min(20, "Please specify your target market and beneficiaries (minimum 20 characters)")
    .max(1000),
  competitors: z.string().max(1000).optional(),
  revenueModel: z.string().max(1000).optional(),
  fundingNeeded: z.string().max(100).optional(),
  labRequirement: z.string().max(1000).optional(),
  pitchDeckUrl: z.string().url("Must be a valid URL link").or(z.literal("")).optional(),
});

export type StartupApplicationFormValues = z.infer<typeof startupApplicationSchema>;
