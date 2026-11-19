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

    // 1. Funding & Grants
    if (
      lower.includes("fund") ||
      lower.includes("grant") ||
      lower.includes("tanseed") ||
      lower.includes("money") ||
      lower.includes("investment") ||
      lower.includes("msme")
    ) {
      return `### Available Grants & Funding Pathways at MIF

At **MASTeR Incubation Foundation**, we facilitate access to both state and central government grant programs:

1. **StartupTN TANSEED Seed Grant**: Non-dilutive seed funding of **up to ₹10 Lakhs** for early-stage greenfield and deep-tech startups registered in Tamil Nadu.
2. **Ministry of MSME Idea Hackathon**: MAMCET is an approved **MSME Host Institution (HI)** eligible to disburse grants **up to ₹15 Lakhs** per viable prototype.
3. **EDII-TN Innovation Voucher Program (IVP)**:
   - **Voucher A (up to ₹2 Lakhs)**: For idea validation and feasibility testing.
   - **Voucher B (up to ₹5 Lakhs)**: For hardware prototyping and manufacturing pilot runs.
4. **IITMIC Angel & Seed Syndicate**: Direct pitch access to institutional angel networks through our collaboration with IIT Madras Incubation Cell.

Would you like help preparing your grant pitch or checking your eligibility?`;
    }

    // 2. Application Process
    if (
      lower.includes("apply") ||
      lower.includes("admission") ||
      lower.includes("join") ||
      lower.includes("process") ||
      lower.includes("register")
    ) {
      return `### How to Apply for Incubation at MIF

Joining the **MASTeR Incubation Foundation** cohort is straightforward:

1. **Submit Online Application**: Visit our **/apply** portal and fill out your startup profile, domain category, problem statement, and solution.
2. **Initial Screening (3–5 Days)**: Our internal review panel (supervised by Incubation Manager **Mr. M. Santhosh Kumar** and Coordinator **Ms. Hemalatha Balakrishnan**) evaluates technology feasibility.
3. **Pitch Presentation**: Shortlisted teams present their benchtop prototype or pitch deck to our advisory board.
4. **Onboarding & Lab Allotment**: Selected startups receive dedicated co-working space, 24/7 biometric facility access, assigned mentors, and immediate grant preparation support.

You can start your submission right now at **/apply**!`;
    }

    // 3. Facilities & Prototyping Infrastructure
    if (
      lower.includes("facility") ||
      lower.includes("facilities") ||
      lower.includes("lab") ||
      lower.includes("equipment") ||
      lower.includes("workspace") ||
      lower.includes("co-working") ||
      lower.includes("coworking") ||
      lower.includes("3d print")
    ) {
      return `### World-Class Infrastructure at MAMCET Campus

MIF provides **6,000+ sq. ft.** of purpose-built innovation infrastructure:

- **MASTeR Co-Working Hub**: 60+ ergonomic innovator workstations, high-speed fiber internet, and collaborative whiteboards.
- **IoT & Embedded Prototyping Lab**: Digital storage oscilloscopes (DSO), SMD rework stations, logic analyzers, and LoRa/BLE dev kits.
- **Additive Manufacturing (3D Lab)**: Industrial SLA & FDM 3D printers with carbon-fiber filament support and 0.05mm resolution.
- **Hardware Engineering Bay**: Regulated benchtop DC power supplies and RF testing instrumentation.
- **Executive Pitch Suite & Auditorium**: 4K video-conferencing boardroom and 200+ capacity innovation hall for demo days.

Explore all facilities and high-res on-campus photos at **/facilities** and **/#gallery**!`;
    }

    // 4. Focus Areas & Domains
    if (
      lower.includes("focus") ||
      lower.includes("domain") ||
      lower.includes("area") ||
      lower.includes("track")
    ) {
      return `### 7 Priority Engineering Focus Areas at MIF

Our incubation cohorts are structured around MAMCET's interdisciplinary research departments:

1. **Artificial Intelligence & Data Science**: Computer vision, predictive industrial analytics, edge AI.
2. **Renewable Energy & Clean Technologies**: Solar-thermal systems, battery management (BMS), EV chargers.
3. **Digital Technologies & Software Solutions**: Cloud architectures, SaaS, enterprise cybersecurity.
4. **Advanced Manufacturing & Product Engineering**: Robotics, CNC precision tooling, lightweight materials.
5. **Electronics, IoT & Smart Systems**: Microcontroller telemetry, LoRa mesh, sensors.
6. **Sustainable Infrastructure & Environmental Tech**: Water filtration, green building materials, waste-to-energy.
7. **Innovations in Engineering Ecosystem**: Cross-disciplinary student prototypes and frugal innovations.

Which domain does your project align with?`;
    }

    // 5. Contacts & Leadership
    if (
      lower.includes("contact") ||
      lower.includes("manager") ||
      lower.includes("coordinator") ||
      lower.includes("hemalatha") ||
      lower.includes("santhosh") ||
      lower.includes("location") ||
      lower.includes("address") ||
      lower.includes("phone") ||
      lower.includes("email")
    ) {
      return `### Contact the Incubation Foundation Team

We are based on the lush MAMCET campus in Siruganur, Trichy:

- **Incubation Manager**: Mr. M. Santhosh Kumar
  - Phone: **+91 9361697702**
  - Email: **incubationmanager@mamcet.com**
- **Incubation Coordinator**: Ms. Hemalatha Balakrishnan (Faculty, ECE)
  - Phone: **+91 6381945574**
  - Email: **hemalathabalakrishnan.ece@mamcet.com**
- **Campus Address**:
  M.A.M. College of Engineering and Technology (MAMCET)
  Trichy–Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu – 621 105.
- **Social Channels**:
  - Instagram: [@master_incubation_foundation](https://www.instagram.com/master_incubation_foundation/)
  - LinkedIn: [MASTeR Incubation Foundation](https://in.linkedin.com/in/master-incubation-foundation-02301b446)`;
    }

    // 6. Pitch Structure & Mentorship
    if (
      lower.includes("pitch") ||
      lower.includes("deck") ||
      lower.includes("mentor") ||
      lower.includes("advice")
    ) {
      return `### MIF Recommended 10-Slide Pitch Structure

To stand out in front of the MIF screening committee and StartupTN evaluators:

1. **Title & Problem**: The specific, urgent operational friction.
2. **Engineering Solution**: How your unique hardware/software addresses it.
3. **Market Opportunity**: TAM / SAM / SOM with regional Tier-2/3 validation.
4. **Current Prototype / TRL**: Proof-of-concept benchmark (TRL 1–9).
5. **Business Model**: Unit economics, pricing, customer acquisition channels.
6. **Competitive Moat**: Patents, proprietary algorithms, or engineering barriers.
7. **Pilot Traction**: Customer discovery interviews, LOIs, or field test results.
8. **Founding Team**: Academic background and domain capabilities.
9. **MIF Ask**: Specific lab machines, testing gear, or grant target (TANSEED/MSME).
10. **12-Month Milestones**: Clear, quantifiable product deliverables.`;
    }

    // Default Welcome Response
    return `### Welcome to MASTeR Incubation Foundation (MIF) AI Assistant

I am the dedicated intelligence copilot for **MAMCET's StartupTN Pre-Incubation Centre**. How can I help your startup today?

- **"How do I apply for incubation?"** — Step-by-step application walkthrough.
- **"What grants are available?"** — TANSEED (₹10L) & MSME (₹15L) funding details.
- **"What prototyping labs do you offer?"** — 3D printing, IoT test benches & workspaces.
- **"Who can I contact?"** — Phone & email for Incubation Manager & Coordinator.
- **"Help me structure my pitch"** — 10-slide investor deck blueprint.`;
  }
}

export const aiProvider = new LocalIncubationAIProvider();
