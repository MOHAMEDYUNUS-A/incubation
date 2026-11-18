import { IdeaAnalysisInput, ReadinessAssessmentInput } from "../validations/ideaSchema";
import { FOCUS_AREAS, FOUNDATION_INFO } from "../db/mockData";

export interface AIAnalysisResult {
  title: string;
  category: string;
  overallScore: number; // 0-100
  problemValidation: {
    clarity: string;
    urgencyLevel: "HIGH" | "MEDIUM" | "EMERGING";
    notes: string;
  };
  targetMarketInsights: {
    primarySegment: string;
    initialAdopters: string;
    marketChallenges: string[];
  };
  technologyFeasibility: {
    complexity: "LOW" | "MEDIUM" | "HIGH";
    suggestedStack: string[];
    recommendedMAMCETLab: string;
  };
  risksAndBlindspots: string[];
  recommendedMIFPath: {
    recommendedStage: string;
    actionItems: string[];
    potentialFundingSchemes: string[];
  };
  disclaimer: string;
}

export interface ReadinessScorecard {
  startupName: string;
  totalScore: number; // 0-100
  categoryScores: {
    productMaturity: number;
    marketValidation: number;
    teamStrength: number;
    iprReadiness: number;
  };
  strengths: string[];
  criticalGaps: string[];
  recommendedIncubationTrack: string;
  suggestedNextSteps: string[];
  disclaimer: string;
}

/**
 * AI Provider Abstraction Interface
 */
export interface AIProvider {
  analyzeIdea(input: IdeaAnalysisInput): Promise<AIAnalysisResult>;
  assessReadiness(input: ReadinessAssessmentInput): Promise<ReadinessScorecard>;
  chatAssistant(message: string, history: Array<{ role: "user" | "assistant"; content: string }>): Promise<string>;
}

/**
 * Intelligent Local Incubation Expert Engine (Default Zero-latency & Offline-resilient)
 */
class LocalIncubationAIProvider implements AIProvider {
  async analyzeIdea(input: IdeaAnalysisInput): Promise<AIAnalysisResult> {
    const focusArea = FOCUS_AREAS.find((f) => f.id === input.category || f.categoryKey === input.category) || FOCUS_AREAS[0];

    // Determine lab recommendation
    let lab = "MASTeR Co-Working Hub & Ideation Space";
    if (input.category.includes("IOT") || input.category.includes("ELECTRONICS")) {
      lab = "IoT & Embedded Prototyping Lab (MAMCET ECE Dept)";
    } else if (input.category.includes("MANUFACTURING") || input.category.includes("HARDWARE")) {
      lab = "Additive Manufacturing (3D Lab) & Mechanical Workshop";
    } else if (input.category.includes("AI") || input.category.includes("SOFTWARE")) {
      lab = "High Performance Computing Lab & Cloud Sandbox";
    }

    return {
      title: input.title,
      category: focusArea.title,
      overallScore: 82,
      problemValidation: {
        clarity: "Strong problem framing addressing a tangible bottleneck.",
        urgencyLevel: "HIGH",
        notes: `The proposed problem statement indicates genuine operational friction. Further empirical validation with at least 25 regional stakeholders is recommended during Month 1.`,
      },
      targetMarketInsights: {
        primarySegment: input.targetUser,
        initialAdopters: `Early adopters in Trichy and Tier-2/3 industrial or consumer clusters in Tamil Nadu.`,
        marketChallenges: [
          "Customer switching costs from legacy manual methods",
          "Price sensitivity and requirement for rapid ROI demonstration",
          "Distribution access across decentralized regional markets",
        ],
      },
      technologyFeasibility: {
        complexity: "MEDIUM",
        suggestedStack: [
          "Edge Telemetry / Microcontrollers (ESP32 / STM32)",
          "Next.js + TypeScript Web Platform",
          "Secure RESTful APIs with Redis Caching",
          "Cloud-hosted MySQL / Time-series storage",
        ],
        recommendedMAMCETLab: lab,
      },
      risksAndBlindspots: [
        "Hardware supply chain lead-times for initial pilot batches",
        "Data privacy / IP leakage prior to provisional patent filing",
        "Underestimating customer onboarding and field maintenance cycles",
      ],
      recommendedMIFPath: {
        recommendedStage: "Pre-Incubation Track (Idea to Functional Benchtop PoC)",
        actionItems: [
          "Submit formal MIF Incubation Application form for screening",
          "Schedule design-thinking review with Incubation Manager Mr. M. Santhosh Kumar",
          "Conduct prior-art patent search using MIF IPR Facilitation cell",
          "Draft 30-day proof-of-concept milestone with assigned faculty mentor",
        ],
        potentialFundingSchemes: [
          "StartupTN TANSEED Seed Grant",
          "EDII-TN IVP (Innovation Voucher Programme - Voucher A)",
          "AICTE Student Startup Grant Initiative",
        ],
      },
      disclaimer: "Note: AI analysis is generated algorithmically for structured guidance and does not guarantee market viability or official admission.",
    };
  }

  async assessReadiness(input: ReadinessAssessmentInput): Promise<ReadinessScorecard> {
    let productScore = 15;
    if (input.hasPrototype === "YES_FUNCTIONAL") productScore = 30;
    else if (input.hasPrototype === "PROTOTYPE_IN_PROGRESS") productScore = 20;

    let marketScore = 10;
    if (input.hasCustomerFeedback === "PAID_USERS") marketScore = 30;
    else if (input.hasCustomerFeedback === "USER_INTERVIEWS_DONE") marketScore = 20;

    let teamScore = 10;
    if (input.teamStructure === "FULL_TIME_COFOUNDERS") teamScore = 25;
    else if (input.teamStructure === "STUDENT_TEAM_MIXED") teamScore = 20;

    let ipScore = 5;
    if (input.ipStatus === "PROVISIONAL_PATENT_FILED") ipScore = 15;
    else if (input.ipStatus === "PATENT_SEARCH_DONE") ipScore = 10;

    const total = productScore + marketScore + teamScore + ipScore;

    const strengths: string[] = [];
    const gaps: string[] = [];

    if (productScore >= 20) strengths.push("Prototype development is underway with measurable engineering proof.");
    else gaps.push("Hardware/Software MVP needs benchtop realization before commercialization.");

    if (marketScore >= 20) strengths.push("Proactive customer discovery conducted with verifiable feedback.");
    else gaps.push("Customer validation lacks primary interview data with paying prospects.");

    if (teamScore >= 20) strengths.push("Interdisciplinary team composition covering domain and technical roles.");
    else gaps.push("Team structure is single-founder or requires complementary business/sales co-founder.");

    if (ipScore >= 10) strengths.push("IP awareness with prior-art or filing roadmap initiated.");
    else gaps.push("Intellectual property protection (patent/trademark) has not been reviewed.");

    let track = "Pre-Incubation Track (Idea Discovery & PoC)";
    if (total >= 75) track = "Full Incubation & Acceleration Track";
    else if (total >= 50) track = "Incubation Readiness & Prototyping Track";

    return {
      startupName: input.startupName,
      totalScore: total,
      categoryScores: {
        productMaturity: Math.round((productScore / 30) * 100),
        marketValidation: Math.round((marketScore / 30) * 100),
        teamStrength: Math.round((teamScore / 25) * 100),
        iprReadiness: Math.round((ipScore / 15) * 100),
      },
      strengths,
      criticalGaps: gaps,
      recommendedIncubationTrack: track,
      suggestedNextSteps: [
        "Review your score with MIF Incubation Coordinator Ms. Hemalatha Balakrishnan",
        "Reserve workspace and benchtop testing facilities at MAMCET campus",
        "Prepare pitch deck according to the MIF 10-slide template",
        "Apply for TANSEED or EDII-TN Innovation Vouchers through our single-window cell",
      ],
      disclaimer: "Assessment is an indicative diagnostic tool to benchmark venture maturity.",
    };
  }

  async chatAssistant(
    message: string,
    history: Array<{ role: "user" | "assistant"; content: string }>
  ): Promise<string> {
    const lower = message.toLowerCase();

    if (lower.includes("apply") || lower.includes("admission") || lower.includes("process")) {
      return `To apply for incubation at **MASTeR Incubation Foundation (MIF)** at MAMCET:
1. Navigate to our **/apply** portal.
2. Complete the multi-step application form covering your startup details, focus area, problem statement, and solution.
3. Our screening committee (headed by Incubation Manager **Mr. M. Santhosh Kumar**) will review your submission within 5 business days.
4. Shortlisted teams are invited for a pitch presentation at our Siruganur campus or via video conference.`;
    }

    if (lower.includes("focus") || lower.includes("domain") || lower.includes("area")) {
      return `**MASTeR Incubation Foundation** specializes in 7 core technology tracks:
1. **Artificial Intelligence & Data Science**
2. **Renewable Energy & Clean Technologies**
3. **Digital Technologies & Software Solutions**
4. **Advanced Manufacturing & Product Engineering**
5. **Electronics, IoT & Smart Systems**
6. **Sustainable Infrastructure & Environmental Tech**
7. **Innovations in Engineering Ecosystem**

Which track does your venture align with?`;
    }

    if (lower.includes("eligibility") || lower.includes("who can apply")) {
      return `Incubation at MIF is open to:
- Students, alumni, and faculty of MAMCET and other educational institutions.
- Independent entrepreneurs and early-stage innovators in Tamil Nadu and across India.
- Early-stage startups seeking co-working space, mentoring, fabrication lab access, and TANSEED/government seed funding support.`;
    }

    if (lower.includes("contact") || lower.includes("manager") || lower.includes("location") || lower.includes("address")) {
      return `You can reach our leadership team directly:
- **Incubation Manager**: Mr. M. Santhosh Kumar (+91 9361697702, incubationmanager@mamcet.com)
- **Incubation Coordinator**: Ms. Hemalatha Balakrishnan (+91 6381945574, hemalathabalakrishnan.ece@mamcet.com)
- **Campus**: M.A.M. College of Engineering and Technology (MAMCET), Trichy - Chennai Trunk Road, Siruganur, Trichy - 621 105.`;
    }

    if (lower.includes("pitch") || lower.includes("deck")) {
      return `Our recommended 10-slide pitch structure for MIF Incubation:
1. **Title & Problem Statement**: The urgent pain point.
2. **Proposed Solution**: Your unique technology/engineering innovation.
3. **Target Market**: TAM, SAM, and SOM in India & globally.
4. **Product Architecture**: Current prototype or MVP stage.
5. **Business & Revenue Model**: How the venture sustains and monetizes.
6. **Competition & Moat**: Why your IP or approach is superior.
7. **Milestones & Traction**: Progress to date (pilots, LOIs, lab tests).
8. **Founding Team**: Relevant domain expertise.
9. **Incubation Support Needed**: Lab equipment, funding, mentoring.
10. **Financial Projections**: 18-month roadmap.`;
    }

    return `Welcome to **MASTeR Incubation Foundation (MIF)** — the StartupTN Recognised Pre-Incubation Centre at MAMCET, Trichy.

I can assist you with:
- Checking your startup's eligibility & application steps
- Exploring our 7 engineering focus areas and campus labs
- Structuring your pitch deck or idea validation
- Connecting with our incubation managers (**Mr. M. Santhosh Kumar** & **Ms. Hemalatha Balakrishnan**)

How can I help power your entrepreneurial journey today?`;
  }
}

export const aiProvider = new LocalIncubationAIProvider();
