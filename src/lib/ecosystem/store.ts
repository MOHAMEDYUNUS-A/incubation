import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import {
  StartupPassport,
  StartupFounder,
  JourneyMilestone,
  MilestoneEvidence,
  MentorProfile,
  MentoringSession,
  StartupAchievement,
  ProductLaunch,
  SuccessStory,
  AlumniProfile,
  AlumniConnection,
  ActivityHistoryItem,
  PassportStatus,
  JourneyMilestoneStatus,
} from "./types";

interface EcosystemStorage {
  passports: StartupPassport[];
  founders: StartupFounder[];
  milestones: JourneyMilestone[];
  mentors: MentorProfile[];
  sessions: MentoringSession[];
  achievements: StartupAchievement[];
  launches: ProductLaunch[];
  stories: SuccessStory[];
  alumni: AlumniProfile[];
  connections: AlumniConnection[];
  activity: ActivityHistoryItem[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "ecosystem-data.json");
const TMP_FILE_PATH = path.join("/tmp", "ecosystem-data.json");

let inMemoryStore: EcosystemStorage | null = null;

export function getEcosystemData(): EcosystemStorage {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  // 1. Try /tmp in serverless (e.g. Vercel)
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const content = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      inMemoryStore = JSON.parse(content);
      return inMemoryStore!;
    }
  } catch (e) {
    // ignore
  }

  // 2. Try bundled source file
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      inMemoryStore = JSON.parse(content);
      return inMemoryStore!;
    }
  } catch (err) {
    console.error("Error loading ecosystem-data.json:", err);
  }

  // Fallback defaults
  inMemoryStore = {
    passports: [],
    founders: [],
    milestones: [],
    mentors: [],
    sessions: [],
    achievements: [],
    launches: [],
    stories: [],
    alumni: [],
    connections: [],
    activity: [],
  };
  return inMemoryStore;
}

export function saveEcosystemData(data: EcosystemStorage): boolean {
  inMemoryStore = data;

  // Persist to bundled path in local dev
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // Expected on read-only environments
  }

  // Persist to /tmp for serverless continuity
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // ignore
  }

  return true;
}

// ----------------------------------------------------
// Startup Passport ID Generation & Verification
// ----------------------------------------------------

export function generateNextPassportId(year: number = new Date().getFullYear()): string {
  const data = getEcosystemData();
  const prefix = `MASTER-SP-${year}-`;
  
  let maxSeq = 0;
  for (const p of data.passports) {
    if (p.passportId && p.passportId.startsWith(prefix)) {
      const seqStr = p.passportId.replace(prefix, "");
      const num = parseInt(seqStr, 10);
      if (!isNaN(num) && num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  return `${prefix}${String(nextSeq).padStart(4, "0")}`;
}

export async function generatePassportQRCode(passportId: string, baseUrl?: string): Promise<string> {
  const host = baseUrl || process.env.NEXT_PUBLIC_APP_URL || "https://master-incubation.edu.in";
  const verifyUrl = `${host}/startup-passport/verify/${passportId}`;
  
  try {
    return await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 320,
      color: {
        dark: "#091b34",
        light: "#ffffff",
      },
    });
  } catch (err) {
    console.error("QR Code generation error:", err);
    return "";
  }
}

export function calculateStartupProgress(milestones: JourneyMilestone[]) {
  if (!milestones || milestones.length === 0) {
    return {
      percentage: 0,
      completedCount: 0,
      totalCount: 0,
      completedWeight: 0,
      totalWeight: 0,
      currentMilestone: undefined,
      nextMilestone: undefined,
    };
  }

  let totalWeight = 0;
  let completedWeight = 0;
  let completedCount = 0;
  let currentMilestone: JourneyMilestone | undefined;
  let nextMilestone: JourneyMilestone | undefined;

  // Sort milestones by stageOrder
  const sorted = [...milestones].sort((a, b) => a.stageOrder - b.stageOrder);

  for (const m of sorted) {
    const weight = m.weight || 5;
    totalWeight += weight;

    if (m.status === "COMPLETED") {
      completedWeight += weight;
      completedCount += 1;
    } else if (!currentMilestone && (m.status === "IN_PROGRESS" || m.status === "SUBMITTED_FOR_REVIEW" || m.status === "UNDER_REVIEW")) {
      currentMilestone = m;
    } else if (!nextMilestone && m.status === "NOT_STARTED") {
      nextMilestone = m;
    }
  }

  // If no milestone is marked in progress, the first incomplete milestone is current
  if (!currentMilestone) {
    currentMilestone = sorted.find((m) => m.status !== "COMPLETED");
  }

  const percentage = totalWeight > 0 ? Math.min(100, Math.round((completedWeight / totalWeight) * 100)) : 0;

  return {
    percentage,
    completedCount,
    totalCount: sorted.length,
    completedWeight,
    totalWeight,
    currentMilestone,
    nextMilestone,
  };
}

// ----------------------------------------------------
// Standard 14-Stage Incubation Template
// ----------------------------------------------------

export const DEFAULT_INCUBATION_STAGES = [
  { order: 1, name: "Idea Submitted", title: "Venture Concept Submission", weight: 5 },
  { order: 2, name: "Application Received", title: "Formal Intake & Compliance Check", weight: 5 },
  { order: 3, name: "Initial Review", title: "Technical Board Screening", weight: 5 },
  { order: 4, name: "Selected for Incubation", title: "MoU Execution & Physical Lab Bay Allotment", weight: 5 },
  { order: 5, name: "Passport Activated", title: "Verified Startup Passport Issuance", weight: 5 },
  { order: 6, name: "Mentor Assigned", title: "Expert & Domain Mentor Onboarding", weight: 5 },
  { order: 7, name: "Problem Validation", title: "Customer Problem & Need Empirical Validation", weight: 10 },
  { order: 8, name: "Business Model Development", title: "Unit Economics & Go-to-Market Strategy", weight: 10 },
  { order: 9, name: "Prototype Development", title: "Physical / Digital Functional MVP Build", weight: 15 },
  { order: 10, name: "Product Testing", title: "Field Trials, Safety & Benchmark Testing", weight: 10 },
  { order: 11, name: "Market Validation", title: "Commercial Letters of Intent & Paid Pilots", weight: 10 },
  { order: 12, name: "Product Launch", title: "Public Commercial Release & Conclave Showcase", weight: 10 },
  { order: 13, name: "Post-Incubation", title: "Growth Acceleration & Institutional Scale", weight: 5 },
  { order: 14, name: "Alumni Status", title: "Graduation to MIF Alumni Guild", weight: 5 },
];

export function initializeMilestonesForStartup(startupId: string): JourneyMilestone[] {
  return DEFAULT_INCUBATION_STAGES.map((stage) => ({
    id: `m_${startupId}_${stage.order}`,
    startupId,
    stageOrder: stage.order,
    stageName: stage.name,
    title: stage.title,
    description: `Stage ${stage.order}: ${stage.title} for incubated venture.`,
    weight: stage.weight,
    status: stage.order <= 4 ? "COMPLETED" : stage.order === 5 ? "IN_PROGRESS" : "NOT_STARTED",
    targetDate: new Date(Date.now() + stage.order * 30 * 24 * 60 * 60 * 1000).toISOString(),
    completedDate: stage.order <= 4 ? new Date().toISOString() : undefined,
    evidence: [],
  }));
}

// ----------------------------------------------------
// Public & Operational Query Helpers
// ----------------------------------------------------

export function getAllPassports(): StartupPassport[] {
  const data = getEcosystemData();
  return data.passports;
}

export function getPassportById(passportId: string): StartupPassport | null {
  const data = getEcosystemData();
  const searchId = passportId.trim().toUpperCase();
  return (
    data.passports.find(
      (p) => p.passportId.toUpperCase() === searchId || p.id === passportId
    ) || null
  );
}

export function getPassportByStartupId(startupId: string): StartupPassport | null {
  const data = getEcosystemData();
  return data.passports.find((p) => p.startupId === startupId) || null;
}

export function getFounders(startupId?: string): StartupFounder[] {
  const data = getEcosystemData();
  if (startupId) {
    return data.founders.filter((f) => f.startupId === startupId);
  }
  return data.founders;
}

export function getMilestones(startupId: string): JourneyMilestone[] {
  const data = getEcosystemData();
  return data.milestones.filter((m) => m.startupId === startupId);
}

export function getMentors(): MentorProfile[] {
  const data = getEcosystemData();
  return data.mentors;
}

export function getMentoringSessions(startupId?: string): MentoringSession[] {
  const data = getEcosystemData();
  if (startupId) {
    return data.sessions.filter((s) => s.startupId === startupId);
  }
  return data.sessions;
}

export function getAchievements(startupId?: string): StartupAchievement[] {
  const data = getEcosystemData();
  if (startupId) {
    return data.achievements.filter((a) => a.startupId === startupId);
  }
  return data.achievements;
}

export function getProductLaunches(startupId?: string): ProductLaunch[] {
  const data = getEcosystemData();
  if (startupId) {
    return data.launches.filter((l) => l.startupId === startupId);
  }
  return data.launches;
}

export function getSuccessStories(): SuccessStory[] {
  const data = getEcosystemData();
  return data.stories.filter((s) => s.status === "PUBLISHED");
}

export function getAllSuccessStoriesAdmin(): SuccessStory[] {
  const data = getEcosystemData();
  return data.stories;
}

export function getStoryBySlug(slug: string): SuccessStory | null {
  const data = getEcosystemData();
  return data.stories.find((s) => s.slug === slug) || null;
}

export function getAlumniProfiles(): AlumniProfile[] {
  const data = getEcosystemData();
  return data.alumni.filter((a) => a.isPublicDirectory);
}

export function getAllAlumniAdmin(): AlumniProfile[] {
  const data = getEcosystemData();
  return data.alumni;
}

export function getAlumniConnections(): AlumniConnection[] {
  const data = getEcosystemData();
  return data.connections;
}

export function getActivityHistory(startupId?: string): ActivityHistoryItem[] {
  const data = getEcosystemData();
  if (startupId) {
    return data.activity.filter((a) => a.startupId === startupId);
  }
  return data.activity;
}

// ----------------------------------------------------
// Mutation Helpers
// ----------------------------------------------------

export function logActivity(
  action: string,
  category: ActivityHistoryItem["category"],
  details: string,
  performedBy: string,
  startupId?: string,
  startupName?: string
) {
  const data = getEcosystemData();
  const newItem: ActivityHistoryItem = {
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    startupId,
    startupName,
    action,
    category,
    details,
    performedBy,
    timestamp: new Date().toISOString(),
  };

  data.activity.unshift(newItem);
  if (data.activity.length > 200) {
    data.activity = data.activity.slice(0, 200);
  }
  saveEcosystemData(data);
  return newItem;
}

export async function createStartupPassport(params: {
  startupId: string;
  startupName: string;
  slug: string;
  remarks?: string;
  issuedBy?: string;
}): Promise<StartupPassport> {
  const data = getEcosystemData();
  
  // Check if passport already exists
  const existing = data.passports.find((p) => p.startupId === params.startupId);
  if (existing) {
    return existing;
  }

  const currentYear = new Date().getFullYear();
  const passportId = generateNextPassportId(currentYear);
  const now = new Date().toISOString();
  const qrCodeData = await generatePassportQRCode(passportId);
  const securityHash = `SHA256-MIF-${currentYear}-${params.slug.toUpperCase().slice(0, 8)}-${Date.now().toString(16).toUpperCase()}`;

  const newPassport: StartupPassport = {
    id: `sp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    passportId,
    startupId: params.startupId,
    startupName: params.startupName,
    slug: params.slug,
    status: "ACTIVE",
    issuedAt: now,
    activationDate: now,
    lastVerifiedAt: null,
    verificationCount: 0,
    securityHash,
    qrCodeData,
    remarks: params.remarks || "Formally approved and issued by MASTeR Incubation Foundation Governing Council.",
  };

  data.passports.push(newPassport);

  // Initialize milestone journey if none exist
  const existingMilestones = data.milestones.filter((m) => m.startupId === params.startupId);
  if (existingMilestones.length === 0) {
    const milestones = initializeMilestonesForStartup(params.startupId);
    data.milestones.push(...milestones);
  }

  logActivity(
    `Startup Passport Issued: ${passportId}`,
    "PASSPORT",
    `Official digital identity activated for ${params.startupName} under ID ${passportId}.`,
    params.issuedBy || "Incubation Directorate",
    params.startupId,
    params.startupName
  );

  saveEcosystemData(data);
  return newPassport;
}

export function updatePassportStatus(
  passportId: string,
  status: PassportStatus,
  remarks?: string,
  updatedBy?: string
): StartupPassport | null {
  const data = getEcosystemData();
  const passport = data.passports.find(
    (p) => p.passportId.toUpperCase() === passportId.toUpperCase() || p.id === passportId
  );

  if (!passport) return null;

  passport.status = status;
  if (remarks) passport.remarks = remarks;

  logActivity(
    `Passport Status Updated: ${status}`,
    "PASSPORT",
    `Status for ${passport.startupName} (${passport.passportId}) changed to ${status}.`,
    updatedBy || "System Administrator",
    passport.startupId,
    passport.startupName
  );

  saveEcosystemData(data);
  return passport;
}

export function recordPassportVerification(passportId: string): StartupPassport | null {
  const data = getEcosystemData();
  const passport = data.passports.find(
    (p) => p.passportId.toUpperCase() === passportId.toUpperCase() || p.id === passportId
  );

  if (!passport) return null;

  passport.verificationCount += 1;
  passport.lastVerifiedAt = new Date().toISOString();

  logActivity(
    `Public Verification: ${passport.passportId}`,
    "PASSPORT",
    `Public verification request successfully validated for ${passport.startupName}.`,
    "Public Portal",
    passport.startupId,
    passport.startupName
  );

  saveEcosystemData(data);
  return passport;
}

export function submitMilestoneEvidence(
  milestoneId: string,
  evidence: Omit<MilestoneEvidence, "id" | "submittedAt">,
  founderRemarks?: string
): JourneyMilestone | null {
  const data = getEcosystemData();
  const milestone = data.milestones.find((m) => m.id === milestoneId);
  if (!milestone) return null;

  const newEvidence: MilestoneEvidence = {
    id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...evidence,
    submittedAt: new Date().toISOString(),
  };

  milestone.evidence.push(newEvidence);
  milestone.status = "SUBMITTED_FOR_REVIEW";
  if (founderRemarks) milestone.founderRemarks = founderRemarks;

  logActivity(
    `Milestone Evidence Submitted: ${milestone.stageName}`,
    "MILESTONE",
    `New evidence uploaded: "${evidence.title}". Milestone placed in Review queue.`,
    "Founder Portal",
    milestone.startupId
  );

  saveEcosystemData(data);
  return milestone;
}

export function reviewMilestoneEvidence(
  milestoneId: string,
  approved: boolean,
  adminRemarks: string,
  reviewerName: string
): JourneyMilestone | null {
  const data = getEcosystemData();
  const milestone = data.milestones.find((m) => m.id === milestoneId);
  if (!milestone) return null;

  milestone.status = approved ? "COMPLETED" : "REJECTED";
  milestone.adminRemarks = adminRemarks;
  milestone.reviewedBy = reviewerName;
  milestone.reviewedAt = new Date().toISOString();
  if (approved) {
    milestone.completedDate = new Date().toISOString();
  }

  logActivity(
    `Milestone ${approved ? "Approved" : "Rejected"}: ${milestone.stageName}`,
    "MILESTONE",
    `Milestone ${milestone.title} reviewed by ${reviewerName}. Verdict: ${approved ? "Approved" : "Rejected"}.`,
    reviewerName,
    milestone.startupId
  );

  saveEcosystemData(data);
  return milestone;
}

export function addStartupAchievement(
  achievement: Omit<StartupAchievement, "id">,
  addedBy?: string
): StartupAchievement {
  const data = getEcosystemData();
  const newAch: StartupAchievement = {
    id: `ach_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...achievement,
  };

  data.achievements.unshift(newAch);

  logActivity(
    `Achievement Verified: ${newAch.title}`,
    "ACHIEVEMENT",
    `Verified achievement (${newAch.type}) recorded for ${newAch.startupName} issued by ${newAch.issuer}.`,
    addedBy || "Admin Operations",
    newAch.startupId,
    newAch.startupName
  );

  saveEcosystemData(data);
  return newAch;
}

export function addProductLaunch(
  launch: Omit<ProductLaunch, "id">,
  addedBy?: string
): ProductLaunch {
  const data = getEcosystemData();
  const newLaunch: ProductLaunch = {
    id: `launch_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...launch,
  };

  data.launches.unshift(newLaunch);

  logActivity(
    `Product Launch Added: ${newLaunch.productName}`,
    "LAUNCH",
    `New showcase launch for ${newLaunch.startupName}: "${newLaunch.productName}" (${newLaunch.version}).`,
    addedBy || "Admin Operations",
    newLaunch.startupId,
    newLaunch.startupName
  );

  saveEcosystemData(data);
  return newLaunch;
}

export function logMentoringSession(
  session: Omit<MentoringSession, "id">,
  loggedBy?: string
): MentoringSession {
  const data = getEcosystemData();
  const newSession: MentoringSession = {
    id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...session,
  };

  data.sessions.unshift(newSession);

  logActivity(
    `Mentoring Session Logged`,
    "MENTOR",
    `Session conducted between ${session.mentorName} and ${session.startupName} on topic "${session.topic}".`,
    loggedBy || "Mentor Desk",
    session.startupId,
    session.startupName
  );

  saveEcosystemData(data);
  return newSession;
}

export function saveSuccessStory(
  story: Omit<SuccessStory, "id"> & { id?: string },
  authorName?: string
): SuccessStory {
  const data = getEcosystemData();
  const id = story.id || `story_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  
  const existingIndex = data.stories.findIndex((s) => s.id === id || s.slug === story.slug);
  const fullStory: SuccessStory = {
    id,
    ...story,
  };

  if (existingIndex >= 0) {
    data.stories[existingIndex] = fullStory;
  } else {
    data.stories.unshift(fullStory);
  }

  logActivity(
    `Success Story Saved: ${fullStory.title}`,
    "STORY",
    `Editorial success story for ${fullStory.startupName} status: ${fullStory.status}.`,
    authorName || "Editorial Desk",
    fullStory.startupId,
    fullStory.startupName
  );

  saveEcosystemData(data);
  return fullStory;
}

export function submitAlumniConnection(
  connection: Omit<AlumniConnection, "id" | "createdAt" | "status">
): AlumniConnection {
  const data = getEcosystemData();
  const newConn: AlumniConnection = {
    id: `conn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...connection,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  data.connections.unshift(newConn);

  logActivity(
    `Alumni Connection Requested`,
    "ALUMNI",
    `Connection request from ${connection.requesterName} (${connection.requesterOrg || "Independent"}) to ${connection.startupName}.`,
    "Alumni Portal"
  );

  saveEcosystemData(data);
  return newConn;
}
