import { z } from "zod";

export const ideaAnalysisSchema = z.object({
  title: z.string().min(3, "Idea title must be at least 3 characters"),
  category: z.string().min(2, "Please select an incubation focus area"),
  problem: z.string().min(20, "Describe the problem in at least 20 characters"),
  solution: z.string().min(20, "Describe your proposed solution in at least 20 characters"),
  targetUser: z.string().min(10, "Specify your target customer or user group"),
});

export type IdeaAnalysisInput = z.infer<typeof ideaAnalysisSchema>;

export const readinessAssessmentSchema = z.object({
  startupName: z.string().min(2, "Startup name is required"),
  domain: z.string().min(2, "Domain is required"),
  hasPrototype: z.enum(["YES_FUNCTIONAL", "PROTOTYPE_IN_PROGRESS", "CONCEPT_ONLY"]),
  hasCustomerFeedback: z.enum(["PAID_USERS", "USER_INTERVIEWS_DONE", "NONE_YET"]),
  teamStructure: z.enum(["FULL_TIME_COFOUNDERS", "STUDENT_TEAM_MIXED", "SOLO_FOUNDER"]),
  ipStatus: z.enum(["PROVISIONAL_PATENT_FILED", "PATENT_SEARCH_DONE", "NOT_CONSIDERED"]),
  fundingGoal: z.enum(["SELF_FUNDED", "GRANT_SEEKING", "ANGEL_VENTURE"]),
});

export type ReadinessAssessmentInput = z.infer<typeof readinessAssessmentSchema>;
