export type PassportStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED';

export type JourneyMilestoneStatus = 
  | 'NOT_STARTED' 
  | 'IN_PROGRESS' 
  | 'SUBMITTED_FOR_REVIEW' 
  | 'UNDER_REVIEW' 
  | 'COMPLETED' 
  | 'REJECTED' 
  | 'ON_HOLD';

export type AchievementType = 
  | 'AWARD' 
  | 'RECOGNITION' 
  | 'CERTIFICATION' 
  | 'COMPETITION_RESULT' 
  | 'INNOVATION_GRANT' 
  | 'PARTNERSHIP' 
  | 'FUNDING_ROUND' 
  | 'PUBLICATION';

export type AlumniGrowthStatus = 'SCALING' | 'ACQUIRED' | 'PROFITABLE' | 'ACTIVE' | 'PIVOTED';

export type ConnectionStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export type StoryPublishStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface StartupPassport {
  id: string;
  passportId: string; // e.g. MASTER-SP-2026-0001
  startupId: string;
  startupName: string;
  slug: string;
  status: PassportStatus;
  issuedAt: string;
  activationDate: string;
  lastVerifiedAt: string | null;
  verificationCount: number;
  securityHash: string;
  qrCodeData: string;
  remarks?: string;
}

export interface StartupFounder {
  id: string;
  startupId: string;
  fullName: string;
  role: string;
  email: string; // Private by default
  phone?: string; // Private by default
  bio: string;
  avatarUrl: string;
  linkedInUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  education?: string;
  skills: string[];
  isPublicContact: boolean;
}

export interface MilestoneEvidence {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'link';
  submittedAt: string;
}

export interface JourneyMilestone {
  id: string;
  startupId: string;
  stageOrder: number; // 1 to 14
  stageName: string;
  title: string;
  description: string;
  weight: number; // Percentage contribution to overall progress
  status: JourneyMilestoneStatus;
  targetDate: string;
  completedDate?: string;
  evidence: MilestoneEvidence[];
  founderRemarks?: string;
  adminRemarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  designation: string;
  organization: string;
  areasOfExpertise: string[];
  bio: string;
  avatarUrl: string;
  linkedInUrl?: string;
  isAvailable: boolean;
  assignedStartups: string[]; // Startup IDs
}

export interface MentoringSession {
  id: string;
  startupId: string;
  startupName: string;
  mentorId: string;
  mentorName: string;
  date: string;
  durationMinutes: number;
  topic: string;
  notes: string; // Internal confidential
  mentorFeedback?: string;
  founderFeedback?: string;
  actionItems?: string;
}

export interface StartupAchievement {
  id: string;
  startupId: string;
  startupName: string;
  title: string;
  type: AchievementType;
  issuer: string;
  awardDate: string;
  description: string;
  grantAmount?: string;
  certificateUrl?: string;
  isVerified: boolean;
  isPublic: boolean;
}

export interface ProductLaunch {
  id: string;
  startupId: string;
  startupName: string;
  productName: string;
  tagline: string;
  launchDate: string;
  version: string;
  demoUrl?: string;
  pressReleaseUrl?: string;
  mediaUrls: string[];
  description: string;
  isFeatured: boolean;
}

export interface FounderInterviewTranscriptItem {
  time: string;
  speaker: string;
  text: string;
}

export interface FounderInterview {
  id: string;
  storyId: string;
  interviewTitle: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript: FounderInterviewTranscriptItem[];
  keyTakeaways: string[];
  conductedAt: string;
}

export interface StoryMetric {
  label: string;
  value: string;
  detail: string;
}

export interface SuccessStory {
  id: string;
  startupId: string;
  startupName: string;
  slug: string;
  title: string;
  heroImage: string;
  problemStatement: string;
  theBreakthrough: string;
  mifJourney: string;
  impactMetrics: StoryMetric[];
  founderQuote: string;
  quoteAuthor: string;
  status: StoryPublishStatus;
  isEditorialPick: boolean;
  publishedAt: string;
  interview?: FounderInterview;
}

export interface AlumniProfile {
  id: string;
  startupId: string;
  startupName: string;
  slug: string;
  graduationCohort: string; // e.g. "Class of 2024"
  growthStatus: AlumniGrowthStatus;
  currentHeadcount: string;
  totalCapitalRaised: string;
  currentRevenueRange: string;
  headquarters: string;
  willingToMentor: boolean;
  isPublicDirectory: boolean;
  founders: Array<{ name: string; role: string; linkedInUrl?: string }>;
  tags: string[];
}

export interface AlumniConnection {
  id: string;
  alumniId: string;
  startupName: string;
  requesterName: string;
  requesterEmail: string;
  requesterOrg?: string;
  message: string;
  status: ConnectionStatus;
  createdAt: string;
}

export interface ActivityHistoryItem {
  id: string;
  startupId?: string;
  startupName?: string;
  action: string;
  category: 'PASSPORT' | 'MILESTONE' | 'MENTOR' | 'ACHIEVEMENT' | 'LAUNCH' | 'STORY' | 'ALUMNI';
  details: string;
  performedBy: string;
  timestamp: string;
}
