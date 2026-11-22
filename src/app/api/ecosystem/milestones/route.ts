import { NextRequest, NextResponse } from "next/server";
import {
  getMilestones,
  calculateStartupProgress,
  reviewMilestoneEvidence,
} from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get("startupId");

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "startupId query parameter is required." },
        { status: 400 }
      );
    }

    const milestones = getMilestones(startupId);
    const progress = calculateStartupProgress(milestones);

    return NextResponse.json({
      success: true,
      data: {
        milestones,
        progress,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch milestones." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { milestoneId, approved, adminRemarks, reviewerName } = body;

    if (!milestoneId || typeof approved !== "boolean") {
      return NextResponse.json(
        { success: false, error: "milestoneId and approved (boolean) are required." },
        { status: 400 }
      );
    }

    const updated = reviewMilestoneEvidence(
      milestoneId,
      approved,
      adminRemarks || (approved ? "Approved upon institutional review." : "Evidence requires revisions."),
      reviewerName || "Incubation Directorate"
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Milestone ${milestoneId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Milestone ${approved ? "approved" : "rejected"} successfully.`,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to review milestone." },
      { status: 500 }
    );
  }
}
