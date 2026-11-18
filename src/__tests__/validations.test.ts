import { describe, it, expect } from "vitest";
import { startupApplicationSchema } from "../lib/validations/applicationSchema";
import { contactSchema } from "../lib/validations/contactSchema";
import { aiProvider } from "../lib/ai/provider";

describe("Startup Application Schema Validation", () => {
  it("should validate a complete, valid startup application", () => {
    const validData = {
      startupName: "AgroSens Telemetry",
      founderName: "Anand Kumar",
      founderEmail: "anand@mamcet.edu.in",
      founderPhone: "9876543210",
      coFoundersCount: 2,
      collegeOrEntity: "MAMCET ECE Dept",
      category: "ELECTRONICS_IOT_SMART",
      stage: "PROTOTYPE_MVP",
      problemStatement:
        "Excessive water consumption and fertilizer wastage in delta paddy farming due to lack of field telemetry.",
      proposedSolution:
        "Solar-powered LoRa telemetry sensor nodes providing continuous soil moisture, pH and NPK measurements.",
      targetMarket: "Agricultural farmers in Trichy and Thanjavur districts.",
      pitchDeckUrl: "https://drive.google.com/pitch-deck",
    };

    const result = startupApplicationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject when problem statement is too short (< 30 characters)", () => {
    const invalidData = {
      startupName: "AgroSens",
      founderName: "Anand",
      founderEmail: "anand@test.com",
      founderPhone: "9876543210",
      category: "ELECTRONICS_IOT_SMART",
      stage: "IDEATION",
      problemStatement: "Short problem",
      proposedSolution: "Good solution with more than 30 characters of text describing the innovation",
      targetMarket: "Target market description with adequate characters",
    };

    const result = startupApplicationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Contact Schema Validation", () => {
  it("should validate a valid contact form submission", () => {
    const data = {
      name: "Ramesh S.",
      email: "ramesh@example.com",
      phone: "+91 9876543210",
      subject: "Lab Facilities Inquiry",
      message: "We would like to book the Additive Manufacturing 3D printer for a prototype run.",
    };

    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe("AI Incubation Expert Provider", () => {
  it("should generate a structured diagnostic report with lab recommendations", async () => {
    const report = await aiProvider.analyzeIdea({
      title: "Solar Drone Inspection",
      category: "RENEWABLE_ENERGY_CLEAN_TECH",
      problem: "Thermal hotspots on solar panels reduce efficiency by 15% and cause fires.",
      solution: "Autonomous thermal camera drone with edge AI defect classification.",
      targetUser: "Solar power plant operators in Tamil Nadu",
    });

    expect(report.title).toBe("Solar Drone Inspection");
    expect(report.overallScore).toBeGreaterThan(0);
    expect(report.technologyFeasibility.suggestedStack.length).toBeGreaterThan(0);
    expect(report.recommendedMIFPath.actionItems.length).toBeGreaterThan(0);
  });

  it("should calculate an accurate readiness scorecard", async () => {
    const scorecard = await aiProvider.assessReadiness({
      startupName: "CleanWater Biofilter",
      domain: "SUSTAINABLE_INFRASTRUCTURE",
      hasPrototype: "YES_FUNCTIONAL",
      hasCustomerFeedback: "USER_INTERVIEWS_DONE",
      teamStructure: "FULL_TIME_COFOUNDERS",
      ipStatus: "PROVISIONAL_PATENT_FILED",
      fundingGoal: "GRANT_SEEKING",
    });

    expect(scorecard.totalScore).toBeGreaterThan(60);
    expect(scorecard.strengths.length).toBeGreaterThan(0);
  });
});
