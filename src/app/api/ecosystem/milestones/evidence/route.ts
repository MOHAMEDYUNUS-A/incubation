import { NextRequest, NextResponse } from "next/server";
import { submitMilestoneEvidence } from "@/lib/ecosystem/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { milestoneId, title, description, fileUrl, fileType, founderRemarks } = body;

    if (!milestoneId || !title || !fileUrl) {
      return NextResponse.json(
        { success: false, error: "milestoneId, title, and fileUrl are required." },
        { status: 400 }
      );
    }

    const updated = submitMilestoneEvidence(
      milestoneId,
      {
        title,
        description: description || "",
        fileUrl,
        fileType: fileType || "pdf",
      },
      founderRemarks
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Milestone ${milestoneId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Evidence submitted successfully. Placed in review queue.",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit milestone evidence." },
      { status: 500 }
    );
  }
}
