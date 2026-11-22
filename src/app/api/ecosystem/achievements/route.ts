import { NextRequest, NextResponse } from "next/server";
import { getAchievements, addStartupAchievement } from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get("startupId");

    const achievements = getAchievements(startupId || undefined);

    return NextResponse.json({
      success: true,
      data: achievements,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch achievements." },
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
      title,
      type,
      issuer,
      awardDate,
      description,
      grantAmount,
      certificateUrl,
      isVerified,
      isPublic,
      addedBy,
    } = body;

    if (!startupId || !title || !issuer || !type) {
      return NextResponse.json(
        { success: false, error: "startupId, title, issuer, and type are required." },
        { status: 400 }
      );
    }

    const newAch = addStartupAchievement(
      {
        startupId,
        startupName: startupName || "Incubated Startup",
        title,
        type,
        issuer,
        awardDate: awardDate || new Date().toISOString(),
        description: description || "",
        grantAmount,
        certificateUrl,
        isVerified: isVerified !== undefined ? isVerified : true,
        isPublic: isPublic !== undefined ? isPublic : true,
      },
      addedBy
    );

    return NextResponse.json({
      success: true,
      message: "Achievement added successfully.",
      data: newAch,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add achievement." },
      { status: 500 }
    );
  }
}
