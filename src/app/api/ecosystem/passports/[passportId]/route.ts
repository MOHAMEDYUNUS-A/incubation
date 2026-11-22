import { NextRequest, NextResponse } from "next/server";
import {
  getPassportById,
  getFounders,
  getMilestones,
  getMentoringSessions,
  getAchievements,
  getProductLaunches,
  calculateStartupProgress,
} from "@/lib/ecosystem/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { passportId: string } }
) {
  try {
    const { passportId } = params;
    const passport = getPassportById(passportId);

    if (!passport) {
      return NextResponse.json(
        { success: false, error: `Passport ${passportId} not found.` },
        { status: 404 }
      );
    }

    const founders = getFounders(passport.startupId).map((f) => {
      // Respect privacy: omit phone and email unless public contact is authorized
      if (!f.isPublicContact) {
        return {
          ...f,
          email: "[Protected by MIF Privacy Protocol]",
          phone: "[Protected by MIF Privacy Protocol]",
        };
      }
      return f;
    });

    const milestones = getMilestones(passport.startupId);
    const progress = calculateStartupProgress(milestones);
    const achievements = getAchievements(passport.startupId);
    const launches = getProductLaunches(passport.startupId);
    const sessions = getMentoringSessions(passport.startupId).map((s) => ({
      ...s,
      notes: "[Confidential Mentoring Notes]", // Never leak internal advisory notes
    }));

    return NextResponse.json({
      success: true,
      data: {
        passport,
        founders,
        milestones,
        progress,
        achievements,
        launches,
        mentoringSessions: sessions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve passport dossier." },
      { status: 500 }
    );
  }
}
