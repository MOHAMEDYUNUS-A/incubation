import { NextRequest, NextResponse } from "next/server";
import {
  getMentors,
  getMentoringSessions,
  logMentoringSession,
} from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get("startupId");

    const mentors = getMentors();
    const sessions = getMentoringSessions(startupId || undefined);

    return NextResponse.json({
      success: true,
      data: {
        mentors,
        sessions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch mentors and sessions." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      startupId,
      startupName,
      mentorId,
      mentorName,
      date,
      durationMinutes,
      topic,
      notes,
      mentorFeedback,
      founderFeedback,
      actionItems,
      loggedBy,
    } = body;

    if (!startupId || !mentorId || !topic) {
      return NextResponse.json(
        { success: false, error: "startupId, mentorId, and topic are required." },
        { status: 400 }
      );
    }

    const session = logMentoringSession(
      {
        startupId,
        startupName: startupName || "Incubated Startup",
        mentorId,
        mentorName: mentorName || "Assigned Mentor",
        date: date || new Date().toISOString(),
        durationMinutes: durationMinutes || 60,
        topic,
        notes: notes || "",
        mentorFeedback,
        founderFeedback,
        actionItems,
      },
      loggedBy
    );

    return NextResponse.json({
      success: true,
      message: "Mentoring session logged successfully.",
      data: session,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to log mentoring session." },
      { status: 500 }
    );
  }
}
