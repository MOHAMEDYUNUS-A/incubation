import { NextRequest, NextResponse } from "next/server";
import {
  getPassportById,
  recordPassportVerification,
  getFounders,
  getMilestones,
  getAchievements,
  calculateStartupProgress,
} from "@/lib/ecosystem/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { passportId: string } }
) {
  try {
    const { passportId } = params;
    const passport = recordPassportVerification(passportId);

    if (!passport) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          status: "NOT_FOUND",
          message: `Passport ID "${passportId}" is not registered in the MASTeR Incubation Foundation registry.`,
        },
        { status: 404 }
      );
    }

    const isValid = passport.status === "ACTIVE";
    const milestones = getMilestones(passport.startupId);
    const progress = calculateStartupProgress(milestones);
    const achievements = getAchievements(passport.startupId).filter((a) => a.isPublic);
    const founders = getFounders(passport.startupId).map((f) => ({
      fullName: f.fullName,
      role: f.role,
      avatarUrl: f.avatarUrl,
      linkedInUrl: f.linkedInUrl,
    }));

    return NextResponse.json({
      success: true,
      verified: isValid,
      status: passport.status,
      issuer: "MASTeR Incubation Foundation (MIF)",
      hostInstitution: "M.A.M. College of Engineering and Technology (MAMCET)",
      accreditation: "StartupTN Pre-Incubation Centre | MSME Recognized Host Institute",
      campusLocation: "Siruganur, Tiruchirappalli - 621105, Tamil Nadu, India",
      passport: {
        passportId: passport.passportId,
        startupName: passport.startupName,
        slug: passport.slug,
        issuedAt: passport.issuedAt,
        activationDate: passport.activationDate,
        lastVerifiedAt: passport.lastVerifiedAt,
        totalVerifications: passport.verificationCount,
        securityHash: passport.securityHash,
        status: passport.status,
        remarks: passport.remarks,
        qrCodeData: passport.qrCodeData,
      },
      founders,
      journeySummary: {
        completionPercentage: progress.percentage,
        completedStages: progress.completedCount,
        totalStages: progress.totalCount,
        currentStage: progress.currentMilestone?.stageName || "Completed",
      },
      verifiedAchievements: achievements.map((a) => ({
        title: a.title,
        type: a.type,
        issuer: a.issuer,
        awardDate: a.awardDate,
        grantAmount: a.grantAmount,
      })),
      verificationSeal: {
        authority: "Director of Incubation & Innovation, MIF",
        digitalTimestamp: new Date().toISOString(),
        tamperProofHash: passport.securityHash,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: error.message || "Passport verification engine error.",
      },
      { status: 500 }
    );
  }
}
