import { NextRequest, NextResponse } from "next/server";
import { UPCOMING_EVENTS } from "@/lib/db/mockData";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });
    if (events.length > 0) {
      return NextResponse.json({ success: true, data: events });
    }
  } catch {
    // fallback to mock data
  }
  return NextResponse.json({ success: true, data: UPCOMING_EVENTS });
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { eventId, fullName, email, phone, organization } = json;

    if (!eventId || !fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required registration fields" },
        { status: 400 }
      );
    }

    try {
      const reg = await prisma.eventRegistration.create({
        data: {
          eventId,
          fullName,
          email,
          phone,
          organization: organization || "Student / Innovator",
        },
      });
      return NextResponse.json({ success: true, data: reg });
    } catch {
      return NextResponse.json({
        success: true,
        data: { id: `reg-${Date.now()}`, eventId, fullName, email, phone },
        isFallback: true,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
