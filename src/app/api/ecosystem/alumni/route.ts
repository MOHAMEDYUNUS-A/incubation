import { NextRequest, NextResponse } from "next/server";
import {
  getAlumniProfiles,
  getAllAlumniAdmin,
  getAlumniConnections,
  submitAlumniConnection,
} from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    const alumni = isAdmin ? getAllAlumniAdmin() : getAlumniProfiles();
    const connections = isAdmin ? getAlumniConnections() : [];

    return NextResponse.json({
      success: true,
      data: {
        alumni,
        connections,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch alumni directory." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { alumniId, startupName, requesterName, requesterEmail, requesterOrg, message } = body;

    if (!alumniId || !requesterName || !requesterEmail || !message) {
      return NextResponse.json(
        { success: false, error: "alumniId, requesterName, requesterEmail, and message are required." },
        { status: 400 }
      );
    }

    const newConnection = submitAlumniConnection({
      alumniId,
      startupName: startupName || "Alumni Venture",
      requesterName,
      requesterEmail,
      requesterOrg,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Connection request sent successfully.",
      data: newConnection,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send connection request." },
      { status: 500 }
    );
  }
}
