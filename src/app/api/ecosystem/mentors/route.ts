import { NextRequest, NextResponse } from "next/server";
import {
  getMentors,
  getMentoringSessions,
  logMentoringSession,
  createMentor,
  deleteMentor,
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
    const { action } = body;

    // Action 1: Create a new mentor
    if (action === "create_mentor") {
      const {
        name,
        designation,
        organization,
        areasOfExpertise,
        bio,
        avatarUrl,
        linkedInUrl,
        isAvailable,
        addedBy,
      } = body;

      if (!name || !designation) {
        return NextResponse.json(
          { success: false, error: "Mentor Name and Designation are required." },
          { status: 400 }
        );
      }

      const expertiseList = Array.isArray(areasOfExpertise)
        ? areasOfExpertise
        : typeof areasOfExpertise === "string"
        ? areasOfExpertise.split(",").map((s: string) => s.trim()).filter(Boolean)
        : ["Mentorship"];

      const newMentor = createMentor(
        {
          name,
          designation,
          organization: organization || "MASTeR Incubation Foundation",
          areasOfExpertise: expertiseList,
          bio: bio || "Empaneled mentor at MASTeR Incubation Foundation.",
          avatarUrl: avatarUrl || "/logos/official-mif-logo.png",
          linkedInUrl: linkedInUrl || undefined,
          isAvailable: isAvailable !== false,
          assignedStartups: [],
        },
        addedBy
      );

      return NextResponse.json({
        success: true,
        message: "Mentor empaneled successfully.",
        data: newMentor,
      });
    }

    // Action 2: Delete an existing mentor
    if (action === "delete_mentor") {
      const { mentorId } = body;
      if (!mentorId) {
        return NextResponse.json(
          { success: false, error: "mentorId is required." },
          { status: 400 }
        );
      }
      deleteMentor(mentorId);
      return NextResponse.json({
        success: true,
        message: "Mentor removed successfully.",
      });
    }

    // Action 3: Log Mentoring Session
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
      { success: false, error: error.message || "Failed to process mentor request." },
      { status: 500 }
    );
  }
}
